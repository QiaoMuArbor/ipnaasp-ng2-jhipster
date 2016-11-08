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
    this.ngOnInit();
  }
  ngOnInit() {
    console.log("ngOnInit");
    let freshTimer = setInterval(() => {
      console.log("my-alarms 定时器正在运行....");
      this.queryMyPolicies();
    }, 5000);
    this.freshTimersInfo.set('my-policy', freshTimer);
    console.log("my-policy 定时器启动");
  }

  private closeFresh(type:string) {
    if (this.freshTimersInfo.get(type)) {
      clearInterval(this.freshTimersInfo.get(type));
      console.log(type + " 定时器关闭");
    }
  }
  ngOnDestroy() {
    console.log("ngOnDestroy");
    this.closeFresh("my-policy");
  }

  queryMyPolicies(){
    this.authHttp.get(MockCfg.baseUrl + MockCfg.policiesUrl).subscribe(data => {
      console.log(data.json());
      this.policyDatas = data.json();
      console.log(this.policyDatas);
      // 提示创建成功;
    }, err => {
      console.log(err);
      // 提示创建失败;
    });
  }
}
