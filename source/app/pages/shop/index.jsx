import React, { useState } from 'react'
import LayoutUser from 'components/layout_user'
import Container from 'components/container'
import { Step, StepLabel, Stepper, CircularProgress, Typography, Grid, Box } from '@material-ui/core'
import { status, methodsPay } from '../../constants'
import { useParams, useLocation } from 'react-router'
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
import SuccessModal from './modalSuccess'
import { contact } from '../../../config'

const PaperStyled = styled(Paper)`
  padding: 30px;
  height: 100%;
  box-sizing: border-box;
`
const Span = styled.span`
  color: gray;
  margin-right: 15px;
`
const Instructions = styled.div`
  border: 2px solid #d891ef;
  padding: 10px;
  border-radius: 5px;
  span {
    font-weight: bold;
  }
`

const steps = Object.keys(status).map(keyname => status[keyname])

const Shop = props => {
  const { id } = useParams()
  const [state, setState] = useObjectState({ loading: true, data: {} })
  const activeStep = state.data.status ? Object.keys(status).indexOf(state.data.status) : 0
  const numberArticles = state.data.items ? state.data.items.reduce((acumulator = 0, current) => acumulator + current.quantity, 0) : 0
  const responsive = useResponsive()
  const location = useLocation()
  const [isModalOpen, setModalOpen] = useState(location.state && location.state.success)

  useFetch(async () => {
    setState({ loading: true })
    const data = await get(id)
    setState({ loading: false, data })
  }, [id])

  return (
    <LayoutUser>
      <Container $page>
        {!state.loading && (
          <Limiter>
            <SuccessModal
              open={isModalOpen}
              onClose={event => setModalOpen(false)}
              payed={state.data.status === 'payed'}
              methodPay={state.data.methodPay}
            />
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

              {state.data.status === 'pending' && (
                <Grid item xs={12}>
                  <PaperStyled>
                    <Instructions>
                      <Typography style={{ color: '' }} variant='h6'>Instrucciones para realizar el pago</Typography>
                      <p style={{ color: '' }} variant='subtitle1'>Puedes realizar el deposito en efectivo en cualquier banco o en cualquier oxxo, tambien puedes realizar una tranferencia electronica desde el portal de tu banco</p>
                      <p style={{ color: '' }} variant='subtitle1'>IMPORTANTE: Despues de realizar tu deposito envianos tu comprobante  al correo <span>{contact.email}</span> o al whatsapp <span>{contact.whatsapp}</span> para procesar con tu compra</p>

                      <Box mt={1} />
                      <Typography variant='h6' color='primary'><Span>Total a pagar:</Span> {toPrice(state.data.total)}</Typography>
                      <Box mt={1} />
                      <Typography variant='h6' color='primary'>Transferencia electronica</Typography>
                      <Typography variant='subtitle1'><Span>CLAVE:</Span> 021130064844077333</Typography>
                      <Typography variant='subtitle1'><Span>Banco:</Span> HSBC </Typography>
                      <Typography variant='subtitle1'><Span>Nombre:</Span> Paulina Santiz Lopez </Typography>
                      <Box mt={1} />

                      <Typography variant='h6' color='primary'>Deposito en oxxo</Typography>
                      <Typography variant='subtitle1'><Span>Tarjeta HSBC:</Span> 4213166124684766</Typography>
                      <Typography variant='subtitle1'><Span>Nombre:</Span> Paulina Santiz Lopez </Typography>
                      <Box mt={1} />

                      <Typography variant='h6' color='primary'>Deposito en bancos</Typography>
                      <Typography variant='subtitle1'><Span>Cuenta HSBC:</Span> 6484407733 </Typography>
                      <Typography variant='subtitle1'><Span>Nombre:</Span> Paulina Santiz Lopez </Typography>
                      <Box mt={1} />
                      <Typography variant='subtitle1'><Span>Para cualquier duda o aclaracion no dudes en contactarnos</Span></Typography>
                    </Instructions>
                  </PaperStyled>
                </Grid>
              )}

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
                      <Grid key={index} item xs={12} sm={6}>
                        <Item {...itemData} />
                      </Grid>
                    ))}
                  </Grid>
                </PaperStyled>
              </Grid>
            </Grid>
          </Limiter>
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

const Limiter = styled.div`
  width: 70%;
  max-width: 800px;
  margin: auto;
  @media screen and (max-width:1100px) {
    width: 90%;
  }
  @media screen and (max-width:800px) {
    width: 100%;
  }
`

export default Session(Shop)
