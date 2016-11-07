import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../shared/index';

@Component({
  moduleId: module.id,
  selector: 'sd-policy',
  templateUrl: 'policy.component.html',
  styleUrls: ['policy.component.css'],
})

export class PolicyComponent {
  // 策略类别
  policyTypes:Array<string> = ["黄金","白银"];
  policyType:string = "黄金";
  // 策略周期
  PolicyCycles:Array<string> = ["超短线","短线","中线"，"长线"];
  policyCycle:string = "短线";
  // 策略方向
  policyDirections:Array<string> = ["空","多"];
  policyDirection:string = "空";
  // 策略状态
  PolicyStatuses:Array<string> = ["待入场","已入场"];
  policyStatus:string = "待入场";

  policyEntryPointValue:string;
  policyEixtPointValue:string;
  policyReasonValue:string;
  pushPolicyFlag:boolean;
  constructor(private _policyService: PolicyService) {
    this.policyEntryPointValue = "";
    this.policyEixtPointValue = "";
    this.policyReasonValue = "";
    this.pushPolicyFlag = false;
  }
  ngOnInit(){
    this._policyService.isClickPolicyFlag = true;
  }
  ngOnDestroy() {
    this._policyService.isClickPolicyFlag = false;
  }
  policyEntryPointOnKey(event:any){
    this.policyEntryPointValue = event.target.value;
    console.log(this.policyEntryPointValue);
  }
  policyExitPointOnKey(event:any){
    this.policyEixtPointValue = event.target.value;
    console.log(this.policyEixtPointValue);
  }
  policyReasonOnKey(event:any){
    this.policyReasonValue = event.target.value;
    console.log(this.policyReasonValue);
  }
  clickCreatePolicyBtn(){

  }
}
