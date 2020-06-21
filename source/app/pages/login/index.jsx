import React from 'react'
import { Paper, SectionTitle, FullWidthCentered } from 'components/main'
import Layout from 'components/layout'
import Container from 'components/container'
import { Grid, Box, Button } from '@material-ui/core'
import TextField from 'components/inputs/textfiled'

const Login = props => {
  return (
    <Layout>
      <Container page>
        <FullWidthCentered>
          <Grid container justify='center' alignItems='center'>
            <Grid item xs={12} sm={8} md={6} lg={5}>
              <Paper as={Grid} container justify='center'>
                <Grid item xs={12} md={10}>
                  <SectionTitle align='center'>Inicia session</SectionTitle>
                  <Box p={3}>
                    <form>
                      <Box mb={2}>
                        <TextField variant='outlined' fullWidth label='Correo electronico' />
                      </Box>
                      <Box mb={2}>
                        <TextField variant='outlined' fullWidth label='Contraseña' type='password' />
                      </Box>
                      <Box>
                        <Button color='primary' variant='contained' fullWidth>Entrar</Button>
                      </Box>
                    </form>
                  </Box>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </FullWidthCentered>
      </Container>
    </Layout>
  )
}

export default Login
