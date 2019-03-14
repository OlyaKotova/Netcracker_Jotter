import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../services';
import Backendless from 'backendless';


@Component({
  selector: 'app-login-window',
  templateUrl: './login-window.component.html',
  styleUrls: ['./login-window.component.less']
})
export class LoginWindowComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  clickMessage = '';
  user: string;
  pass: string;
  foundUserByName = {
    created: 0,
    current: null,
    firstName: '',
    lastName: '',
    objectId: '',
    ownerId: null,
    password: '',
    updated: null,
    username: ''
  };
  foundUserByPass = {
    created: 0,
    current: null,
    firstName: '',
    lastName: '',
    objectId: '',
    ownerId: null,
    password: '',
    updated: null,
    username: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private cookieService: CookieService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const currUsername = this.f.username.value;
    const currPassword = this.f.password.value;

    this.user = "username LIKE '" + currUsername + "'";
    this.pass = "password LIKE '" + currPassword + "'";
    const queryBuilderUser = Backendless.DataQueryBuilder.create().setWhereClause(this.user);
    const queryBuilderPass = Backendless.DataQueryBuilder.create().setWhereClause(this.pass);

    const fieldOfUser = Backendless.Data.of( 'UserList').findSync(queryBuilderUser);
    const fieldOfPass = Backendless.Data.of( 'UserList').findSync(queryBuilderPass);
    for (const key in fieldOfUser[0]) {
      this.foundUserByName[key] = fieldOfUser[0][key];
    }
    for (const key in fieldOfPass[0]) {
      this.foundUserByPass[key] = fieldOfPass[0][key];
    }
    if (this.foundUserByName.username === this.foundUserByPass.username) {
      console.log('Backendless success!');
    }

    if (this.cookieService.get('users')) {
      const listUser = JSON.parse(this.cookieService.get('users'));
      for (let i = 0; i < listUser.length; i++) {
        if (currUsername === listUser[i]['username'] && currPassword === listUser[i]['password']) {
          this.authenticationService.login(listUser[i]);
          this.router.navigate([this.returnUrl]);
          return;
        } else {
          this.clickMessage = 'Oops! Looks like either your email address or password were incorrect. Wanna try again or register?';
        }
      }
    } else {
      this.clickMessage = 'Oops! Looks like either your email address or password were incorrect. Wanna try again or register?';
    }
  }
}
