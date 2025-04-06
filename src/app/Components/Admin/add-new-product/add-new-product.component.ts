import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../../../Services/Products/products.service';

@Component({
  selector: 'app-add-new-product',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-new-product.component.html',
  styleUrl: './add-new-product.component.css',
})
export class AddNewProductComponent {
  productService = inject(ProductsService);

  newProudct: FormGroup = new FormGroup({
    name: new FormControl('Mouse', [
      Validators.required,
      Validators.minLength(4),
    ]),
    price: new FormControl(0, [Validators.required]),
    description: new FormControl('Description', [
      Validators.required,
      Validators.minLength(3),
    ]),
    category: new FormControl('Computers', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
    quantity: new FormControl(0, [
      Validators.required,
      Validators.nullValidator,
    ]),
  });

  addNewProduct(fromValues: any) {
    this.productService.newProduct(fromValues).subscribe(
      (res) => {
        alert('Product added successfully');
        this.newProudct.reset();
      },
      (error) => {
        alert(`An unexpected error occured, Please try again ${error}`);
      }
    );
  }
}
