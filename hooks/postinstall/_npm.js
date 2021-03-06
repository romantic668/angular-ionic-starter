module.exports = {

  build_dll: function() {
    return new Promise(function (resolve, reject) {

        console.log("_postinstall > NPM: DLL build started. Please wait..");
        require('child_process').execSync('npm run dev:build:dll', {stdio:[0,1,2]});
        console.log("_postinstall > NPM: DLL build completed");
        resolve();

    });
  },

  compile_aot: function() {
    return new Promise(function (resolve, reject) {

        console.log("_postinstall > NPM: AOT compilation has started. Please wait..");
        require('child_process').execSync('npm run compile', {stdio:[0,1,2]});
        console.log("_postinstall > NPM: AOT compilation completed");
        resolve();

    });
  },

  build_web: function() {
    return new Promise(function (resolve, reject) {

        console.log("_postinstall > NPM: Building web distro. Please wait..");
        require('child_process').execSync('npm run prod:build:web', {stdio:[0,1,2]});
        console.log("_postinstall > NPM: Web distro build completed. Ready to serve");
        resolve();

    });
  }    

};