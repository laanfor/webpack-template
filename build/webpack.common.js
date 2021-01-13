const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = {
  entry: {
    main: [
      './src/index.tsx',
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve('src'),
    },
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.font\.ts$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              importLoaders: 2,
            },
          },
          'postcss-loader',
          {
            loader: 'webfonts-loader',
            options: {
              publicPath: './',
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // onlyCompileBundledFiles: true,
              transpileOnly: true,
            },
          }],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)?$/,
        include: [path.resolve(__dirname, '../src/assets/fonts')],
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[name].[contenthash:5].[ext]',
        },
      },
      {
        test: /\.(jpe?g|svg|png|gif)?$/,
        exclude: [path.resolve(__dirname, '../src/assets/fonts')],
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'assets/images/[name].[contenthash:5].[ext]',
        },
      },
      {
        test: /\.(xlsx|csv)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/static/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'index.html',
      // favicon: 'favicon.ico',
    }),
    new WebpackManifestPlugin({
      publicPath: ''
    })
  ],
};
