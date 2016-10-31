import { PasswordResetFinishComponent } from './password-reset-finish.component';


export const finishResetState = {
    name: 'finishReset',
    parent: 'account',
    url: '/reset/finish?key',
    data: {
        authorities: []
    },
    views: {
        'content@': { component:  PasswordResetFinishComponent }
    }
};
