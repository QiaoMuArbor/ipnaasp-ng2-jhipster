import {Directive, ElementRef,Component,Input,Output} from '@angular/core';
import {Router} from '@angular/router';
import { AuthServerProvider,Account, Principal } from '../shared/index'
import {JwtHelper, tokenNotExpired} from 'angular2-jwt';
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';

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
    providers: [AuthServerProvider,JwtHelper]
})

export class HeaderMenuComponent {
    // private projects:Array<any>;
    private userName:string;
    // private userId:string;
    // private activeProject:string;
    sidebarTypeArray:Array = ["home","policy","socialCircle","analysis","information","platformMarket","more"];
    isOn:Array = [true,false,false,false,false,false,false];
    showLoginRegisterFlag:boolean = true;
    constructor(
      private _router: Router,
      private principal: Principal,
      private jwtHelper: JwtHelper,
      private $localStorage: LocalStorageService,
      private $sessionStorage: SessionStorageService,
      private authServerProvider: AuthServerProvider
    ) {}

    ngOnInit() {
      this.getCurrentAccount();
    }

    register() {
      this._router.navigate(['/register']);
    }
    login() {
      this._router.navigate(['/login']);
    }
    logout(){
      this.$localStorage.clear('authenticationToken');
      this.$sessionStorage.clear('authenticationToken');
      this.showLoginRegisterFlag = true;

    }
    getCurrentAccount(){
      // if(this.authServerProvider.getToken()){
      //     console.log("HeaderMenuComponent token:"+this.authServerProvider.getToken());
      //     this.principal.identity().then((account) => {
      //       console.log(account);
      //       // account
      //       if(account) {
      //         // 健全成功，当前用户是登录状态，显示退出登录按钮，disable注册按钮
      //       }
      //       else {
      //         // 健全失败，未获取到当前登录用户，显示登录按钮，注册按钮
      //       }
      //     }).catch(() => {
      //       // 本地未保存用户token，显示登录按钮，注册按钮
      //     });
      // } else {
      //   console.log("HeaderMenuComponent token:"+this.authServerProvider.getToken())
      // }
        let token:any = this.authServerProvider.getToken();


        // let tokenNotExpiredFlag:boolean = tokenNotExpired(null, token);
        if(token && !this.jwtHelper.isTokenExpired(token)) {
          console.log("HeaderMenuComponent token:"+this.authServerProvider.getToken());
          console.log(
            this.jwtHelper.decodeToken(token),
            this.jwtHelper.getTokenExpirationDate(token),
            this.jwtHelper.isTokenExpired(token)
          );

          // 当前用户是登录状态，disable注册按钮
          this.showLoginRegisterFlag = false;
          this.userName = this.jwtHelper.decodeToken(token).sub;
          console.log(this.userName);
        }
        else {
          // 未获取到当前登录用户，显示登录按钮，注册按钮
          this.showLoginRegisterFlag = true;
        }

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

