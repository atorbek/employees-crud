'use strict';

const {EnvironmentPlugin} = require('webpack');
const GroovyWebpackPlugin = require('@nsmp/groovy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {needIframe} = require('./define');
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
    template: needIframe ? './src/iframe.html' : './src/index.html'
  }),
  new EnvironmentPlugin({
    NODE_ENV: 'production',
    NEED_IFRAME: false,
    NEED_STUB: false,
    BASE_URL: ''
  }),
  new GroovyWebpackPlugin({
    output: 'privateModules.xml',
    paths: [
      './rest/src/main/groovy/ru/naumen/modules/objectsLinksVisualizer/objectsLinksVisualizer.groovy'
    ],
    editBySuperusers: false
  })
];

if (needIframe) {
  plugins.push(new HtmlWebpackPlugin({
    filename: 'iframe.html',
    meta: {
      version
    },
    template: './src/index.html'
  }));
}

module.exports = plugins;
