import React from 'react'
import styled from 'styled-components'
import Container from 'components/container'
import srclogo from '../assets/logo.png'
import { IconButton, Badge } from '@material-ui/core'
import { Search, Notifications, ShoppingCart, Menu } from '@material-ui/icons'
import { Link } from 'components/main'
import { useSelector } from 'react-redux'

const Header = styled.header`
  background: #fff;
  position: sticky;
  top: 0px;
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

const HeaderMobile = props => {
  const itemsOnCart = useSelector(state => state.cart.items)

  return (
    <Header id='header'>
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
          <Link to='/notificaciones'>
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
        <IconButton>
          <Menu />
        </IconButton>
      </ContainerStyled>
    </Header>
  )
}

export default HeaderMobile
