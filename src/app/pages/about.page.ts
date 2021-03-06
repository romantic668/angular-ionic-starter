import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../store/root.reducer';

@Component({
  template: `
    <ais-header pageTitle="About Vay Vay Vay"></ais-header>
    <ion-content padding class="marginTopAdjusted">
      <ion-list>
        <ion-item>
          <p>Route</p>
          <p item-right>{{(routerDetails$ | async).path}}</p>
        </ion-item>
        <ion-item>
          <p>Platform</p>
          <p item-right>{{(systemDetails$ | async).platform.device}}</p>
          <p item-right *ngIf="(systemDetails$ | async).platform.isBrowser">browser</p>
        </ion-item>
        <ion-item>
          <p>Viewport</p>
          <p item-right>{{(systemDetails$ | async).viewport.size}} screen</p>
          <p item-right *ngIf="(systemDetails$ | async).platform.isPortrait">portrait</p>
          <p item-right *ngIf="!(systemDetails$ | async).platform.isPortrait">landscape</p>
        </ion-item>
        <ion-item>
          <p>Dimensions</p>
          <p item-right>
            {{(systemDetails$ | async).dimensions.width}} x 
            {{(systemDetails$ | async).dimensions.height}} px
          </p>
        </ion-item>        
      </ion-list>
    </ion-content> 
  `
})

export class AboutPage {

  routerDetails$ = this.store.select(store => store.router);
  systemDetails$ = this.store.select(store => store.system);

  constructor(private store:Store<AppState>) {}

}
