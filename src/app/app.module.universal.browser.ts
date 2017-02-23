import { NgModule } from '@angular/core';

import { UniversalModule } from 'angular2-universal';

import {
  APP_DECLARATIONS,
  APP_ENTRY_COMPONENTS,
  APP_IMPORTS,
  APP_PROVIDERS
} from './app.module.properties';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    APP_DECLARATIONS
  ],
  entryComponents: [APP_ENTRY_COMPONENTS],
  imports: [
    APP_IMPORTS,
    UniversalModule // NodeModule, NodeHttpModule, and NodeJsonpModule are included
  ],
  bootstrap: [AppComponent],
  providers: [APP_PROVIDERS]
})
export class AppModule {}
