import React from 'react'
import { Paper, SectionTitle, FullWidthCentered, FlexCentered } from 'components/main'
import Layout from 'components/layout'
import Container from 'components/container'
import { Grid, Box, Button, CircularProgress } from '@material-ui/core'
import InputGroup from 'components/inputs/group'
import useObjectState from 'hooks/useState'

const Register = props => {
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
                    <FlexCentered minHeight='450px'>
                      <CircularProgress />
                    </FlexCentered>
                  )}
                  {!state.loading && (
                    <>
                      <SectionTitle align='center'>Registrate</SectionTitle>
                      <Box p={3}>
                        <form>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                              <InputGroup name='name' onChange={onAnyInputChange} state={state} variant='outlined' fullWidth label='Nombre' />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <InputGroup name='lastname' onChange={onAnyInputChange} state={state} variant='outlined' fullWidth label='Apellidos' />
                            </Grid>
                            <Grid item xs={12}>
                              <InputGroup name='email' onChange={onAnyInputChange} state={state} variant='outlined' fullWidth label='Correo electronico' />
                            </Grid>
                            <Grid item xs={12}>
                              <InputGroup name='number' onChange={onAnyInputChange} state={state} variant='outlined' fullWidth label='Telefono o celular' filter='number' limit={10} />
                            </Grid>
                            <Grid item xs={12}>
                              <InputGroup name='password' onChange={onAnyInputChange} state={state} variant='outlined' fullWidth label='Contraseña' />
                            </Grid>
                            <Grid item xs={12}>
                              <InputGroup name='repassword' onChange={onAnyInputChange} state={state} variant='outlined' fullWidth label='Repite la contraseña' />
                            </Grid>
                            <Grid item xs={12}>
                              <Button fullWidth variant='contained' color='primary'>Registrarme</Button>
                            </Grid>
                            <Grid item xs={12}>
                              <Button fullWidth variant='outlined' color='primary'>Iniciar session</Button>
                            </Grid>
                          </Grid>
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

export default Register
