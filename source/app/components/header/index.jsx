import React from 'React'
import { AppBar, Grid, Hidden } from '@material-ui/core'
import { Content, Body, Logo } from './styled'
import Container from 'components/container'
import srclogo from '../../assets/logo.png'
import Searcher from './searcher'
import Action from './actions'
import { Button } from 'components/main'
import { Link } from 'react-router-dom'

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
                <Link to='/'><Button variant='text'>Inicio</Button></Link>
                <Link to='/'><Button variant='text'>Ofertas</Button></Link>
                <Link to='/'><Button variant='text'>Contacto</Button></Link>
                <Link to='/'><Button variant='text'>Galeria</Button></Link>
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
