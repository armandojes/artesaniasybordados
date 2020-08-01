import React from 'react'
import { Paper, SectionTitle, FullWidthCentered, FlexCentered, Button } from 'components/main'
import Layout from 'components/layout'
import ContainerPage from 'components/container'
import { Grid, Box, CircularProgress, Container } from '@material-ui/core'
import InputGroup from 'components/inputs/group'
import useObjectState from 'hooks/useState'
import { Facebook } from '@material-ui/icons'
import styled from 'styled-components'
import GoogleImageSrc from '../../assets/google.png'
import { loginWidthEmailAndPassword, registerOrLoginWidthGoogle, registerOrLoginWithFacebook } from 'core/user'
import { Alert } from '@material-ui/lab'
import { setAlert } from 'flux/alert'
import { useDispatch } from 'react-redux'

const Login = props => {
  const dispatch = useDispatch()
  const [state, setState] = useObjectState({
    loading: false
  })

  const onAnyInputChange = event => {
    setState({ [event.target.name]: event.target.value })
  }

  const handleLogin = async event => {
    setState({ loading: true })
    const { errorMessage } = await loginWidthEmailAndPassword(state.email, state.password)
    if (errorMessage) return setState({ errorMessage, loading: false })
  }

  const handleLoginWithFacebook = async _event => {
    setState({ loading: true })
    const { errorMessage } = await registerOrLoginWithFacebook()
    if (errorMessage) dispatch(setAlert({ description: errorMessage }))
    setState({ loading: false })
  }

  const handleLoginWithGoogle = async _event => {
    setState({ loading: true })
    const { errorMessage } = await registerOrLoginWidthGoogle()
    if (errorMessage) dispatch(setAlert({ description: errorMessage }))
    setState({ loading: false })
  }

  return (
    <Layout>
      <ContainerPage page>
        <FullWidthCentered>

          <Container maxWidth='sm'>
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
                      <Grid container spacing={2}>
                        {state.errorMessage && (
                          <Grid item xs={12}>
                            <Alert severity='error'>{state.errorMessage}</Alert>
                          </Grid>
                        )}
                        <Grid item xs={12}>
                          <Button
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
                            onClick={handleLoginWithFacebook}
                            color='default'
                            variant='outlined'
                            fullWidth
                            startIcon={<Facebook />}
                          >Entrar con Facebook
                          </Button>
                        </Grid>
                        <Grid item xs={12}>
                          <InputGroup margin='none' name='email' onChange={onAnyInputChange} state={state} variant='outlined' fullWidth label='Correo electronico' />
                        </Grid>
                        <Grid item xs={12}>
                          <InputGroup margin='none' name='password' onChange={onAnyInputChange} state={state} variant='outlined' fullWidth label='Contraseña' type='password' />
                        </Grid>
                        <Grid item xs={12}>
                          <Button color='primary' variant='contained' onClick={handleLogin} fullWidth>Entrar</Button>
                        </Grid>
                      </Grid>
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

const GoogleIcon = styled.img`
  width: 30px;
`
export default Login
