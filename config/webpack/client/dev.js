const { merge } = require('webpack-merge');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const config = require('./base');
const paths = require('../../paths');

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
  plugins: [
    new WebpackManifestPlugin({
      fileName: 'manifest.json',
    })
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