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
  constructor (
    public authHttp: AuthHttp,
  ) {

  }

  public startPolicyFresh(){
    let freshTimer = setInterval(() => {
      console.log("policy定时器正在运行....");
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
    }, err => {
      console.log(err);
      // 提示创建失败;
    });
  }
}
