import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { App } from 'ionic-angular';

import { MOBILE } from './services/constants';

export const views: Object[] = [
  {
    name: 'Dashboard',
    icon: 'home',
    link: ['']
  },
  {
    name: 'Lazy',
    icon: 'file_download',
    link: ['lazy']
  },
    {
    name: 'Sync',
    icon: 'done',
    link: ['sync']
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

  <ion-header>
    <ion-navbar>
      <ion-title>Neden boyle oldu yaaaaaa</ion-title>
    </ion-navbar>
  </ion-header>
    <button ion-button (click)="call()">
      MACAR Venono (Round)
  </button> 
      <ng-template ngFor let-view [ngForOf]="views" let-even="even" let-odd="odd" let-rowIndex="index">
        <a [routerLink]="view.link" routerLinkActive="active-link" (click)="mobile ? sidenav.close() : {}">
          <span>{{view.name}}</span>
        </a>
      </ng-template>

      <router-outlet (activate)="activateEvent($event)"
      (deactivate)="deactivateEvent($event)"></router-outlet> 
  `
})
export class AppComponent {
  showMonitor = (ENV === 'development' && !AOT &&
    ['monitor', 'both'].includes(STORE_DEV_TOOLS) // set in constants.js file in project root
  );
  mobile = MOBILE;
  sideNavMode = MOBILE ? 'over' : 'side';
  views = views;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private app: App
  ) { }

  activateEvent(event) {
    if (ENV === 'development') {
      console.log('Activate Event:', event);
    }
  }

  deactivateEvent(event) {
    if (ENV === 'development') {
      console.log('Deactivate Event', event);
    }
  }

  call(){
    console.log("Yaok");
    console.log(this.app);
  }  
}