import React from 'react'
import { string, oneOfType, array, object, element, bool } from 'prop-types'
import styled from 'styled-components'

const Container = props => {
  return (
    <GridStyled {...props}>
      {props.children}
    </GridStyled>
  )
}

Container.propTypes = {
  children: oneOfType([string, array, object, element]),
  page: bool
}

const GridStyled = styled('div')`
  padding: ${props => props.$page ? '10px 20px' : '0px 20px'};
  min-height: ${props => props.$page ? '80vh' : 'auto'};
`

export default Container
