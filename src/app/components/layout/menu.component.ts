import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export const views: Object[] = [
  { name: 'Dashboard', link: ['']},
  { name: 'About', link: ['about']}
];

@Component({
  selector: 'ais-menu',
  template: `  
    <ion-header>
      <ion-toolbar>
        <ion-title>KiteCS AIS</ion-title>
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
  `
})

export class MenuComponent {

  views = views;

  constructor(public route: ActivatedRoute, public router: Router) {}

}
