import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../Product';
import {
  State,
  getProducts,
  getShowProductPrice,
  showCurrentProduct,
  showEditComponent,
} from '../state';
import * as ProductActions from '../state/product.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-productshell',
  templateUrl: './productshell.component.html',
  styleUrls: ['./productshell.component.css'],
})
export class ProductshellComponent {
  editButton$!: Observable<boolean>;

  constructor(private store: Store<State>) {}

  products$!: Observable<Product[]>;
  selectedProduct$!: Observable<Product | null>;
  showProductPrice$!: Observable<boolean>;

  ngOnInit(): void {
    //*dispatch products
    this.store.dispatch(ProductActions.loadProducts());

    //*edit component toggle
    this.editButton$ = this.store.select(showEditComponent);

    //*load products
    this.products$ = this.store.select(getProducts);

    //*show current product
    this.selectedProduct$ = this.store.select(showCurrentProduct);

    //*show current product price
    this.showProductPrice$ = this.store.select(getShowProductPrice);
  }

  productSelected(product: Product): void {
    this.store.dispatch(
      ProductActions.setCurrectProduct({ currentProductId: product.id! })
    );
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductPrice());
  }

  addNewProd(): void {
    this.store.dispatch(ProductActions.previewEditProductComp());
    this.store.dispatch(ProductActions.initializeCurrentProduct());
  }
}
