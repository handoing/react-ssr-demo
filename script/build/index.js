const { clientOnly } = require('../utils');

if (clientOnly()) {
  require('./client');
} else {
  require('./ssr');
}
