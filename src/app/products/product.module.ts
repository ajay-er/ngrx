import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ProductComponent } from './product/product.component';
import { CommonModule } from '@angular/common';
import { productReducer } from './state/product.reducer';

@NgModule({
    imports: [CommonModule,
        StoreModule.forFeature('products', productReducer)],
  declarations: [ProductComponent],
})
export class ProductModule {}
