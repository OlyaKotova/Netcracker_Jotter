import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService, UserService } from './services';
import { RegistrationWindowComponent } from './registration-window/registration-window.component';
import { LoginWindowComponent } from './login-window/login-window.component';
import { HomeWindowComponent } from './home-window/home-window.component';
import { Collection1Component } from './home-window/collection1/collection1.component';
import { CartWindowComponent } from './home-window/cart-window/cart-window.component';
import { Collection2Component } from './home-window/collection2/collection2.component';
import { Collection3Component } from './home-window/collection3/collection3.component';
import { CheckoutComponent } from './home-window/checkout/checkout.component';
import { InfoUserComponent } from './home-window/info-user/info-user.component';
import Backendless from 'backendless';


const APP_ID = '3B06F43D-77A8-C56F-FF8E-08BE2ED21600';
const API_KEY = 'CFAC3095-240A-FCC7-FF86-F3379E8B4900';

Backendless.serverURL = 'https://api.backendless.com';
Backendless.initApp(APP_ID, API_KEY);

@NgModule({
  declarations: [
    AppComponent,
    RegistrationWindowComponent,
    LoginWindowComponent,
    HomeWindowComponent,
    Collection1Component,
    CartWindowComponent,
    Collection2Component,
    Collection3Component,
    CheckoutComponent,
    InfoUserComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [
    CookieService,
    AuthenticationService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
  }
}
