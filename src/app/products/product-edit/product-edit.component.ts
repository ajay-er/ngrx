import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Product } from '../Product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-productedit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductEditComponent implements OnChanges {
  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  productForm: FormGroup;

  @Input()
  selectedProduct!: Product;
  @Output() delete = new EventEmitter<Product>();
  @Output() create = new EventEmitter<Product>();
  @Output() update = new EventEmitter<Product>();
  @Output() clear = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedProduct']) {
      const product = changes['selectedProduct'].currentValue as Product;
      this.displayProduct(product);
    }
  }

  displayProduct(currentProduct: Product) {
    if (currentProduct) {
      this.selectedProduct = currentProduct;

      this.productForm?.setValue({
        title: this.selectedProduct?.title,
        subtitle: this.selectedProduct?.subtitle,
        price: this.selectedProduct?.price,
        category: this.selectedProduct?.category,
      });
    }
  }

  deleteProduct(product: Product): void {
    if (product && product.id) {
      if (confirm(`Really delete the product: ${product.title}?`)) {
        this.delete.emit(this.selectedProduct);
        this.clear.emit();
      }
    } else {
      // No need to delete, it was never saved
      this.clear.emit();
    }
  }

  clearProduct() {
    this.clear.emit();
    this.productForm.reset();
  }

  saveProduct(product: Product) {
    if (this.productForm.valid && this.productForm.dirty) {
      const savedProduct = { ...product, ...this.productForm.value };

      if (savedProduct.id === 0) {
        this.create.emit(savedProduct);
      } else {
        this.update.emit(savedProduct);
      }
    }
  }
}
