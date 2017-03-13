/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';
import * as SystemActions from './system.actions';

export interface SystemState {
  platform: string;
  viewport: {
    type: string;
  };
  dimensions:{
    width: number;
    height: number;
  };
};

export const SystemStateInitial: SystemState = {
  platform: 'web',
  viewport: {
    type: 'desktop'
  },
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

    default: {
      return state;
    }
  }

}
