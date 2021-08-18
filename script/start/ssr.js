const webpack = require('webpack');
const nodemon = require('nodemon');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const getConfig = require('../../config/webpack');
const paths = require('../../config/paths.js');
const { compilerPromise, logMessage } = require('../utils');

const DEV_SERVER_HOST = process.env.DEV_SERVER_HOST || 'http://localhost';
const WEBPACK_PORT =
  process.env.WEBPACK_PORT ||
  (!isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) + 1 : 8081);
const webpackConfig = getConfig(process.env.NODE_ENV || 'development');

const app = express();

const start = async () => {
  const [clientConfig, serverConfig] = webpackConfig;
  const publicPath = clientConfig.output.publicPath;

  clientConfig.output.publicPath = [`${DEV_SERVER_HOST}:${WEBPACK_PORT}`, publicPath]
    .join('/')
    .replace(/([^:+])\/+/g, '$1/');

  serverConfig.output.publicPath = [`${DEV_SERVER_HOST}:${WEBPACK_PORT}`, publicPath]
    .join('/')
    .replace(/([^:+])\/+/g, '$1/');

  const [clientCompiler, serverCompiler] = webpack([clientConfig, serverConfig]).compilers;
  const clientPromise = compilerPromise('client', clientCompiler);
  const serverPromise = compilerPromise('server', serverCompiler);
  const watchOptions = {
    ignored: /node_modules/,
    stats: clientConfig.stats,
  }

  app.use(webpackDevMiddleware(clientCompiler, { writeToDisk: true }));
  app.listen(WEBPACK_PORT);

  serverCompiler.watch(watchOptions, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(serverConfig.stats));
      return;
    }

    if (error) {
      logMessage(error, 'error');
    }

    if (stats.hasErrors()) {
      const info = stats.toJson();
      const errors = info.errors[0];
      logMessage(errors, 'error');
    }
  });

  try {
    await serverPromise;
    await clientPromise;
  } catch (error) {
    logMessage(error, 'error');
  }

  serverModuleWatch();
}

function serverModuleWatch() {
  const script = nodemon({
    script: paths.serverBuild,
    ignore: ['src', 'scripts', 'config', './*.*', 'build/client', '**/locales', '**/tmp'],
    delay: 200,
  });

  script.on('restart', () => {
    logMessage('Server side app has been restarted.', 'warning');
  });

  script.on('quit', () => {
    console.log('Process ended');
    process.exit();
  });

  script.on('error', () => {
    logMessage('An error occured. Exiting', 'error');
    process.exit(1);
  });
}

start();