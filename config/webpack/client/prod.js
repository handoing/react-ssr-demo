const { merge } = require('webpack-merge');
const config = require('./base');
const paths = require('../../paths');

const clientConfig = {
  mode: 'production',
  entry: paths.srcClient,
  output: {
    filename: 'index.js',
    path: paths.clientBuild
  },
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