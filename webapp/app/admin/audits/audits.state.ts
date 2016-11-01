import { AuditsComponent } from './audits.component';


export const auditState = {
    name: 'audits',
    parent: 'admin',
    url: '/audits',
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'Audits'
    },
    views: {
        'content@': { component: AuditsComponent }
    }
}
