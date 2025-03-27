import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../../Models/Interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  http = inject(HttpClient);

  charArray: string[] = [
    ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  ];
  randomChar(): string {
    return this.charArray[Math.floor(Math.random() * this.charArray.length)];
  }
  generateUserId() {
    let userId = '';
    const idLenght = 10;
    for (let i = 0; i < idLenght; i++) {
      userId += this.randomChar();
    }
    return userId;
  }

  apiUrl = 'https://api.escuelajs.co/api/v1/';

  createUser(user: IUser) {
    console.log(user);
    return this.http.post(`${this.apiUrl}users`, user);
  }
}
