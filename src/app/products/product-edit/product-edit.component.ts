import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State, showCurrentProduct } from '../state';
import { Store } from '@ngrx/store';
import {ProductPageActions} from '../state/actions';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-productedit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  constructor(private fb: FormBuilder, private store: Store<State>) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  product$!: Observable<Product | null>;

  product!: Product;
  productForm: FormGroup;

  ngOnInit(): void {
    this.product$ = this.store
      .select(showCurrentProduct)
      .pipe(tap((currP) => this.displayProduct(currP!)));
  }

  displayProduct(currentProduct: Product) {
    if (currentProduct) {
      this.product = currentProduct;

      this.productForm?.setValue({
        title: this.product?.title,
        subtitle: this.product?.subtitle,
        price: this.product?.price,
        category: this.product?.category,
      });
    }
  }

  deleteProduct(product: Product): void {
    if (product && product.id) {
      if (confirm(`Really delete the product: ${product.title}?`)) {
        this.store.dispatch(
          ProductPageActions.deleteProduct({ productId: product.id })
        );
      }
    } else {
      // No need to delete, it was never saved
      this.store.dispatch(ProductPageActions.clearCurrentProduct());
      this.store.dispatch(ProductPageActions.hideEditProductComp());
    }
  }

  clearProduct() {
    this.store.dispatch(ProductPageActions.clearCurrentProduct());
    this.store.dispatch(ProductPageActions.hideEditProductComp());
    this.productForm.reset();
  }

  saveProduct(product: Product) {
    if (this.productForm.valid && this.productForm.dirty) {
      const savedProduct = { ...product, ...this.productForm.value };

      if (savedProduct.id === 0) {
        this.store.dispatch(
          ProductPageActions.createProduct({ product: savedProduct })
        );
      } else {
        this.store.dispatch(
          ProductPageActions.updateProduct({ product: savedProduct })
        );
        this.store.dispatch(ProductPageActions.hideEditProductComp());
      }
    }
  }
}
