import { Component, OnInit } from '@angular/core';
import { User } from '../models';
import { UserService } from '../services';
import {CookieService} from 'ngx-cookie-service';
import { AuthenticationService } from '../services';

@Component({
  selector: 'app-home-window',
  templateUrl: './home-window.component.html',
  styleUrls: ['./home-window.component.less']
})
export class HomeWindowComponent implements OnInit {

  currentUser: User;
  users: User[] = [];
  subTotal: number;

  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private authenticationService: AuthenticationService) {
    if (this.cookieService.get('currentUser')) {
      this.currentUser = JSON.parse(this.cookieService.get('currentUser'));
    }
    if (this.cookieService.get('subTotal')) {
      this.subTotal = JSON.parse(this.cookieService.get('subTotal'));
    }
  }
  ngOnInit() {
  }
  logout() {
    this.authenticationService.logout();
    location.reload();
  }
}
