import { Action } from '@ngrx/store';
import { type } from '../utils';
import { Layout } from './layout.model';

export const ActionTypes = {
  SET_LAYOUT:           type('[Layout] Set layout')
};

export class SetPlatform implements Action {
  type = ActionTypes.SET_LAYOUT;
  constructor(public payload: string[]) {}
}


export type Actions
  = SetPlatform;

