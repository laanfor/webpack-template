process.env.NODE_ENV = process.env.NODE_ENV || 'prod'

const path = require('path')
const fs = require('fs')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const commonConfig = require('./webpack.common')

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[contenthash:5].js',
    chunkFilename: 'js/[name].[contenthash:5].chunk.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:5].css',
      chunkFilename: 'css/[name].[contenthash:5].chuck.css',
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(less|css)?$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
          },
        },],
      },
    ],
  },
}

// if (config.build.bundleAnalyzerReport) {
//   const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//     .BundleAnalyzerPlugin
//   prodConfig.plugins.push(new BundleAnalyzerPlugin())
// }

module.exports = merge(commonConfig, prodConfig)
