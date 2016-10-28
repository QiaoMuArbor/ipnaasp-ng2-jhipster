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
      return this.authHttp.get(MockCfg.baseUrl+MockCfg.accountUrl );
    }

    save(account: any): Observable<Response> {
        return this.authHttp.post(MockCfg.baseUrl+MockCfg.accountUrl, account);
    }
}
