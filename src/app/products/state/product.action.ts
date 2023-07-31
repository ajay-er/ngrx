import { createAction, props } from '@ngrx/store';
import { Product } from '../Product';

export const toggleProductPrice = createAction(
  '[Product] Toggle Product Price'
);

export const setCurrectProduct = createAction(
  '[Product] Set Current Product',
  props<{ product: Product }>()
);

export const clearCurrentProduct = createAction(
  '[Product] Clear Current Product'
);

export const initializeCurrentProduct = createAction(
  '[Product] Initialize Current Product'
);