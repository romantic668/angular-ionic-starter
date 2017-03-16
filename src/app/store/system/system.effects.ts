/* tslint:disable: member-ordering */

import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Platform } from 'ionic-angular';

import { System, SystemActions } from './index';

@Injectable()
export class SystemEffects {
  constructor(
    private actions$: Actions,
    private platform: Platform
  ) {}

  @Effect() initialize$: Observable<Action> = this.actions$
    .ofType('[System] Initialize')
    .map(action => action.payload)
    .mergeMap(() => {
        return [
            new SystemActions.SetDimensions({ width:this.platform.width() , height:this.platform.height() }),
            new SystemActions.SetViewport(this.platform.isPortrait()),
            new SystemActions.SetPlatform(this.platform._platforms),
            new SystemActions.InitializeSuccess(null)
        ];
    })
    .catch(() => Observable.of({ type: '[System] [xxx] Initialize fail' }));

}
