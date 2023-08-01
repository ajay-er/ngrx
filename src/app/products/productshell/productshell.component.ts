import { Component } from '@angular/core';
import { State, showEditComponent } from '../state/product.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-productshell',
  templateUrl: './productshell.component.html',
  styleUrls: ['./productshell.component.css'],
})
export class ProductshellComponent {
  editButton$!: Observable<boolean>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.editButton$ = this.store.select(showEditComponent);        
  }

}
