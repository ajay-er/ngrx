import { createAction, props } from '@ngrx/store';
import { Product } from '../Product';

export const toggleProductPrice = createAction(
  '[Product] Toggle Product Price'
);

export const setCurrectProduct = createAction(
  '[Product] Set Current Product',
  props<{ currentProductId: number }>()
);

export const clearCurrentProduct = createAction(
  '[Product] Clear Current Product'
);

export const initializeCurrentProduct = createAction(
  '[Product] Initialize Current Product'
);

export const hideEditProductComp = createAction(
  '[Product] Hide Edit Product Component'
);

export const toggleEditProductComp = createAction(
  '[Product] Toggle Edit Product Component'
);

export const previewEditProductComp = createAction(
  '[Product] View Edit Product Component'
);

export const loadProducts = createAction('[Product] Load');

export const loadProductSuccess = createAction(
  '[Product] Load Success',
  props<{ products: Product[] }>()
);

export const loadProductFailure = createAction(
  '[Product] Load Fail',
  props<{ error: string }>()
);

export const updateProduct = createAction(
  '[Product] Update product',
  props<{ product: Product }>()
);

export const updateProductSuccess = createAction(
  '[Product] Update product Success',
  props<{ product: Product }>()
);

export const updateProductFail = createAction(
  '[Product] Update product Fail',
  props<{ error: string }>()
);

export const createProduct = createAction(
  '[Product] Create New Product',
  props<{ product: Product }>()
);

export const createProductSuccess = createAction(
  '[Product] Create Product Success',
  props<{ product: Product }>()
);

export const createProductFailure = createAction(
  '[Product] Create Product Fail',
  props<{ error: string }>()
);

export const deleteProduct = createAction(
  '[Product] Delete',
  props<{ productId: number }>()
);

export const deleteProductSuccess = createAction(
  '[Product] Delete Product Success',
  props<{ productId: number }>()
);

export const deleteProductFailure = createAction(
  '[Product] Delete Product Fail',
  props<{ error: string }>()
);
