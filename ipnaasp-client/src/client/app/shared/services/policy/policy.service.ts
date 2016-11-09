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
  private freshTimersInfo = new Map<string,any>();
  public policyNumList:Array<number> = [0,0,0,0,0,0,0,0];

  // 策略类别
  public policyTypesArray: Array<string> = ["黄金", "白银"];
  public policyTypes: Array<string> = ["gold", "silver"];
  // 策略周期
  public policyCyclesArray: Array<string> = ["超短线", "短线", "中线", "长线"];
  public policyCycles: Array<string> = ["UshortTermO", "ShortTermO", "CenterlineO", "LongTermO"];
  // 策略方向
  public policyDirectionsArray: Array<string> = ["空", "多"];
  public policyDirections: Array<string> = ["false", "true"];
  // 策略状态
  public policyStatusesArray:Array<string> = ["待入场", "已入场"];
  public policyStatuses:Array<string> = ["waitPolicy", "enterPolicy"];  //exitPolicy
  constructor (
    public authHttp: AuthHttp,
  ) {

  }

  public startPolicyFresh(){
    let freshTimer = setInterval(() => {
      console.log("policy定时器正在运行....");
      // 获取自己创建的policy,后期需要添加自己订阅的policy
      this.queryMyPolicies();

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

  queryMyPolicies(){
    this.authHttp.get(MockCfg.baseUrl + MockCfg.myPoliciesUrl).subscribe(data => {
      this.policyDatas = data.json();
      console.log(this.policyDatas);
      // 提示创建成功;
      // 对获取到的数据进行处理;
      this.policyNumList[0] = this.policyDatas.length;
      let waitPolicyNum = 0;
      let enterPolicyNum = 0;
      let exitPolicyNum = 0;
      for(let i=0;i<this.policyDatas.length;i++){
        if(this.policyDatas[i].status === this.policyStatuses[0]){
          waitPolicyNum++;
        }
        if(this.policyDatas[i].status === this.policyStatuses[1]){
          enterPolicyNum++;
        }
        if(this.policyDatas[i].status === "exitPolicy"){
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
