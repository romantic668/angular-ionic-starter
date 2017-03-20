import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import { routerReducer, RouterState } from '@ngrx/router-store';

import { DEV_REDUCERS } from './dev/dev.reducers';

import { SystemReducer, SystemState } from './system';
import { LayoutReducer, LayoutState } from './layout';

export interface AppState {
  router: RouterState;
  system: SystemState;
  layout: LayoutState;
};

const reducers = {
  router: routerReducer,
  system: SystemReducer,
  layout: LayoutReducer
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
