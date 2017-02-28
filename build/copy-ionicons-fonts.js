const del = require('del');
const copydir = require('copy-dir');

del(['src/assets/fonts']).then(paths => {
    copydir('node_modules/ionicons/dist/fonts', 'src/assets/fonts',function(err){
        if (err) { console.log(err); }
        console.log("Ionic: ionicons font files have been copied under src/assets");
    });
});
