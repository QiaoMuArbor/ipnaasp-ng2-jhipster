import {PasswordResetInitComponent} from './password-reset-init.component';


export const requestResetState = {
    name: 'requestReset',
    parent: 'account',
    url: '/reset/request',
    data: {
        authorities: []
    },
    views: {
        'content@': { component: PasswordResetInitComponent }
    }
};
