import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Normalize } from 'styled-normalize'
import ThemeProvider from './theme'
import Alert from 'components/alert'
import Definers from './definers'

import './styles.css'

// pages
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Cart from './pages/my-cart'
import Producst from './pages/products'

// admins pages
import Create from './pages/create'
import AdminArticles from './pages/admin_articles'

const App = props => {
  return (
    <ThemeProvider>
      <Definers />
      <Normalize />
      <Alert />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/articulos' exact component={Producst} />
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <Route path='/admin/create' exact component={Create} />
        <Route path='/admin/articles' exact component={AdminArticles} />
        <Route path='/mi-carrito' exact component={Cart} />
      </Switch>
    </ThemeProvider>
  )
}

export default App
