const { merge } = require('webpack-merge');
const config = require('./base');
const paths = require('../../paths');

const clientConfig = {
  mode: 'production',
  target: 'node',
  entry: paths.srcServer,
  output: {
    filename: 'index.js',
    path: paths.serverBuild
  },
  stats: {
    assets: false,
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    children: false,
    colors: true,
    hash: false,
    modules: false,
    performance: false,
    reasons: false,
    timings: true,
    version: false,
  },
}

module.exports = merge(config, clientConfig);