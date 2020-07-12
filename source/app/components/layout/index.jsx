import React from 'react'
import { string, oneOfType, array, object, element } from 'prop-types'
import Header from 'components/header'
import HeaderMobile from '../header_mobile'
import Footer from 'components/footer'
import { Hidden } from '@material-ui/core'

const Layout = props => {
  return (
    <>
      <Hidden xsDown>
        <Header />
      </Hidden>
      <Hidden smUp>
        <HeaderMobile />
      </Hidden>
      {props.children}
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: oneOfType([string, array, object, element])
}
export default Layout
