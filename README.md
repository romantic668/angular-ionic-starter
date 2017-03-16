# KiteCS Angular Starter

[![Greenkeeper badge](https://badges.greenkeeper.io/kitecs/angular-ionic-starter.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/kitecs/angular-ionic-starter.svg?branch=master)](https://travis-ci.org/kitecs/angular-ionic-starter)
[![Coverage Status](https://coveralls.io/repos/github/kitecs/angular-ionic-starter/badge.svg?branch=master)](https://coveralls.io/github/kitecs/angular-ionic-starter?branch=master)

### Package Upgrade Scripts Checklist:
- npm cache clean / npm run clean / manually delete node_modules
- npm install (postinstall hook will take further actions automatically, depending on the platform)
- yarn dev:start:hmr (Development)
- yarn prod:compile / yarn prod:build:web / yarn prod:start (Prod)
- yarn run build:cordova / cd cordova / cordova build <android> | <ios> (Cordova)
- yarn test / yarn run e2e:testall (or yarn ci:testall)

### TODO with NG4
- yarn run universal (ERROR in build)
- include universal e2e scripts to e2e:testall ==> "e2e:testall": "npm run e2e:jit && npm run e2e:aot && npm run e2e:universal && npm run e2e:universal:aot",
- nodemon config file is deleted now. Options(flags) need to be arranged on npm script. Original nodemon.json: {"watch": ["dist"],"ext" : "js ts json html"}
- Update yarn locally and import yarn.lock 

### Known issues
- Ionic + Angular 4 (both latest versions) have a propblem with change detection that reflects on 
ngAfterContentInit function not getting triggered in Ionic's MenuToggle directive. Result is a missing css class.
Workaround: Calling the MenuToggle.ngAfterContentInit method from AppComponent manually via ViewChild
  - Update: After the split-pane and resize store actions; this fix has moved to ngAfterViewChecked lifecycle hook. This may create a performance issue. Make sure to review if this workaround is necessary after ng4/ion3

- _decorateModuleRef under environments.ts is givving an error because of missing probe and coreTokens properties under window.ng property.
Workaround: Moved the errorous code above but now development mode is not working correctly (ex: reflected in Augury not working)

- Some Ionic components don't work with ng 4.x yet. Their scss imports at src/app/theme/ionic.scss cause Heroku to not be able to load
css properly. Check components from time to time and remove the problematic ones. Ionic 3 will be coming soon so this is only a temporary fix. Current problematic components: AlertCmp: 
    - @import "~ionic-angular/components/alert/alert";
    - @import "~ionic-angular/components/alert/alert.ios";
    - @import "~ionic-angular/components/alert/alert.md";

- .yarnclean file breaks the tslint and therefore the tests and CI so don't use yarn until Yarn becomes a stable software (at least for Windows)

### Locked Dependencies
- protractor: locked to 5.0.0 (on 02/03/17 the latest version was 5.1.1) : Protractor above 5.0.0 doesnt work with firefox
browser on Travis. For firefox, a flag marionette:false also needs to be set to use legacy Firefox version (<v48) (works ok on Windows dev machine)
- @angular packages. Waiting for 4 release on 22/03/17
- ~~karma-webpack: locked to 2.0.2 (on 15/03/17 the latest version was 2.0.3) : Coveralls package gives a 540 error on Travis CI after this update. See Travis build (#154)~~
- zone.js: locked to 0.8.3 (on 16/03/17 the latest version was 0.8.4) : Brings some errors in the console log. Not critical
- @types/jasmine : locked to 2.5.45 (on 16/03/17 the latest version was 2/5/46) : It breaks the e2e test because of a conflict with ts-node library. 

### License

[MIT](https://github.com/kemalcany/kitecs-angular-starter/blob/master/LICENSE)

### Acknowledgements

- @qdouble for the amazing [angular-webpack2-starter](https://github.com/qdouble/angular-webpack2-starter) starter, especially the Universal parts
- @mirkonasato for the inspiration on how to link Ionic (& Cordova) to Webpack [ionic2-webpack2-start](https://github.com/mirkonasato/ionic2-webpack2-starter)
- @angularclass for creating and keeping up to date the best Angular starter. Awesome job [angular-webpack2-starter](https://github.com/AngularClass/angular2-webpack-starter) starter