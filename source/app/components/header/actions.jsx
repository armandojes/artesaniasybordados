import React, { useState } from 'react'
import styled from 'styled-components'
import { ButtonBase, IconButton, Typography, Avatar as AvatarBase, Grid, Badge } from '@material-ui/core'
import { Menu, ShoppingCart } from '@material-ui/icons'
import { Button, Link } from 'components/main'
import { useSelector } from 'react-redux'
import MenuComponent from './menu'

const UserContent = styled(ButtonBase)`
  background: #e7f3ff!important;
  border-radius: 50px!important;
  padding: 3px 5px!important;
  padding-right: 15px!important;
  margin-right: 10px!important;
`
const Avatar = styled(AvatarBase)`
  width: 30px!important;
  height: 30px!important;
  margin-right: 10px;
`

const Actions = _props => {
  const session = useSelector(state => state.session)
  const itemsOnCart = useSelector(state => state.cart.items)
  const [isMenuActive, setMenu] = useState(null)

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
      <UserContent>
        <Avatar size='small' src={session.photo} />
        <Typography color='primary' variant='subtitle1'>{session.name.split(' ')[0]}</Typography>
      </UserContent>
      <IconButton>
        <Badge badgeContent={itemsOnCart.length} color='primary'>
          <Link to='/mi-carrito'>
            <ShoppingCart />
          </Link>
        </Badge>
      </IconButton>
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
