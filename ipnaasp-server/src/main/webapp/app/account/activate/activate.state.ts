import { ActivateComponent } from './activate.component';


export const activateState = {
    name: 'activate',
    parent: 'account',
    url: '/activate?key',
    data: {
        authorities: [],
        pageTitle: 'Activation'
    },
    views: {
        'content@': { component: ActivateComponent }
    }
};
