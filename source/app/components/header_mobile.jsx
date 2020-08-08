import React, { useState } from 'react'
import styled from 'styled-components'
import Container from 'components/container'
import srclogo from '../assets/logo.png'
import { IconButton, Badge } from '@material-ui/core'
import { Search, Notifications, ShoppingCart, Menu } from '@material-ui/icons'
import { Link } from 'components/main'
import { useSelector } from 'react-redux'
import Drawer from 'components/layout_user/drawer'
import useNotification from 'hooks/useNotification'

const Header = styled.header`
  background: #fff;
  position: sticky;
  top: 0px;
  z-index:2;
`
const ContainerStyled = styled(Container)`
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: space-between;
`
const Logo = styled.img`
  width: 40px;
`

const Dot = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
  right: 0px;
`

const HeaderMobile = props => {
  const itemsOnCart = useSelector(state => state.cart.items)
  const [isMobileFilterActive, setmobileFilterStatus] = useState(false)
  const notification = useNotification()

  return (
    <Header id='header'>
      <Drawer
        open={isMobileFilterActive}
        onClose={event => setmobileFilterStatus(false)}
        onOpen={event => setmobileFilterStatus(true)}
      />
      <ContainerStyled>
        <IconButton>
          <Link to='/'>
            <Logo src={srclogo} />
          </Link>
        </IconButton>
        <IconButton>
          <Link to='/buscar'>
            <Search />
          </Link>
        </IconButton>
        <IconButton>
          <Link style={{ position: 'relative' }} to='/notificaciones'>
            {notification && (
              <Dot />
            )}
            <Notifications />
          </Link>
        </IconButton>
        <IconButton>
          <Badge badgeContent={itemsOnCart.length} color='primary'>
            <Link to='/mi-carrito'>
              <ShoppingCart />
            </Link>
          </Badge>
        </IconButton>
        <IconButton onClick={event => setmobileFilterStatus(true)}>
          <Menu />
        </IconButton>
      </ContainerStyled>
    </Header>
  )
}

export default HeaderMobile
