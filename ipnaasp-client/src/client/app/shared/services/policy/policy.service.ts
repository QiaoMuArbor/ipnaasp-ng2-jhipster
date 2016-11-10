import { Injectable } from '@angular/core';
import 'rxjs/add/observable/throw';
import { MockCfg } from '../../../mock';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class PolicyService {
  isClickPolicyFlag:boolean = false;
  isShowHeaderMenuFlag:boolean = true;
  isShowFullFlag:boolean = true;
  policyType:string = "我的策略";
  curType:string = "已入场";
  _curTypeFlag:boolean = true;
  policyDatas:any;
  currentPolicyDatas:any;
  hasPolicyFlag:boolean;
  private freshTimersInfo = new Map<string,any>();
  public policyNumList:Array<number> = [0,0,0,0,0,0,0,0];

  // 策略类别
  public policyTypesArray: Array<string> = ["黄金", "白银"];
  // 策略周期
  public policyCyclesArray: Array<string> = ["超短线", "短线", "中线", "长线"];
  // 策略方向
  public policyDirectionsArray: Array<string> = ["空", "多"];
  // 策略状态
  public policyStatusesArray:Array<string> = ["待入场", "已入场"];
  constructor (
    public authHttp: AuthHttp,
  ) {
    this.hasPolicyFlag = false;
    this.queryMyPolicies(true);

  }

  public startPolicyFresh(){
    let freshTimer = setInterval(() => {
      console.log("policy定时器正在运行....");
      // 获取自己创建的policy,后期需要添加自己订阅的policy
      this.queryMyPolicies(false);

    }, 5000);
    this.freshTimersInfo.set("policy", freshTimer);
    console.log("policy定时器启动");
  }
  public closePolicyFresh() {
    if (this.freshTimersInfo.get("policy")) {
      clearInterval(this.freshTimersInfo.get("policy"));
      console.log("policy定时器关闭");
    }
  }

  queryMyPolicies(firstFlag:boolean){
    this.authHttp.get(MockCfg.baseUrl + MockCfg.myPoliciesUrl).subscribe(data => {
      this.policyDatas = data.json();
      console.log(this.policyDatas);
      if(firstFlag){
        if(this.policyDatas.length > 0) {
          this.hasPolicyFlag = true;
          this.currentPolicyDatas = this.policyDatas[0];
        }
      }
      if(this.policyDatas.length == 0) {
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
        if(!currentPolicyExit)
        this.hasPolicyFlag = true;
        this.currentPolicyDatas = this.policyDatas[0];
      }
      // 提示创建成功;
      // 对获取到的数据进行处理;
      this.policyNumList[0] = this.policyDatas.length;
      let waitPolicyNum = 0;
      let enterPolicyNum = 0;
      let exitPolicyNum = 0;
      for(let i=0;i<this.policyDatas.length;i++){
        if(this.policyDatas[i].status === this.policyStatusesArray[0]){
          waitPolicyNum++;
        }
        if(this.policyDatas[i].status === this.policyStatusesArray[1]){
          enterPolicyNum++;
        }
        if(this.policyDatas[i].status === "已退场"){
          exitPolicyNum++;
        }
      }
      this.policyNumList[1] = waitPolicyNum;
      this.policyNumList[2] = enterPolicyNum;
      this.policyNumList[3] = exitPolicyNum;

    }, err => {
      console.log(err);
      // 提示创建失败;
    });
  }
}
