import {Component, OnInit, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR} from '@angular/core';
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
  foundUser: [];
  foundPass: [];

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

    const pass = "password LIKE 'vvvvvvvvv'";
    const user = "username LIKE 'kotova'";

    const queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause(pass);
    const queryBuilder1 = Backendless.DataQueryBuilder.create().setWhereClause(user);

    Backendless.Data.of('UserList').find(queryBuilder)
      .then( function( foundContacts ) {
        console.log (foundContacts[0]);
      })
      .catch( function( fault ) {
        // an error has occurred, the error code can be retrieved with fault.statusCode
      });

    Backendless.Data.of('UserList').find(queryBuilder1)
      .then( function( foundContacts ) {
        console.log (foundContacts);
      })
      .catch( function( fault ) {
        // an error has occurred, the error code can be retrieved with fault.statusCode
      });
    // const user = "username LIKE '" + currUsername + "'";
    /*const pass = "password LIKE '" + currPassword + "'";
    const user = "username LIKE 'kotova'";
    const queryBuilderUser = Backendless.DataQueryBuilder.create().setWhereClause(user);
    const queryBuilderPass = Backendless.DataQueryBuilder.create().setWhereClause(pass);
    Backendless.Data.of('UserList').find(queryBuilderUser)
      .then( function(foundContacts) {
        this.foundUser = foundContacts;
        console.log(foundContacts);
      })
      .catch( function(fault) {
      });

    Backendless.Data.of('UserList').find(queryBuilderPass)
      .then( function(foundContacts) {
        this.foundPass = foundContacts;
        console.log(foundContacts);
      })
      .catch( function(fault) {
      });*/
    //console.log(JSON.stringify(this.foundUser) === JSON.stringify(this.foundPass));

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
    }
  }
}
