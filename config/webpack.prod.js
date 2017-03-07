const { root } = require('./helpers.js');

const EVENT = process.env.npm_lifecycle_event || '';
const CORDOVA = EVENT.includes('cordova');

const {
  ContextReplacementPlugin,
  DefinePlugin,
  ProgressPlugin,
  NoEmitOnErrorsPlugin,
  LoaderOptionsPlugin
} = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

let config = Object.assign({});

config.cache = true;
config.devtool = 'source-map';

config.performance = {
  hints: false
};

config.node = {
  global: true,
  process: true,
  Buffer: false,
  crypto: true,
  module: false,
  clearImmediate: false,
  setImmediate: false,
  clearTimeout: true,
  setTimeout: true
};

config.entry = {
  main: root('src/main.browser.aot')
};

config.plugins = [];
config.plugins.push(
  new CopyWebpackPlugin([{ from: root('src/assets'), to: 'assets' }], { ignore: ['*dist_root/*'] }),
  new CopyWebpackPlugin([{ from: root('src/assets/dist_root') }]), 
  new NoEmitOnErrorsPlugin(),
  new UglifyJsPlugin({
    beautify: false,
    comments: false
  })
);

if (!CORDOVA) {
  config.plugins.push(
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  );

  config.output = {
    path: root('dist/client'),
    filename: 'index.js'
  };
} else {
  config.output = {
    path: root('cordova/www'),
    filename: 'index.js'
  };
}

module.exports = config;
