import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  isClicked: boolean = false;
  addToFav($event: Event) {
    $event.preventDefault();
    this.isClicked = !this.isClicked
  }
}
