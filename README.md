# KiteCS Angular Starter

### Locked Dependencies
- @types/jasmine locked 2.5.41 : Above breaks build

### Package Upgrade Scripts Checklist
- yarn start / yarn run start:hmr (Development)
- yarn run compile / yarn run prodserver (Prod)
- yarn test / yarn run e2e:testall (or yarn ci:testall)

## TODO with NG4
### Add to package Upgrade Scripts Checklist
- yarn run build / yarn run server:prod (This one is a bit weird, keeps refreshing on the server)
- yarn run universal (ERROR in build)
- include universal e2e scripts to e2e:testall ==> "e2e:testall": "npm run e2e:jit && npm run e2e:aot && npm run e2e:universal && npm run e2e:universal:aot",
- nodemon config file is deleted now. Options(flags) need to be arranged on npm script. Original nodemon.json: {"watch": ["dist"],"ext" : "js ts json html"}
- Update yarn locally and import yarn.lock 

### License

[MIT](https://github.com/kemalcany/kitecs-angular-starter/blob/master/LICENSE)

### Acknowledgements

- @qdouble for the amazing [angular-webpack2-starter](https://github.com/qdouble/angular-webpack2-starter) starter