import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../Product';
import { Store } from '@ngrx/store';
import { State, showCurrentProduct } from '../state/product.reducer';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  constructor(private productService: ProductService, private store: Store<State>) { }
  

  selectedProduct: Product | null = null;

  ngOnInit(): void {

   /*  this.productService.selectedProductChanges$.subscribe((prod) => {
      this.selectedProduct = prod;
    }); */

    this.store.select(showCurrentProduct).subscribe(curentProduct => {
      this.selectedProduct = curentProduct;
    })

  }

  @Output() editProduct = new EventEmitter<boolean>();

  editProd($event: Event) {
    $event.preventDefault();
    this.editProduct.emit();
  }
}
