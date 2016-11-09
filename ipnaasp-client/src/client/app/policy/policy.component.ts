import { Component, OnInit } from '@angular/core';
import { PolicyService,Principal } from '../shared/index';
import { MockCfg } from '../mock';
import { AuthHttp } from 'angular2-jwt';


@Component({
  moduleId: module.id,
  selector: 'sd-policy',
  templateUrl: 'policy.component.html',
  styleUrls: ['policy.component.css'],
})

export class PolicyComponent {

  policyType:string = "黄金";
  policyCycle:string = "短线";
  policyDirection:string = "空";
  policyStatus:string = "待入场";

  policyEntryPointValue: string;
  policyEixtPointValue: string;
  policyReasonValue: string;
  pushPolicyFlag: boolean;

  constructor(
    private _policyService: PolicyService,
    public authHttp: AuthHttp,
    private principal: Principal
  ) {
    this.policyEntryPointValue = "";
    this.policyEixtPointValue = "";
    this.policyReasonValue = "";
    this.pushPolicyFlag = false;
  }
  ngOnInit() {
    this._policyService.isClickPolicyFlag = true;
    this.principal.identity().then((account) => {
      if(account != null && account != undefined){
        this._policyService.startPolicyFresh();
      }
    });
  }
  ngOnDestroy() {
    this._policyService.isClickPolicyFlag = false;
    this._policyService.closePolicyFresh();
  }

  policyEntryPointOnKey(event: any) {
    this.policyEntryPointValue = event.target.value;
    console.log(this.policyEntryPointValue);
  }

  policyExitPointOnKey(event: any) {
    this.policyEixtPointValue = event.target.value;
    console.log(this.policyEixtPointValue);
  }

  policyReasonOnKey(event: any) {
    this.policyReasonValue = event.target.value;
    console.log(this.policyReasonValue);
  }

  beforeClickCreatePolicyBtn(){
    let createFlag:boolean = false;
    if(!this.principal.authenticated){
      // 提示新建策略需要用户先登录，屏蔽创建按钮;
      console.log("用户未认证，请先登录");
    }
    else {
      console.log("用户已认证.");
    }
  }
  clickCreatePolicyBtn() {
    let createFlag:boolean = false;
    this.principal.identity().then((account) => {
      if(account != null && account != undefined){
        let _policyType = this.policyType;
        for(let i=0;i<this._policyService.policyTypesArray.length;i++){
          if(this.policyType === this._policyService.policyTypesArray[i]){
            _policyType = this._policyService.policyTypes[i];
            break;
          }
        }
        let _policyCycle = this.policyCycle;
        for(let i=0;i<this._policyService.policyCyclesArray.length;i++){
          if(this.policyCycle === this._policyService.policyCyclesArray[i]){
            _policyCycle = this._policyService.policyCycles[i];
            break;
          }
        }
        let _policyDirection = this.policyDirection;
        for(let i=0;i<this._policyService.policyDirectionsArray.length;i++){
          if(this.policyDirection === this._policyService.policyDirectionsArray[i]){
            _policyDirection = this._policyService.policyDirections[i];
            break;
          }
        }
        let _policyStatus = this.policyStatus;
        for(let i=0;i<this._policyService.policyStatusesArray.length;i++){
          if(this.policyStatus === this._policyService.policyStatusesArray[i]){
            _policyStatus = this._policyService.policyStatuses[i];
            break;
          }
        }
        let policyVM:any = {
          policyType: _policyType,
          policyCycle: _policyCycle,
          policyDirection: _policyDirection,
          policyStatus: _policyStatus,
          entryPoint: this.policyEntryPointValue,
          exitPoint: this.policyEixtPointValue,
          reason: this.policyReasonValue,
          pushPolicyFlag: this.pushPolicyFlag
        };
        this.authHttp.post(MockCfg.baseUrl + MockCfg.policiesUrl, policyVM).subscribe(data => {
          console.log(data);
          createFlag = true;
          // 提示创建成功;
        }, err => {
          console.log(err);
          createFlag = false;
          // 提示创建失败;
        });
      }
    });

  }
}
