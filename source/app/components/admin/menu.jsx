import React from 'react'
import styled from 'styled-components'
import useHeightHeader from 'hooks/useHeightHeader'
import { List, ListItem, ListItemText } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const Content = styled.aside`
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
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

  const handleRedirect = data => () => {
    history.push(data)
  }

  return (
    <Content style={{ top }} $headerHeight={top}>
      <List>
        <ListItem button onClick={handleRedirect('/admin/articles')}>
          <ListItemText>Mis articulos</ListItemText>
        </ListItem>
        <ListItem button onClick={handleRedirect('/admin/create')}>
          <ListItemText>Publicar articulo</ListItemText>
        </ListItem>
      </List>
    </Content>
  )
}

export default Menu
