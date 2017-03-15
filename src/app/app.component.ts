import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, ToastController } from 'ionic-angular';

import { Store } from '@ngrx/store';
import { AppState } from './store/root.reducer';
import { SystemActions } from './store/system';

import { Subject } from 'rxjs/Subject';

import { go, replace, search, show, back, forward } from '@ngrx/router-store';

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
    // private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private store: Store<AppState>,
    private toastCtrl: ToastController
  ) {

    platform.ready().then(() => {

      this.initializeApp();
      this.setupResizeListener();

      this.store.dispatch(go(['/about', {}], {}));
      this.routerDetails$.subscribe((route)=> {
        console.log(route);
        this.currentPath = route.path;
      });

      /*
      console.log('Platform ready is running on browser too');
      let toast = this.toastCtrl.create({
        message: 'Platform is ready',
        duration: 10000
      });
      toast.present();
      */


      this.platform.registerBackButtonAction((event) => {

        console.log('Back button clicked');
        console.log(this.currentPath);

        this.location.back();

       },1);
    });

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
