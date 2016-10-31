import { RegisterComponent } from './register.component';


export const registerState = {
    name: 'register',
    parent: 'account',
    url: '/register',
    data: {
        authorities: [],
        pageTitle: 'Registration'
    },
    views: {
        'content@': { component: RegisterComponent }
    }
};
