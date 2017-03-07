/* tslint:disable: variable-name max-line-length */
/**
 * Try to not make your own edits to this file, use the constants folder instead.
 * If more constants should be added file an issue or create PR.
 */
//import 'ts-helpers';
require('ts-helpers');


const {
  DEV_PORT, PROD_PORT, UNIVERSAL_PORT, EXCLUDE_SOURCE_MAPS, HOST,
  USE_DEV_SERVER_PROXY, DEV_SERVER_PROXY_CONFIG, DEV_SERVER_WATCH_OPTIONS,
  DEV_SOURCE_MAPS, PROD_SOURCE_MAPS, STORE_DEV_TOOLS,
  MY_COPY_FOLDERS, MY_POLYFILL_DLLS, MY_VENDOR_DLLS, MY_CLIENT_PLUGINS, MY_CLIENT_PRODUCTION_PLUGINS,
  MY_CLIENT_RULES, MY_SERVER_RULES, MY_SERVER_INCLUDE_CLIENT_PACKAGES
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

const path = require('path');
const autoprefixer = require('autoprefixer');

const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const webpackMerge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const { hasProcessFlag, includeClientPackages, root, testDll } = require('./helpers.js');

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

if (DEV_SERVER) {
  testDll();
  console.log(`Starting dev server on: http://${HOST}:${PORT}`);
}

const CONSTANTS = {
  AOT: AOT,
  ENV: PROD ? JSON.stringify('production') : JSON.stringify('development'),
  HMR: HMR,
  HOST: JSON.stringify(HOST),
  PORT: PORT,
  STORE_DEV_TOOLS: JSON.stringify(STORE_DEV_TOOLS),
  UNIVERSAL: UNIVERSAL,
  CORDOVA: CORDOVA
};

const DLL_VENDORS = [
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
];

const COPY_FOLDERS = [
  { from: 'src/assets', to: 'assets' },
  ...MY_COPY_FOLDERS
];

if (!DEV_SERVER) {
  // COPY_FOLDERS.unshift({ from: 'src/index.ejs' });
} else {
  COPY_FOLDERS.push({ from: 'dll' });
}

let config = Object.assign({});

config.module = {
  rules: [
      { test: /\.js$/, loader: 'source-map-loader', exclude: [EXCLUDE_SOURCE_MAPS]},
      { test: /\.ts$/, loader: ['@angularclass/hmr-loader', 'awesome-typescript-loader?{configFileName: "tsconfig.webpack.json"}', 'angular2-template-loader', 'angular-router-loader?loader=system&genDir=compiled&aot=' + AOT]},
      { test: /\.scss$/, exclude: path.resolve('src/app'), loader: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] },
      { test: /\.scss$/, include: path.resolve('src/app'), loader: ['raw-loader', 'postcss-loader', 'sass-loader'] },
      { test: /\.(eot|svg|ttf|woff|woff2)(\?v=.*)?$/, loader: 'file-loader?name=fonts/[name].[ext]' }
  ]
};

config.plugins = [
  new ContextReplacementPlugin(
    /angular(\\|\/)core(\\|\/)@angular/,
    root('src'), // location of your src
    {
      // your Angular Async Route paths relative to this root directory
    }
  ),
  new ProgressPlugin(),
  new CheckerPlugin(),
  new DefinePlugin(CONSTANTS),
  new NamedModulesPlugin(),
  new HtmlWebpackPlugin({
    template: 'src/index.ejs',
    inject: false,
    cordova: CORDOVA,
    prod: PROD
  }),
  new LoaderOptionsPlugin({
    options: {
      resolve: {},
      postcss: [
        autoprefixer({
          browsers: [
            'last 2 versions',
            'iOS >= 8',
            'Android >= 4.4',
            'Explorer >= 11',
            'ExplorerMobile >= 11'
          ],
          cascade: false
        })
      ]
    }
  })
];

module.exports = config;


//module.exports = function (options) {
//  return commonConfig;
//}

/*
const commonConfig = function webpackConfig(){
  
  let config = Object.assign({});

  config.module = {
    rules: [
        { test: /\.js$/, loader: 'source-map-loader', exclude: [EXCLUDE_SOURCE_MAPS]},
        { test: /\.ts$/, loader: ['@angularclass/hmr-loader', 'awesome-typescript-loader?{configFileName: "tsconfig.webpack.json"}', 'angular2-template-loader', 'angular-router-loader?loader=system&genDir=compiled&aot=' + AOT]},
        { test: /\.scss$/, exclude: path.resolve('src/app'), loader: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] },
        { test: /\.scss$/, include: path.resolve('src/app'), loader: ['raw-loader', 'postcss-loader', 'sass-loader'] },
        { test: /\.(eot|svg|ttf|woff|woff2)(\?v=.*)?$/, loader: 'file-loader?name=fonts/[name].[ext]' }
    ]
  };

  config.plugins = [
    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      root('src'), // location of your src
      {
        // your Angular Async Route paths relative to this root directory
      }
    ),
    new ProgressPlugin(),
    new CheckerPlugin(),
    new DefinePlugin(CONSTANTS),
    new NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      inject: false,
      cordova: CORDOVA,
      prod: PROD
    }),
    new LoaderOptionsPlugin({
      options: {
        resolve: {},
        postcss: [
          autoprefixer({
            browsers: [
              'last 2 versions',
              'iOS >= 8',
              'Android >= 4.4',
              'Explorer >= 11',
              'ExplorerMobile >= 11'
            ],
            cascade: false
          })
        ]
      }
    })
  ];

  
  if (DLL) {
    config.plugins.push(
      new DllPlugin({
        name: '[name]',
        path: root('dll/[name]-manifest.json'),
      })
    );
  } else {
    config.plugins.push(
      new CopyWebpackPlugin(COPY_FOLDERS, { ignore: ['*dist_root/*'] }),
      new CopyWebpackPlugin([{ from: 'src/assets/dist_root' }])
    );
  }

  if (PROD) {
    config.plugins.push(
      new NoEmitOnErrorsPlugin(),
      new UglifyJsPlugin({
        beautify: false,
        comments: false
      }),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      })
    );
    if (!E2E && !WATCH && !UNIVERSAL) {
      config.plugins.push(
        // new BundleAnalyzerPlugin({analyzerPort: 5000})
      );
    }
  }
  
  return config;
} ();

*/
