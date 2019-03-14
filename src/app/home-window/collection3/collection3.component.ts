import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import {AuthenticationService, UserService} from 'src/app/services';
import {CookieService} from 'ngx-cookie-service';
import * as $ from 'jquery';

@Component({
  selector: 'app-collection3',
  templateUrl: './collection3.component.html',
  styleUrls: ['./collection3.component.less']
})
export class Collection3Component implements OnInit {
  currentUser: User;
  users: User[] = [];
  clickMessage = '';
  total = 0;
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
      this.total = JSON.parse(this.cookieService.get('subTotal'));
      this.subTotal = JSON.parse(this.cookieService.get('subTotal'));
    }
  }

  ngOnInit() {
  }
  logout() {
    this.authenticationService.logout();
    location.reload();
  }

  addToCart() {
    if (this.currentUser) {
      this.clickMessage = 'Done!';
      $('.cart').attr('src', 'assets/home/cart-full-an.png');
      $('.cart').css('max-height', '50%');
      setTimeout(function() {
        $('.cart').attr('src', 'assets/home/cart-full.png');
        $('.cart').css('max-height', '40%');
        this.clickMessage = '';
      }, 500);
      const listUser = JSON.parse(this.cookieService.get('currentUser'));
      listUser['cart'].push(3);
      this.cookieService.set('currentUser', JSON.stringify(listUser));
      this.cookieService.set('subTotal', '0');
      this.total += 21.50;
      this.cookieService.set('subTotal', JSON.stringify(this.total));
    } else {
      this.clickMessage = 'Login, please!';
    }
  }

}
