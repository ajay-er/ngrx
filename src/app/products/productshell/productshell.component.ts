import { Component, Input } from '@angular/core';
import { State, showEditComponent } from '../state/product.reducer';
import { Store } from '@ngrx/store';
import * as ProductActions from '../state/product.action';

@Component({
  selector: 'app-productshell',
  templateUrl: './productshell.component.html',
  styleUrls: ['./productshell.component.css'],
})
export class ProductshellComponent {
  @Input() editButton = false;
  constructor(private store: Store<State>) { }

  onEditProduct() {
    // this.editButton = !this.editButton;
    this.store.dispatch(ProductActions.toggleEditProductComp());
  }


  ngOnInit() {
    this.store.select(showEditComponent).subscribe((editCompStatus) => {
      this.editButton = editCompStatus
    })
  }


}
