import React, { useState } from 'react'
import styled from 'styled-components'
import { ButtonBase, IconButton, Typography, Avatar as AvatarBase, Grid, Badge } from '@material-ui/core'
import { Menu, ShoppingCart } from '@material-ui/icons'
import { Button, Link } from 'components/main'
import { useSelector } from 'react-redux'
import MenuComponent from './menu'
import useNotification from 'hooks/useNotification'
import Notification from './notifications'

const UserContent = styled(ButtonBase)`
  background: #e7f3ff!important;
  border-radius: 50px!important;
  padding: 3px 5px!important;
  padding-right: 15px!important;
  margin-right: 10px!important;
  position: relative!important;
`
const Avatar = styled(AvatarBase)`
  width: 30px!important;
  height: 30px!important;
  margin-right: 10px;
`
const Doc = styled.div`
  width: 12px;
  height: 12px;
  position: absolute;
  background: red;
  border-radius: 50%;
  top: 0px;
  right: 0px;
`

const Actions = _props => {
  const session = useSelector(state => state.session)
  const itemsOnCart = useSelector(state => state.cart.items)
  const [isMenuActive, setMenu] = useState(null)
  const [isNotificacionsActive, setNotificationActive] = useState(null)
  const notification = useNotification()

  if (session === 'loading') {
    return 'Cargando...'
  }

  if (!session) {
    return (
      <Grid container justify='flex-end' alignItems='center' spacing={1}>
        <Grid item>
          <Link to='/login'>
            <Button size='medium'>Iniciar session</Button>
          </Link>
        </Grid>
        <Grid item>
          <Link to='/register'>
            <Button size='medium'>Registrate</Button>
          </Link>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container justify='flex-end' alignItems='center'>
      <UserContent onClick={event => setNotificationActive(event.currentTarget)}>
        {notification && (
          <Doc />
        )}
        <Avatar size='small' src={session.photo} />
        <Typography color='primary' variant='subtitle1'>{session.name.split(' ')[0]}</Typography>
      </UserContent>
      <Notification
        id='menu_primary'
        anchorEl={isNotificacionsActive}
        open={Boolean(isNotificacionsActive)}
        onClose={event => setNotificationActive(null)}
      />
      <Link to='/mi-carrito'>
        <IconButton>
          <Badge badgeContent={itemsOnCart.length} color='primary'>
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Link>
      <IconButton onClick={event => setMenu(event.currentTarget)}>
        <Menu />
      </IconButton>
      <MenuComponent
        id='menu_primary'
        anchorEl={isMenuActive}
        open={Boolean(isMenuActive)}
        onClose={event => setMenu(null)}
      />
    </Grid>
  )
}

export default Actions
