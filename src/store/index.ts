import { createStore, compose, combineReducers } from 'redux';
import { profileReducer } from './profile/reducer';

export const composeEnchancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(profileReducer, composeEnchancers());
export c
