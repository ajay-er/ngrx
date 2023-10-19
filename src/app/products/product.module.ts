import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ProductComponent } from './product/product.component';
import { CommonModule } from '@angular/common';
import { ProductshellComponent } from './productshell/productshell.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { productReducer } from './state/product.reducer';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature('products', productReducer),
    ProductRoutingModule
  ],
  declarations: [
    ProductComponent,
    ProductshellComponent,
    ProductlistComponent,
    ProductEditComponent,
  ],
})
export class ProductModule {}
