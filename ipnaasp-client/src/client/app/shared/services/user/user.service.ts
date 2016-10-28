import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { MockCfg } from '../../../mock';
/**
 * Import interfaces that service depends on
 */
import { User } from './user';

@Injectable()
export class UserService {

  constructor (private http: Http) {

  }

  private _loginApi = MockCfg.baseUrl + MockCfg.authenticateUrl;

  private _registerApi = MockCfg.baseUrl + MockCfg.registerUrl;


  login(credentials:any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this._loginApi, credentials, <RequestOptionsArgs> {headers: headers, withCredentials: true})
      .map((res: Response) => res)
      .catch(this.handleError);
  }

  // logout() {
  //   return this.http.get(this._logoutApi, <RequestOptionsArgs> {withCredentials: true})
  //                   .map((res: Response) => res.json())
  //                   .catch(this.handleError);
  // }
  register(user:User) {
    let body = JSON.stringify(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this._registerApi, body, <RequestOptionsArgs> {headers: headers, withCredentials: true})
      .map((res: Response) => res)
      .catch(this.handleError);
  }
  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.log("登陆请求失败!");
    return Observable.throw(error || "Server Error");
  }
}
