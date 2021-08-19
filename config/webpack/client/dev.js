const { merge } = require('webpack-merge');
const config = require('./base');

const clientConfig = {
  mode: 'development',
  devtool: 'inline-cheap-module-source-map',
}

module.exports = merge(config, clientConfig);