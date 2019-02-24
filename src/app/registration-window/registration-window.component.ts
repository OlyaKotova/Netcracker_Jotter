import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-window',
  templateUrl: './registration-window.component.html',
  styleUrls: ['./registration-window.component.css']
})
export class RegistrationWindowComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
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
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.userService.register(this.registerForm.value);
    this.router.navigate(['/login']);
  }

}
