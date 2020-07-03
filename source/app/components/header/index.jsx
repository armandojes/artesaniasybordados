import React from 'React'
import { AppBar, Toolbar, Grid } from '@material-ui/core'
import { Content } from './styled'
import Container from 'components/container'

const Header = () => {
  return (
    <Content position='sticky' as={AppBar}>
      <Toolbar>
        <Container>
          <Grid container spacing={2}>
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
