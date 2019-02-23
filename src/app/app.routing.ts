import { Routes, RouterModule } from '@angular/router';

import { LoginWindowComponent } from './login-window/login-window.component';
import { RegistrationWindowComponent } from './registration-window/registration-window.component';
import {HomeWindowComponent} from './home-window/home-window.component';
import { AuthGuard } from './guards';
import {Collection1Component} from './home-window/collection1/collection1.component';
import {Collection2Component} from './home-window/collection2/collection2.component';
import {Collection3Component} from './home-window/collection3/collection3.component';
import {CartWindowComponent} from './home-window/cart-window/cart-window.component';


const appRoutes: Routes = [
  //{ path: '', component: HomeWindowComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeWindowComponent},
  { path: 'login', component: LoginWindowComponent },
  { path: 'register', component: RegistrationWindowComponent },
  { path: 'collection-1', component: Collection1Component },
  { path: 'collection-2', component: Collection2Component },
  { path: 'collection-3', component: Collection3Component },
  { path: 'cart', component: CartWindowComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
