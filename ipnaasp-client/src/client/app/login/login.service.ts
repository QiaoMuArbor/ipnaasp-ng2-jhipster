import { Injectable, Inject } from '@angular/core';

import { Principal,AuthServerProvider } from'../shared/index';


@Injectable()
export class LoginService {
  constructor (
      private principal: Principal,
      private authServerProvider: AuthServerProvider
  ) {}

    login (credentials, callback?) {
        var cb = callback || function(){};

        return new Promise((resolve, reject) => {
            this.authServerProvider.login(credentials).subscribe(data => {
                this.principal.identity(true).then(account => {
                    console.log("======account========");
                    console.log(account);
                    console.log("======account========");
                    resolve(data);
                });
                return cb();
            }, err => {
                this.logout();
                reject(err);
                return cb(err);
            });
        });
    }

    loginWithToken(jwt, rememberMe) {
        return this.authServerProvider.loginWithToken(jwt, rememberMe);
    }

    logout () {
        this.authServerProvider.logout().subscribe();
        this.principal.authenticate(null);
    }
}
