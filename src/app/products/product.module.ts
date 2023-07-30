import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ProductComponent } from './product/product.component';
import { CommonModule } from '@angular/common';
import { ProductshellComponent } from './productshell/productshell.component';
import { ProductlistComponent } from './productlist/productlist.component';

@NgModule({
    imports: [CommonModule,
        StoreModule.forFeature('products', {})],
  declarations: [ProductComponent, ProductshellComponent, ProductlistComponent],
})
export class ProductModule {}
