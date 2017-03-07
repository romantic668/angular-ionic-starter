const path = require('path');
const fs = require('fs-extra');
const fsp = require('fs-promise');

EXCLUDES = ['.wp.scss']; // set this to ['.wp.scss'] if you don't need Windows Phone support

module.exports = {
  generate_scss: function() {
    return new Promise(function (resolve) {

      process.chdir('node_modules/ionic-angular');

      const files = listFiles('components', '.scss')
        .concat(listFiles('platform', '.scss'))
        .sort(orderByDirDotsDashesAndName)
        .map(file => path.join(path.dirname(file), path.basename(file, '.scss')));

      let stream = fs.createWriteStream("../../src/theme/ionic.scss");
      stream.once('open', function(fd) {
        
        let index = 0;
        for (let file of files) {
          file = file.replace(/\\/g,"/");
          stream.write(`@import "~ionic-angular/${file}";\n`);
          index++;
          if(index >= files.length){
            stream.end();
            process.chdir('../../');
            console.log("_postinstall > Ionic: ionic.scss has been generated");
            resolve();
          }
        
        }
      });

    });
  },

  // Not required since fonts have been added via Webpack now.
  /* 
  copy_fonts: function() {
    return new Promise(function (resolve, reject) {

        fsp.ensureDir('src/assets/fonts/ionicons').then(function(){
            fsp.copy('node_modules/ionicons/dist/fonts', 'src/assets/fonts/ionicons').then(function(){
                console.log("_postinstall > Ionic: ionicons have been moved under src/assets/fonts/ionicons");
                resolve();
            })
        })

    });
  }
  */

};

function listFiles (dir, suffix) {
  function traverse (dir, list) {
    const children = fs.readdirSync(dir);
    for (let child of children) {
      const file = path.join(dir, child);
      if (fs.statSync(file).isDirectory()) {
        traverse(file, list);
      } else {
        if (file.endsWith(suffix) && EXCLUDES.every(exclude => !file.endsWith(exclude))) {
          list.push(file);
        }
      }
    }
  }
  const files = [];
  traverse(dir, files);
  return files;
}

// order must be e.g. ['button.scss', 'button-icon.scss', 'button.ios.scss', ...]
function orderByDirDotsDashesAndName (path1, path2) {
  function countChar (s, c) {
    let count = 0;
    for (let start = -1; (start = s.indexOf(c, start + 1)) != -1; count++) { }
    return count;
  }
  const [dir1, dir2] = [path1, path2].map(path.dirname);
  if (dir1 !== dir2) {
    return dir1.localeCompare(dir2);
  }
  const [name1, name2] = [path1, path2].map(p => path.basename(p));
  const [dots1, dots2] = [name1, name2].map(name => countChar(name, '.'));
  if (dots1 !== dots2) {
    return dots1 - dots2;
  }
  const [dashes1, dashes2] = [name1, name2].map(name => countChar(name, '-'));
  if (dashes1 !== dashes2) {
    return dashes1 - dashes2;
  }
  return name1.localeCompare(name2);
}

