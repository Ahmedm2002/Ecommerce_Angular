import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  apiUrl = 'http://localhost:3000/';

  getProducts() {
    this.http.get(`${this.apiUrl}products`);
  }
}
