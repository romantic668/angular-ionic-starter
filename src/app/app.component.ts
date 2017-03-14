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
    <ion-split-pane>
      <ion-menu [content]="mainContent" swipeEnabled="true">
        <ais-menu></ais-menu>
      </ion-menu>
      <ais-header></ais-header>
      <ion-content #mainContent padding class="marginTopAdjusted">
        <router-outlet></router-outlet>       
      </ion-content>    
    </ion-split-pane>
  `
})
export class AppComponent  {

  resize$ = new Subject();
  screenWidth = 'fullscreen';

  constructor(
    private platform: Platform,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private zone: NgZone
  ) {

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

      this.initializeApp();
      this.setupResizeListener();

  }

  initializeApp() {

    let platform : string;
    (this.platform._platforms.indexOf('core') !== -1 ? platform='web' : platform='native');
    this.store.dispatch(new SystemActions.SetPlatform(platform));

  }

  setupResizeListener() {

    window.addEventListener('resize', event => {
      this.zone.run(() => {
        this.resize$.next({
          width: window.innerWidth,
          height: window.innerHeight
        });
      });
    });
    this.resize$.debounceTime(500).subscribe((x)=> {
      this.store.dispatch(new SystemActions.SetDimensions({
        width: this.platform.width(),
        height: this.platform.height()
      }));
    });
  }

}
