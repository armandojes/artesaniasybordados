import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Normalize } from 'styled-normalize'
import ThemeProvider from './theme'
import Alert from 'components/alert'
import Definers from './definers'
import Loading from 'components/loading'
import session from 'components/session'
import './styles.css'

// pages
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Cart from './pages/my-cart'
import Producst from './pages/products'
import About from './pages/about'

// admins pages
import Create from './pages/create'
import AdminArticles from './pages/admin_articles'
import Sales from './pages/sales'
import Sale from './pages/sale'

import MyShps from './pages/my_shops'
import Shop from './pages/shop'
import Article from './pages/articulo'
import Notifications from './pages/notification'
import Notification from 'components/notifications'
import Policy from './pages/policy'

const App = props => {
  return (
    <ThemeProvider>
      <Notification />
      <Definers />
      <Normalize />
      <Alert />
      <Loading />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/articulo/:id' exact component={Article} />
        <Route path='/mi-carrito' exact component={Cart} />
        <Route path='/articulos' exact component={Producst} />
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <Route path='/notice-of-privacy' exact component={Policy} />
        <Route path='/acerca-de-nosotros' exact component={About} />

        <Route path='/admin/create' exact component={Create} />
        <Route path='/admin/sale/:id' exact component={Sale} />
        <Route path='/admin/sales' exact component={Sales} />
        <Route path='/admin/articles' exact component={AdminArticles} />

        <Route path='/mis-compras' exact component={MyShps} />
        <Route path='/compra/:id' exact component={Shop} />
        <Route path='/notificaciones' exact component={Notifications} />
        <Route path='/admin' exact component={session(props => <Redirect to='/admin/articles' />)} />
      </Switch>
    </ThemeProvider>
  )
}

export default App
