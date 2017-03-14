/* tslint:disable: member-ordering */

import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';


import { System, SystemActions } from './index';

import { Platform } from 'ionic-angular';


@Injectable()
export class SystemEffects {
  constructor(
    private actions$: Actions,
    private platform: Platform
  ) {}

  @Effect() initialize$: Observable<Action> = this.actions$
    .ofType('[System] Set platform')
    .map(action => action.payload)
    .mergeMap((platform) => {
        return [
            new SystemActions.SetDimensions({ width:this.platform.width() , height:this.platform.height() })
            // This will trigger the resize$ effect below
        ];
    })
    .catch(() => Observable.of({ type: '[System] Set platform fail' }));

  @Effect() resize$: Observable<Action> = this.actions$
    .ofType('[System] Set dimensions')
    .map(action => action.payload)
    .mergeMap((platform) => {
        return [
            new SystemActions.SetOrientation( this.platform.isPortrait() ),
            new SystemActions.SetPlatformSuccess(null)
        ];
    })
    .catch(() => Observable.of({ type: '[System] Set platform fail' }));

}
