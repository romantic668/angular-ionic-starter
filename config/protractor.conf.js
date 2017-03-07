require('ts-node/register');
const ports = require('./constants')
const helpers = require('./helpers');

let port;
helpers.hasProcessFlag('universal') ? port = ports.UNIVERSAL_PORT : port = ports.E2E_PORT;

exports.config = {
  baseUrl: `http://localhost:${port}/`,
  specs: [
    helpers.root('e2e/**/**.e2e.ts'),
    helpers.root('e2e/**/*.e2e.ts'),
    helpers.root('src/**/**.e2e.ts'),
    helpers.root('src/**/*.e2e.ts')
  ],
  exclude: [],

  framework: 'jasmine2',

  allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000
  },
  directConnect: true,

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true']
    }
  },

  onPrepare: function() {
    browser.ignoreSynchronization = true;
  },

  useAllAngular2AppRoots: true
};

if(process.env.TRAVIS){
  config.capabilities = {
    'browserName': 'firefox',
    'marionette': false
  }
}