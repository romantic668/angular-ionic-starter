/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';

import { LayoutActions, Layout } from './';

export interface LayoutState extends Layout {};

export const LayoutStateInitial: LayoutState = {
  isSidenavOn: true,
  isSidemenuOn: false
};

export function LayoutReducer(state = LayoutStateInitial, action: LayoutActions.Actions): LayoutState {

  switch (action.type) {

    case LayoutActions.ActionTypes.SET_DIMENSIONS: {
      return Object.assign({}, state, {
        dimensions: action.payload
      });
    }

    default: {
      return state;
    }
  }

}
