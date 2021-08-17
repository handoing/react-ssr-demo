import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../components/Home';
import Login from '../components/Login'

export default (
  <div>
    <div>
      <Link to="/">home</Link>
    </div>
    <div>
      <Link to="/login">login</Link>
    </div>
    <Route path='/' exact component={Home}></Route>
    <Route path='/login' exact component={Login}></Route>
  </div>
)