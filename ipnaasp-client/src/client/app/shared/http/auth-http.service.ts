/**
 * Created by zte on 16-10-12.
 */
import { Injectable } from '@angular/core';
import { Request, Response, RequestOptionsArgs } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp as JwtAuthHttp} from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

@Injectable()
export class AuthHttp {

  constructor(private authHttp: JwtAuthHttp, private router: Router) {
  }

  private isUnauthorized(status: number): boolean {
    return !status || status === 401 || status === 403;
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    console.log(error);
    if(error.message) {
      return Observable.throw({message:error.message,status:error.status});
    }

    let message :string= null;
    if(error._body) {
      try{
        let body = JSON.parse(error._body);
        message = body.message||body.error;
      }catch(e){;}
    }
    let errMsg = (message) ? message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw({message:errMsg,status:error.status});
  }

  private authIntercept(response: Observable<any>){
    var sharableResponse = response.share();
    sharableResponse.subscribe(null, (err) => {
      if (this.isUnauthorized(err.status)) {
        this.router.navigate(['/login']);
      }
      // Other error handling may be added here, such as refresh token …
    });
    return sharableResponse.map(res=>{
      try{return res.json();}
      catch(e){return res;}
    }).catch(this.handleError);

  }

  public request(url: string | Request, options?: RequestOptionsArgs): Observable<any> {
    return this.authIntercept(this.authHttp.request(url, options));
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.authIntercept(this.authHttp.get(url, options));
  }

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    return this.authIntercept(this.authHttp.post(url, body,options));
  }

  public put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    return this.authIntercept(this.authHttp.put(url, body, options));
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.authIntercept(this.authHttp.delete(url, options));
  }

  public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    return this.authIntercept(this.authHttp.patch(url, body, options));
  }

  public head(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.authIntercept(this.authHttp.head(url, options));
  }

  public options(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.authIntercept(this.authHttp.options(url, options));
  }
}
