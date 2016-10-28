import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { SharedModule } from './shared/shared.module';
import { SideBaComponentModule } from './policy/sidebar/index';
import { HeaderMenuModule } from './header/index';
import { HomeComponentModule } from './home/index';
import { PolicyComponentModule } from './policy/index';
import { SocialCircleComponentModule } from './socialCircle/index';
import { AnalysisComponentModule } from './analysis/index';
import { InformationComponentModule } from './information/index';
import { PlatformMarketComponentModule } from './platformMarket/index';
import { MoreComponentModule } from './more/index';
import { LoginComponentModule } from './login/index';
import { registerComponentModule } from './register/index';
import { AUTH_PROVIDERS,provideAuth } from 'angular2-jwt';
import { AuthHttp } from './shared/http/auth-http.service';
@NgModule({
  imports: [BrowserModule, HttpModule, RouterModule.forRoot(routes), SharedModule.forRoot()
    ,HeaderMenuModule
    ,HomeComponentModule
    ,PolicyComponentModule
    ,SocialCircleComponentModule
    ,AnalysisComponentModule
    ,InformationComponentModule
    ,PlatformMarketComponentModule
    ,MoreComponentModule
    ,LoginComponentModule
    ,SideBaComponentModule
    ,registerComponentModule
  ],
  declarations: [AppComponent],

  providers: [
    AUTH_PROVIDERS,
    AuthHttp,
    provideAuth({
      headerName: "authorization",
      headerPrefix: "Bearer",
      tokenName: "id_token",
      tokenGetter: (() => window.localStorage.getItem('authenticationToken')),
      globalHeaders: [{'Content-Type':'application/json'}],
      noJwtError: false,
      noTokenScheme: false
    }),
    {
      provide: APP_BASE_HREF,
      useValue: '<%= APP_BASE %>'
    },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
