import React, { Fragment } from 'react'
import { List, ListItem, ListItemText, ListItemIcon, Divider, Box, Hidden } from '@material-ui/core'
import { menu } from '../../constants'
import styled from 'styled-components'
import useHeightHeader from 'hooks/useHeightHeader'
import { useHistory, useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { ShoppingBasket, ExitToApp, SupervisorAccount, Home, ViewList, Info, ModeComment, LocalOffer } from '@material-ui/icons'
import { logOut } from 'core/user'
import ActionUser from './ActionUserLogout'
import { HashLink } from 'react-router-hash-link'

const Content = styled.aside`
  position: sticky;
  top: 0px;
  max-height: ${props => 'calc(100vh - ' + props.$headerHeight + 'px)'};
  overflow-x: hidden;
  overflow-y: scroll;
  &:hover {
    ::-webkit-scrollbar {
      display: initial;
    }
  }
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    display: none;
  }

  ::-webkit-scrollbar:vertical {
    width: 8px;
  }

  ::-webkit-scrollbar:horizontal {
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #cdcdcd;
    border-radius: 10px;
  }
  svg {
    color: #d891efa6;
  }
`

const ListItemStyled = styled(ListItem)`
  border-radius: 15px!important;
  background: ${props => props.$selected ? '#9767cb1f!important' : 'transparent!important'};
  :hover {
    background: ${props => props.$selected ? '#9767cb1f!important' : 'transparent!important'};
    color: #9767CB;
  }
`
const Menu = props => {
  const top = useHeightHeader()
  const history = useHistory()
  const { state = {} } = useLocation()
  const session = useSelector(state => state.session)

  const setSection = data => {
    console.log(props)
    history.replace({ pathname: '/articulos', state: { [data.keyname]: data.value } })
  }

  const setSubSection = (section, subSection) => {
    history.replace({
      pathname: '/articulos',
      state: {
        [section.keyname]: section.value,
        [subSection.keyname]: subSection.value
      }
    })
  }

  const handleRedirect = pathname => event => {
    history.push(pathname)
  }

  return (
    <Content style={{ top }} $headerHeight={top}>
      <List>
        <Hidden mdUp>
          <ActionUser />
        </Hidden>
        {menu.map((section, index) => (
          <Fragment key={index}>
            <ListItemStyled button onClick={event => setSection(section)} $selected={state[section.keyname] === section.value && !state.subcategory}>
              <ListItemIcon>
                <LocalOffer />
              </ListItemIcon>
              <ListItemText variant='subtitle1'>{section.label}</ListItemText>
            </ListItemStyled>
            {((state.category === section.value && section.keyname === 'category' && !!section.filters.length) || (state.gender === section.value && section.keyname === 'gender' && !!section.filters.length)) && (
              <Box pl={2}>
                <List>
                  {section.filters.map((subSection, index) => (
                    <ListItemStyled button key={index} onClick={event => setSubSection(section, subSection)} $selected={state[subSection.keyname] === subSection.value}>
                      <ListItemIcon>
                        <LocalOffer />
                      </ListItemIcon>
                      <ListItemText varian='subtitle2'>{subSection.label}</ListItemText>
                    </ListItemStyled>
                  ))}
                </List>
              </Box>
            )}
          </Fragment>
        ))}
        <Hidden mdUp>
          <>
            <Divider />
            <ListItemStyled button onClick={handleRedirect('/')}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText variant='subtitle1'>Inicio</ListItemText>
            </ListItemStyled>
            <ListItemStyled button onClick={handleRedirect('/articulos')}>
              <ListItemIcon>
                <ViewList />
              </ListItemIcon>
              <ListItemText variant='subtitle1'>Galeria</ListItemText>
            </ListItemStyled>
            <ListItemStyled button onClick={handleRedirect('/acerca-de-nosotros')}>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <ListItemText variant='subtitle1'>Quienes somos</ListItemText>
            </ListItemStyled>
            <HashLink to='/#contacto'>
              <ListItemStyled button>
                <ListItemIcon>
                  <ModeComment />
                </ListItemIcon>
                <ListItemText variant='subtitle1'>Contáctanos</ListItemText>
              </ListItemStyled>
            </HashLink>
          </>
        </Hidden>
        {session && typeof session === 'object' && (
          <>
            <Divider />
            {!!session && session.admin && (
              <ListItemStyled button onClick={handleRedirect('/admin')}>
                <ListItemIcon>
                  <SupervisorAccount />
                </ListItemIcon>
                <ListItemText variant='subtitle1'>Admin </ListItemText>
              </ListItemStyled>
            )}
            <ListItemStyled button onClick={handleRedirect('/mis-compras')}>
              <ListItemIcon>
                <ShoppingBasket />
              </ListItemIcon>
              <ListItemText variant='subtitle1'>Mis compras </ListItemText>
            </ListItemStyled>
            <ListItemStyled button onClick={event => logOut()}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText variant='subtitle1'>Cerrar session </ListItemText>
            </ListItemStyled>
          </>
        )}
      </List>
    </Content>
  )
}

export default Menu
