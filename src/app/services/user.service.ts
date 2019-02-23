import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getAll() {
    return this.http.get<User[]>(`/users`);
  }

  getById(id: number) {
    return this.http.get(`/users/` + id);
  }

  register(user: User) {
    let listUser = [];
    if (this.cookieService.get('users')) {
      listUser = JSON.parse(this.cookieService.get('users'));
    }
    listUser.push(user);
    this.cookieService.set( 'users', JSON.stringify(listUser));
  }


  update(user: User) {
    return this.http.put(`/users/` + user.id, user);
  }

  delete(id: number) {
    return this.http.delete(`/users/` + id);
  }
}
