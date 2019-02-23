import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { routing } from './app.routing';

import { AppComponent } from './app.component';


import { AuthGuard } from './guards';
import { DirectivesComponent } from './directives/directives.component';
import { AlertService, AuthenticationService, UserService } from './services';

import { RegistrationWindowComponent } from './registration-window/registration-window.component';
import { LoginWindowComponent } from './login-window/login-window.component';
import { HomeWindowComponent } from './home-window/home-window.component';

import { JwtInterceptor, ErrorInterceptor } from './helpers';

import { fakeBackendProvider } from './helpers';
import { Collection1Component } from './home-window/collection1/collection1.component';

import { CookieService } from 'ngx-cookie-service';
import { CartWindowComponent } from './home-window/cart-window/cart-window.component';
import { Collection2Component } from './home-window/collection2/collection2.component';
import { Collection3Component } from './home-window/collection3/collection3.component';
import { CheckoutComponent } from './home-window/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    DirectivesComponent,
    RegistrationWindowComponent,
    LoginWindowComponent,
    HomeWindowComponent,
    Collection1Component,
    CartWindowComponent,
    Collection2Component,
    Collection3Component,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing
  ],
  providers: [
    CookieService,
    AlertService,
    AuthenticationService,
    UserService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
  }
}
