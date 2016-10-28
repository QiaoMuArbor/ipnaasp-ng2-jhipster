import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { MockCfg } from '../mock';

@Injectable()
export class Register {

  constructor (private http: Http) { }
  save(account: any): Observable<any> {
    console.log(account);
    return this.http.post(MockCfg.baseUrl+MockCfg.registerUrl, account);
  }
}
