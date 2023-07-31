import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { Product } from '../Product';
import * as AppState from '../../state/app.state';
import * as ProductActions from './product.action';

export interface State extends AppState.State {
  products: ProductState;
}

export interface ProductState {
  showProductPrice: boolean;
  showEditComp: boolean;
  currentProduct: Product | null;
  products: Product[];
}

const InitialState: ProductState = {
  showProductPrice: true,
  showEditComp: false,
  currentProduct: null,
  products: [],
};

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
)

export const showCurrentProduct = createSelector(
  getProductFeatureState,
  (state) => {
    return state.currentProduct;
  }
);

export const products = createSelector(getProductFeatureState, (state) => {
  state.products;
});



//reducers
export const productReducer = createReducer<ProductState>(
  InitialState,
  on(ProductActions.toggleProductPrice, (state): ProductState => {
    return {
      ...state,
      showProductPrice: !state.showProductPrice,
    };
  }),
  on(ProductActions.setCurrectProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProduct: action.product,
    };
  }),
  on(ProductActions.clearCurrentProduct, (state) => {
    return {
      ...state,
      currentProduct: null,
    };
  }),
  on(ProductActions.initializeCurrentProduct, (state) => {
    return {
      ...state,
      currentProduct: {
        id: 0,
        category: '',
        title: '',
        subtitle: '',
        imageSrc: 'https://i.imgur.com/3VTaSeb.png',
        price: 0,
      },
    };
  }),
  on(ProductActions.hideEditProductComp, (state) => {
    return {
      ...state,
      showEditComp: false,
    };
  }),
  on(ProductActions.toggleEditProductComp, (state) => {
    return {
      ...state,
      showEditComp: !state.showEditComp,
    };
  })
);
