// Angular 2
import { enableDebugTools, disableDebugTools } from '@angular/platform-browser';
import { enableProdMode, ApplicationRef } from '@angular/core';

// Angular debug tools in the dev console
// https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
let _decorateModuleRef = function identity<T>(value: T): T { return value; };

if ('production' === ENV) {
  // Production
  disableDebugTools();
  enableProdMode();

} else {

  _decorateModuleRef = (modRef: any) => {
    const appRef = modRef.injector.get(ApplicationRef);
    const cmpRef = appRef.components[0];

    // KY
    // enableDebugTools(cmpRef); moved above _ng declaration to prevent
    // undefined bug after ng4 update
    // ng.probe and ng.coreTokens might need to be set before enabling debug tools

    enableDebugTools(cmpRef);

    let _ng = (<any>window).ng;
    (<any>window).ng.probe = _ng.probe;
    (<any>window).ng.coreTokens = _ng.coreTokens;
    return modRef;
  };
}

export const decorateModuleRef = _decorateModuleRef;
