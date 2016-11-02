import { Injectable } from '@angular/core';
import { Response} from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { MockCfg } from '../../mock';
// import {AuthHttp} from '../http/index';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class AccountService  {
    constructor(
      public authHttp:AuthHttp
    ) { }

    get(): Observable<any> {
      return this.authHttp.get('api/account').map((res: Response) => res.json());
    }

    save(account: any): Observable<Response> {
        return this.authHttp.post(MockCfg.baseUrl+MockCfg.accountUrl, account);
    }
}
