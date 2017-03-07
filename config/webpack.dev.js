const { root } = require('./helpers.js');

const  {
  DEV_PORT, DEV_SERVER_WATCH_OPTIONS, DEV_SERVER_PROXY_CONFIG, USE_DEV_SERVER_PROXY
} = require('./constants');

const {
  ContextReplacementPlugin,
  DefinePlugin,
  DllPlugin,
  DllReferencePlugin,
  ProgressPlugin,
  NoEmitOnErrorsPlugin,
  LoaderOptionsPlugin
} = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const COPY_FOLDERS = [
  { from: root('src/assets'), to: 'assets' },
  { from: 'dll' }
];

let config = Object.assign({});

config.cache = true;
config.devtool = 'eval';

config.devServer = {
  contentBase:'./src',
  port: DEV_PORT,
  historyApiFallback: {
    disableDotRule: true,
  },
  stats: 'minimal',
  host: 'localhost',
  watchOptions: DEV_SERVER_WATCH_OPTIONS
};

if (USE_DEV_SERVER_PROXY) {
  Object.assign(config.devServer, {
    proxy: DEV_SERVER_PROXY_CONFIG
  });
}

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
  main: root('src/main.browser')
};

config.plugins = [];
config.plugins.push(
  new DllReferencePlugin({
    context: '.',
    manifest: require(root('./dll/polyfill-manifest.json'))
  }),
  new DllReferencePlugin({
    context: '.',
    manifest: require(root('./dll/vendor-manifest.json'))
  }),
  new CopyWebpackPlugin(COPY_FOLDERS, { ignore: ['*dist_root/*'] }),
  new CopyWebpackPlugin([{ from: root('src/assets/dist_root') }])  
);

config.output = {
  path: root('dist/client'),
  filename: 'index.js'
};

module.exports = config;
