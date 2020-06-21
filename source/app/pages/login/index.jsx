import React from 'react'
import { Paper, SectionTitle, FullWidthCentered, FlexCentered } from 'components/main'
import Layout from 'components/layout'
import Container from 'components/container'
import { Grid, Box, Button, CircularProgress } from '@material-ui/core'
import InputGroup from 'components/inputs/group'
import useObjectState from 'hooks/useState'

const Login = props => {
  const [state, setState] = useObjectState({
    loading: true
  })

  const onAnyInputChange = event => {
    setState({ [event.target.name]: event.target.value })
  }

  return (
    <Layout>
      <Container page>
        <FullWidthCentered>
          <Grid container justify='center' alignItems='center'>
            <Grid item xs={12} sm={8} md={6} lg={5}>
              <Paper as={Grid} container justify='center'>
                <Grid item xs={12} md={10}>
                  {state.loading && (
                    <FlexCentered minHeight='250px'>
                      <CircularProgress />
                    </FlexCentered>
                  )}
                  {!state.loading && (
                    <>
                      <SectionTitle align='center'>Inicia session</SectionTitle>
                      <Box p={3}>
                        <form>
                          <Box mb={2}>
                            <InputGroup name='email' onChange={onAnyInputChange} state={state} variant='outlined' fullWidth label='Correo electronico' />
                          </Box>
                          <Box mb={2}>
                            <InputGroup name='password' onChange={onAnyInputChange} state={state} variant='outlined' fullWidth label='Contraseña' type='password' />
                          </Box>
                          <Box>
                            <Button color='primary' variant='contained' fullWidth>Entrar</Button>
                          </Box>
                        </form>
                      </Box>
                    </>
                  )}
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
