import { Routes } from '@angular/router';

import { HomeComponent } from './home/index';
import { PolicyComponent } from './policy/index';
import { SocialCircleComponent } from './socialCircle/index';
import { AnalysisComponent } from './analysis/index';
import { InformationComponent } from './information/index';
import { PlatformMarketComponent } from './platformMarket/index';
import { MoreComponent } from './more/index';
import { LoginComponent } from './login/index';
import { registerComponent } from './register/index';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch:'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: registerComponent
  },
  {
    path: 'policy',
    component: PolicyComponent
  },
  {
    path: 'socialCircle',
    component: SocialCircleComponent
  },
  {
    path: 'analysis',
    component: AnalysisComponent
  },
  {
    path: 'information',
    component: InformationComponent
  },
  {
    path: 'platformMarket',
    component: PlatformMarketComponent
  },
  {
    path: 'more',
    component: MoreComponent
  }
];
