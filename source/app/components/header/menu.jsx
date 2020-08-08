import React from 'react'
import { Menu, Box, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { useHistory } from 'react-router'
import { ShoppingBasket, ExitToApp, SupervisorAccount } from '@material-ui/icons'
import { logOut } from 'core/user'
import { useSelector } from 'react-redux'

const MenuComponent = props => {
  const history = useHistory()
  const session = useSelector(state => state.session)

  const handleRedirect = pathname => event => {
    history.push(pathname)
  }

  return (
    <Menu {...props}>
      <Box p={3}>
        <ListItem button onClick={handleRedirect('/mis-compras')}>
          <ListItemIcon>
            <ShoppingBasket />
          </ListItemIcon>
          <ListItemText variant='subtitle1'>Mis compras </ListItemText>
        </ListItem>
        {!!session && session.admin && (
          <ListItem button onClick={handleRedirect('/admin')}>
            <ListItemIcon>
              <SupervisorAccount />
            </ListItemIcon>
            <ListItemText variant='subtitle1'>Admin</ListItemText>
          </ListItem>
        )}
        <ListItem button onClick={event => logOut()}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText variant='subtitle1'>Cerrar session </ListItemText>
        </ListItem>
      </Box>
    </Menu>
  )
}

export default MenuComponent
