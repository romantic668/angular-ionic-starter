import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/root.reducer';

@Component({
  selector: 'page-loader',
  template:`
  <div class="page-loader" 
    [hidden]="!loaderExists" [@loaderShown]="loaderShown" (@loaderShown.done)="removeComponent($event)">
    <img class="page-loader-logo" src="../assets/images/burger.png">
  </div> 
  `,
  animations: [
    trigger('loaderShown', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('* => *', animate('.3s ease-in'))
    ])
  ]
})
export class PageLoaderComponent {

  layoutDetails$ = this.store.select(store => store.layout.isPageLoaderShown);
  loaderShown : boolean = true;
  loaderExists: boolean = false;

  constructor(private store: Store<AppState>) {

    this.layoutDetails$.subscribe((loaderFlag)=> {
      // this.loaderShown = loaderFlag;
      this.loaderExists = loaderFlag;
    });

  }

  // NG 4 Animations not working, need documentation
  //
  //
  removeComponent($event) {
    console.log('I need to be called');
    if($event.toState === false) {
      this.loaderExists = true;
    }
  }

}
