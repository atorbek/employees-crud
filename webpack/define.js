'use strict';

const {resolve} = require('path');

const build = resolve(__dirname, '../build');
const environment = process.env.NODE_ENV;
const needIframe = process.env.NEED_IFRAME;
const development = environment === 'development';
const production = environment === 'production';
const src = resolve(__dirname, '../src');

module.exports = {
  build,
  development,
  mode: environment,
  needIframe,
  production,
  src
};
