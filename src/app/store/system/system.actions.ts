import { Action } from '@ngrx/store';
import { type } from '../utils';
import { System } from './system.model';

export const ActionTypes = {
  INITIALIZE:             type('[System] Initialize'),
  INITIALIZE_SUCCESS:     type('[System] [+++] Initialize success'),
  INITIALIZE_FAIL:        type('[System] [xxx] Initialize fail'),
  SET_PLATFORM:           type('[System] Set platform'),
  SET_DIMENSIONS:         type('[System] Set dimensions'),
  SET_VIEWPORT:           type('[System] Set viewport')
};

export class Initialize implements Action {
  type = ActionTypes.INITIALIZE;
}
export class InitializeSuccess implements Action {
  type = ActionTypes.INITIALIZE_SUCCESS;
}
export class InitializeFail implements Action {
  type = ActionTypes.INITIALIZE_FAIL;
  constructor(public payload:any) {}
}

export class SetPlatform implements Action {
  type = ActionTypes.SET_PLATFORM;
  constructor(public payload: string[]) {}
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
  = Initialize
  | InitializeSuccess
  | InitializeFail
  | SetPlatform
  | SetDimensions
  | SetViewport;

