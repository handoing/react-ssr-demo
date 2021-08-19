const webpack = require('webpack');
const express = require('express');
const chalk = require('chalk');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const getConfig = require('../../config/webpack');
const paths = require('../../config/paths.js');
const { compilerPromise, logMessage } = require('../utils');

const DEV_SERVER_HOST = process.env.DEV_SERVER_HOST || 'http://localhost';
const PORT = process.env.PORT || 8080;
const webpackConfig = getConfig(process.env.NODE_ENV || 'development');

const app = express();

const start = async () => {
  const [clientConfig] = webpackConfig;

  const [clientCompiler] = webpack([clientConfig]).compilers;
  const clientPromise = compilerPromise('client', clientCompiler);

  app.use(webpackDevMiddleware(clientCompiler, { writeToDisk: true }));
  app.use(webpackHotMiddleware(clientCompiler));
  app.use('*', express.static(paths.clientBuild));

  try {
    await clientPromise;

    app.listen(PORT, () => {
      console.log(
        `[${new Date().toLocaleString()}]`,
        chalk.blue(
          `App is running: ${DEV_SERVER_HOST}:${PORT}`
        )
      );
    });
  } catch (error) {
    logMessage(error, 'error');
  }

}

start();