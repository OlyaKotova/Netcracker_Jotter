import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import {AuthenticationService, UserService} from 'src/app/services';
import {CookieService} from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  currentUser: User;
  users: User[] = [];
  subTotal: number;
  submitted = false;
  message = '';


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private authenticationService: AuthenticationService,
    private router: Router) {
    this.subTotal = JSON.parse(this.cookieService.get('subTotal'))
    if (this.cookieService.get('currentUser')) {
      this.currentUser = JSON.parse(this.cookieService.get('currentUser'));
    }
  }

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      fullName: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      zip: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]+$')]],
      nameCard: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
      card: ['', Validators.compose(
        [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern('^[0-9]+$')])],
      monthYear: ['', Validators.compose([Validators.required, Validators.pattern('^(0?[1-9]|1[0-2])/(1?9|2[0-5])$')])],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });
  }
  get f() { return this.checkoutForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.checkoutForm.invalid) {
      this.message = '';
      return;
    }
    this.message = 'Done!';
  }
  logout() {
    this.authenticationService.logout();
  }
}
