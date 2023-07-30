import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from '../Product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css'],
})
export class ProductlistComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  showProductPrice: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.selectedProductChanges$.subscribe(
      (currentProduct) => (this.selectedProduct = currentProduct)
    );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => (this.products = products),
    });
    
  }

  checkChanged(): void {
    this.showProductPrice = !this.showProductPrice;
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  @Output() prod = new EventEmitter<boolean>()
  productSelected(product: Product): void {
    this.prod.emit();
    this.productService.changeSelectedProduct(product);
  }
}
