import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import Routes from '../shared/routes'
import { configureStore } from '../shared/redux/store';

const store = window.store || configureStore({
  initialState: window.__PRELOADED_STATE__,
});

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {Routes}
      </BrowserRouter>
    </Provider>
  )
}
ReactDom.hydrate(<App />, document.getElementById('root'))