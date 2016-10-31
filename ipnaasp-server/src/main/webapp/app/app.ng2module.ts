import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UIRouterModule } from 'ui-router-ng2';
import { Ng1ToNg2Module } from 'ui-router-ng1-to-ng2';
import { Ng2Webstorage } from 'ng2-webstorage';

import { IpnaaspSharedModule } from './shared';
import { IpnaaspAdminModule } from './admin/admin.ng2module'; //TODO these couldnt be used from barrels due to an error
import { IpnaaspAccountModule } from './account/account.ng2module';

import { appState } from './app.state';
import { HomeComponent, homeState } from './home';
import {
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent,
    errorState,
    accessdeniedState
} from './layouts';
import { localStorageConfig } from './blocks/config/localstorage.config';

localStorageConfig();

let routerConfig = {
    otherwise: '/',
    states: [
        appState,
        homeState,
        errorState,
        accessdeniedState
    ]
};

@NgModule({
    imports: [
        BrowserModule,
        Ng2Webstorage,
        Ng1ToNg2Module,
        UIRouterModule.forChild(routerConfig),
        IpnaaspSharedModule,
        IpnaaspAdminModule,
        IpnaaspAccountModule
    ],
    declarations: [
        HomeComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent
    ],
    providers: [
        ProfileService,
        { provide: Window, useValue: window },
        { provide: Document, useValue: document }
    ],
    bootstrap: [ HomeComponent ]
})
export class IpnaaspAppModule {}
