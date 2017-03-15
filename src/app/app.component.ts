import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, Content } from 'ionic-angular';

import { Store } from '@ngrx/store';
import { AppState } from './store/root.reducer';
import { SystemActions } from './store/system';

import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'ion-app',
  styles:[`
    #mainContent {
      width:100%;
    }  
  `],
  template: `
    <ion-split-pane>
      <ion-menu [content]="mainContent" swipeEnabled="true">
        <ais-menu></ais-menu>
      </ion-menu>
      <div id="mainContent" main #mainContent>
        <router-outlet></router-outlet>            
      </div> 
    </ion-split-pane>
  `
})
export class AppComponent  {

  resize$ = new Subject();

  constructor(
    private platform: Platform,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {

    this.initializeApp();
    this.setupResizeListener();

  }

  initializeApp() {
    this.store.dispatch(new SystemActions.SetDimensions({width:this.platform.width() , height:this.platform.height()}));
    this.store.dispatch(new SystemActions.SetViewport(this.platform.isPortrait()));
    this.store.dispatch(new SystemActions.SetPlatform(this.platform._platforms));
  }

  setupResizeListener() {

    window.addEventListener('resize', event => {
      this.resize$.next({
        width: window.innerWidth,
        height: window.innerHeight
      });
    });
    this.resize$.debounceTime(1000).subscribe((dimensions:{width:number,height:number})=> {
      this.store.dispatch(new SystemActions.SetDimensions(dimensions));
      this.store.dispatch(new SystemActions.SetViewport(this.platform.isPortrait()));
    });

  }
}
