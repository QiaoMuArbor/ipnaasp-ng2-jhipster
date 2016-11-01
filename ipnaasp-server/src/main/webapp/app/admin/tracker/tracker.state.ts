import { Transition } from 'ui-router-ng2';
import { JhiTrackerComponent } from './tracker.component';


export const trackerState = {
    name: 'jhi-tracker',
    parent: 'admin',
    url: '/tracker',
    data: {
        authorities: ['ROLE_ADMIN'],
        pageTitle: 'Real-time user activities'
    },
    views: {
        'content@': { component: JhiTrackerComponent }
    }
