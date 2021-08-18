const path = require('path');

const appDirectory = process.cwd();
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const paths = {
  appHtml: resolveApp('config/webpack/template.html'),
  clientBuild: resolveApp('build/client'),
  serverBuild: resolveApp('build/server'),
  src: resolveApp('src'),
  srcClient: resolveApp('src/client'),
  srcServer: resolveApp('src/server'),
  srcShared: resolveApp('src/shared'),
  publicPath: '/static/',
};

module.exports = paths;
