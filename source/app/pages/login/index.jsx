import React from 'react'
import { Paper, SectionTitle, FullWidthCentered, FlexCentered } from 'components/main'
import Layout from 'components/layout'
import ContainerPage from 'components/container'
import { Grid, Box, Button, CircularProgress, Container } from '@material-ui/core'
import InputGroup from 'components/inputs/group'
import useObjectState from 'hooks/useState'

const Login = props => {
  const [state, setState] = useObjectState({
    loading: false
  })

  const onAnyInputChange = event => {
    setState({ [event.target.name]: event.target.value })
  }

  return (
    <Layout>
      <ContainerPage page>
        <FullWidthCentered>

          <Container maxWidth='xs'>
            <Paper as={Grid} container justify='center'>
              {state.loading && (
                <FlexCentered minHeight='250px'>
                  <CircularProgress />
                </FlexCentered>
              )}
              {!state.loading && (
                <Grid xs={12}>
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
                </Grid>
              )}
            </Paper>
          </Container>

        </FullWidthCentered>
      </ContainerPage>
    </Layout>
  )
}

export default Login
