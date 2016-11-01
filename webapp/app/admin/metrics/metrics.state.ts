import { JhiMetricsMonitoringComponent } from './metrics.component';


export const metricsState = {
    name: 'jhi-metrics',
    parent: 'admin',
    url: '/metrics',
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'Application Metrics'
    },
    views: {
        'content@': { component: JhiMetricsMonitoringComponent }
    }
}
