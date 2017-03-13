/* tslint:disable: member-ordering */

import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { SystemActions } from './index';

@Injectable()
export class SystemEffects {
  constructor(
    private actions$: Actions
  ) {}

  @Effect() initialize$: Observable<Action> = this.actions$
    .ofType('[System] Set platform')
    .map(action => action.payload)
    .do((x) => console.log(x))
    .mergeMap((platform) => {
        return [
            new SystemActions.SetDimensions(platform),
            new SystemActions.SetPlatformSuccess(platform)
        ];
    })
    .catch(() => Observable.of({ type: '[System] Set platform fail' }));

}