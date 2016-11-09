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

  policyTypesArray: Array<string> = ["黄金", "白银"];
  policyTypes: Array<string> = ["gold", "silver"];
  policyType:string = "黄金";
  // 策略周期
  policyCyclesArray: Array<string> = ["超短线", "短线", "中线", "长线"];
  policyCycles: Array<string> = ["UshortTermO", "ShortTermO", "CenterlineO", "LongTermO"];
  policyCycle:string = "短线";
  // 策略方向
  policyDirectionsArray: Array<string> = ["空", "多"];
  policyDirections: Array<string> = ["false", "true"];
  policyDirection:string = "空";
  // 策略状态
  PolicyStatusesArray:Array<string> = ["待入场", "已入场"];
  PolicyStatuses:Array<string> = ["waitPolicy", "enterPolicy"];
  policyStatus:string = "待入场";

  policyEntryPointValue: string;
  policyEixtPointValue: string;
  policyReasonValue: string;
  pushPolicyFlag: boolean;
  private freshTimersInfo = new Map<string,any>();
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
        for(let i=0;i<this.policyTypesArray.length;i++){
          if(this.policyType === this.policyTypesArray[i]){
            _policyType = this.policyTypes[i];
            break;
          }
        }
        let _policyCycle = this.policyCycle;
        for(let i=0;i<this.policyCyclesArray.length;i++){
          if(this.policyCycle === this.policyCyclesArray[i]){
            _policyCycle = this.policyCycles[i];
            break;
          }
        }
        let _policyDirection = this.policyDirection;
        for(let i=0;i<this.policyDirectionsArray.length;i++){
          if(this.policyDirection === this.policyDirectionsArray[i]){
            _policyDirection = this.policyDirections[i];
            break;
          }
        }
        let _policyStatus = this.policyStatus;
        for(let i=0;i<this.PolicyStatusesArray.length;i++){
          if(this.policyStatus === this.PolicyStatusesArray[i]){
            _policyStatus = this.PolicyStatuses[i];
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
