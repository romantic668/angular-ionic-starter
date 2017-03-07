const webpackMerge = require('webpack-merge');
const { hasProcessFlag, includeClientPackages, root, testDll } = require('./config/helpers.js');

const  {
  DEV_PORT, HOST
} = require('./config/constants');

const defaultConfig = {
  resolve: {
    extensions: ['.ts', '.js', '.json']
  }
};
const commonConfig = require('./config/webpack.common');
const dllConfig = require('./config/webpack.dll');
const devConfig = require('./config/webpack.dev');

const EVENT = process.env.npm_lifecycle_event || '';
const AOT = EVENT.includes('aot');
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
console.log('AOT: ', AOT);
console.log('CORDOVA: ', CORDOVA);
console.log('------------------------');

let port;

if (!UNIVERSAL) {
  if (PROD) {
    port = PROD_PORT;
  } else {
    port = DEV_PORT;
  }
} else {
  port = UNIVERSAL_PORT;
}

const PORT = port;

if (DLL){
  module.exports = webpackMerge({}, defaultConfig, commonConfig, dllConfig);
}

if (DEV_SERVER){
  testDll();
  console.log(`Starting dev server on: http://${HOST}:${PORT}`);
  module.exports = webpackMerge({}, defaultConfig, commonConfig, devConfig);
}

/*
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    //module.exports = require('./config/webpack.prod')({env: 'production'});
    break;
  case 'test':
  case 'testing':
    //module.exports = require('./config/webpack.test')({env: 'test'});
    break;
  case 'dev':
  case 'development':
  default:
    //module.exports = require('./config/webpack.dev')({env: 'development'});
    //module.exports = webpackMerge({}, dllConfig);
    module.exports = webpackMerge({}, defaultConfig, commonConfig);
}
*/
