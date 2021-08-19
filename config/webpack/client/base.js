const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { clientOnly } = require('../../../script/utils');
const paths = require('../../paths');

const cssModuleRegex = /\.module\.css$/;

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = {
  name: 'client',
  target: 'web',
  entry: {
    'bundle': [
      paths.srcClient
    ],
  },
  output: {
    filename: '[name].js',
    path: paths.clientBuild,
    publicPath: paths.publicPath
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
          MiniCssExtractPlugin.loader,
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
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      __SERVER__: !clientOnly(),
      __BROWSER__: clientOnly(),
    }),
    new WebpackManifestPlugin({
      fileName: 'manifest.json',
    }),
    ...(clientOnly() ? [
      new HtmlWebpackPlugin({
        filename: path.join(paths.clientBuild, 'index.html'),
        inject: true,
        template: paths.appHtml,
      }),
    ] : [])
  ],
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
    reasons: false,
    timings: true,
    version: false,
  }
}