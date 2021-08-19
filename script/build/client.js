const webpack = require('webpack');
const chalk = require('chalk');
const getConfig = require('../../config/webpack');
const { compilerPromise, logMessage } = require('../utils');

const webpackConfig = getConfig(process.env.NODE_ENV || 'development');

const build = async () => {
  const [clientConfig] = webpackConfig;
  const [clientCompiler] = webpack([clientConfig]).compilers;
  const clientPromise = compilerPromise('client', clientCompiler);

  clientCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(clientConfig.stats));
      return;
    }
    console.error(chalk.red(stats.compilation.errors));
  });

  try {
    await clientPromise;
    logMessage('Done!', 'info');
    process.exit();
  } catch (error) {
    logMessage(error, 'error');
  }
};

build();
