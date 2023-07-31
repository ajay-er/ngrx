import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from '../Product';
import { ProductService } from '../product.service';
import { Store } from '@ngrx/store';
import { State, getShowProductPrice ,showCurrentProduct} from '../state/product.reducer';
import * as ProductActions from '../state/product.action';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css'],
})
export class ProductlistComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private store: Store<State>
  ) {}

  @Output() prod = new EventEmitter<boolean>();


  products: Product[] = [];
  selectedProduct: Product | null = null;
  showProductPrice: boolean = false;

  ngOnInit(): void {
    // this.productService.selectedProductChanges$.subscribe(
    //   (currentProduct) => (this.selectedProduct = currentProduct)
    // );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => (this.products = products),
    });


    this.store.select(showCurrentProduct).subscribe((selectedProduct) => {
      this.selectedProduct = selectedProduct;
    })

    this.store
      .select(getShowProductPrice)
      .subscribe(
        (showProductPrice) => (this.showProductPrice = showProductPrice)
      );
  }


  
  productSelected(product: Product): void {
    // this.prod.emit();
    // this.productService.changeSelectedProduct(product);

    this.store.dispatch(ProductActions.setCurrectProduct({ product }));
  }
  

  checkChanged(): void {
    // this.showProductPrice = !this.showProductPrice;
    this.store.dispatch(ProductActions.toggleProductPrice());
  }

  addNewProd(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(ProductActions.initializeCurrentProduct())
  }
}
