import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

import { AlertService, AuthenticationService } from '../services';

@Component({
  selector: 'app-login-window',
  templateUrl: './login-window.component.html',
  styleUrls: ['./login-window.component.css']
})
export class LoginWindowComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  clickMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private cookieService: CookieService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    const currUsername = this.f.username.value;
    const currPassword = this.f.password.value;

    if (this.cookieService.get('users')) {
      const listUser = JSON.parse(this.cookieService.get('users'));
      for (let i = 0; i < listUser.length; i++) {
        if (currUsername === listUser[i]['username'] && currPassword === listUser[i]['password']) {
          this.authenticationService.login(listUser[i]);
          this.router.navigate([this.returnUrl]);
          return;
        }
      }
    } else {
      this.clickMessage = 'Oops! Looks like either your email address or password were incorrect. Wanna try again or register?';
    }
    //console.log(Object.values(listUser["1"]));


    /*this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });*/
  }
}
