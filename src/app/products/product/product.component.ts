import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent  {
  
  @Output() editProduct = new EventEmitter<boolean>();

  editProd($event:Event) {
    $event.preventDefault();
    this.editProduct.emit()
  }

}
