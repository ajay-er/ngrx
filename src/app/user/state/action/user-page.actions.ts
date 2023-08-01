import { createAction, props } from '@ngrx/store';
import { User } from '../../User';

export const userSampleData = createAction(
  '[User Page] Dummy data',
  props<{ userDummy: User }>()
);

export const clearUserSampleData = createAction(
  '[User Page] Clear Dummy data'
);

export const toogleUserData = createAction(
  '[User Page] Toggle User Data'
)