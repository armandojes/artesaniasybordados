/* eslint-disable react/jsx-closing-bracket-location */
import Layout from 'components/layout'
import React from 'react'
import { Hidden } from '@material-ui/core'
import styled from 'styled-components'
import Menu from './menu'
import { object, oneOfType, array, element, string } from 'prop-types'

const LayoutUser = props => {
  return (
    <Layout>
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
    </Layout>
  )
}
LayoutUser.propTypes = {
  children: oneOfType([string, element, array, object])
}

const ContainerBody = styled.section`
  display: flex;
`

const MenuWrapper = styled.div`
  width: 20%;
  margin-right: 20px;
  
`
const BodyWrapper = styled.div`
  width: 80%;
  @media (max-width:960px) {
    width: 100%;
  }
`

export default LayoutUser
