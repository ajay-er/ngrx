import { Component } from '@angular/core';
import { Store, createAction } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { getUserMaskName } from '../state/user.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.select(getUserMaskName).subscribe(data => {
      console.log(data);
    })
  }

  checkChanged() {
    this.store.dispatch({ type: '[User] Mask Name' });
  }
}
