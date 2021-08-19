const webpack = require('webpack');
const chalk = require('chalk');
const getConfig = require('../../config/webpack');
const { compilerPromise, logMessage } = require('../utils');

const webpackConfig = getConfig(process.env.NODE_ENV || 'development');

const uploadMainFest = async () => {};

const build = async () => {

  const [clientConfig, serverConfig] = webpackConfig;
  const [clientCompiler, serverCompiler] = webpack([clientConfig, serverConfig]).compilers;
  const clientPromise = compilerPromise('client', clientCompiler);
  const serverPromise = compilerPromise('server', serverCompiler);

  serverCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(serverConfig.stats));
      return;
    }
    console.error(chalk.red(stats.compilation.errors));
  });

  clientCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(clientConfig.stats));
      return;
    }
    console.error(chalk.red(stats.compilation.errors));
  });

  try {
    await serverPromise;
    await clientPromise;
    await uploadMainFest();
    logMessage('Done!', 'info');
    process.exit(0);
  } catch (error) {
    logMessage(error, 'error');
  }
};

build();
