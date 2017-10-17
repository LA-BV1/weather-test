import { Router, Route, hashHistory } from 'react-router'
import Weather from './components/Weather/Weather.jsx'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import React from 'react'

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={Weather} />
    <Route path='/:city' component={Weather} />
  </Router>,
  document.getElementById('root'))
