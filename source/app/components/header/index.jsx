import React from 'React'
import { AppBar, Grid, Hidden } from '@material-ui/core'
import { Content, Body, Logo } from './styled'
import Container from 'components/container'
import srclogo from '../../assets/logo.png'
import Searcher from './searcher'
import Action from './actions'
import { Button } from 'components/main'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ButtonStyled = styled(Button)`
  color: #2b0028!important;
`

const Header = () => {
  return (
    <Content position='sticky' as={AppBar} id='header'>
      <Container>
        <Body>
          <Grid container justify='space-between' alignItems='center'>

            <Grid item xs={6} md={4} container alignItems='center'>
              <Link to='/'><Logo src={srclogo} /></Link>
              <Grid item xs>
                <Searcher />
              </Grid>
            </Grid>
            <Hidden smDown>
              <div>
                <Link to='/'><ButtonStyled variant='text'>Inicio</ButtonStyled></Link>
                <Link to='/'><ButtonStyled variant='text'>Ofertas</ButtonStyled></Link>
                <Link to='/'><ButtonStyled variant='text'>Contacto</ButtonStyled></Link>
                <Link to='/'><ButtonStyled variant='text'>Galeria</ButtonStyled></Link>
              </div>
            </Hidden>

            <div>
              <Action />
            </div>

          </Grid>
        </Body>
      </Container>
    </Content>
  )
}

export default Header
