import { Action } from '@ngrx/store';
import { type } from '../utils';
import { Layout } from './layout.model';

export const ActionTypes = {
  SET_PLATFORM:           type('[System] Set platform'),
  SET_PLATFORM_SUCCESS:   type('[System] [+++] Set platform success'),
  SET_PLATFORM_FAIL:      type('[System] [xxx] Set platform fail'),
  SET_DIMENSIONS:         type('[System] Set dimensions'),
  SET_VIEWPORT:           type('[System] Set viewport')
};

export class SetPlatform implements Action {
  type = ActionTypes.SET_PLATFORM;
  constructor(public payload: string[]) {}
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

export class SetViewport implements Action {
  type = ActionTypes.SET_VIEWPORT;
  constructor(public payload: boolean) {}
}

export type Actions
  = SetPlatform
  | SetPlatformSuccess
  | SetPlatformFail
  | SetDimensions
  | SetViewport;

