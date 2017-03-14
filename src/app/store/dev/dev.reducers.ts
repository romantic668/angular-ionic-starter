import { ActionReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

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
