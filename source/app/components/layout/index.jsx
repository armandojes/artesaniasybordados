import React from 'react'
import { string, oneOfType, array, object, element } from 'prop-types'
import Header from 'components/header'
import Footer from 'components/footer'

const Layout = props => {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: oneOfType([string, array, object, element])
}
export default Layout
