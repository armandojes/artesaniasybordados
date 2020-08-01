import React from 'react'
import { SwipeableDrawer, Box, useMediaQuery } from '@material-ui/core'
import styled from 'styled-components'
import Menu from './menu'
import { func } from 'prop-types'

const SwipeableDrawerStyled = styled(SwipeableDrawer)`
  
`

const Drawwer = props => {
  const shoudRender = useMediaQuery('(max-width:959px)')

  if (!shoudRender) return null

  return (
    <SwipeableDrawerStyled {...props} direction anchor='right' onClick={props.onClose}>
      <Box p={5} style={{ width: '80vw', boxSizing: 'border-box', maxWidth: '400px' }}>
        <Menu {...props} />
      </Box>
    </SwipeableDrawerStyled>
  )
}

export default Drawwer

Drawwer.propTypes = {
  onClose: func
}
