import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import {AuthenticationService, UserService} from 'src/app/services';
import {CookieService} from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart-window',
  templateUrl: './cart-window.component.html',
  styleUrls: ['./cart-window.component.css']
})
export class CartWindowComponent implements OnInit {

  currentUser: User;
  users: User[] = [];
  currCart: number[] = [];
  subTotal = 0;
  amt1 = 0;
  amt2 = 0;
  amt3 = 0;
  index: number;


  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private authenticationService: AuthenticationService,
    private router: Router) {
    window.scrollTo(0, 0);
    if (this.cookieService.get('currentUser')) {
      this.currentUser = JSON.parse(this.cookieService.get('currentUser'));
      this.currCart = this.currentUser['cart'];
      for (let i = 0; i < this.currCart.length; i++) {
        if (this.currCart[i] === 1) {
          this.subTotal += 20.50;
          this.amt1 += 1;
        }
        if (this.currCart[i] === 2) {
          this.subTotal += 19.50;
          this.amt2 += 1;
        }
        if (this.currCart[i] === 3) {
          this.subTotal += 21.50;
          this.amt3 += 1;
        }
      }
    }
  }
  ngOnInit() {
  }
  logout() {
    this.authenticationService.logout();
  }
  delete(quantity) {
    this.index = (this.currCart).indexOf(quantity);
    (this.currentUser['cart']).splice(this.index, 1);
    this.cookieService.set('currentUser', JSON.stringify(this.currentUser));
    location.reload();
  }
  check(subTotal) {
    this.cookieService.set('subTotal', subTotal);
    this.router.navigate(['/check']);
  }
}
