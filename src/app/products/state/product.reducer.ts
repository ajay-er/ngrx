import { createAction, createReducer, on } from "@ngrx/store";

export const productReducer = createReducer(
    { isClicked: false },
    on(createAction('[Product] Toggle Wishlist'), state => {
        return {
            ...state,
            isClicked:!state.isClicked
        }
    })
)