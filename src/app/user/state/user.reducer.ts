import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { User } from '../User';
import { UserPageActions } from './action';

//*selectors

const getUserFeature = createFeatureSelector<UserState>('user');

export const getUser = createSelector(getUserFeature, (state) => {
  return state.currentUser;
});

export const showDataStatus = createSelector(getUserFeature, (state) => {
  return state.sampleUserName;
});

//*reducers
export interface UserState {
  sampleUserName: boolean;
  currentUser: User | null;
}

const initialState: UserState = {
  sampleUserName: false,
  currentUser: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserPageActions.userSampleData, (state, action) => {
    return {
      ...state,
      currentUser: action.userDummy,
    };
  }),
  on(UserPageActions.clearUserSampleData, (state) => {
    return {
      ...state,
      currentUser: null,
    };
  }),
  on(UserPageActions.toogleUserData, (state) => {
    return {
      ...state,
      sampleUserName: !state.sampleUserName,
    };
  })
);
