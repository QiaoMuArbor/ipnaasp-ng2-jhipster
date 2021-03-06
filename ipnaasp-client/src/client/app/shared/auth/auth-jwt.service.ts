import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';
@Injectable()
export class AuthServerProvider {
  constructor(
    private http: Http,
    private $localStorage: LocalStorageService,
    private $sessionStorage: SessionStorageService
  ){}
  getToken () {
    return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken');
  }
  login (credentials): Observable<any> {
    var data = {
      username: credentials.username,
      password: credentials.password,
      rememberMe: credentials.rememberMe
    };
    return this.http.post('api/authenticate', data).map(authenticateSuccess.bind(this));
    function authenticateSuccess (resp) {
      var bearerToken = resp.headers.get('Authorization');
      if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
        var jwt = bearerToken.slice(7, bearerToken.length);
        this.storeAuthenticationToken(jwt, credentials.rememberMe);
        return jwt;
      }
    }
  }
  loginWithToken(jwt, rememberMe) {
    if (jwt) {
      this.storeAuthenticationToken(jwt, rememberMe);
      return Promise.resolve(jwt);
    } else {
      return Promise.reject("auth-jwt-service Promise reject"); //Put appropriate error message here
    }
  }
  storeAuthenticationToken(jwt, rememberMe) {
    window.localStorage.setItem('authenticationToken', jwt);
    if(rememberMe){
      this.$localStorage.store('authenticationToken', jwt);
    } else {
      this.$sessionStorage.store('authenticationToken', jwt);
    }
  }
  logout (): Observable<any> {
    return new Observable(observer => {
      console.log("logout");
      this.$localStorage.clear('authenticationToken');
      this.$sessionStorage.clear('authenticationToken');
      window.localStorage.removeItem('authenticationToken');
      observer.complete();
    });
  }
}
