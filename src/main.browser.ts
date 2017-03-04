import './theme/variables.scss';
import './theme/main.scss';
import './polyfills.browser';
import './rxjs.imports';

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
  bootloader(main);
}

export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(decorateModuleRef)
    .catch(err => console.error(err));
}

// needed for hmr
// in prod this is replace for document ready
// bootloader(main);
