const webpack = require('webpack');
const { merge } = require('webpack-merge');
const config = require('./base');

const clientConfig = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'inline-cheap-module-source-map',
}

module.exports = merge(config, clientConfig);