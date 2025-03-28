import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../Services/Products/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  productService = inject(ProductsService);
  allProducts: any[] = [];
  ngOnInit(): void {
    this.productService.getProducts().subscribe((res: any) => {
      this.allProducts = res;
    });
  }
}
