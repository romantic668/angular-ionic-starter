import { Component } from '@angular/core';

@Component({
  template: `
    <button ion-button (click)="call()">
      Welcome to KiteCS Starter
    </button>  
  `
})

export class DashboardPage {

  constructor() {}

  call() {
    console.log('Thanks');
  }
}
