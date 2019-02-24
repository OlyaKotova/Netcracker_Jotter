import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthenticationService {

  constructor(
    private cookieService: CookieService) { }

  login(listUser: object) {
    listUser['cart'] = [];
    this.cookieService.set( 'currentUser', JSON.stringify(listUser));
  }

  logout() {
    this.cookieService.delete('currentUser');
    this.cookieService.delete('subTotal');
  }
}
