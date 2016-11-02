import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account, Principal } from "../shared/index";
import { LoginService } from '../login/login.service';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})

export class HomeComponent implements OnInit {

  newName: string = '';
  errorMessage: string;
  names: any[] = [];

  account: Account;
  constructor(
      private principal: Principal,
      private router: Router
  ) {}


  ngOnInit() {
    this.principal.identity().then((account) => {
      this.account = account;
    });
  }

}
