let _ionic = require('./_ionic.js');
let _cordova = require('./_cordova.js');
let _npm = require('./_npm.js');

if(process.env.NODE_ENV == "dev"){ // Windows and Mac (+Cordova) development machines

  Promise.resolve()
  .then(_ionic.generate_scss)
  .then(_npm.build_dll)
  .then(_cordova.create_project)
  .then(_cordova.copy_config)
  .then(function(){return _cordova.add_platform('android');})
  .then(function(){return _cordova.add_platform('ios');})
  .then(function(){console.log("_postinstall > Completed");})  
  .catch(function(errorStack) {
    console.log(errorStack);
  });

} else { // Travis CS environment and Heroku Staging and Production platforms

  if(process.env.TRAVIS){

    Promise.resolve()
    //.then(_ionic.generate_scss)
    //.then(_npm.build_dll)
    //.then(_npm.compile_aot) // Swithced to e2e:aot in Travis so compilation takes place there
    .then(function(){
      console.log("_postinstall > Completed")
    });

  } else {

    Promise.resolve()
    //.then(_ionic.generate_scss) // Commented out since automatic generation adds the problematic components to @imports
    .then(_npm.compile_aot)
    .then(_npm.build_web)
    .then(function(){
      console.log("_postinstall > Completed")
    });

  }
}