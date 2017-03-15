import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from 'ionic-angular';

import { Store } from '@ngrx/store';
import { AppState } from './store/root.reducer';
import { SystemActions } from './store/system';

import { Subject } from 'rxjs/Subject';

import { go, back } from '@ngrx/router-store';

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
  routerDetails$ = this.store.select(store => store.router);
  currentPath;

  constructor(
    private platform: Platform,
    private router: Router,
    private store: Store<AppState>
  ) {

    platform.ready().then(() => {

      this.initializeApp();
      this.setupResizeListener();

    });

  }

  initializeApp() {
    //this.store.dispatch(new SystemActions.SetDimensions({width:this.platform.width() , height:this.platform.height()}));
    //this.store.dispatch(new SystemActions.SetViewport(this.platform.isPortrait()));
    //this.store.dispatch(new SystemActions.SetPlatform(this.platform._platforms));

    this.store.dispatch(new SystemActions.Initialize(null));

    this.routerDetails$.subscribe((route)=> {
      this.currentPath = route.path;
    });

    // Hardware back button only applicable to Android
    this.platform.registerBackButtonAction((event) => {
      (this.currentPath === '/' ? this.platform.exitApp() : this.store.dispatch(back()));
    },1);
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
