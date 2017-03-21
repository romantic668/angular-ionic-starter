/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';

import { LayoutActions, Layout } from './';

export interface LayoutState extends Layout {};

export const LayoutStateInitial: LayoutState = {
  isPageLoaderShown: true,
  isSidenavOn: true,
  isSidemenuOn: false
};

export function LayoutReducer(state = LayoutStateInitial, action: Action): LayoutState {

  switch (action.type) {

    case LayoutActions.ActionTypes.SET_LAYOUT: {
      return Object.assign({}, state, {
        dimensions: action.payload
      });
    }

    case LayoutActions.ActionTypes.HIDE_PAGELOADER: {
      return Object.assign({}, state, {
        isPageLoaderShown: false
      });
    }

    default: {
      return state;
    }
  }

}
