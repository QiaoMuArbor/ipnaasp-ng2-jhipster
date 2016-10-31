import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    create(user:User): Observable<Response> {
        return this.http.post(`api/users`, user);
    }

    update(user:User): Observable<Response> {
        return this.http.put(`api/users`, user);
    }

    find(login:string): Observable<User> {
        return this.http.get(`api/users/${login}`).map((res: Response) => res.json());
    }

    query(req: any): Observable<Response> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', req.page);
        params.set('size', req.size);
        params.set('sort', req.sort);

        let options = {
            search: params
        };

        return this.http.get('api/users', options);
    }

    delete(login:string): Observable<Response> {
        return this.http.delete(`api/users/${login}`);
    }
}
