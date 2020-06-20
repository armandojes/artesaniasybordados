import React from 'react'
import { render } from 'react-dom'
import App from './app/app'
import { BrowserRouter } from 'react-router-dom'

const Client = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

render(<Client />, document.getElementById('render_target'))
