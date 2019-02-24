import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../models';
import { UserService } from '../services';
import {CookieService} from 'ngx-cookie-service';
import { AuthenticationService } from '../services';

@Component({
  selector: 'app-home-window',
  templateUrl: './home-window.component.html',
  styleUrls: ['./home-window.component.css']
})
export class HomeWindowComponent implements OnInit {

  currentUser: User;
  users: User[] = [];

  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private authenticationService: AuthenticationService) {
    if (this.cookieService.get('currentUser')) {
      this.currentUser = JSON.parse(this.cookieService.get('currentUser'));
    }
  }

  ngOnInit() {
    //this.loadAllUsers();
  }

  logout() {
    this.authenticationService.logout();
  }
  refresh() {
    window.location.reload();
  }
  /*private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    });
  }*/
}
