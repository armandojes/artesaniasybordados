/* eslint-disable react/prop-types */
import styled from 'styled-components'
import ButtonMaterial from '@material-ui/core/Button'
import { Hidden, Typography, Menu as MenuMaterial } from '@material-ui/core'
import React, { useState } from 'react'
import { Link as LinkBase } from 'react-router-dom'
import { MoreVert } from '@material-ui/icons'

export const Text = styled.div`
  font-size: ${props => props.fontSize ? props.fontSize : '1em'};
  text-align: ${props => props.align || 'left'};
  line-height: 1.4em;
`
export const Paper = styled.div`
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;
`
export const SectionTitle = styled('h2')`
  font-size: 1.3em;
  text-align: ${props => props.align || 'left'};
`
export const FullWidthCentered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`
export const FlexCentered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${props => props.minHeight || '0px'};
`
export const Flex = styled.div`
  display: flex;
`
export const Button = props => (
  <>
    <Hidden smUp>
      <ButtonMaterial color='primary' variant='outlined' style={{ textTransform: 'none' }} size='small' {...props} />
    </Hidden>
    <Hidden xsDown>
      <ButtonMaterial color='primary' variant='outlined' style={{ textTransform: 'none' }} size='medium' {...props} />
    </Hidden>
  </>
)

export const Link = styled(LinkBase)`
  color: inherit;
  text-decoration: none;`

export const TitlePage = (props) => (
  <Typography color='primary' variant='h4' {...props} style={{ marginTop: '10px', marginBottom: '15px' }} />
)

export const TitleNotFound = (props) => (
  <Typography variant='h4' {...props} style={{ color: 'red' }} />
)

export const Menu = props => {
  const [element, setElement] = useState(null)

  const ToogleMenu = event => {
    element ? setElement(null) : setElement(event.currentTarget)
  }

  return (
    <div {...props} onClick={ToogleMenu}>
      <MoreVert />
      <MenuMaterial open={!!element} anchorEl={element}>
        {props.children}
      </MenuMaterial>
    </div>
  )
}

// M a i n   C o m p o n e n t s
export const ResponsiveFontsSize = styled.div`
  font-size: 1rem;
  @media screen and (max-width:1750px) {
    font-size: .95rem;
  }
  @media screen and (max-width:1600px) {
    font-size: .85rem;
  }
  @media screen and (max-width:1500px) {
    font-size: .80rem;
  }
  @media screen and (max-width:1300px) {
    font-size: .75rem;
  }
  @media screen and (max-width:1200px) {
    font-size: .75rem;
  }
  @media screen and (max-width:1100px) {
    font-size: .7rem;
  }
`
