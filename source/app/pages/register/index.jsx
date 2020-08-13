import React from 'react'
import { Paper, SectionTitle, FullWidthCentered, FlexCentered, Button, Link } from 'components/main'
import Layout from 'components/layout'
import ContainerPage from 'components/container'
import { Grid, Box, CircularProgress, Container } from '@material-ui/core'
import InputGroup from 'components/inputs/group'
import useObjectState from 'hooks/useState'
import { Alert } from '@material-ui/lab'
import { Facebook } from '@material-ui/icons'
import GoogleImageSrc from '../../assets/google.png'
import styled from 'styled-components'
import { registerOrLoginWidthGoogle, register, registerOrLoginWithFacebook } from 'core/user'
import { useDispatch, useSelector } from 'react-redux'
import { setAlert } from 'flux/alert'
import { setLoading } from 'flux/session'
import { useLocation, Redirect } from 'react-router'
import { requires } from 'helpers/validate'

const Register = props => {
  const [state, setState] = useObjectState({ loading: false, errors: [], errorMessage: '' })
  const location = useLocation()
  const dispatch = useDispatch()
  const session = useSelector(state => state.session)

  const handleRegister = async _event => {
    const errors = requires(state, ['name', 'email', 'password', 'repassword', 'number'])
    if (errors) return setState({ errors, errorMessage: 'Todos los campos son requeridos' })
    if (state.password !== state.repassword) return setState({ errors: ['password', 'repassword'], errorMessage: 'Las contraseñas no coinciden' })

    setState({ loading: true })
    const { errorMessage } = await register(state)
    if (errorMessage) dispatch(setAlert({ description: errorMessage }))
    setState({ loading: false })
    if (!errorMessage) dispatch(setLoading())
  }

  const handleRegisterWithFacebook = async _event => {
    setState({ loading: true })
    const { errorMessage, success } = await registerOrLoginWithFacebook()
    if (errorMessage) dispatch(setAlert({ description: errorMessage }))
    if (!errorMessage && success) dispatch(setLoading())
    setState({ loading: false })
  }

  const handleResgisterWithGoogle = async _event => {
    setState({ loading: true })
    const { errorMessage, success } = await registerOrLoginWidthGoogle()
    if (errorMessage) dispatch(setAlert({ description: errorMessage }))
    if (!errorMessage && success) dispatch(setLoading())
    setState({ loading: false })
  }

  // redirect to home
  if (location.pathname === '/register' && typeof session === 'object' && !!session) {
    return (
      <Redirect to='/' />
    )
  }

  return (
    <Layout>
      <ContainerPage page>
        <FullWidthCentered>
          {session !== 'loading' && (
            <Limiter>
              <Box pt={5} pb={5}>
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
                              {state.errorMessage && (
                                <Grid item xs={12}>
                                  <Alert severity='error'>{state.errorMessage}</Alert>
                                </Grid>
                              )}

                              <Grid item xs={12}>
                                <Button
                                  size='medium'
                                  color='default'
                                  fullWidth
                                  startIcon={<GoogleIcon src={GoogleImageSrc} />}
                                  onClick={handleResgisterWithGoogle}
                                >Entrar con Google
                                </Button>
                              </Grid>
                              <Grid item xs={12}>
                                <Button
                                  size='medium'
                                  onClick={handleRegisterWithFacebook}
                                  color='default'
                                  fullWidth
                                  startIcon={<Facebook />}
                                >Entrar con Facebook
                                </Button>
                              </Grid>

                              <Grid item xs={12}>
                                <InputGroup margin='none' name='name' setState={setState} state={state} variant='outlined' fullWidth label='Nombre completo' />
                              </Grid>
                              <Grid item xs={12}>
                                <InputGroup margin='none' name='email' setState={setState} state={state} variant='outlined' fullWidth label='Correo electronico' />
                              </Grid>
                              <Grid item xs={12}>
                                <InputGroup margin='none' name='number' setState={setState} state={state} variant='outlined' fullWidth label='Telefono o celular' filter='number' limit={10} />
                              </Grid>
                              <Grid item xs={12}>
                                <InputGroup margin='none' type='password' name='password' setState={setState} state={state} variant='outlined' fullWidth label='Contraseña' />
                              </Grid>
                              <Grid item xs={12}>
                                <InputGroup margin='none' type='password' name='repassword' setState={setState} state={state} variant='outlined' fullWidth label='Repite la contraseña' />
                              </Grid>
                              <Grid item xs={12}>
                                <Button
                                  size='medium' fullWidth variant='contained' color='primary' onClick={handleRegister}>Registrarme</Button>
                              </Grid>
                              <Grid item xs={12}>
                                <Link to='/login'>
                                  <Button
                                    size='medium' fullWidth variant='outlined' color='primary'>Iniciar session</Button>
                                </Link>
                              </Grid>
                            </Grid>
                          </form>
                        </Box>
                      </>
                    )}
                  </Grid>
                </Paper>
              </Box>
            </Limiter>
          )}
          {session === 'loading' && (
            <CircularProgress />
          )}
        </FullWidthCentered>
      </ContainerPage>
    </Layout>
  )
}

const GoogleIcon = styled.img`
  width: 25px;
`

const Limiter = styled.div`
  width: 450px;
  margin: auto
`

export default Register
