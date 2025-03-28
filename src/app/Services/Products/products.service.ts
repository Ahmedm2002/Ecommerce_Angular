import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct } from '../../Models/Interface/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/';

  getProducts() {
    return this.http.get(`${this.apiUrl}products`);
  }

  deleteProduct(productId: string) {
    console.log('id', typeof productId);
    console.log(`Api Url: ${this.apiUrl}products/${productId}`);
    return this.http.delete(`${this.apiUrl}products/${productId}`);
  }

  addProduct(product: IProduct) {
    return this.http.post(`${this.apiUrl}/products`, product);
  }
}
