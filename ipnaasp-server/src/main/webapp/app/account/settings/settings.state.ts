import { SettingsComponent } from './settings.component';


export const settingsState = {
    name: 'settings',
    parent: 'account',
    url: '/settings',
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Settings'
    },
    views: {
        'content@': {
            component: SettingsComponent
        }
    }
};
