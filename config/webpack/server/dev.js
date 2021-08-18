const { merge } = require('webpack-merge');
const config = require('./base');
const paths = require('../../paths');

const clientConfig = {
  name: 'server',
  mode: 'development',
  target: 'node',
  entry: {
    'index': paths.srcServer,
  },
  output: {
    filename: '[name].js',
    path: paths.serverBuild
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
    performance: false,
    reasons: false,
    timings: true,
    version: false,
  },
}

module.exports = merge(config, clientConfig);