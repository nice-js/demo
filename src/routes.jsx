import React from 'react'
import {Route, Router, IndexRoute} from 'react-router'
import Home from './components/Home'

export default({history}) => (
  <Router history={history}>
    <Route path='/'>
      <Route path='home' component={Home}/>
      <IndexRoute component={Home}/>
    </Route>
  </Router>
)
