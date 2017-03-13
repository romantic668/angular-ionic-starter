import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { MenuToggle } from 'ionic-angular';


@Component({
  selector: 'ais-header',
  template: `
    <ion-header>
        <ion-navbar>
            <button ion-button left icon-only menuToggle >
                <ion-icon name="menu"></ion-icon>
            </button>
            <ion-title>Kite CS Starter</ion-title>
            <ion-buttons right>
                <button ion-button icon-only>
                    <ion-icon name="more"></ion-icon>
                </button>
            </ion-buttons>
        </ion-navbar>
    </ion-header>
  `
})

export class HeaderComponent implements AfterViewInit {

  @ViewChild(MenuToggle) _menuToggle: MenuToggle;

  ngAfterViewInit() {
    this._menuToggle.ngAfterContentInit();
  }
}
