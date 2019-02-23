import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthenticationService {

  constructor(
    private cookieService: CookieService) { }

  login(listUser: object) {
    listUser["cart"] = [];
    this.cookieService.set( 'currentUser', JSON.stringify(listUser));
  }

  logout() {
    this.cookieService.delete('currentUser');
  }


  /*constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(`/users/authenticate`, { username: username, password: password })
      .pipe(map(user => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }));
  }
  logout() {
    localStorage.removeItem('currentUser');
  }*/
}
