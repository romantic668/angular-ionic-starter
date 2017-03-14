import { Action } from '@ngrx/store';
import { type } from '../store-utils';
import { System } from './system.model';

export const ActionTypes = {
  SET_PLATFORM:           type('[System] Set platform'),
  SET_PLATFORM_SUCCESS:   type('[System] Set platform success'),
  SET_PLATFORM_FAIL:      type('[System] Set platform fail'),
  SET_DIMENSIONS:         type('[System] Set dimensions'),
  SET_ORIENTATION:        type('[System] Set orientation')
};

export class SetPlatform implements Action {
  type = ActionTypes.SET_PLATFORM;
  constructor(public payload: string) {}
}
export class SetPlatformSuccess implements Action {
  type = ActionTypes.SET_PLATFORM_SUCCESS;
  constructor(public payload: null) {}
}
export class SetPlatformFail implements Action {
  type = ActionTypes.SET_PLATFORM_FAIL;
  constructor(public payload: null) {}
}

export class SetDimensions implements Action {
  type = ActionTypes.SET_DIMENSIONS;
  constructor(public payload: {width:number,height:number}) {}
}

export class SetOrientation implements Action {
  type = ActionTypes.SET_ORIENTATION;
  constructor(public payload: boolean) {}
}

export type Actions
  = SetPlatform
  | SetPlatformSuccess
  | SetPlatformFail
  | SetDimensions
  | SetOrientation;

