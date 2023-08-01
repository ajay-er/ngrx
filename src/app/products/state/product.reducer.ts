import { createReducer, on } from "@ngrx/store";
import { Product } from "../Product";
import * as ProductActions from "./product.action";



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
