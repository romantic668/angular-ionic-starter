import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'my-store-devtools',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    md-sidenav-layout {
      width: 70% !important;
    }
  `],
  template: `
    <ngrx-store-log-monitor #storeMonitor
      toggleCommand="ctrl-t" 
      positionCommand="ctrl-m" 
      [expandEntries]="true">
    </ngrx-store-log-monitor>  
  `
})

export class StoreDevToolsComponent {}
