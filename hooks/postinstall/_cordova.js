const exec = require('child_process').exec;
const fs = require('fs-extra');
const fsp = require('fs-promise');

module.exports = {

  create_project: function() {
    return new Promise(function (resolve, reject) {

        if (fs.existsSync('cordova')) {
            console.log("_postinstall > Cordova: cordova directory already exists");
            resolve(); 
        } else {
            console.log("_postinstall > Cordova: cordova directory is being created.. Please wait");
            exec('cordova create cordova', (error, stdout, stderr) => {
                if (error) reject(error);
                console.log("_postinstall > Cordova: cordova directory is created");
                resolve();   
            });
        }

    });
  },

  copy_config: function() {
    return new Promise(function (resolve, reject) {

        fsp.copy('config.xml', 'cordova/config.xml', {overwrite:true}).then(function(){
            console.log("_postinstall > Cordova: config.xml copied from root to cordova directory");
            resolve();  
        }).catch(err=>console.log(err));

    });
  },  

  add_platform: function(platform) {
    return new Promise(function (resolve, reject) {

        if (fs.existsSync(`cordova/platforms/${platform}`)) {
            console.log(`_postinstall > Cordova: ${platform} platform already exists`);
            resolve(); 
        } else {
            console.log(`_postinstall > Cordova: ${platform} is getting created. Please wait..`);
            process.chdir('cordova');
            exec(`cordova platform add ${platform}`, (error, stdout, stderr) => {
                if (error) reject(error);
                console.log(`_postinstall > Cordova: ${platform} has been created`);
                process.chdir('../');
                resolve();
            });
        }

    });
  }  

};