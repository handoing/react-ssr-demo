const webpack = require('webpack');
const nodemon = require('nodemon');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const getConfig = require('../../config/webpack');
const paths = require('../../config/paths.js');
const { compilerPromise, logMessage } = require('../utils');

const app = express();
const WEBPACK_PORT =
  process.env.WEBPACK_PORT ||
  (!isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) + 1 : 8081);

const DEV_SERVER_HOST = process.env.DEV_SERVER_HOST || 'http://localhost';

const webpackConfig = getConfig(process.env.NODE_ENV || 'development');

const replaceBundlePath = (clientConfig, serverConfig) => {
  const publicPath = clientConfig.output.publicPath;
  clientConfig.entry.bundle = [
    `webpack-hot-middleware/client?path=${DEV_SERVER_HOST}:${WEBPACK_PORT}/__webpack_hmr`,
    ...clientConfig.entry.bundle,
  ];
  clientConfig.output.publicPath = [`${DEV_SERVER_HOST}:${WEBPACK_PORT}`, publicPath]
    .join('/')
    .replace(/([^:+])\/+/g, '$1/');
  serverConfig.output.publicPath = [`${DEV_SERVER_HOST}:${WEBPACK_PORT}`, publicPath]
    .join('/')
    .replace(/([^:+])\/+/g, '$1/');
}

const start = async () => {
  const [clientConfig, serverConfig] = webpackConfig;

  replaceBundlePath(clientConfig, serverConfig);

  const [clientCompiler, serverCompiler] = webpack([clientConfig, serverConfig]).compilers;
  const clientPromise = compilerPromise('client', clientCompiler);
  const serverPromise = compilerPromise('server', serverCompiler);

  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    return next();
  });
  app.use(webpackDevMiddleware(clientCompiler, { writeToDisk: true }))
  app.use(webpackDevMiddleware(serverCompiler, { writeToDisk: true }))
  app.use(webpackHotMiddleware(clientCompiler))
  app.use('/static', express.static(paths.clientBuild));
  app.listen(WEBPACK_PORT);

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