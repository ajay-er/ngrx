import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  @Input() selectedProduct: Product | null = null;
  @Output() toggleEditButton = new EventEmitter<void>();

  editProd() {
    this.toggleEditButton.emit();
  }
}
