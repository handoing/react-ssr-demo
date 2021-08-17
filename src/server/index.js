import { render } from './utils';
import express from 'express'

const app = express();
app.use(express.static('build'));

app.use('*', function(req, res, next) {
  res.send(render(req));
})

app.listen(3001, () => {
  console.log('listen on port 3001')
})