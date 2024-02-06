import { combineReducers } from '@reduxjs/toolkit';
import { reducer as userReducer } from '../slices/user';

export const rootReducer = combineReducers({
  user: userReducer
});
