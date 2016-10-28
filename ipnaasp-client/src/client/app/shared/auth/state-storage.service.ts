import { Injectable, Inject } from '@angular/core';


import {LocalStorageService} from '../index';
@Injectable()
export class StateStorageService {
    constructor(
        private $sessionStorage: LocalStorageService
    ){}

    getPreviousState() {
        return this.$sessionStorage.retrieve('previousState');
    }

    resetPreviousState() {
        this.$sessionStorage.clear('previousState');
    }

    storePreviousState(previousStateName, previousStateParams) {
        var previousState = { "name": previousStateName, "params": previousStateParams };
        this.$sessionStorage.set('previousState', previousState);
    }
}
