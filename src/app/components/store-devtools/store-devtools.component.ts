import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'store-devtools',
  encapsulation: ViewEncapsulation.None,
  styles: [``],
  template: `
    <ngrx-store-log-monitor #storeMonitor
      toggleCommand="ctrl-t" 
      positionCommand="ctrl-m" 
      [expandEntries]="true">
    </ngrx-store-log-monitor>  
  `
})

export class StoreDevToolsComponent {}
