import React from 'react'
import { string, oneOfType, array, object, element } from 'prop-types'
import Header from 'components/header'
import Footer from 'components/footer'
import { Grid, Hidden } from '@material-ui/core'

const Layout = props => {
  return (
    <>
      <Header />
      <div style={{ overflow: 'hidden' }}>
        <Grid container spacing={2}>
          <Hidden smDown>
            <Grid item lg={2} md={3}>
              <div style={{ background: '#7fd0ff', minHeight: '100vh' }} />
            </Grid>
          </Hidden>
          <Grid item xs={12} lg={10} md={9}>
            {props.children}
          </Grid>
        </Grid>
      </div>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: oneOfType([string, array, object, element])
}
export default Layout
