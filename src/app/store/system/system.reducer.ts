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


export function SystemReducer(state = SystemStateInitial, action: Action): SystemState {

  switch (action.type) {

    case SystemActions.ActionTypes.SET_DIMENSIONS: {

      const books = action.payload;

      return Object.assign({}, state, {
        dimensions: action.payload
      });
    }

    case SystemActions.ActionTypes.SET_VIEWPORT: {

      // Breakpoints taken from Ionic CSS responsive grid layout breakpoints
      // https://ionicframework.com/docs/v2/api/components/grid/Grid/
      let sizeHere;
      if(state.dimensions.width < 576) {
        sizeHere = 'xs';
      } else if (state.dimensions.width < 768) {
        sizeHere = 'sm';
      } else if (state.dimensions.width < 992) {
        sizeHere = 'md';
      } else if (state.dimensions.width < 1200) {
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


    case SystemActions.ActionTypes.INITIALIZE_FAIL: {

      console.log('Burdayim abi ama ne bok yicem biliyri');
      console.log(action);

      return state;
    }

    default: {
      return state;
    }
  }

}
