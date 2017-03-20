/* tslint:disable: member-ordering */

import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Platform } from 'ionic-angular';

import { Store } from '@ngrx/store';
import { AppState } from '../root.reducer';

import { System, SystemActions } from './index';

@Injectable()
export class SystemEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private platform: Platform
  ) {}

  @Effect() initialize$: Observable<Action> = this.actions$
    .ofType('[System] Initialize')
    .mergeMap(() => {
        return [
            //new SystemActions.SetDimensions({ width:this.platform.width() , height:this.platform.height() }),
            //new SystemActions.SetViewport(this.platform.isPortrait()),
            //new SystemActions.SetPlatform(this.platform._platforms),
            new SystemActions.InitializeSuccess(null)
        ];
    })
    .catch(() => Observable.of({ type: '[System] [xxx] Initialize fail' }));


  /*
  @Effect({ dispatch: false }) initial_redirect_cordova$ = this.actions$
    .ofType('[System] Set platform')
    .do(action => {
      this.store.select(store => store.system.platform).subscribe((platform) =>{
        if(platform.device !== 'desktop') {
          this.store.dispatch(new SystemActions.SetViewport(this.platform.isPortrait()));
          this.router.navigate(['']);
        } else {
          this.store.dispatch(new SystemActions.SetViewport(this.platform.isPortrait()));
        }
      });
    });
  */

}
