import { ApplicationRef, NgModule } from '@angular/core';
import { HMRAppModule } from './store/utils';

import { Store } from '@ngrx/store';
import { AppState } from './store/root.reducer';

import { IonicApp } from 'ionic-angular';

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

export class AppModule extends HMRAppModule {

  constructor (public appRef: ApplicationRef, public _store: Store<AppState>) {
    super(appRef,_store);
  }

}
