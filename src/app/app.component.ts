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
    <ion-menu [content]="content" swipeEnabled="true">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item menuClose *ngFor="let view of views">
            <a [routerLink]="view.link" routerLinkActive="active-link">
              {{view.name}}
            </a>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>
    <ion-header>
      <ion-navbar>
        <button ion-button left icon-only menuToggle >
          <ion-icon name="menu"></ion-icon>
        </button>
        <ion-title>Fikret</ion-title>
        <ion-buttons right>
          <button ion-button icon-only (click)="showMore($event)">
            <ion-icon name="more"></ion-icon>
          </button>
        </ion-buttons>
      </ion-navbar>
    </ion-header>
    <ion-content padding>
      <router-outlet #content (activate)="activateEvent($event)"
      (deactivate)="deactivateEvent($event)"></router-outlet>       
    </ion-content>
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

  call() {
    console.log('Yaok');
    console.log(this.app);
  }

  showMore(event) {
    console.log(event);
  }
}
