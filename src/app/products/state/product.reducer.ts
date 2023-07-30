import { createAction, createReducer, on } from '@ngrx/store';

export const productReducer = createReducer(
  { showProductPrice: true },
    on(createAction('[Product] Toggle Product Price'), (state) => {
    return {
      ...state,
      showProductPrice: !state.showProductPrice,
    };
  })
);
