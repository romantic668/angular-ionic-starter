import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../store/root.reducer';

@Component({
  template: `
    <ais-header pageTitle="Page not found"></ais-header>
    <ion-content padding class="marginTopAdjusted">
      <ion-item>
        Page is not found at {{(routerDetails$ | async).path}}
      </ion-item>
    </ion-content>  
  `
})

export class NotFoundPage {
  routerDetails$ = this.store.select(store => store.router);
  constructor(private store:Store<AppState>) {}
}
