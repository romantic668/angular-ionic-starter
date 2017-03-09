import './app/theme/ionic.scss';
import './app/theme/variables.scss';
import './app/theme/main.scss';

import '../config/polyfills.browser';
import '../config/rxjs.imports';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader } from '@angularclass/hmr';
import { AppModule } from './app/app.module';
import { decorateModuleRef } from './environment';

if ('production' === ENV) {
  enableProdMode();
}

if (CORDOVA) {
  document.addEventListener('deviceready', () => bootloader(main));
} else {
  bootloader(main); // needed for hmr
}

export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(decorateModuleRef)
    .catch(err => console.error(err));
}
