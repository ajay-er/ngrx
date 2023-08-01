import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { ProductState } from './product.reducer';

export interface State extends AppState.State {
  products: ProductState;
}

//selecters
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductPrice = createSelector(
  getProductFeatureState,
  (state) => {
    return state.showProductPrice;
  }
);

export const showEditComponent = createSelector(
  getProductFeatureState,
  (state) => {
    return state.showEditComp;
  }
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  (state) => {
    return state.currentProductId;
  }
);

export const showCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        category: '',
        title: '',
        subtitle: '',
        imageSrc: 'https://i.imgur.com/3VTaSeb.png',
        price: 0,
      };
    } else {
      return currentProductId
        ? state.products.find((p) => p.id === currentProductId) ?? null
        : null;
    }
  }
);

export const getProducts = createSelector(getProductFeatureState, (state) => {
  return state.products;
});

export const getError = createSelector(getProductFeatureState, (state) => {
  return state.error;
});
