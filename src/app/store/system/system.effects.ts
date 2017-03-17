/* tslint:disable: member-ordering */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
    private platform: Platform,
    private router: Router,
    private store: Store<AppState>
  ) {}

  @Effect() initialize$: Observable<Action> = this.actions$
    .ofType('[System] Initialize')
    .mergeMap(() => {
        return [
            new SystemActions.SetDimensions({ width:this.platform.width() , height:this.platform.height() }),
            new SystemActions.SetViewport(this.platform.isPortrait()),
            new SystemActions.SetPlatform(this.platform._platforms),
            new SystemActions.InitializeSuccess(null)
        ];
    })
    .catch(() => Observable.of({ type: '[System] [xxx] Initialize fail' }));


  @Effect({ dispatch: false }) initial_redirect_cordova$ = this.actions$
    .ofType('[System] Set platform')
    .do(action => {
      this.store.select(store => store.system.platform).subscribe((platform) =>{
        if(platform.device !== 'desktop') {
          console.log('I need to be routed');
          this.store.dispatch(new SystemActions.SetViewport(this.platform.isPortrait()));
          this.router.navigate(['']);
        } else {
          this.store.dispatch(new SystemActions.SetViewport(this.platform.isPortrait()));
          console.log('I am ok no need to route');
        }
      });
    });


  /*
  @Effect() initialize_cordova$: Observable<Action> = this.actions$
    .ofType('[System] Set platform')
    .map(action => action.payload)
    .switchMap(action =>
      this.delay()
        .then(isToBeRouted => this.router.navigate(['login']))
        .then(response => ({ type: '[System] [+++] Initialize success', payload: {} }))
        .catch(() => Observable.of({ type: '[System] [xxx] Initialize fail' }))
    );

    delay() {

      return new Promise(function (resolve, reject) {

        this.store.select(store => store.system).subscribe((system:System) =>{
          if(system.platform.device !== 'desktop'){
            console.log('I need to be routed');
            //this.router.navigate([''])
            resolve(true);
          } else {
            console.log('I am ok no need to route');
            resolve(false);
          }
        });

    

        

        // You can delay effects via this function
        // setTimeout(() => {resolve();}, 5000); this.router.navigate(['login'])

      });


    }
       */   

}
