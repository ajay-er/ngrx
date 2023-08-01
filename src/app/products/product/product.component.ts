import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { Store } from '@ngrx/store';
import { State, showCurrentProduct } from '../state';
import * as ProductActions from '../state/product.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  constructor(private store: Store<State>) {}

  selectedProduct$!: Observable<Product | null>;

  ngOnInit(): void {
    this.selectedProduct$ = this.store.select(showCurrentProduct);
  }

  editProd() {
    this.store.dispatch(ProductActions.toggleEditProductComp());
  }
}
