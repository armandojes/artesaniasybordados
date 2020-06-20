import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Normalize } from 'styled-normalize'
import './styles.css'

// pages
import Home from './pages/home'

const App = props => {
  return (
    <>
      <Normalize />
      <Switch>
        <Route path='/' exact component={Home} />
      </Switch>
    </>
  )
}

export default App
