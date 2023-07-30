import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  constructor(private productService: ProductService) {}

  selectedProduct: Product | null = null;
  ngOnInit(): void {
    this.productService.selectedProductChanges$.subscribe((prod) => {
      this.selectedProduct = prod;
    });
  }

  @Output() editProduct = new EventEmitter<boolean>();

  editProd($event: Event) {
    $event.preventDefault();
    this.editProduct.emit();
  }
}
