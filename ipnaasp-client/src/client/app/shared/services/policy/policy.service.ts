import { Injectable } from '@angular/core';
import 'rxjs/add/observable/throw';
import { MockCfg } from '../../../mock';
import { AuthHttp } from 'angular2-jwt';
import * as _ from 'underscore/underscore';

@Injectable()
export class PolicyService {
  isClickPolicyFlag:boolean = false;
  isShowHeaderMenuFlag:boolean = true;
  isShowFullFlag:boolean = true;
  policyType:string = "我的策略";
  curType:string = "已入场";
  _curTypeFlag:boolean = true;
  policyDatas:any = [];
  currentPolicyDatas:any;
  hasPolicyFlag:boolean;
  public policyNumList:Array<number> = [0,0,0,0,0,0,0,0];

  // 策略类别
  public policyTypesArray: Array<string> = ["黄金", "白银"];
  // 策略周期
  public policyCyclesArray: Array<string> = ["超短线", "短线", "中线", "长线"];
  // 策略方向
  public policyDirectionsArray: Array<string> = ["空", "多"];
  // 策略状态
  public policyStatusesArray:Array<string> = ["待入场", "已入场"];
 // 策略类型
  public recordingType:Array<string> = ["已备注策略", "已入场策略","已退场策略","系统自动关闭策略"];
  public policyStatuse = "";
  showPolicyData:string;
  public currentClickRecordingInfos:string;

  policyIDValue:string = "";
  policyTypeValue:string = "";
  policyDirectionValue:string = "";
  policyCycleValue:string = "";
  constructor (
    public authHttp: AuthHttp,
  ) {
    this.hasPolicyFlag = false;
    this.showPolicyData = "hide";
  }

  queryMyPolicies(type:string,policyIDValue:string,policyTypeValue:string,policyDirectionValue:string,policyCycleValue:string){
    console.log("start query policy");
    this.authHttp.get(MockCfg.baseUrl + MockCfg.myPoliciesUrl).subscribe(data => {
      let datas = data.json();
      if(datas.length > 0){
        this.showPolicyData = "show";
        console.log(datas);
      }
      else {
        this.showPolicyData = "hide";
        console.log(datas);
      }
      this.showMyPolicyNum(datas);
      console.log(datas);
      this.policyDatas = _.filter(datas, function(data){
        if(data.status === type || type === "All"){
          if( null === policyIDValue && null === policyTypeValue && null === policyDirectionValue  && null === policyCycleValue) {
            return true;
          }
          if(data.id.toString().indexOf(policyIDValue)!=-1 && data.type.indexOf(policyTypeValue)!=-1 && data.direction.indexOf(policyDirectionValue)!=-1 && data.cycle.indexOf(policyCycleValue)!=-1) {
            return true;
          }
        }
        return false;
      });
      if(this.policyDatas && this.policyDatas.length == 0) {
        this.hasPolicyFlag = false;
        this.currentPolicyDatas = null;
      }
      else {
        // 判断当前policy在列表中是否存在，存在则取列表中的信息，不存在则取列表的第一个，
        let currentPolicyExit:boolean = false;
        for(let i=0;i<this.policyDatas.length;i++){
          if(this.currentPolicyDatas && this.currentPolicyDatas.id === this.policyDatas[i].id){
            this.currentPolicyDatas = this.policyDatas[i];
            currentPolicyExit = true;
            break;
          }
        }
        if(!currentPolicyExit) {
          this.hasPolicyFlag = true;
          this.currentPolicyDatas = this.policyDatas[0];
        }
        this.authHttp.get(MockCfg.baseUrl + MockCfg.myPoliciesRecordingUrl + "/"+this.currentPolicyDatas.id).subscribe(data => {
          // let datas = data.json();
          this.currentClickRecordingInfos = data.json();
          // 提示创建成功;
        }, err => {
          console.log(err);
          // 提示创建失败;
        });
      }
      console.log(this.policyDatas.length);
      // 提示创建成功;
      console.log("query policy ok");

    }, err => {
      console.log(err);
      console.log("query policy fail");
      // 提示创建失败;
    });

  }
  showMyPolicyNum(data:any) {
    // 对获取到的数据进行处理;
    this.policyNumList[0] = data.length;
    let waitPolicyNum = 0;
    let enterPolicyNum = 0;
    let exitPolicyNum = 0;
    for(let i=0;i<data.length;i++){
      if(data[i].status === this.policyStatusesArray[0]){
        waitPolicyNum++;
      }
      if(data[i].status === this.policyStatusesArray[1]){
        enterPolicyNum++;
      }
      if(data[i].status === "已退场"){
        exitPolicyNum++;
      }
    }
    this.policyNumList[1] = waitPolicyNum;
    this.policyNumList[2] = enterPolicyNum;
    this.policyNumList[3] = exitPolicyNum;
  }

  // 退出或者未登录，显示策略信息;
  logoutOrNoLoginThenHideAllPolicyInfo(){
    this.policyDatas = [];
    this.showPolicyData = "logout";
    this.policyNumList[0] = 0;
    this.policyNumList[1] = 0;
    this.policyNumList[2] = 0;
    this.policyNumList[3] = 0;
  }
}
