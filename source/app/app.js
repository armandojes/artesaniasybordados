import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Normalize } from 'styled-normalize'
import './styles.css'

// pages
import Home from './pages/home'
import Login from './pages/login'

const App = props => {
  return (
    <>
      <Normalize />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' exact component={Login} />
      </Switch>
    </>
  )
}

export default App
