import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../../Models/Interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  apiUrl = 'https://api.escuelajs.co/api/v1/';

  createUser(user: IUser) {
    return this.http.post(`${this.apiUrl}users`, user);
  }
}
