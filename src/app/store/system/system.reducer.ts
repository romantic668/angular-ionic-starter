/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';
import { SystemActions, System } from './';

export interface SystemState extends System {};

export const SystemStateInitial: SystemState = {
  platform: null,
  isPortrait: true,
  dimensions:{
    width: 0,
    height: 0
  }
};

export function SystemReducer(state = SystemStateInitial, action: SystemActions.Actions): SystemState {

  switch (action.type) {

    case SystemActions.ActionTypes.SET_PLATFORM: {
      return Object.assign({}, state, {
        platform: action.payload
      });
    }

    case SystemActions.ActionTypes.SET_DIMENSIONS: {
      return Object.assign({}, state, {
        dimensions: action.payload
      });
    }

    case SystemActions.ActionTypes.SET_ORIENTATION: {
      return Object.assign({}, state, {
        isPortrait: action.payload
      });
    }

    default: {
      return state;
    }
  }

}
