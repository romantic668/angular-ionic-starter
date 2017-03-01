let _ionic = require('./_ionic.js');
let _cordova = require('./_cordova.js');

Promise.resolve()
.then(_ionic.generate_scss)
.then(_ionic.copy_fonts)
.then(_cordova.create_project)
.then(_cordova.copy_config)
.then(function(){
  return _cordova.add_platform('ios');
})
.then(function(){
  return _cordova.add_platform('android');
})
.then(function(){
  console.log("_postinstall > Completed")
});
