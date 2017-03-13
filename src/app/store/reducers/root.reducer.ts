import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import { routerReducer, RouterState } from '@ngrx/router-store';

import { DEV_REDUCERS } from './dev.reducers';

export interface AppState {
  router: RouterState;
};

const reducers = {
  router: routerReducer
};

const developmentReducer = compose(...DEV_REDUCERS, combineReducers)(reducers);
const productionReducer = compose(combineReducers)(reducers);

export function rootReducer(state: any, action: any) {
  if (ENV !== 'development') {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}
