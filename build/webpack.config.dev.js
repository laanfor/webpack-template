const path = require('path')
const fs = require('fs')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { merge } = require('webpack-merge')

const commonConfig = require('./webpack.common')

const devConfig = {
  mode: 'development',
  output: {
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
  },
  devServer: {
    open: true,
    hot: true,
    port: 8081,
    historyApiFallback: true,
    host: '0.0.0.0',
    // proxy: {
    //   '/api': {
    //     target: "",
    //     secure: false,
    //     pathRewrite: { '^/api': '' },
    //   },
    // },
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(less|css)?$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 2,
              workerParallelJobs: 50,
            },
          },
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                mode: 'global',
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
}

module.exports = merge(commonConfig, devConfig)
