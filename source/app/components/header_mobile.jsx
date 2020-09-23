import React, { useState } from 'react'
import styled from 'styled-components'
import Container from 'components/container'
import srclogo from '../assets/logo.png'
import { IconButton, Badge, Grid, TextField, InputAdornment } from '@material-ui/core'
import { Notifications, ShoppingCart, Menu, Search, ArrowBack } from '@material-ui/icons'
import { Link } from 'components/main'
import { useSelector } from 'react-redux'
import Drawer from 'components/layout_user/drawer'
import useNotification from 'hooks/useNotification'
import { useHistory, useLocation } from 'react-router'

const Header = styled.header`
  background: #D891EF;
  position: sticky;
  top: 0px;
  z-index:2;
  svg {
    color: #2b0028;
  }
`
const ContainerStyled = styled(Container)`
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: space-between;
`
const Logo = styled.img`
  width: 75px;
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
  const [keywords, setkeuwords] = useState('')
  const itemsOnCart = useSelector(state => state.cart.items)
  const [isMobileFilterActive, setmobileFilterStatus] = useState(false)
  const notification = useNotification()
  const { pathname } = useLocation()
  const isSearcherActive = pathname === '/buscar'
  const history = useHistory()

  const handleBack = () => {
    history.goBack()
  }

  const handleSubmit = event => {
    event.preventDefault()
    const destination = { pathname: '/articulos', search: `keywords=${keywords}` }
    history.replace(destination)
  }

  const handleChange = event => {
    setkeuwords(event.target.value)
  }

  return (
    <Header id='header'>
      <Drawer
        open={isMobileFilterActive}
        onClose={event => setmobileFilterStatus(false)}
        onOpen={event => setmobileFilterStatus(true)}
      />
      <ContainerStyled>
        {!isSearcherActive && (
          <>
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
          </>
        )}
        {isSearcherActive && (
          <Grid container alignItems='center' spacing={2}>
            <Grid item xs={2} container justify='center' alignItems='center'>
              <ArrowBack onClick={handleBack} />
            </Grid>
            <Grid item xs={10}>
              <form onSubmit={handleSubmit}>
                <TextField
                  onChange={handleChange}
                  value={keywords}
                  fullWidth
                  variant='outlined'
                  size='small'
                  focused
                  autoFocus
                  placeholder='Buscar'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Search onClick={handleSubmit} />
                      </InputAdornment>
                    )
                  }}
                />
              </form>
            </Grid>
          </Grid>
        )}
      </ContainerStyled>
    </Header>
  )
}

export default HeaderMobile
