import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
// import { Request, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { MockCfg } from '../../mock';
import {AuthHttp} from '../http/index';

@Injectable()
export class AccountService  {
    constructor(public authHttp:AuthHttp) { }

  get(): Observable<any> {
    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
    return this.authHttp.get('api/account', { headers: myHeader }).map((res: Response) => res.json());
  }

    save(account: any): Observable<Response> {
        return this.authHttp.post(MockCfg.baseUrl+MockCfg.accountUrl, account);
    }
}
