/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';
import * as LayoutActions from './layout.actions';

export interface LayoutState {
    showSideNav: boolean;
};

export const LayoutStateInitial: LayoutState = {
    showSideNav: false
};

export function UserReducer(state = LayoutStateInitial, action: LayoutActions.Actions): LayoutState {

  switch (action.type) {
    default: {
      return state;
    }
  }

}
