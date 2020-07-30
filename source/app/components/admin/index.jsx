import React from 'react'
import { string, oneOfType, array, object, element } from 'prop-types'
import styled from 'styled-components'
import Menu from './menu'
import { Hidden } from '@material-ui/core'
import LayoutWrapper from 'components/layout'
const ContainerBody = styled.section`
  display: flex;
`

const MenuWrapper = styled.div`
  border: 1px dashed #cdcdcd;
  width: 20%;
  margin-right: 20px;
  
`
const BodyWrapper = styled.div`
  border: 1px dashed #cdcdcd;
  width: 80%;
  @media (max-width:959px) {
    width: 100%;
  }
`

const Layout = props => {
  return (
    <LayoutWrapper>
      <ContainerBody>
        <Hidden smDown>
          <MenuWrapper>
            <Menu />
          </MenuWrapper>
        </Hidden>
        <BodyWrapper>
          {props.children}
        </BodyWrapper>
      </ContainerBody>
    </LayoutWrapper>
  )
}

Layout.propTypes = {
  children: oneOfType([string, array, object, element])
}

export default Layout
