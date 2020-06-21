import React from 'react'
import { Grid } from '@material-ui/core'
import { string, oneOfType, array, object, element, bool } from 'prop-types'
import styled from 'styled-components'

const Container = props => {
  return (
    <GridStyled container justify='center' page={props.page}>
      <Grid item xs={12} md={11} lg={10} xl={8}>
        {props.children}
      </Grid>
    </GridStyled>
  )
}

Container.propTypes = {
  children: oneOfType([string, array, object, element]),
  page: bool
}

const GridStyled = styled(Grid)`
  padding: ${props => props.page ? '10px 10px' : '0px 10px'}
`

export default Container
