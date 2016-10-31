import { LogsComponent } from './logs.component';


export const logsState = {
    name: 'logs',
    parent: 'admin',
    url: '/logs',
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'Logs'
    },
    views: {
        'content@': { component: LogsComponent }
    }
}
