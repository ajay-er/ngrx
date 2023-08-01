import { createAction, props } from '@ngrx/store';
import { Product } from '../../Product';

export const toggleProductPrice = createAction(
  '[Product Page] Toggle Product Price'
);

export const setCurrectProduct = createAction(
  '[Product Page] Set Current Product',
  props<{ currentProductId: number }>()
);

export const clearCurrentProduct = createAction(
  '[Product Page] Clear Current Product'
);

export const initializeCurrentProduct = createAction(
  '[Product Page] Initialize Current Product'
);

export const hideEditProductComp = createAction(
  '[Product Page] Hide Edit Product Component'
);

export const toggleEditProductComp = createAction(
  '[Product Page] Toggle Edit Product Component'
);

export const previewEditProductComp = createAction(
  '[Product Page] View Edit Product Component'
);

export const loadProducts = createAction('[Product Page] Load');

export const updateProduct = createAction(
  '[Product Page] Update product',
  props<{ product: Product }>()
);

export const createProduct = createAction(
  '[Product Page] Create New Product',
  props<{ product: Product }>()
);

export const deleteProduct = createAction(
  '[Product Page] Delete',
  props<{ productId: number }>()
);
