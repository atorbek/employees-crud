'use strict';

const Autoprefixer = require('autoprefixer');
const define = require('./define');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  rules: [
    {
      exclude: /(node_modules|bower_components)/,
      test: /\.tsx?$/,
      use: {
        loader: 'ts-loader',
        options: {
          transpileOnly: define.development
        }
      }
    },
    {
      test: /\.(css|less)$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: ''
          }
        },
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[hash:base64:5]-[local]'
            },
            sourceMap: define.development
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              new Autoprefixer({
                browsers: [
                  '>1%',
                  'last 3 versions',
                  'ie > 8'
                ]
              })
            ],
            sourceMap: define.development
          }
        },
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true
            },
            sourceMap: define.development
          }
        }
      ]
    },
    {
      test: /\.(gif|png|jpg|jpeg|woff|woff2|ttf|eot|svg)$/,
      use: {
        loader: 'file-loader'
      }
    }
  ]
};
