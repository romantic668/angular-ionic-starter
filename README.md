# KiteCS Angular Starter

### Locked Dependencies
- @types/jasmine locked 2.5.41 : Above breaks build

### Package Upgrade Scripts Checklist
- yarn start / yarn run start:hmr
- yarn run compile / yarn run prodserver (ERROR in browser)
- yarn test
- yarn run build / yarn run server:prod (This one is a bit weird, keeps refreshing on the server)
- yarn run universal (ERROR in build)

### NPM (Yarn) Scripts Checklist
- ~~ "postinstall": "npm run sass && npm run build:dll", ~~
- ~~ "rimraf": "rimraf", ~~
- ~~ "webdev": "webpack-dev-server", ~~
- ~~ "webdev:hmr": "npm run webdev -- --inline --hot", ~~
- ~~ "webpack": "webpack", ~~
- ~~ "ngc": "./node_modules/.bin/ngc -p tsconfig.aot.json", ~~
- "ngc:universal": "./node_modules/.bin/ngc -p tsconfig.aot.universal.json",
- "webdriver-manager": "webdriver-manager",
- "webdriver:update": "npm run webdriver-manager update",
- "webdriver:start": "npm run webdriver-manager start",
- "protractor": "protractor",
- "pree2e:only": "npm run webdriver:update -- --standalone",
- "e2e": "npm run sass && npm-run-all -p -r e2e:server e2e:only",
- "e2e:testall": "npm run e2e:jit && npm run e2e:aot && npm run e2e:universal && npm run e2e:universal:aot",
- "e2e:aot": "npm run compile:e2e && npm run e2e",
- "e2e:jit": "npm run build:prod:e2e && npm run e2e",
- "e2e:universal": "npm run build:universal:prod:e2e && npm-run-all -p -r server:universal e2e:only:universal",
- "e2e:universal:aot": "npm run compile:universal:e2e && npm-run-all -p -r server:universal e2e:only:universal",
- "e2e:only:universal": "npm run protractor -- --universal",
- "e2e:only": "npm run protractor",
- "e2e:live": "npm run e2e -- --elementExplorer",
- "e2e:server": "node prodserver",
- ~~ "pretest": "npm run lint && npm run sass", ~~
- ~~ "pretest:once": "npm run lint && npm run sass", ~~
- ~~ "pretest:once:ci": "npm run lint", ~~
- ~~ "test:once": "karma start", ~~
- ~~ "test:once:ci": "karma start", ~~
- ~~ "test": "karma start", ~~ * 1 thy error [at loader]?
- "ci": "npm run e2e:jit && npm run test:once:ci",
- "ci:testall": "npm run e2e:testall && npm run test:once:ci",
- ~~ "tslint": "node node_modules/tslint/bin/tslint", ~~
- ~~ "lint": "npm run tslint \"src/app/**/*.ts\" ", ~~
- "clean": "npm cache clean && npm run clean:compile && npm run rimraf -- node_modules doc typings coverage dist .awcache dll",
- ~~ "clean:dist": "npm run rimraf -- dist .awcache", ~~
- ~~ "clean:dll": "npm run rimraf -- dll", ~~
- ~~ "clean:compile": "npm run rimraf -- \"compiled\" ", ~~
- ~~ "compile": "npm run compile:aot", ~~
- ~~ "compile:aot": "npm run sass && npm run clean:compile && npm run ngc && npm run build:aot", ~~
- "compile:e2e": "npm run sass && npm run clean:compile && npm run ngc && npm run build:aot:prod:e2e",
- "compile:universal": "npm run sass && npm run clean:compile && npm run ngc:universal && npm run build:universal:aot",
- "compile:universal:e2e": "npm run sass && npm run clean:compile && npm run ngc:universal && npm run build:universal:aot:prod:e2e",
- "compile:dev": "npm run sass && npm run clean:compile && npm run ngc && npm run build:aot:dev",
- "compile:only": "npm run clean:compile && npm run sass && npm run ngc",
- "compile:watch": "watch-run -i npm run compile:only -p 'src/app/**/*.ts, src/app/**/*.scss' npm run compile:only",
- "prodserver": "node prodserver",
- ~~ "sass": "node-sass src -o src --include-path node_modules --output-style compressed -q", ~~
- ~~ "sass:watch": "node-sass -w src -o src --include-path node_modules --output-style compressed -q", ~~
- ~~ "start": "npm run server:dev", ~~
- ~~ "start:hmr": "npm run server:hmr", ~~
- "serve80": "sudo PORT=80 node prodserver",
- ~~ "server:dev": "npm-run-all -p -r webdev sass:watch", ~~
- ~~ "server:hmr": "npm-run-all -p -r webdev:hmr sass:watch", ~~
- "server:prod": "npm-run-all -p -r watch:prod prodserver",
- "server:prod80": "npm-run-all -p -r serve80 watch:prod",
- "server:universal": "nodemon dist/server/index.js",
- "debug:build": "node-nightly --inspect --debug-brk node_modules/webpack/bin/webpack.js",
- "build": "npm run build:prod",
- ~~ "build:aot": "npm run build:aot:prod", ~~
- ~~ "build:aot:prod": "npm run clean:dist && npm run sass && webpack", ~~
- "build:aot:prod:e2e": "npm run clean:dist && npm run sass && webpack",
- "build:aot:dev": "npm run clean:dist && npm run sass && webpack",
- "build:dev": "npm run clean:dist && npm run sass && webpack",
- ~~ "build:dll": "npm run clean:dll && npm run sass && webpack", ~~
- ~~ "build:prod": "npm run clean:dist && npm run sass && webpack", ~~
- "build:prod:e2e": "npm run clean:dist && npm run sass && webpack",
- "build:universal": "npm run build:universal:prod",
- "build:universal:aot": "npm run build:universal:aot:prod",
- "build:universal:aot:dev": "npm run clean:dist && npm run sass && webpack",
- "build:universal:aot:prod": "npm run clean:dist && npm run sass && webpack",
- "build:universal:aot:prod:e2e": "npm run clean:dist && npm run sass && webpack",
- "build:universal:dev": "npm run clean:dist && npm run sass && webpack",
- "build:universal:prod": "npm run clean:dist && npm run sass && webpack",
- "build:universal:prod:e2e": "npm run clean:dist && npm run sass && webpack",
- "watch": "npm run watch:dev",
- "watch:dev": "npm-run-all -p -r \"build:dev -- --watch\" sass:watch",
- "watch:prod": "npm-run-all -p -r \"build:prod -- --watch\" sass:watch",
- "watch:universal": "npm-run-all -p -r \"build:universal -- --watch\" sass:watch",
- "universal": "npm run build:universal && npm run server:universal",
- "universal:aot": "npm run compile:universal && npm run server:universal",
- "universal:watch": "npm run build:universal && npm-run-all -p -r watch:universal server:universal"


# Original Repo README

https://github.com/qdouble/angular-webpack2-starter.git

## Material Branch with Universal (Server-side rendering) support

> Featuring Material Design 2, Webpack 2 (and Webpack DLL plugin for faster dev builds), HMR (Hot Module Replacement), @ngrx for state management and optional server-side rendering with Universal.

###### You can use npm, but it's recommended to use yarn as it installs a lot faster and has other benefits https://yarnpkg.com/ . Make sure you are using yarn version 0.16.0 or newer (check with 'yarn --version')

```bash
git clone https://github.com/qdouble/angular-webpack2-starter.git
cd angular-webpack2-starter
yarn
yarn start
```

### [Material Branch without Universal (Server-side rendering) support](https://github.com/qdouble/angular-webpack2-starter/tree/no-universal-support)

### [Bootstrap Branch](https://github.com/qdouble/angular-webpack2-starter/tree/bootstrap)

### [Bootstrap and Universal Branch](https://github.com/qdouble/angular-webpack2-starter/tree/bootstrap-and-universal)

### [Minimal Branch](https://github.com/qdouble/angular-webpack2-starter/tree/minimal)

## Features

* Angular 2
  * Async loading
  * Treeshaking
  * AOT (Ahead of Time/ Offline) Compilation
  * AOT safe SASS compilation
* Webpack 2
  * Webpack Dlls (Speeds up devServer builds)
* HMR (Hot Module Replacement)
* TypeScript 2
  * @types
* Material Design 2
* Universal (Server-side Rendering)
* @ngrx
  * store (RxJS powered state management for Angular2 apps, inspired by Redux)
  * effects (Side effect model for @ngrx/store)
  * router-store (Bindings to connect angular/router to ngrx/store)
  * store-devtools (Developer Tools for @ngrx/store)
  * store-log-monitor (Log Monitor for @ngrx/store-devtools and Angular 2)
  * ngrx-store-logger (Advanced console logging for @ngrx/store applications, ported from redux-logger.)
  * ngrx-store-freeze in dev mode (@ngrx/store meta reducer that prevents state from being mutated.)
* Karma/Jasmine testing
* Protractor for E2E testing

## Basic scripts

Use `yarn start` for dev server. Default dev port is `3000`.

Use `yarn run start:hmr` to run dev server in HMR mode.

Use `yarn run build` for production build.

Use `yarn run server:prod` for production server and production watch. Default production port is `8088`.

Use `yarn run universal` to run production build in Universal. To run and build universal in AOT mode, use
`yarn run universal:aot`. Default universal port is `8000`.

Default ports and option to use proxy backend for dev server can be changed in `constants.js` file.

To create AOT version, run `yarn run compile`. This will compile and build script.
Then you can use `yarn run prodserver` to see to serve files.
Do not use build:aot directly unless you have already compiled.
Use `yarn run compile` instead, it compiles and builds:aot

The scripts are set to compile css next to scss because ngc compiler does not support Sass.
To compile scss, use `yarn run sass`, but many of the scripts will either build or watch scss files.



### AOT  Don'ts

The following are some things that will make AOT compile fail.

- Don’t use require statements for your templates or styles, use styleUrls and templateUrls, the angular2-template-loader plugin will change it to require at build time.
- Don’t use default exports.
- Don’t use form.controls.controlName, use form.get(‘controlName’)
- Don’t use control.errors?.someError, use control.hasError(‘someError’)
- Don’t use functions in your providers, routes or declarations, export a function and then reference that function name
- Inputs, Outputs, View or Content Child(ren), Hostbindings, and any field you use from the template or annotate for Angular should be public

### Testing

For unit tests, use `yarn run test` for continuous testing in watch mode and use
`yarn run test:once` for single test. To view code coverage after running test, open `coverage/html/index.html` in your browser.

For e2e tests, use `yarn run e2e`. To run unit test and e2e test at the same time, use `yarn run ci`.

### Wiki Links

[Recommended Steps for merging this starter into existing project](https://github.com/qdouble/angular-webpack2-starter/wiki/Recommended-Steps-for-Merging-Starter-into-Existing-Project)

### License

[MIT](https://github.com/kemalcany/kitecs-angular-starter/blob/master/LICENSE)

### Acknowledgements

- @qdouble for the amazing [angular-webpack2-starter](https://github.com/qdouble/angular-webpack2-starter) starter