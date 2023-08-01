import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { Store } from '@ngrx/store';
import {
  State,
  getProducts,
  getShowProductPrice,
  showCurrentProduct,
} from '../state/product.reducer';
import * as ProductActions from '../state/product.action';
import { Observable, filter } from 'rxjs';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css'],
})
export class ProductlistComponent implements OnInit {
  constructor(private store: Store<State>) {}

  products$!: Observable<Product[]>;
  selectedProduct$!: Observable<Product|null>;
  showProductPrice$!: Observable<boolean>;

  ngOnInit(): void {
    //*dispatch products
    this.store.dispatch(ProductActions.loadProducts());

    //*load products
    this.products$ = this.store.select(getProducts);

    //*show current product
    this.selectedProduct$ = this.store.select(showCurrentProduct)
    
    //*show current product price
    this.showProductPrice$ = this.store.select(getShowProductPrice);
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrectProduct({ currentProductId :product.id! }));
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductPrice());
  }

  addNewProd(): void {
    this.store.dispatch(ProductActions.previewEditProductComp());
    this.store.dispatch(ProductActions.initializeCurrentProduct());
  }
}
