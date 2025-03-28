import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/';

  getProducts() {
    return this.http.get(`${this.apiUrl}products`);
  }
}
