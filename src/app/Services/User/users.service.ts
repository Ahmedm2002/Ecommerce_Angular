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

  getUser(user: IUser) {
    return this.http.get(`${this.apiUrl}/users`);
  }
}

// Custom id generator function
// charArray: string[] = [
//   ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
// ];
// randomChar(): string {
//   return this.charArray[
//     Math.floor(Math.random() * this.charArray.length) + 1
//   ];
// }
// generateUserId() {
//   let userId = '';
//   const idLenght = 10;
//   for (let i = 0; i <= idLenght; i++) {
//     userId += this.randomChar();
//   }
//   console.log(userId);
//   return userId;
// }
