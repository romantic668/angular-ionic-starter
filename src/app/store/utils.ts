import { ApplicationRef, NgModule } from '@angular/core';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { Store } from '@ngrx/store';
import { AppState } from './root.reducer';

export class HMRAppModule {

  constructor(public appRef: ApplicationRef, public _store: Store<AppState>) { }

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

const typeCache: { [label: string]: boolean } = {};

export function type<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unique"`);
  }

  typeCache[<string>label] = true;

  return <T>label;
}

