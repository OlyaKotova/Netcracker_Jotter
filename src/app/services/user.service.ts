import { Injectable } from '@angular/core';
import { User } from '../models';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class UserService {

  constructor(private cookieService: CookieService) { }

  register(user: User) {
    let listUser = [];
    if (this.cookieService.get('users')) {
      listUser = JSON.parse(this.cookieService.get('users'));
    }
    listUser.push(user);
    this.cookieService.set( 'users', JSON.stringify(listUser));
  }
}
