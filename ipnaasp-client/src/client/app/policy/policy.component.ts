import { Component, OnInit } from '@angular/core';
import { PolicyService,Principal,ISOLocalPipe } from '../shared/index';
import { MockCfg } from '../mock';
import { AuthHttp } from 'angular2-jwt';


@Component({
  moduleId: module.id,
  selector: 'sd-policy',
  templateUrl: 'policy.component.html',
  styleUrls: ['policy.component.css'],
  pipes: [ ISOLocalPipe ]

})

export class PolicyComponent {

  policyType:string = "黄金";
  policyCycle:string = "短线";
  policyDirection:string = "空";
  policyStatus:string = "待入场";

  policyEntryPointValue: string;
  policyEixtPointValue: string;
  policyReasonValue: string;
  currentPolicyRecordingInfo:string = "";
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

  clickPolicyList(policyData:any){
    for(let i=0;i<this._policyService.policyDatas.length;i++){
      if(policyData.id === this._policyService.policyDatas[i].id) {
        this._policyService.currentPolicyDatas = this._policyService.policyDatas[i];
      }
    }
  }
  curentPolicyOnKey(event: any) {
    this.currentPolicyRecordingInfo = event.target.value;
    console.log(this.currentPolicyRecordingInfo);
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
        let policyVM:any = {
          policyType: this.policyType,
          policyCycle: this.policyCycle,
          policyDirection: this.policyDirection,
          policyStatus: this.policyStatus,
          entryPoint: this.policyEntryPointValue,
          exitPoint: this.policyEixtPointValue,
          reason: this.policyReasonValue,
          pushPolicyFlag: this.pushPolicyFlag
        };
        console.log(policyVM);
        this.authHttp.post(MockCfg.baseUrl + MockCfg.myPoliciesUrl, policyVM).subscribe(data => {
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
