/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';

import { SystemActions, System } from './';

export interface SystemState extends System {};

export const SystemStateInitial: SystemState = {
  platform:{
    device: 'desktop',
    isBrowser: true
  },
  viewport:{
    size: 'lg',
    isPortrait: false
  },
  dimensions:{
    width: 0,
    height: 0
  }
};

export function SystemReducer(state = SystemStateInitial, action: SystemActions.Actions): SystemState {

  switch (action.type) {

    case SystemActions.ActionTypes.SET_DIMENSIONS: {
      return Object.assign({}, state, {
        dimensions: action.payload
      });
    }

    case SystemActions.ActionTypes.SET_VIEWPORT: {

      // Breakpoints taken from Ionic CSS responsive breakpoints
      // https://ionicframework.com/docs/v2/theming/overriding-ionic-variables/
      let sizeHere;
      if(state.dimensions.width <= 567) {
        sizeHere = 'sm';
      } else if (state.dimensions.width <= 767) {
        sizeHere = 'md';
      } else if (state.dimensions.width <= 1023) {
        sizeHere = 'lg';
      } else {
        sizeHere = 'xl';
      }

      return Object.assign({}, state, {
        viewport: {
          size: sizeHere,
          isPortrait: action.payload
        }
      });
    }

    case SystemActions.ActionTypes.SET_PLATFORM: {

      let platformHere;
      if((action.payload as string[]).indexOf('core') !== -1) {
        platformHere = {device:'desktop', isBrowser:true};
      } else {
        if((action.payload as string[]).indexOf('mobileweb') !== -1) {
          platformHere = {device:'native', isBrowser:true};
        } else {
          platformHere = {device:'native', isBrowser:false};
        }
      }

      return Object.assign({}, state, {
        platform:platformHere
      });
    }

    default: {
      return state;
    }
  }

}
