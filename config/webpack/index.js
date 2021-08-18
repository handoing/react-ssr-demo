module.exports = (env = 'production') => {
  if (env === 'development') {
    return [require('./client/dev'), require('./server/dev')];
  }
  return [require('./client/prod'), require('./server/prod')];
}
