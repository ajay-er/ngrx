import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from '../Product';
import { ProductService } from '../product.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css'],
})
export class ProductlistComponent implements OnInit {

  @Output() prod = new EventEmitter<boolean>()
  productSelected(product: Product): void {
    this.prod.emit();
    this.productService.changeSelectedProduct(product);
  }

  products: Product[] = [];
  selectedProduct: Product | null = null;
  showProductPrice: boolean = false;

  constructor(private productService: ProductService,private store:Store<any>) {}

  ngOnInit(): void {
    this.productService.selectedProductChanges$.subscribe(
      (currentProduct) => (this.selectedProduct = currentProduct)
    );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => (this.products = products),
    });


    this.store.select('products').subscribe((res) => {
        this.showProductPrice = res.showProductPrice      
    })
    
  }

  checkChanged(): void {
    // this.showProductPrice = !this.showProductPrice;
    this.store.dispatch({
      type:'[Product] Toggle Product Price'
    })
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  



}
