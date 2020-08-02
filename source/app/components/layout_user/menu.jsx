import React, { Fragment } from 'react'
import { List, ListItem, ListItemText, ListItemIcon, Divider, Box } from '@material-ui/core'
import { menu } from '../../constants'
import styled from 'styled-components'
import useHeightHeader from 'hooks/useHeightHeader'
import { useHistory, useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { ShoppingBasket, ExitToApp } from '@material-ui/icons'
import { logOut } from 'core/user'

const Content = styled.aside`
  position: sticky;
  top: 0px;
  max-height: ${props => 'calc(100vh - ' + props.$headerHeight + 'px)'};
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
        {menu.map((section, index) => (
          <Fragment key={index}>
            <ListItem button onClick={event => setSection(section)}>
              <ListItemText variant='subtitle1'>{section.label}</ListItemText>
            </ListItem>
            {((state.category === section.value && section.keyname === 'category' && !!section.filters.length) || (state.gender === section.value && section.keyname === 'gender' && !!section.filters.length)) && (
              <Box pl={2}>
                <List>
                  {section.filters.map((subSection, index) => (
                    <ListItem button key={index} onClick={event => setSubSection(section, subSection)}>
                      <ListItemText varian='subtitle2'>{subSection.label}</ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Fragment>
        ))}
        {session && typeof session === 'object' && (
          <>
            <Divider />
            <ListItem button onClick={handleRedirect('/mis-compras')}>
              <ListItemIcon>
                <ShoppingBasket />
              </ListItemIcon>
              <ListItemText variant='subtitle1'>Mis compras </ListItemText>
            </ListItem>
            <ListItem button onClick={event => logOut()}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText variant='subtitle1'>Cerrar session </ListItemText>
            </ListItem>
          </>
        )}
      </List>
    </Content>
  )
}

export default Menu
