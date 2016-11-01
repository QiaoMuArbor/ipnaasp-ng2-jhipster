import * as angular from 'angular';

import { upgradeAdapter } from '../upgrade_adapter';


import {
    AuditsComponent,
    UserMgmtComponent,
    UserMgmtDetailComponent,
    UserMgmtDialogComponent,
    UserMgmtDeleteDialogComponent,
    LogsComponent,
    JhiMetricsMonitoringModalComponent,
    JhiMetricsMonitoringComponent,
    JhiHealthModalComponent,
    JhiHealthCheckComponent,
    JhiConfigurationComponent,
    UserService
} from './';

angular
    .module('ipnaaspApp.admin', [
        'ngResource',
        'ui.bootstrap',
        'ui.router'
    ])
    .directive('userMgmt', <angular.IDirectiveFactory> upgradeAdapter.downgradeNg2Component(UserMgmtComponent))
    .directive('userMgmtDetail', <angular.IDirectiveFactory> upgradeAdapter.downgradeNg2Component(UserMgmtDetailComponent))
    .directive('userMgmtDialog', <angular.IDirectiveFactory> upgradeAdapter.downgradeNg2Component(UserMgmtDialogComponent))
    .directive('userMgmtDeleteDialog', <angular.IDirectiveFactory> upgradeAdapter.downgradeNg2Component(UserMgmtDeleteDialogComponent))
    .directive('jhiMetrics', <angular.IDirectiveFactory> upgradeAdapter.downgradeNg2Component(JhiMetricsMonitoringComponent))
    .directive('jhiMetricsModal', <angular.IDirectiveFactory> upgradeAdapter.downgradeNg2Component(JhiMetricsMonitoringModalComponent))
    .directive('jhiHealth', <angular.IDirectiveFactory> upgradeAdapter.downgradeNg2Component(JhiHealthCheckComponent))
    .directive('jhiHealthModal', <angular.IDirectiveFactory> upgradeAdapter.downgradeNg2Component(JhiHealthModalComponent))
    .directive('jhiAudit', <angular.IDirectiveFactory> upgradeAdapter.downgradeNg2Component(AuditsComponent))
    .directive('jhiConfiguration', <angular.IDirectiveFactory> upgradeAdapter.downgradeNg2Component(JhiConfigurationComponent))
    .directive('jhiLogs', <angular.IDirectiveFactory> upgradeAdapter.downgradeNg2Component(LogsComponent))
    .factory('UserService', upgradeAdapter.downgradeNg2Provider(UserService));
