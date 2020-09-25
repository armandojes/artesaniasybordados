import React from 'react'
import { Paper, SectionTitle, FlexCentered, Button } from 'components/main'
import { Grid, Box, CircularProgress, Divider, Typography } from '@material-ui/core'
import InputGroup from 'components/inputs/group'
import useObjectState from 'hooks/useState'
import { Facebook } from '@material-ui/icons'
import styled from 'styled-components'
import GoogleImageSrc from '../../assets/google.png'
import { loginWidthEmailAndPassword, registerOrLoginWidthGoogle, registerOrLoginWithFacebook } from 'core/user'
import { Alert } from '@material-ui/lab'
import { setAlert } from 'flux/alert'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setSession } from 'flux/session'
import { useLocation, Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { string } from 'prop-types'

const Login = props => {
  const session = useSelector(state => state.session)
  const location = useLocation()
  const dispatch = useDispatch()
  const [state, setState] = useObjectState({
    errorMessage: null
  })

  const onAnyInputChange = event => {
    setState({ [event.target.name]: event.target.value })
  }

  const handleLogin = async event => {
    dispatch(setLoading())
    const { errorMessage } = await loginWidthEmailAndPassword(state.email, state.password)
    if (errorMessage) setState({ errorMessage, loading: false })
    if (errorMessage) dispatch(setSession(null))
  }

  const handleLoginWithFacebook = async _event => {
    dispatch(setLoading())
    const { errorMessage, success } = await registerOrLoginWithFacebook()
    if (errorMessage) dispatch(setAlert({ description: errorMessage }))
    if (errorMessage || !success) dispatch(setSession(null))
  }

  const handleLoginWithGoogle = async _event => {
    dispatch(setLoading())
    const { errorMessage, success } = await registerOrLoginWidthGoogle()
    if (errorMessage) dispatch(setAlert({ description: errorMessage }))
    if (errorMessage || !success) dispatch(setSession(null))
  }

  // redirect to home
  if (location.pathname === '/login' && typeof session === 'object' && !!session) {
    return (
      <Redirect to='/' />
    )
  }

  // render form
  return (
    <>

      <Limiter>
        <Paper as={Grid} container justify='center'>
          {session === 'loading' && (
            <FlexCentered minHeight='250px'>
              <CircularProgress />
            </FlexCentered>
          )}
          {session !== 'loading' && (
            <Grid item xs={12}>
              <SectionTitle align='center'>{props.message || 'Inicia session'}</SectionTitle>
              <Box p={2}>
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
                        onClick={handleLoginWithGoogle}
                        color='default'
                        variant='outlined'
                        fullWidth
                        startIcon={<GoogleIcon src={GoogleImageSrc} />}
                      >Entrar con Google
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        size='medium'
                        onClick={handleLoginWithFacebook}
                        color='default'
                        variant='outlined'
                        fullWidth
                        startIcon={<Facebook />}
                      >Entrar con Facebook
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <InputGroup size='small' margin='none' name='email' onChange={onAnyInputChange} state={state} variant='outlined' fullWidth label='Correo electronico' />
                    </Grid>
                    <Grid item xs={12}>
                      <InputGroup size='small' margin='none' name='password' onChange={onAnyInputChange} state={state} variant='outlined' fullWidth label='Contraseña' type='password' />
                    </Grid>
                    <Grid item xs={12}>
                      <Button size='medium' color='primary' variant='contained' onClick={handleLogin} fullWidth>Entrar</Button>
                    </Grid>
                    <Box mt={4} />
                    <Grid item xs={12} container spacing={2} alignItems='center'>
                      <Grid item xs> <Divider /> </Grid>
                      <Grid item xs={2}> <Typography align='center'>o</Typography> </Grid>
                      <Grid item xs> <Divider /> </Grid>
                    </Grid>
                    <Grid item xs={12} container justify='center'>
                      <Link to='/register'>
                        <Button variant='text' size='small'>
                          Registrate con tu cuenta de correo
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Grid>
          )}
        </Paper>
      </Limiter>
    </>
  )
}

Login.propTypes = {
  message: string
}

const GoogleIcon = styled.img`
  width: 22px;
`

const Limiter = styled.div`
  width: 450px;
  margin: auto;
  @media screen and (max-width:700px) {
    width: 90vw!important;
  }
`

export default Login
