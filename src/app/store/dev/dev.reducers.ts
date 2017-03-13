import { ActionReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';

// Generate a reducer to set the root state in dev mode for HMR
function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    if (action.type === '[HMR] Set root state') {
      return action.payload;
    }
    return reducer(state, action);
  };
}

export const DEV_REDUCERS = [stateSetter, storeFreeze];
if (['logger', 'both'].indexOf(STORE_DEV_TOOLS) !== -1 ) {
    DEV_REDUCERS.push(storeLogger());
}
