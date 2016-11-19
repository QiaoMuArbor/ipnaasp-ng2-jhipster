import {Directive, ElementRef,Component,Input,Output} from '@angular/core';
import {Router} from '@angular/router';
import { AuthServerProvider, Principal,PolicyService } from '../shared/index';
import {JwtHelper, tokenNotExpired} from 'angular2-jwt';
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';
import { LoginService } from '../login/login.service';

@Directive({ selector: '[autoFocus]' })
class AutoFocusDirective {
  private el: HTMLElement;
  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }
  ngAfterContentInit(){
    this.el.focus();
  }
}
@Component({
    moduleId: module.id,
    selector:'header-menu',
    templateUrl:'header-menu.component.html',
    styleUrls:['header-menu.component.css'],
    providers: [AuthServerProvider,JwtHelper,LoginService]
})

export class HeaderMenuComponent {
    sidebarTypeArray:Array = ["home","policy","socialCircle","analysis","information","platformMarket","more"];
    isOn:Array = [true,false,false,false,false,false,false];

    constructor(
      private _router: Router,
      private principal: Principal,
      private $localStorage: LocalStorageService,
      private $sessionStorage: SessionStorageService,
      private _policyService: PolicyService
    ) {}

    ngOnInit() {

    }

    register() {
      this._router.navigate(['/register']);
    }
    login() {
      this._router.navigate(['/login']);
    }
    logout(){
      console.log("logout");
      this._policyService.logoutOrNoLoginThenHideAllPolicyInfo();
      this.principal.authenticated = false;
      this.$localStorage.clear('authenticationToken');
      this.$sessionStorage.clear('authenticationToken');
      window.localStorage.removeItem('authenticationToken');
    }

    changeHeaderMenu(type:string){
      this.isOn = [false,false,false,false,false,false,false];
      let i:number = 0;
      for(i=0; i<this.sidebarTypeArray.length; i++){
        if(this.sidebarTypeArray[i] === type){
          this.isOn[i] = true;
        }
      }
    }
  clickToHomeLink:string = "/home";
  clickToHome(){
    this._router.navigateByUrl(this.clickToHomeLink);
    this.changeHeaderMenu(this.sidebarTypeArray[0]);
  }

  clickToPolicyLink:string = "/policy";
  clickToPolicy(){
    this._router.navigateByUrl(this.clickToPolicyLink);
    this.changeHeaderMenu(this.sidebarTypeArray[1]);
  }

  clickToSocialCircleLink:string = "/socialCircle";
  clickToSocialCircle(){
    this._router.navigateByUrl(this.clickToSocialCircleLink);
    this.changeHeaderMenu(this.sidebarTypeArray[2]);
  }

  clickToAnalysiseLink:string = "/analysis";
  clickToAnalysise(){
    this._router.navigateByUrl(this.clickToAnalysiseLink);
    this.changeHeaderMenu(this.sidebarTypeArray[3]);
  }

  clickToInformationLink:string = "/information";
  clickToInformation(){
    this._router.navigateByUrl(this.clickToInformationLink);
    this.changeHeaderMenu(this.sidebarTypeArray[4]);
  }

  clickToPlatformMarketLink:string = "/platformMarket";
  clickToPlatformMarket(){
    this._router.navigateByUrl(this.clickToPlatformMarketLink);
    this.changeHeaderMenu(this.sidebarTypeArray[5]);
  }

  clickToMoreLink:string = "/more";
  clickToMore(){
    this._router.navigateByUrl(this.clickToMoreLink);
    this.changeHeaderMenu(this.sidebarTypeArray[6]);
  }

}

