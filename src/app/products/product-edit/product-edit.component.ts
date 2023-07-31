import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../Product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State, showCurrentProduct } from '../state/product.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-productedit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit{
  constructor(private productService: ProductService, private fb: FormBuilder,private store:Store<State>) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
    });
   }

  product!: Product;
  productForm: FormGroup;

  ngOnInit(): void {
   /*  this.productService.selectedProductChanges$.subscribe((currentProduct) => {
      this.displayProduct(currentProduct!);
    }) */

    this.store.select(showCurrentProduct).subscribe(currProd => {
      if (currProd) {
        this.displayProduct(currProd);
      }
    })

  }

  displayProduct(currentProduct:Product ) {
    this.product = currentProduct;

    this.productForm?.setValue({
      title: this.product?.title,
      subtitle:this.product?.subtitle,
      price: this.product?.price,
      category: this.product?.category,
    })
    
  }

  
  deleteProduct(product: Product): void {
    if (product && product.id) {
      if (confirm(`Really delete the product: ${product.title}?`)) {
        this.productService.deleteProduct(product.id).subscribe({
          next: () => this.productService.changeSelectedProduct(null),
        });
      }

      this.productForm.reset();

    } else {
      // No need to delete, it was never saved
      this.productService.changeSelectedProduct(null);
    }
  }


  
  

}
