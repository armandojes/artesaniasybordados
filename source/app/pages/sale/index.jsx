import React, { useState } from 'react'
import Container from 'components/container'
import Layout from 'components/admin'
import useObjectState from 'hooks/useState'
import { Box, Grid, CircularProgress, Typography, Button, Container as ContainerMaterial } from '@material-ui/core'
import useFetch from 'hooks/useFetch'
import sale, { get } from 'core/sale'
import { string } from 'prop-types'
import Item from './item'
import { Paper } from 'components/main'
import styled from 'styled-components'
import { methodsPay, status, statusColors } from '../../constants'
import { Edit } from '@material-ui/icons'
import { toPrice } from 'helpers/currency'
import { toString } from 'helpers/date'
import Dialog from './dialog'
import DialogSent from './dialogSent'
import { requires } from 'helpers/validate'
import Session from 'components/session'

const Span = styled.span`
  color: gray;
  margin-right: 15px;
`
const ButtonStyled = styled(Button)`
  display: flex;
  align-items: center;
  svg {
    margin-left: 20px;
  }
`

const Sale = props => {
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [isDialogOpenSent, setDialogOpenSent] = useState(false)
  const [state, setState] = useObjectState({ loading: true, data: {} })
  const [shippingInfo, setShippinInfo] = useObjectState({})

  useFetch(async () => {
    const data = await get(props.match.params.id)
    setState({ loading: false, data })
  }, [])

  const handleSetPayed = async () => {
    setDialogOpen(false)
    setState({ loading: true })
    await sale.setPayed(state.data.id)
    const data = await get(props.match.params.id)
    setState({ loading: false, data })
  }

  const handleSetSent = async () => {
    const errors = requires(shippingInfo, ['company', 'code'])
    if (errors) return setShippinInfo({ errors, errorMessage: 'Todos los campos son requeridos' })
    setDialogOpenSent(false)
    setState({ loading: true })
    await sale.setSent(state.data.id, { code: shippingInfo.code, company: shippingInfo.company })
    const data = await get(props.match.params.id)
    setState({ loading: false, data })
  }

  const handleSetPending = async () => {
    setDialogOpen(false)
    setState({ loading: true })
    await sale.setPending(state.data.id)
    const data = await get(props.match.params.id)
    setState({ loading: false, data })
  }

  const handleSetDelivered = async () => {
    setDialogOpen(false)
    setState({ loading: true })
    await sale.setDeliered(state.data.id)
    const data = await get(props.match.params.id)
    setState({ loading: false, data })
  }

  const handleChangeModalToSent = (data) => {
    setDialogOpen(false)
    setDialogOpenSent(true)
  }

  return (
    <Layout>
      <Dialog
        open={isDialogOpen}
        onClose={event => setDialogOpen(false)}
        onSetDelivered={handleSetDelivered}
        onSetSent={handleChangeModalToSent}
        onSetPayed={handleSetPayed}
        onSetPending={handleSetPending}
      />
      <DialogSent
        onClose={event => setDialogOpenSent(false)}
        onSent={handleSetSent}
        open={isDialogOpenSent}
        state={shippingInfo}
        setState={setShippinInfo}
      />
      <Container $page>
        {state.loading && (
          <Box p={10}>
            <Grid container justify='center' alignItems='center' style={{ minHeight: '70vh' }}>
              <CircularProgress />
            </Grid>
          </Box>
        )}
        {!state.loading && (
          <ContainerMaterial maxWidth='md'>
            <Box mt={5} mb={5}>
              <Grid container spacing={3} alignItems='flex-start'>
                <Grid item xs={12}>
                  <Box mb={2}>
                    <Paper>
                      <Box p={8}>
                        <Grid container spacing={8}>
                          <Grid item xs={6}>
                            <Typography variant='h6'>Detalles de la compra</Typography>
                            <Typography variant='subtitle1'><Span>Metodo de pago:</Span> {methodsPay[state.data.methodPay]}</Typography>
                            <Typography variant='subtitle1'><Span>Fecha:</Span> {toString(state.data.date.toDate())}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant='subtitle1'><Span>Estado:</Span>
                              <ButtonStyled
                                onClick={event => setDialogOpen(true)}
                                variant='outlined'
                                style={{ color: statusColors[state.data.status], borderColor: statusColors[state.data.status] }}
                              >{status[state.data.status]} <Edit />
                              </ButtonStyled>
                            </Typography>
                            <Typography variant='subtitle1'><Span>Envio:</Span>{toPrice(state.data.shipping)}</Typography>
                            <Typography variant='h5'>
                              {toPrice(state.data.total)}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Paper>
                  </Box>
                  <Box mb={2}>
                    <Paper>
                      <Box p={8}>
                        <Typography variant='h6'>Detalles de envio</Typography>
                        <Typography variant='subtitle1'><Span>Nombre:</Span> {state.data.info.name} {state.data.info.lastname}</Typography>
                        <Typography variant='subtitle1'><Span>Numero:</Span> {state.data.info.number}</Typography>
                        <Typography variant='subtitle1'><Span>Correo:</Span> {state.data.info.email}</Typography>
                        <Typography variant='subtitle1'><Span>calle y numero:</Span> {state.data.info.street_number}</Typography>
                        <Typography variant='subtitle1'><Span>Colonia:</Span> {state.data.info.suburb}</Typography>
                        <Typography variant='subtitle1'><Span>Codigo postal:</Span> {state.data.info.postal_code}</Typography>
                        <Typography variant='subtitle1'><Span>Ciudad:</Span> {state.data.info.city}</Typography>
                        <Typography variant='subtitle1'><Span>Estado:</Span> {state.data.info.state}</Typography>
                      </Box>
                    </Paper>
                  </Box>
                </Grid>
                <Grid item xs={12} container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant='h6'>Articulos comprados</Typography>
                  </Grid>
                  {state.data.items.map(item => (
                    <Grid key={item.id} item xs={6}>
                      <Paper>
                        <Item {...item} />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Box>
          </ContainerMaterial>
        )}
      </Container>
    </Layout>
  )
}

Sale.propTypes = {
  match: string
}

export default Session(Sale, true)
