import { Router } from '@angular/router';
import { PolicyService } from '../shared/index';
import { Component, Renderer, ElementRef } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  moduleId: module.id,
  selector: 'sd-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers: [LoginService]
})

export class LoginComponent {
  private logining: boolean;
  private vm:any = {
    authenticationError:false,
    password:'',
    credentials:{},
    rememberMe:true,
    username:''
  };

  constructor(private _policyService: PolicyService,
              private loginService: LoginService,
              private elementRef: ElementRef,
              private renderer: Renderer,
              private router: Router
              ) {
    this.logining = false;
    this.vm.rememberMe = true;
  }

  ngOnInit(){
    this._policyService.isShowHeaderMenuFlag = false;
    let token:any = window.localStorage.getItem('authenticationToken');
    console.log("LoginComponent token:"+token);
  }
  ngAfterViewInit() {
    this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []);
  }
  ngOnDestroy() {
    this._policyService.isShowHeaderMenuFlag = true;
  }

  gotoRegist = function() {
    this.router.navigate(['/register']);
  }
  login() {
    let that = this;
    this.logining = true;
    this.loginService.login({
      username: this.vm.username,
      password: this.vm.password,
      rememberMe: this.vm.rememberMe
    }).then(() => {
      this.logining = false;
      this.vm.authenticationError = false;
      this.router.navigate(['/home']);
    }).catch(() => {
      this.vm.authenticationError = true;
      this.logining = false;
    });
  }
}
