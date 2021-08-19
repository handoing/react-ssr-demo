import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ssrPrepass from 'react-ssr-prepass';
import { HelmetProvider } from 'react-helmet-async';
import paths from '../../../config/paths';
import Routes from '../../shared/routes';

const helmetContext = {};

const checkToken = token => Boolean(token);

const HTML = ({ children, css = [], scripts = [], state = '{}', helmetContext: { helmet } }) => (
  <html lang="">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="referrer" content="always" />
      <meta name="renderer" content="webkit" />
      {helmet.base.toComponent()}
      {helmet.meta.toComponent()}
      {helmet.title.toComponent()}
      {css.map((href) => (<link key={href} rel="stylesheet" href={href} />))}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__PRELOADED_STATE__ = ${state}`,
        }}
      />
    </head>
    <body>
      <div id="root">{children}</div>
      {scripts.map((src) => (<script key={src} src={src} />))}
    </body>
  </html>
);

const serverRenderer = () => async (req, res) => {
  const token = req.cookies['token'];

  if (checkToken(token)) {
    return res.sendFile(path.join(paths.clientBuild, 'index.html'));
  }

  const state = JSON.stringify(res.locals.store.getState());
  const AppMain = (
    <Provider store={res.locals.store}>
      <StaticRouter location={req.url} >
        <HelmetProvider context={helmetContext}>
          {Routes}
        </HelmetProvider>
      </StaticRouter>
    </Provider>
  );

  await ssrPrepass(AppMain, (element, instance) => {
    if (instance && instance.serverFetchData) {
      return instance.serverFetchData(req, res);
    }
  });

  return res.send(`<!DOCTYPE html>${renderToString(
    <HTML
      state={state}
      css={[
        res.locals.assetPath('bundle.css')
      ]}
      scripts={[
        res.locals.assetPath('bundle.js'),
      ]}
      helmetContext={helmetContext}
    >
      {AppMain}
    </HTML>
  )}`);
};

export default serverRenderer;