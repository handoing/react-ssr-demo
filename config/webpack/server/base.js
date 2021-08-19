const path = require('path');
const nodeExternals = require('webpack-node-externals');
const paths = require('../../paths');

const cssModuleRegex = /\.module\.css$/;

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = {
  name: 'server',
  target: 'node',
  entry: {
    'index': paths.srcServer,
  },
  output: {
    filename: '[name].js',
    path: paths.serverBuild
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      },
      {
        test: cssModuleRegex,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: "[local]--[hash:base64:8]",
                exportLocalsConvention: "camelCaseOnly",
                namedExport: true,
              },
            },
          }
        ]
      }
    ]
  },
  externals: [ nodeExternals() ],
  resolve: {
    alias: {
      '@': resolve('../../../src/shared'),
      '#': resolve('../../../src/shared/assets'),
    },
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