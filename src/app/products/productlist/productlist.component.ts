import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../Product';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductlistComponent {
  @Input() showProductPrice: boolean = false;
  @Input() products!: Product[];
  @Input() selectedProduct: Product | null = null;

  @Output() displayPriceChanged = new EventEmitter<boolean>();
  @Output() initializeNewProduct = new EventEmitter<void>();
  @Output() productWasSelected = new EventEmitter<Product>();

  productSelected(product: Product) {
    this.productWasSelected.emit(product);
  }

  addNewProd() {
    this.initializeNewProduct.emit();
  }

  checkChanged() {
    this.displayPriceChanged.emit();
  }
}
