# KiteCS Angular Starter

### Package Upgrade Scripts Checklist
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

### License

[MIT](https://github.com/kemalcany/kitecs-angular-starter/blob/master/LICENSE)

### Acknowledgements

- @qdouble and all other contributors for the amazing [angular-webpack2-starter](https://github.com/qdouble/angular-webpack2-starter) starter
- @mirkonasato for the inspiration on how to link Ionic (& Cordova) to Webpack [ionic2-webpack2-start](https://github.com/mirkonasato/ionic2-webpack2-starter)