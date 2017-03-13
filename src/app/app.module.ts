import { ApplicationRef, NgModule } from '@angular/core';

import { IonicApp } from 'ionic-angular';

import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

import { Store } from '@ngrx/store';
import { AppState } from './store/root.reducer';

import {
  APP_DECLARATIONS,
  APP_ENTRY_COMPONENTS,
  APP_IMPORTS,
  APP_PROVIDERS
} from './app.module.properties';

@NgModule({
  declarations: [APP_DECLARATIONS],
  entryComponents: [APP_ENTRY_COMPONENTS],
  imports: [APP_IMPORTS],
  providers: [APP_PROVIDERS],
  bootstrap: [IonicApp]
})

export class AppModule {

  constructor(public appRef: ApplicationRef, private _store: Store<AppState>) { }

  hmrOnInit(store) {
    if (!store || !store.rootState) return;

    if (store.rootState) {
      this._store.dispatch({
        type: '[HMR] Set root state',
        payload: store.rootState
      });
    }

    if ('restoreInputValues' in store) { store.restoreInputValues(); }
    this.appRef.tick();
    Object.keys(store).forEach(prop => delete store[prop]);
  }

  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    this._store.take(1).subscribe(s => store.rootState = s);
    store.disposeOldHosts = createNewHosts(cmpLocation);
    store.restoreInputValues = createInputTransfer();
    removeNgStyles();
  }

  hmrAfterDestroy(store) {
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
