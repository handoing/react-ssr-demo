import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createRootReducer from '../reducer';
import home from './home';

const isProduction = process.env.NODE_ENV !== 'development';

const initialData = {
  home,
};

const rootReducer = createRootReducer();

export const configureStore = ({ initialState = initialData, middleware = [] }) => {
  const devtools =
    typeof window !== 'undefined' &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: [] });

  const composeEnhancers = devtools || compose;

  const store = createStore(
    rootReducer,
    initialState,
    isProduction
      ? applyMiddleware(...[thunk].concat(...middleware))
      : composeEnhancers(applyMiddleware(...[thunk].concat(...middleware)))
  );

  if (!isProduction) {
    if (module.hot) {
      module.hot.accept('../reducer', () => store.replaceReducer(require('../reducer').default));
    }
  }

  return store;
};

export default configureStore;
