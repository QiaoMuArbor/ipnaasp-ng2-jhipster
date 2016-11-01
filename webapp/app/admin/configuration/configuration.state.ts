import { JhiConfigurationComponent } from './configuration.component';


export const configState = {
    name: 'jhi-configuration',
    parent: 'admin',
    url: '/configuration',
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'Configuration'
    },
    views: {
        'content@': { component: JhiConfigurationComponent }
    }
}
