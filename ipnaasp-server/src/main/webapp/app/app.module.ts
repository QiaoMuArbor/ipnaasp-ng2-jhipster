import * as angular from 'angular';

import './account/account.module';
import './admin/admin.module';
import './entities/entity.module';

import { upgradeAdapter } from './upgrade_adapter';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { StateHandler } from './blocks/handlers/state.handler';
import { UIRouterDeferInterceptConfig } from './blocks/config/ui-router-defer-intercept.config';

import { CompileServiceConfig } from './blocks/config/compile.config';
import { HttpConfig } from './blocks/config/http.config';
import { PagerConfig } from './blocks/config/uib-pager.config';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

import { HomeComponent } from './home';
import { NavbarComponent, FooterComponent, PageRibbonComponent } from './layouts';

import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';

import { JhiLoginModalComponent } from "./shared";

angular
    .module('ipnaaspApp.app', [
        'ngResource',
        'ngCookies',
        'ngAria',
        'ngCacheBuster',
        'ngFileUpload',
        'ui.bootstrap',
        'ui.router.upgrade',
        'infinite-scroll',
        'angular-loading-bar',
        // jhipster-needle-angularjs-add-module JHipster will add new module here
        'ipnaaspApp.account',
        'ipnaaspApp.admin',
        'ipnaaspApp.entity'
    ])
    .config(CompileServiceConfig)
    .config(HttpConfig)
    .config(PagerConfig)
    .config(PaginationConfig)
    .config(UIRouterDeferInterceptConfig)
    .directive('jhiLoginModal', <angular.IDirectiveFactory> upgradeAdapter.downgradeNg2Component(JhiLoginModalComponent))
    .directive('home', <angular.IDirectiveFactory> upgradeAdapter.downgradeNg2Component(HomeComponent))
    .directive('navbar', <angular.IDirectiveFactory> upgradeAdapter.downgradeNg2Component(NavbarComponent))
    .directive('footer', <angular.IDirectiveFactory> upgradeAdapter.downgradeNg2Component(FooterComponent))
    .factory('AuthExpiredInterceptor', AuthExpiredInterceptor)
    .factory('AuthInterceptor', AuthInterceptor)
    .factory('ErrorHandlerInterceptor', ErrorHandlerInterceptor)
    .factory('NotificationInterceptor', NotificationInterceptor)
    .factory('StateHandler',StateHandler)
    .directive('pageRibbon',  <angular.IDirectiveFactory> upgradeAdapter.downgradeNg2Component(PageRibbonComponent))
    .factory('NgbModal', upgradeAdapter.downgradeNg2Provider(NgbModal))
    .run(run);

run.$inject = ['StateHandler'];

function run(StateHandler) {
    StateHandler.initialize();
}
