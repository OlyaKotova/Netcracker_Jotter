import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from 'src/app/models';
import {AuthenticationService, UserService} from 'src/app/services';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-collection1',
  templateUrl: './collection1.component.html',
  styleUrls: ['./collection1.component.css']
})
export class Collection1Component implements OnInit {

  currentUser: User;
  users: User[] = [];
  clickMessage = '';

  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private authenticationService: AuthenticationService) {
    window.scrollTo(0, 0);
    if (this.cookieService.get('currentUser')) {
      this.currentUser = JSON.parse(this.cookieService.get('currentUser'));
    }
  }

  ngOnInit() {
    this.loadAllUsers();
  }
  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    });
  }
  logout() {
    this.authenticationService.logout();
  }

  addToCart() {
    if (this.currentUser) {
      this.clickMessage = 'Done!';
      const listUser = JSON.parse(this.cookieService.get('currentUser'));
      listUser['cart'].push(1);
      this.cookieService.set( 'currentUser', JSON.stringify(listUser));
      console.log(this.cookieService.get('currentUser'));
    } else {
      this.clickMessage = 'Login, please!';
    }
  }

}
