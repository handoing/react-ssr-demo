const { merge } = require('webpack-merge');
const config = require('./base');
const paths = require('../../paths');

const clientConfig = {
  mode: 'development',
}

module.exports = merge(config, clientConfig);