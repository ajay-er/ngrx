import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as ProductActions from './product.action';
import { catchError, concatMap, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) => ProductActions.loadProductSuccess({ products })),
          catchError((error) =>
            of(ProductActions.loadProductFailure({ error }))
          )
        )
      )
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      concatMap((action) =>
        this.productService
          .updateProduct(action.product)
          .pipe(
            map((product) => ProductActions.updateProductSuccess({ product })),
            catchError((error) =>
            of(ProductActions.updateProductFail({ error }))
          )
          )
      )
    );
  });
}
