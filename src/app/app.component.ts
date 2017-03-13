import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export const views: Object[] = [
  {
    name: 'Dashboard',
    icon: 'home',
    link: ['']
  },
  {
    name: 'Bad Link',
    icon: 'error',
    link: ['wronglink']
  }
];


@Component({
  selector: 'ion-app',
  template: `
    <ion-split-pane [ngClass]="screenWidth">
      <ion-menu [content]="content" swipeEnabled="true">
        <ion-header>
          <ion-toolbar>
            <ion-title>Menu</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content padding>
          <ion-list>
            <ion-item menuClose *ngFor="let view of views">
              <a [routerLink]="view.link" routerLinkActive="active-link">
                {{view.name}}
              </a>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ais-header></ais-header>
      <ion-content padding class="marginTopAdjusted">
        <router-outlet #content></router-outlet>       
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

  views = views;

  constructor(
    public route: ActivatedRoute,
    public router: Router
  ) {
    ( this.showMonitor ?
      this.screenWidth = 'width-adjusted-screen' :
      this.screenWidth = 'fullscreen');
  }

}
