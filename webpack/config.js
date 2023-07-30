'use strict';

const define = require('./define');
const loaders = require('./loaders');
const localIp = require('my-local-ip');
const plugins = require('./plugins');
const resolve = require('./resolve');

module.exports = {
  devServer: {
    host: localIp()
  },
  devtool: 'source-map',
  entry: {
    'index': ['./src/index.tsx']
  },
  mode: define.mode,
  module: loaders,
  output: {
    filename: '[hash].js',
    path: define.build
  },
  plugins,
  resolve,
  target: define.development ? 'web' : 'browserslist'
};
