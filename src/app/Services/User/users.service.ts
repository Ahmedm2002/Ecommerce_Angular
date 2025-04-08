import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../../Models/Interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  http = inject(HttpClient);

  apiUrl = 'http://localhost:3000/';

  createUser(user: IUser) {
    return this.http.post(`${this.apiUrl}users`, user);
  }

  getAllUsers() {
    return this.http.get(`${this.apiUrl}users`);
  }

  deleteUser(userId: string | undefined) {
    return this.http.delete(`${this.apiUrl}users/${userId}`);
  }

  login(user: any) {
    return this.http.get(`${this.apiUrl}users?email=${user?.email}`);
  }
  updateUser(user: IUser) {
    return this.http.put(`${this.apiUrl}users/${user.id}`, user);
  }
}
