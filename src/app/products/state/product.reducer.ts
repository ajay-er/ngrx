import { createReducer, on } from "@ngrx/store";
import { Product } from "../Product";
import { ProductApiActions, ProductPageActions } from "./actions";

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
  on(ProductPageActions.toggleProductPrice, (state): ProductState => {
    return {
      ...state,
      showProductPrice: !state.showProductPrice,
    };
  }),
  on(ProductPageActions.setCurrectProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: action.currentProductId,
    };
  }),
  on(ProductPageActions.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: null,
    };
  }),
  on(ProductPageActions.initializeCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: 0,
    };
  }),
  on(ProductPageActions.hideEditProductComp, (state): ProductState => {
    return {
      ...state,
      showEditComp: false,
    };
  }),
  on(ProductPageActions.toggleEditProductComp, (state): ProductState => {
    return {
      ...state,
      showEditComp: !state.showEditComp,
    };
  }),
  on(ProductPageActions.previewEditProductComp, (state): ProductState => {
    return {
      ...state,
      showEditComp: true,
    };
  }),
  on(ProductApiActions.loadProductSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
      error: '',
    };
  }),
  on(ProductApiActions.loadProductFailure, (state, action): ProductState => {
    return {
      ...state,
      products: [],
      error: action.error,
    };
  }),
  on(ProductApiActions.createProductSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: [...state.products, action.product],
      currentProductId: action.product.id,
      error: '',
    };
  }),
  on(ProductApiActions.createProductFailure, (state, action): ProductState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(ProductApiActions.updateProductSuccess, (state, action) => {
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
  on(ProductApiActions.updateProductFailure, (state, action): ProductState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(ProductApiActions.deleteProductSuccess, (state, action): ProductState => {
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
  on(ProductApiActions.deleteProductFailure, (state, action): ProductState => {
    return {
      ...state,
      error: action.error,
    };
  }),
);
