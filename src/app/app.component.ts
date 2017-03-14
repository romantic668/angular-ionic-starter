import { Component, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, Content } from 'ionic-angular';

import { Store } from '@ngrx/store';
import { AppState } from './store/root.reducer';
import { SystemActions } from './store/system';

import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'ion-app',
  template: `
    <ion-split-pane [ngClass]="screenWidth">
      <ion-menu [content]="mainContent" swipeEnabled="true">
        <ais-menu></ais-menu>
      </ion-menu>
      <ais-header></ais-header>
      <ion-content #mainContent padding class="marginTopAdjusted">
        <router-outlet></router-outlet>       
      </ion-content>    
    </ion-split-pane>
    <store-devtools *ngIf="showMonitor"></store-devtools>
  `
})
export class AppComponent  {
  showMonitor = (ENV === 'development' && !AOT &&
    (['monitor', 'both'].indexOf(STORE_DEV_TOOLS)>-1) // set in constants.js file in project root
  );

  resize$ = new Subject();
  screenWidth = 'fullscreen';

  constructor(
    private platform: Platform,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private zone: NgZone
  ) {
    ( this.showMonitor ?
      this.screenWidth = 'width-adjusted-screen' :
      this.screenWidth = 'fullscreen');

      this.initializeApp();
      this.setupResizeListener();

  }

  initializeApp() {
    let platformString : string;
    (this.platform._platforms.indexOf('core') !== -1 ? platformString='web' : platformString='native');
    this.store.dispatch(new SystemActions.SetPlatform(platformString));
  }

  setupResizeListener() {

    // Angular has a problem with listening resize event as an observable
    // This is the workaround:
    // https://github.com/angular/angular/issues/9060
    window.addEventListener('resize', event => {
      this.zone.run(() => {
        this.resize$.next({
          width: window.innerWidth,
          height: window.innerHeight
        });
      });
    });
    this.resize$.debounceTime(1000).subscribe((dimensions:{width:number,height:number})=> {
      this.store.dispatch(new SystemActions.SetDimensions(dimensions));
    });

  }

}
