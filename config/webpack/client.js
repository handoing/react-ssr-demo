const path = require('path');
const { merge } = require('webpack-merge');
const config = require('./base');

const clientConfig = {
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(process.cwd(), 'build/client')
  },
}

module.exports = merge(config, clientConfig);