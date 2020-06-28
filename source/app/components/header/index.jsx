import React from 'React'
import { AppBar, Toolbar, Grid } from '@material-ui/core'
import { Content, Logo } from './styled'
import Input from 'components/inputs/textfiled'
import Container from 'components/container'
import LogoSrc from '../../assets/logo.png'

const Header = () => {
  return (
    <Content position='sticky' as={AppBar}>
      <Toolbar>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={6} container>
              <Grid item xs={3}>
                <Logo src={LogoSrc} />
              </Grid>
              <Grid item xs={9}>
                <Input
                  fullWidth
                  variant='outlined'
                  placeholder='Search…'
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              hello
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </Content>
  )
}

export default Header
