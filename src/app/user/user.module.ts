import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {  StoreModule } from '@ngrx/store';
import { userReducer } from './state/user.reducer';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('user',userReducer)
  ]
})
export class UserModule { }
