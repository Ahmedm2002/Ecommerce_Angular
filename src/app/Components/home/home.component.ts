import { Component, inject, OnInit } from '@angular/core';
import { IProduct } from '../../Models/Interface/product.interface';
import { ProductsService } from '../../Services/Products/products.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import arrayShuffle from 'array-shuffle';
@Component({
  selector: 'app-home',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  productList: IProduct[] = [];
  productsService = inject(ProductsService);

  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts() {
    this.productsService.getProducts().subscribe((res: any) => {
      this.productList = res;
      this.productList = arrayShuffle(this.productList);
    });
  }

  addToCart(product: IProduct) {
    console.log(product);
  }
}
