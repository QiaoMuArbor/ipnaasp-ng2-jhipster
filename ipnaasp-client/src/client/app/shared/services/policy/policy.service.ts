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
  constructor (
    public authHttp: AuthHttp,
  ) {

  }

  queryMyPolicies(){
    this.authHttp.get(MockCfg.baseUrl + MockCfg.policiesUrl).subscribe(data => {
      console.log(data);
      let _data:any = data;
      this.policyDatas= _data._body;
      console.log(this.policyDatas);
      // 提示创建成功;
    }, err => {
      console.log(err);
      // 提示创建失败;
    });
  }
}
