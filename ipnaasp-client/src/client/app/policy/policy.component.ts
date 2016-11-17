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

  policyEntryPointValue:string;
  policyEixtPointValue: string;
  policyRealEntryPointValue:string;
  policyRealEixtPointValue:string;
  policyReasonValue: string;
  currentPolicyRecordingInfo:string = "";
  pushPolicyFlag: boolean;

  public policyStatuse = "";
  policyIDValue:string = "";
  policyTypeValue:string = "";
  policyDirectionValue:string = "";
  policyCycleValue:string = "";

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
        // 初始化时是我的策略，已入场
        this._policyService.policyStatuse = "已入场";
        this._policyService.queryMyPolicies(this._policyService.policyStatuse,null,null,null,null);
      }
    });
  }
  ngOnDestroy() {
    this._policyService.isClickPolicyFlag = false;
  }

  changePolicyStatus(status:string,data:any){
    this._policyService.currentPolicyDatas = data;
    this.policyType = data.type;
    this.policyCycle = data.cycle;
    this.policyDirection = data.direction;
    this.policyStatus = data.status;
    this.policyEntryPointValue = data.entryPoint;
    this.policyEixtPointValue = data.exitPoint;
  }
  filterMyPolicyList(){
    this._policyService.queryMyPolicies(this._policyService.policyStatuse,this.policyIDValue,this.policyTypeValue,this.policyDirectionValue,this.policyCycleValue);
  }
  clickPolicyList(policyData:any){
    for(let i=0;i<this._policyService.policyDatas.length;i++){
      if(policyData.id === this._policyService.policyDatas[i].id) {
        this._policyService.currentPolicyDatas = this._policyService.policyDatas[i];
      }
    }
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
  configChangePolicyStatusBtn() {
    let changeFlag:boolean = false;
    this.principal.identity().then((account) => {
      if(account != null && account != undefined){
        let status:string = "";
        if(this.policyStatus === "待入场") {
          status = "已入场";
        }
        else if (this.policyStatus === "已入场") {
          status = "已退场";
        }
        let policyVM:any = {
          id: this._policyService.currentPolicyDatas.id,
          policyStatus: status,
          realEntryPoint: this.policyRealEntryPointValue,
          realExitPoint: this.policyRealEixtPointValue,
        };
        console.log(policyVM);
        console.log("start modify policy");
        this.authHttp.put(MockCfg.baseUrl + MockCfg.myPoliciesUrl, policyVM).subscribe(data => {

          changeFlag = true;
          console.log(data);
          console.log("modify policy ok");
          this._policyService.queryMyPolicies(this._policyService.policyStatuse,null,null,null,null);
          // 提示创建成功;
        }, err => {
          console.log(err);
          changeFlag = false;
          console.log("modify policy fail");
          // 提示创建失败;
        });
      }
    });
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
          createFlag = true;
          this._policyService.queryMyPolicies(this._policyService.policyStatuse,null,null,null,null);
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
