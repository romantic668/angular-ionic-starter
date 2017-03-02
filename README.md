# KiteCS Angular Starter

### Package Upgrade Scripts Checklist.
- npm run clean / manually delete node_modules
- npm install
- yarn start / yarn run start:hmr (Development)
- yarn run compile / yarn run prodserver (Prod)
- yarn run build:cordova / cd cordova / cordova build <android> | <ios> (Cordova)
- yarn test / yarn run e2e:testall (or yarn ci:testall)

## TODO with NG4
### Add to package Upgrade Scripts Checklist
- yarn run universal (ERROR in build)
- include universal e2e scripts to e2e:testall ==> "e2e:testall": "npm run e2e:jit && npm run e2e:aot && npm run e2e:universal && npm run e2e:universal:aot",
- nodemon config file is deleted now. Options(flags) need to be arranged on npm script. Original nodemon.json: {"watch": ["dist"],"ext" : "js ts json html"}
- Update yarn locally and import yarn.lock 

### Known issues
- Ionic + Angular 4 (both latest versions) have a propblem with change detection that reflects on 
ngAfterContentInit function not getting triggered in Ionic's MenuToggle directive. Result is a missing css class.
Workaround: Calling the MenuToggle.ngAfterContentInit method from AppComponent manually via ViewChild
- _decorateModuleRef under environments.ts is givving an error because of missing probe and coreTokens properties under window.ng property.
Workaround: Moved the errorous code above but now development mode is not working correctly (ex: reflected in Augury not working)

### Locked Dependencies
- protractor: locked to 5.0.0 (on 02/03/17 the latest version was 5.1.1) : Protractor above 5.0.0 doesnt work with firefox
browser on Travis. For firefox, a flag marionette:false also needs to be set to use legacy Firefox version (<v48) (works ok on Windows dev machine)

### License

[MIT](https://github.com/kemalcany/kitecs-angular-starter/blob/master/LICENSE)

### Acknowledgements

- @qdouble for the amazing [angular-webpack2-starter](https://github.com/qdouble/angular-webpack2-starter) starter, especially the Universal parts
- @mirkonasato for the inspiration on how to link Ionic (& Cordova) to Webpack [ionic2-webpack2-start](https://github.com/mirkonasato/ionic2-webpack2-starter)
- @angularclass for creating and keeping up to date the best Angular starter. Awesome job [angular-webpack2-starter](https://github.com/AngularClass/angular2-webpack-starter) starter