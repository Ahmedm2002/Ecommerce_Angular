import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../Services/Products/products.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterLink],
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

  deleteProduct(delProduct: any) {
    const confirmDelete = confirm(`${delProduct.name} will be deleted `);
    if (confirmDelete) {
      this.productService.deleteProduct(delProduct.id).subscribe((res) => {
        this.allProducts = this.allProducts.filter(
          (product) => product.id !== delProduct.id
        );
      });
    }
  }
}
