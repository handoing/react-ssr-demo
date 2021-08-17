import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Router from '../shared/routes'

const App = () => {
  return (
    <BrowserRouter>
      {Router}
    </BrowserRouter>
  )
}
ReactDom.hydrate(<App />, document.getElementById('root'))