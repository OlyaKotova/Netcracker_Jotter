import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import {AuthenticationService, UserService} from 'src/app/services';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.less']
})
export class InfoUserComponent implements OnInit {

  currentUser: User;
  users: User[] = [];
  subTotal: number;

  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private authenticationService: AuthenticationService) {
    window.scrollTo(0, 0);
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
