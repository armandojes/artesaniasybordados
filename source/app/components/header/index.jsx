import React from 'React'
import { AppBar, Grid } from '@material-ui/core'
import { Content, Body, Logo } from './styled'
import Container from 'components/container'
import srclogo from '../../assets/logo.png'
import Searcher from './searcher'
import Action from './actions'
import { Button } from 'components/main'

const Header = () => {
  return (
    <Content position='sticky' as={AppBar}>
      <Container>
        <Body>
          <Grid container justify='space-between' alignItems='center'>

            <Grid itex xs={4} container alignItems='center'>
              <Logo src={srclogo} />
              <Grid item xs>
                <Searcher />
              </Grid>
            </Grid>
            <div>
              <Button variant='text'>Inicio</Button>
              <Button variant='text'>Acerca de nosotros</Button>
              <Button variant='text'>Historia</Button>
              <Button variant='text'>Contacto</Button>
              <Button variant='text'>Galeria</Button>
            </div>

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
