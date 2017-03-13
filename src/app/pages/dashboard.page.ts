import { Component } from '@angular/core';

@Component({
  template: `
    <button ion-button (click)="call()">
      Welcome to KiteCS Starter
    </button>  
  `
})

export class DashboardPage {
  call() {
    console.log('Thanks');
  }
}
