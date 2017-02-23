import { NgModule } from '@angular/core';

import { UniversalModule } from 'angular2-universal';

import { APP_DECLARATIONS } from './app.declarations';
import { APP_ENTRY_COMPONENTS } from './app.entry-components';
import { APP_IMPORTS } from './app.imports';
import { APP_PROVIDERS } from './app.providers';

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
export class AppModule { }

