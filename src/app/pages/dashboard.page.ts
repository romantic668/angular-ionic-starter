import { Component } from '@angular/core';

@Component({
  template: `
    <button ion-button (click)="call()">
      Welcome to KiteCS Starter Gum
    </button>  
  `
})

export class DashboardPage {
  call() {
    console.log('Thanks');
  }
}
