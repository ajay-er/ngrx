import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  isClicked: boolean = false;
  addToFav($event: Event) {
    $event.preventDefault();
    this.isClicked = !this.isClicked
  }

}
