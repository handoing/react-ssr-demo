import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from '../pages/Home';
import Login from '../pages/Login';

const routes = [
  {
    path: '/',
    name: 'home',
    Component: Home,
  },
  {
    path: '/login',
    name: 'login',
    Component: Login,
  }
];

export default (
  <Switch>
    {routes.map(({ name, path, Component }, key) => {
      return (
        <Route
          exact
          path={path}
          key={key}
          render={props => <Component {...props} />}
        ></Route>
      );
    })}
  </Switch>
)