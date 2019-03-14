import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-registration-window',
  templateUrl: './registration-window.component.html',
  styleUrls: ['./registration-window.component.less']
})
export class RegistrationWindowComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  clickMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService
  ) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    const currUsername = this.f.username.value;
    if (this.cookieService.get('users')) {
      const listUser = JSON.parse(this.cookieService.get('users'));
      for (let i = 0; i < listUser.length; i++) {
        if (currUsername === listUser[i]['username']) {
          this.clickMessage = 'Oops! Looks like your login is already taken.';
          return;
        }
      }
    }
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.userService.register(this.registerForm.value);
    this.router.navigate(['/login']);
  }

}
