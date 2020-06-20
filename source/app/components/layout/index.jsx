import React from 'react'
import { string, oneOfType, array, object, element } from 'prop-types'
import Header from 'components/header'

const Layout = props => {
  return (
    <>
      <Header />
      {props.children}
    </>
  )
}

Layout.propTypes = {
  children: oneOfType([string, array, object, element])
}
export default Layout
