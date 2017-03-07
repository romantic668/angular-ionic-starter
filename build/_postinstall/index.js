let _ionic = require('./_ionic.js');
let _cordova = require('./_cordova.js');

if(process.env.ENV == "dev"){ // Windows and Mac development machines

  Promise.resolve()
  .then(_ionic.generate_scss)
  .then(_cordova.create_project)
  .then(_cordova.copy_config)
  .then(function(){
    return _cordova.add_platform('ios');
  })
  .then(function(){
    return _cordova.add_platform('android');
  })
  .then(function(){
    console.log("_postinstall > Completed");
  });

} else { // Travis CS environment and Heroku Staging and Production platforms

  Promise.resolve()
  .then(_ionic.generate_scss)
  .then(function(){
    console.log("_postinstall > Completed")
  });

}