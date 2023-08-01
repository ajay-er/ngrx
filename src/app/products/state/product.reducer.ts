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
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const InitialState: ProductState = {
  showProductPrice: true,
  showEditComp: false,
  currentProductId: null,
  products: [],
  error: '',
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
      currentProductId: action.currentProductId,
    };
  }),
  on(ProductActions.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: null,
    };
  }),
  on(ProductActions.initializeCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: 0,
    };
  }),
  on(ProductActions.hideEditProductComp, (state): ProductState => {
    return {
      ...state,
      showEditComp: false,
    };
  }),
  on(ProductActions.toggleEditProductComp, (state): ProductState => {
    return {
      ...state,
      showEditComp: !state.showEditComp,
    };
  }),
  on(ProductActions.previewEditProductComp, (state): ProductState => {
    return {
      ...state,
      showEditComp: true,
    };
  }),
  on(ProductActions.loadProductSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
      error: '',
    };
  }),
  on(ProductActions.loadProductFailure, (state, action): ProductState => {
    return {
      ...state,
      products: [],
      error: action.error,
    };
  }),
  on(ProductActions.createProductSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: [...state.products, action.product],
      currentProductId: action.product.id,
      error: '',
    };
  }),
  on(ProductActions.createProductFailure, (state, action): ProductState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(ProductActions.updateProductSuccess, (state, action) => {
    const updateProducts = state.products.map((item) =>
      action.product.id === item.id ? action.product : item
    );
    return {
      ...state,
      currentProductId: action.product.id,
      products: updateProducts,
      error: '',
    };
  }),
  on(ProductActions.updateProductFail, (state, action): ProductState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(ProductActions.deleteProductSuccess, (state, action): ProductState => {
    const updatedProducts = state.products.filter(
      (item) => item.id !== action.productId
    );
    return {
      ...state,
      products: updatedProducts,
      currentProductId:null,
      error: '',
    };
  }),
  on(ProductActions.deleteProductFailure, (state, action): ProductState => {
    return {
      ...state,
      error: action.error,
    };
  }),
);
