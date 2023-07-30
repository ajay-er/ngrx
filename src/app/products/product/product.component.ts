import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  editButton: boolean = false;
  
  editProd($event: Event) {
    $event.preventDefault();
    this.editButton = !this.editButton;
  }

  constructor(private store: Store<any>) {}

  ngOnInit(): void {}
}
