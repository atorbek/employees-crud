'use strict';

const {EnvironmentPlugin} = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {version} = require('../package.json');

const plugins = [
  new MiniCssExtractPlugin({
    chunkFilename: '[id].css',
    filename: '[hash].css'
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    meta: {
      version
    },
    template: './src/index.html'
  }),
  new EnvironmentPlugin({
    NODE_ENV: 'production',
    NEED_IFRAME: false,
    NEED_STUB: false,
    BASE_URL: ''
  })
];

module.exports = plugins;
