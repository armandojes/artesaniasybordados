import React from 'react'
import { Avatar, Typography, Grid, Button, Box } from '@material-ui/core'
import { Person } from '@material-ui/icons'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Header = styled.div`
  display: flex;
  align-items: center;
`
const Data = styled.div`
  margin-left: 10px;
  flex-grow: 1;
`
const ButtonStyled = styled(Button)`
  text-transform: none;
  font-size: .7em!important;
`

const ActionUserMobile = props => {
  const session = useSelector(state => state.session)

  if (session === 'loading') return null

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Header>
          <Avatar src={session ? session.photo : null}>
            {!session && (
              <Person />
            )}
          </Avatar>
          <Data>
            <Typography variant='h6'>{session ? session.name.split(' ')[0] : 'Bienvenido'}</Typography>
          </Data>
        </Header>
      </Grid>
      <Grid item xs={12}>
        <Box pt={1} />
      </Grid>
      {!session && (
        <>
          <Grid item xs={6}>
            <Link to='/login'>
              <ButtonStyled fullWidth variant='outlined' color='primary' size='small'>Ingresar</ButtonStyled>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Link to='/register'>
              <ButtonStyled fullWidth variant='outlined' color='primary' size='small'>Crear cueta</ButtonStyled>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Box pt={2} />
          </Grid>
        </>
      )}
    </Grid>
  )
}

export default ActionUserMobile
