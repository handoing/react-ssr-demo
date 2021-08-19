import express from 'express';
import chalk from 'chalk';
import open from 'open';
import manifestHelpers from 'express-manifest-helpers';
import serverRenderer from './middleware/serverRenderer';
import paths from '../../config/paths';
import { configureStore } from '../shared/redux/store';

const app = express();
const port = process.env.PORT || 8080;

app.use('/static', express.static(paths.clientBuild));

app.use(
  manifestHelpers({
    manifestPath: `${paths.clientBuild}/manifest.json`,
  })
);

app.use((req, res, next) => {
  res.locals.store = configureStore({});
  next();
});

app.use(serverRenderer());

app.listen(port, () => {
  console.log(
    `[${new Date().toLocaleString()}]`,
    chalk.blue(`App is running: http://localhost:${port}`)
  );
})

if (process.env.NODE_ENV === 'development') {
  open(`http://localhost:${port}`);
}