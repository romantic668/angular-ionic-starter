import { Component } from '@angular/core';

@Component({
  template: `
    <ais-header></ais-header>
    <ion-content padding class="marginTopAdjusted">
      <button ion-button (click)="call()">
        Welcome to KiteCS
      </button>
    </ion-content>  
  `
})

export class DashboardPage {
  call() {
    console.log('Thanks');
  }
}
