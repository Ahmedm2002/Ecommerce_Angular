import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../Services/Products/products.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IProduct } from '../../../Models/Interface/product.interface';
import { EditProductComponent } from '../../Modals/edit-product/edit-product.component';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterLink, EditProductComponent],
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
  toBeEdited: IProduct = {};

  editProduct(product: IProduct) {
    this.toBeEdited = product;
  }

  deleteProduct(delProduct: any) {
    const confirmDelete = confirm(`${delProduct.name} will be deleted `);
    if (confirmDelete) {
      this.productService.deleteProduct(delProduct.id).subscribe((res: any) => {
        this.allProducts = this.allProducts.filter(
          (product) => product.id !== delProduct.id
        );
      });
    }
  }

  handleUpdatedProduct(updatedProdcut: any) {
    const index = this.allProducts.findIndex(
      (product) => product.id === updatedProdcut.id
    );

    if (index !== -1) {
      this.allProducts[index] = updatedProdcut;
    }
  }
}
