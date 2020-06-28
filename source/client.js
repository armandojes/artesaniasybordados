import React from 'react'
import { render } from 'react-dom'
import App from './app/app'
import { BrowserRouter } from 'react-router-dom'
import configureStore from 'flux/configure_store'
import { Provider } from 'react-redux'

const store = configureStore()

const Client = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

render(<Client />, document.getElementById('render_target'))
