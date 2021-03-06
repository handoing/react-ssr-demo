const chalk = require('chalk');

function logMessage(message, level = 'info') {
  const color =
    level === 'error'
      ? 'red'
      : level === 'warning'
      ? 'yellow'
      : level === 'info'
      ? 'blue'
      : 'white';
  console.log(`[${new Date().toLocaleString()}]`, chalk[color](message));
}

function clientOnly() {
  return process.argv.includes('--client-only')
}

function compilerPromise(name, compiler) {
  return new Promise((resolve, reject) => {
    compiler.hooks.compile.tap(name, () => {
      logMessage(`[${name}] Compiling `);
    });
    compiler.hooks.done.tap(name, (stats) => {
      if (!stats.hasErrors()) {
        return resolve();
      }
      return reject(`Failed to compile ${name}`);
    });
  });
}

module.exports = {
  logMessage,
  clientOnly,
  compilerPromise,
}