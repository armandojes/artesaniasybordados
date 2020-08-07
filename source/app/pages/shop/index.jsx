import React from 'react'
import LayoutUser from 'components/layout_user'
import Container from 'components/container'
import { Step, StepLabel, Stepper, CircularProgress, Container as MaterialCOntainer, Typography, Grid, Box } from '@material-ui/core'
import { status, methodsPay } from '../../constants'
import { useParams } from 'react-router'
import useObjectState from 'hooks/useState'
import useFetch from 'hooks/useFetch'
import { get } from 'core/sale'
import { FullWidthCentered, TitlePage, Paper } from 'components/main'
import styled from 'styled-components'
import { toString } from 'helpers/date'
import { toPrice } from 'helpers/currency'
import useResponsive from 'hooks/useResponsive'
import Session from 'components/session'
import Item from 'components/articleSecondary'

const PaperStyled = styled(Paper)`
  padding: 30px;
  height: 100%;
  box-sizing: border-box;
`
const Span = styled.span`
  color: gray;
  margin-right: 15px;
`

const steps = Object.keys(status).map(keyname => status[keyname])

const Shop = props => {
  const { id } = useParams()
  const [state, setState] = useObjectState({ loading: true, data: {} })
  const activeStep = state.data.status ? Object.keys(status).indexOf(state.data.status) : 0
  const numberArticles = state.data.items ? state.data.items.reduce((acumulator = 0, current) => acumulator + current.quantity, 0) : 0
  const responsive = useResponsive()

  useFetch(async () => {
    const data = await get(id)
    setState({ loading: false, data })
  }, [])

  return (
    <LayoutUser>
      <Container $page>
        {!state.loading && (
          <MaterialCOntainer maxWidth='md' disableGutters>
            <Grid container spacing={3}>
              <Grid item xs={12}><TitlePage>Detalles de tu compra</TitlePage></Grid>
              <Grid item xs={12}>
                <PaperStyled>
                  <Typography variant='h6'>Estado:</Typography>
                  <Stepper activeStep={activeStep} alternativeLabel={responsive({ xs: false, sm: true })} style={{ backgroundColor: 'transparent' }} orientation={responsive({ xs: 'vertical', sm: 'horizontal' })}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </PaperStyled>
              </Grid>
              <Grid item xs={12}>
                <PaperStyled>
                  <Typography variant='h6'>Resumen de compra:</Typography>
                  <Typography variant='subtitle1'><Span>Fecha:</Span> {toString(state.data.date.toDate())}</Typography>
                  <Typography variant='subtitle1'><Span>Metodo de pago:</Span> {methodsPay[state.data.methodPay]}</Typography>
                  <Typography variant='subtitle1'><Span>Numero de articulos:</Span>{numberArticles}</Typography>
                  <Typography variant='subtitle1'><Span>Envio:</Span>{toPrice(state.data.shipping)}</Typography>
                  <Typography variant='subtitle1'><Span>Total:</Span>{toPrice(state.data.total)}</Typography>
                </PaperStyled>
              </Grid>
              <Grid item xs={12}>
                <PaperStyled>
                  <Typography variant='h6'>Detalles de envio:</Typography>
                  <Typography variant='subtitle1'><Span>Nombre:</Span> {state.data.info.name} {state.data.info.lastname}</Typography>
                  <Typography variant='subtitle1'><Span>Numero:</Span> {state.data.info.number}</Typography>
                  <Typography variant='subtitle1'><Span>Correo:</Span> {state.data.info.email}</Typography>
                  <Typography variant='subtitle1'><Span>calle y numero:</Span> {state.data.info.street_number}</Typography>
                  <Typography variant='subtitle1'><Span>Colonia:</Span> {state.data.info.suburb}</Typography>
                  <Typography variant='subtitle1'><Span>Codigo postal:</Span> {state.data.info.postal_code}</Typography>
                  <Typography variant='subtitle1'><Span>Ciudad:</Span> {state.data.info.city}</Typography>
                  <Typography variant='subtitle1'><Span>Estado:</Span> {state.data.info.state}</Typography>
                </PaperStyled>
              </Grid>
              {state.data.status === 'sent' && (
                <Grid item xs={12}>
                  <PaperStyled>
                    <Typography variant='h6'>Informacion de rastreo:</Typography>
                    <Typography variant='subtitle1'><Span>Compañia:</Span> {state.data.shippingInfo.company}</Typography>
                    <Typography variant='subtitle1'><Span>Codigo de rastreo:</Span> {state.data.shippingInfo.code}</Typography>
                  </PaperStyled>
                </Grid>
              )}
              <Grid item xs={12}>
                <PaperStyled>
                  <Box mb={2}>
                    <Typography variant='h6'>Articulos</Typography>
                  </Box>
                  <Grid container spacing={3}>
                    {state.data.items.map((itemData, index) => (
                      <Grid key={index} item xs={12} sm={6} lg={4}>
                        <Item {...itemData} />
                      </Grid>
                    ))}
                  </Grid>
                </PaperStyled>
              </Grid>
            </Grid>
          </MaterialCOntainer>
        )}
        {!!state.loading && (
          <FullWidthCentered>
            <CircularProgress />
          </FullWidthCentered>
        )}
      </Container>
    </LayoutUser>
  )
}

export default Session(Shop)
