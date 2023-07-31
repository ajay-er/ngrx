import {
  Store,
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { User } from '../User';

export interface UserState {
  maskUserName: boolean;
  currentUser: User | null;
}

const initialState: UserState = {
  maskUserName: true,
  currentUser: null,
};

const getUserFeature = createFeatureSelector<UserState>('user');

export const getUserMaskName = createSelector(
  getUserFeature,
  (state) => state.maskUserName
);

export const userReducer = createReducer(
  initialState,
  on(createAction('[User] Mask Name'), (state): UserState => {
    return {
      ...state,
      maskUserName: !state.maskUserName,
    };
  })
);
