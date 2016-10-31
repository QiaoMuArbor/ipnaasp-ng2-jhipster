import { JhiHealthCheckComponent } from './health.component';


export const healthState = {
    name: 'jhi-health',
    parent: 'admin',
    url: '/health',
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'Health Checks'
    },
    views: {
        'content@': { component: JhiHealthCheckComponent }
    }
}
