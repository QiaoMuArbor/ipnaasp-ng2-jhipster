import { Component, OnInit, Inject, Renderer, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { PolicyService } from '../shared/index';
import { Register } from './register.service';

@Component({
  moduleId: module.id,
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
  providers: [Register]
})

export class registerComponent {

  private registing:boolean;

  private vm:any = {
    doNotMatch:false,
    error:false,
    errorUserExists:false,
    errorEmailExists:false,
    registerAccount:{
      email:'',
      lastName:'',
      login:'',
      password:'',
      confirmPassword:''
    },
    success:false
  };


  constructor(
              private _policyService: PolicyService,
              private registerService: Register,
              // private httpService:HttpService,
              private router: Router,
              private elementRef: ElementRef,
              private renderer: Renderer) {
    this.registing=false;
  }
  ngOnInit() {
    this._policyService.isShowHeaderMenuFlag = false;

    this.vm.success = false;
    this.vm.registerAccount = {};
  }

  ngAfterViewInit() {
    this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#login'), 'focus', []);
  }

  ngOnDestroy() {
    this._policyService.isShowHeaderMenuFlag = true;
  }

  gotoLogin = function(){
    this.router.navigate(['/login']);
  }

  register(){
    this.registing = true;

    if (this.vm.registerAccount.password !== this.vm.confirmPassword) {
      this.vm.doNotMatch = 'ERROR';
      this.registing = false;
    } else {
      this.vm.registerAccount.langKey =  'en' ;
      this.vm.doNotMatch = null;
      this.vm.error = null;
      this.vm.errorUserExists = null;
      this.vm.errorEmailExists = null;

      this.registerService.save(this.vm.registerAccount).subscribe(() => {
        this.vm.success = true;
        this.registing = false;
        // 弹出一个提示对话框，让用户去确认邮箱。
      }, (response) => {
        this.vm.success = null;
        if (response.status === 400 && response.data === 'login already in use') {
          this.vm.errorUserExists = 'ERROR';
        } else if (response.status === 400 && response.data === 'e-mail address already in use') {
          this.vm.errorEmailExists = 'ERROR';
        } else {
          this.vm.error = 'ERROR';
        }
        this.registing = false;
      });
    }
  }
}
