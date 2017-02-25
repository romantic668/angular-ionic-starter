import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  selector: 'my-app',
  template: `
    <md-sidenav-container fullscreen>
      <md-sidenav [opened]="!mobile" #sidenav [mode]="sideNavMode">
        <md-nav-list>
          <ng-template ngFor let-view [ngForOf]="views" 
          let-even="even" let-odd="odd" let-rowIndex="index">
            <a md-list-item [routerLink]="view.link" routerLinkActive="active-link"
            (click)="mobile ? sidenav.close() : {}">
              <md-icon md-list-icon>{{view.icon}}</md-icon>
              <span md-line>{{view.name}}</span>
              <span md-line class="secondary">{{view.description}}</span>
            </a>
          </ng-template>
        </md-nav-list>
      </md-sidenav>
      <p>Zamzuk yaaa</p>
      <md-toolbar color="primary">
        <button md-icon-button (click)="sidenav.toggle()">
          <md-icon>menu</md-icon>
        </button>
      </md-toolbar>
      <md-card>
        <router-outlet (activate)="activateEvent($event)"
        (deactivate)="deactivateEvent($event)"></router-outlet>
      </md-card>
    </md-sidenav-container>
    <my-store-devtools *ngIf="showMonitor"></my-store-devtools>  
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
    public router: Router
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
}
