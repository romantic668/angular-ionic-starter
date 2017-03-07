const { root } = require('./helpers.js');

const {
  ContextReplacementPlugin,
  DefinePlugin,
  DllPlugin,
  DllReferencePlugin,
  ProgressPlugin,
  NoEmitOnErrorsPlugin,
  LoaderOptionsPlugin
} = require('webpack');

let config = Object.assign({});

config.entry = {
  app_assets: [root('./src/main.browser')],
  polyfill: [
    'sockjs-client',
    '@angularclass/hmr',
    'ts-helpers',
    'zone.js',
    'core-js/client/shim.js',
    'core-js/es6/reflect.js',
    'core-js/es7/reflect.js',
    'querystring-es3',
    'strip-ansi',
    'url',
    'punycode',
    'events',
    'webpack-dev-server/client/socket.js',
    'webpack/hot/emitter.js',
    'zone.js/dist/long-stack-trace-zone.js'
  ],
  vendor: [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/forms',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/platform-server',
    '@angular/router',
    '@ngrx/core',
    '@ngrx/core/add/operator/select.js',
    '@ngrx/effects',
    '@ngrx/router-store',
    '@ngrx/store',
    '@ngrx/store-devtools',
    '@ngrx/store-log-monitor',
    'ngrx-store-freeze',
    'ngrx-store-logger',
    'rxjs',      
  ]
};

config.plugins = [];
config.plugins.push(
  new DllPlugin({
  name: '[name]',
  path: root('dll/[name]-manifest.json'),
  })
);

config.output = {
  path: root('dll'),
  filename: '[name].dll.js',
  library: '[name]'
};  

module.exports = config;
