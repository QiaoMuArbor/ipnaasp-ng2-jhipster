import { PasswordComponent } from './password.component';


export const passwordState = {
    name: 'password',
    parent: 'account',
    url: '/password',
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Password'
    },
    views: {
        'content@': { component: PasswordComponent }
    }
};
