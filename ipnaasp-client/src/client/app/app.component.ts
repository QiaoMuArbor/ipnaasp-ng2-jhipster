import { Component } from '@angular/core';
import { Config,PolicyService } from './shared/index';

import './operators';

@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})

export class AppComponent {
  constructor(private _policyService: PolicyService) {
    console.log('Environment config', Config);
  }
}
