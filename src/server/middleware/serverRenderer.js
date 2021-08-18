import React from 'react'
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ssrPrepass from 'react-ssr-prepass';
import Routes from '../../shared/routes';

const HTML = ({ children, css = [], scripts = [], state = '{}'}) => (
  <html lang="">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="referrer" content="always" />
      <meta name="renderer" content="webkit" />
      <title>react-ssr-demo</title>
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
  const state = JSON.stringify(res.locals.store.getState());
  const AppMain = (
    <Provider store={res.locals.store}>
      <StaticRouter location={req.url} >
        {Routes}
      </StaticRouter>
    </Provider>
  );

  await ssrPrepass(AppMain, (element, instance) => {
    if (instance && instance.serverFetchData) {
      return instance.serverFetchData(req, res);
    }
  });

  return res.send(`<!doctype html>${renderToString(
    <HTML
      state={state}
      css={[
        res.locals.assetPath('bundle.css')
      ]}
      scripts={[
        res.locals.assetPath('bundle.js'),
      ]}
    >
      {AppMain}
    </HTML>
  )}`);
};

export default serverRenderer;