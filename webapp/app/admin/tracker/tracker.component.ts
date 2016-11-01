import { Component, OnInit } from '@angular/core';
import { JhiTrackerService } from '../../shared';

@Component({
    selector: 'jhi-tracker',
    templateUrl: 'app/admin/tracker/tracker.html'
})
export class JhiTrackerComponent implements OnInit {

    constructor(private trackerService: JhiTrackerService){}

    activities: any[] = [];

    showActivity (activity: any) {
        let existingActivity: boolean = false;
        for (let index = 0; index < this.activities.length; index++) {
            if(this.activities[index].sessionId === activity.sessionId) {
                existingActivity = true;
                if ( activity.page === 'logout' ) {
                    this.activities.splice(index, 1);
                } else {
                    this.activities[index] = activity;
                }
            }
        }
        if (!existingActivity && (activity.page !== 'logout')) {
            this.activities.push(activity);
        }
    }

    ngOnInit() {
        this.trackerService.receive().subscribe(activity => {
            this.showActivity(activity);
        });
    }

}
