const { merge } = require('webpack-merge');
const config = require('./base');

const clientConfig = {
  mode: 'production',
}

module.exports = merge(config, clientConfig);