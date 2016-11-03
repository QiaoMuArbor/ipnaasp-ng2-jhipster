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
  policyTypesArray:Array<any>=[];
  policyType:string;
  policyTypes:Array<string> = ["黄金","白银"];
  // 策略方向
  policyDirectionArray:Array<any>=[];
  policyDirection:number;
  policyDirections:string =
    '[' +
    '{ ' +
    '"nameZh": "空",' +
    '"nameEn": 0' +
    '},' +
    '{' +
    '"nameZh": "多",' +
    '"nameEn": 1' +
    '}' +
    ']';
  // 策略状态
  policyStatusArray:Array<any>=[];
  policyStatus:number;
  policyStatus_:string =
    '[' +
    '{ ' +
    '"nameZh": "待入场",' +
    '"nameEn": "waitPolicy"' +
    '},' +
    '{' +
    '"nameZh": "已入场",' +
    '"nameEn": "entryPolicy"' +
    '}' +
    ']';
  policyEntryPointValue:string;
  policyEixtPointValue:string;
  constructor(private _policyService: PolicyService) {
    this.policyType = "黄金";
    this.policyEntryPointValue = "";
    this.policyEixtPointValue = "";
    this.policyDirection = 0;
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
  clickCreatePolicyBtn(){

  }
}
