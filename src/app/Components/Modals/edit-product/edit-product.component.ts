import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IProduct } from '../../../Models/Interface/product.interface';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../../../Services/Products/products.service';

@Component({
  selector: 'app-edit-product',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent implements OnChanges {
  @Input() product!: IProduct;
  @Output() updatedProduct = new EventEmitter<IProduct>();

  constructor(public productsServ: ProductsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.updateProduct.patchValue(this.product);
    }
  }

  ngOnInit() {
    console.log('Input Product: ', this.product);
  }

  onSubmit() {
    this.productsServ.updateProduct(this.updateProduct.value).subscribe(
      (res: any) => {
        alert(`Product updated successfully`);
        console.log(res);
        this.updatedProduct.emit(this.updateProduct.value);
      },
      (error) => {
        alert('An unexpected error occured. Please try again');
        console.log(error);
      }
    );
  }

  updateProduct: FormGroup = new FormGroup({
    id: new FormControl(''),
    category: new FormControl(''),
    name: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
    description: new FormControl(''),
    imageUrl: new FormControl(''),
  });

  isProductEqual(): boolean {
    if (
      JSON.stringify(this.product) == JSON.stringify(this.updateProduct.value)
    ) {
      return true;
    }
    return false;
  }
}
