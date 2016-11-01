import { ErrorComponent } from './error.component';


export const errorState = {
    name: 'error',
    parent: 'app',
    url: '/error',
    data: {
        authorities: [],
        pageTitle: 'Error page!'
    },
    views: {
        'content@': { component: ErrorComponent }
    }
}

export const accessdeniedState = {
    name: 'accessdenied',
    parent: 'app',
    url: '/accessdenied',
    data: {
        authorities: []
    },
    views: {
        'content@': { component: ErrorComponent }
    }
}
