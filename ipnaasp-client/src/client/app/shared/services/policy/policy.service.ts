import { Injectable } from '@angular/core';
import 'rxjs/add/observable/throw';

@Injectable()
export class PolicyService {
  isClickPolicyFlag:boolean = false;
  isShowHeaderMenuFlag:boolean = true;
  isShowFullFlag:boolean = true;
  policyType:string = "我的策略";
  curType:string = "已入场";
  _curTypeFlag:boolean = true;
  constructor () {
  }
}
