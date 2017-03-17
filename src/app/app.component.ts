import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Platform } from 'ionic-angular';

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
  routerDetails$ = this.store.select(store => store.router);
  currentPath;

  constructor(
    private platform: Platform,
    private router: Router,
    private location: Location,
    private store: Store<AppState>
  ) {

    this.router.navigate(['']);

    platform.ready().then(() => {

      this.initializeApp();
      this.setupListeners();

    });

  }

  initializeApp() {
    this.store.dispatch(new SystemActions.Initialize(null));
  }

  setupListeners() {

    // Active route
    this.routerDetails$.subscribe((route)=> {
      this.currentPath = route.path;
    });

    // Window resize
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

    // (Android only) Hardware back button
    this.platform.registerBackButtonAction((event) => {
      (this.currentPath === '/' ? this.platform.exitApp() : this.location.back());
    },1);

  }
}
