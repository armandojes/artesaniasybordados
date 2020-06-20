import React from 'react'
import { Grid } from '@material-ui/core'
import { string, oneOfType, array, object, element } from 'prop-types'

const Container = props => {
  return (
    <Grid container justify='center'>
      <Grid item xs={12} md={11} lg={10} xl={8}>
        {props.children}
      </Grid>
    </Grid>
  )
}

Container.propTypes = {
  children: oneOfType([string, array, object, element])
}

export default Container
