const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const config = require('./base');
const paths = require('../../paths');
const { clientOnly } = require('../../../script/utils');

const clientConfig = {
  name: 'client',
  mode: 'development',
  entry: {
    'bundle': paths.srcClient,
  },
  output: {
    filename: '[name].js',
    path: paths.clientBuild
  },
  plugins: clientOnly() ? [
    new HtmlWebpackPlugin({
      filename: path.join(paths.clientBuild, 'index.html'),
      inject: true,
      template: paths.appHtml,
    }),
    new webpack.DefinePlugin({
      __BROWSER__: clientOnly(),
    }),
    new WebpackManifestPlugin({
      fileName: 'manifest.json',
    }),
  ] : [
    new webpack.DefinePlugin({
      __BROWSER__: clientOnly(),
    }),
    new WebpackManifestPlugin({
      fileName: 'manifest.json',
    }),
  ],
  devtool: 'inline-cheap-module-source-map',
  stats: {
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    children: false,
    colors: true,
    hash: false,
    modules: false,
    reasons: false,
    timings: true,
    version: false,
  }
}

module.exports = merge(config, clientConfig);