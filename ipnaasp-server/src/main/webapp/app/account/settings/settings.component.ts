import { Component, Inject, OnInit } from '@angular/core';

import { Principal, AccountService } from '../../shared';

@Component({
    selector: 'settings',
    templateUrl: 'app/account/settings/settings.html'
})
export class SettingsComponent implements OnInit {
    error: string;
    success: string;
    settingsAccount: any;
    languages: any[];

    constructor(private account: AccountService, private principal: Principal) {}

    ngOnInit () {
        this.principal.identity().then((account) => {
            this.settingsAccount = this.copyAccount(account);
        });
    }

    save () {
        this.account.save(this.settingsAccount).subscribe(() => {
            this.error = null;
            this.success = 'OK';
            this.principal.identity(true).then((account) => {
                this.settingsAccount = this.copyAccount(account);
            });
        }, () => {
            this.success = null;
            this.error = 'ERROR';
        });
    }

    copyAccount (account) {
        return {
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login
        };
    }
}