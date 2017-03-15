import { Component, AfterViewChecked, ViewChild, Input } from '@angular/core';

import { MenuToggle } from 'ionic-angular';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/root.reducer';
import { System } from '../../store/system';

@Component({
  selector: 'ais-header',
  template: `
    <ion-header>
      <ion-navbar>
        <button ion-button left icon-only menuToggle *ngIf=
          "  (viewportDetails$ | async).size == 'xs'
          || (viewportDetails$ | async).size == 'sm'
        ">
          <ion-icon name="menu"></ion-icon>
        </button>
        <ion-title>{{pageTitle}}</ion-title>
        <ion-buttons right>
          <button ion-button icon-only>
            <ion-icon name="more"></ion-icon>
          </button>
        </ion-buttons>
      </ion-navbar>
    </ion-header>
  `
})

export class HeaderComponent implements AfterViewChecked {

  @ViewChild(MenuToggle) _menuToggle: MenuToggle;
  @Input() pageTitle;

  viewportDetails$ = this.store.select(store => store.system.viewport);

  constructor(private store:Store<AppState>) {

  }

  // Has performance costs. Revice this after moving to Ionic 3 / NG 4
  // Because this menu toggle margin problem is a result of Ionic 2 
  // and NG 4 mismatch
  ngAfterViewChecked() {
    if(this._menuToggle)this._menuToggle.ngAfterContentInit();
  }
}
