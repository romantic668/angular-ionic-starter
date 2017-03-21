import { Action } from '@ngrx/store';
import { type } from '../utils';
import { Layout } from './layout.model';

export const ActionTypes = {
  SET_LAYOUT:             type('[Layout] Set layout'),
  HIDE_PAGELOADER:        type('[Layout] Hide page loader')
};

export class SetPlatform implements Action {
  type = ActionTypes.SET_LAYOUT;
  constructor(public payload: string[]) {}
}

export class HidePageLoader implements Action {
  type = ActionTypes.HIDE_PAGELOADER;
}


export type Actions
  = SetPlatform
  | HidePageLoader;

