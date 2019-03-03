import { Injectable } from '@angular/core';
import { User } from '../models';
import { CookieService } from 'ngx-cookie-service';
import Backendless from 'backendless';

const APP_ID = '3B06F43D-77A8-C56F-FF8E-08BE2ED21600';
const API_KEY = 'CFAC3095-240A-FCC7-FF86-F3379E8B4900';

Backendless.serverURL = 'https://api.backendless.com';
Backendless.initApp(APP_ID, API_KEY);

@Injectable()
export class UserService {

  constructor(private cookieService: CookieService) {  }

  register(user: User) {
    console.log(user);
    Backendless.Data.of('UserList').save(user);
    let listUser = [];
    if (this.cookieService.get('users')) {
      listUser = JSON.parse(this.cookieService.get('users'));
    }
    listUser.push(user);
    this.cookieService.set( 'users', JSON.stringify(listUser));
  }
}
