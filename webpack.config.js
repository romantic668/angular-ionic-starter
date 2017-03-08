const webpackMerge = require('webpack-merge');
const { hasProcessFlag, includeClientPackages, root, testDll } = require('./config/helpers.js');

const  { DEV_PORT, PROD_PORT, HOST} = require('./config/constants');

const defaultConfig = {
  resolve: {
    extensions: ['.ts', '.js', '.json', '.scss']
  }
};
const commonConfig = require('./config/webpack.common');

const EVENT = process.env.npm_lifecycle_event || '';
const DEV_SERVER = EVENT.includes('webdev');
const DLL = EVENT.includes('dll');
const E2E = EVENT.includes('e2e');
const HMR = hasProcessFlag('hot');
const PROD = EVENT.includes('prod');
const WATCH = hasProcessFlag('watch');
const UNIVERSAL = EVENT.includes('universal');
const CORDOVA = EVENT.includes('cordova');

console.log('DLL BUILD: ', DLL);
console.log('PRODUCTION BUILD: ', PROD);
console.log('CORDOVA: ', CORDOVA);
console.log('------------------------');

let port;
(PROD? port = PROD_PORT : port = DEV_PORT);

if (DLL){
  const dllConfig = require('./config/webpack.dll');
  return module.exports = webpackMerge({}, defaultConfig, commonConfig, dllConfig);
} else {

  if (DEV_SERVER){
    const devConfig = require('./config/webpack.dev');
    return module.exports = webpackMerge({}, defaultConfig, commonConfig, devConfig);
  }

}

if(PROD){
  const prodConfig = require('./config/webpack.prod');
  return module.exports = webpackMerge({}, defaultConfig, commonConfig, prodConfig);
}