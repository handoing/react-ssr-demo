const webpack = require('webpack');
const nodemon = require('nodemon');
const webpackDevMiddleware = require('webpack-dev-middleware');
const getConfig = require('../../config/webpack');
const paths = require('../../config/paths.js');
const { compilerPromise, logMessage } = require('../utils');

const webpackConfig = getConfig(process.env.NODE_ENV || 'development');

const start = async () => {
  const [clientConfig, serverConfig] = webpackConfig;
  const [clientCompiler, serverCompiler] = webpack([clientConfig, serverConfig]).compilers;
  const clientPromise = compilerPromise('client', clientCompiler);
  const serverPromise = compilerPromise('server', serverCompiler);

  webpackDevMiddleware(clientCompiler, { writeToDisk: true })
  webpackDevMiddleware(serverCompiler, { writeToDisk: true })

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