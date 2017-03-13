import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Content } from 'ionic-angular';

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

  screenWidth = 'fullscreen';

  constructor(
    public route: ActivatedRoute,
    public router: Router
  ) {
    ( this.showMonitor ?
      this.screenWidth = 'width-adjusted-screen' :
      this.screenWidth = 'fullscreen');

  }

}
