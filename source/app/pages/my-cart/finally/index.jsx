import React, { useEffect } from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { active, desactive } from 'flux/loading'
import styled from 'styled-components'
import { Paper, Button } from 'components/main'
import { Typography, Box, Grid, useMediaQuery } from '@material-ui/core'
import { methodsPay } from '../../../constants'
import useModel from '../useModel'

const Finally = props => {
  const dispatch = useDispatch()
  const isMobile = useMediaQuery('(max-width:950px)')
  const { handleSaveOperation, total } = useModel(props.country)

  const paypalConfig = props => {
    return {
      createOrder: function (data, actions) {
        dispatch(active('Estamos procesando el pago'))
        return actions.order.create({
          purchase_units: [{
            amount: { value: total }
          }]
        })
      },
      onApprove: (data, actions) => {
        const status = actions.order.capture().then((details) => {
          const { id, payer } = details
          handleSaveOperation('payed', { id, payer }, props.state)
        })
        return status
      },
      onError: () => {
        dispatch(desactive())
      },
      onCancel: () => {
        dispatch(desactive())
      }
    }
  }

  // render button paypal
  useEffect(any => {
    setTimeout(() => {
      try {
        window.document.getElementById('render_button_paypal').innerHTML = ''
        window.paypal.Buttons(paypalConfig({ ...props })).render('#render_button_paypal')
      } catch (error) { console.log('_error_', error) }
    }, 200)
  }, [total, props.state.methodPay])

  return (
    <>
      {!isMobile && (
        <Box pt={2} pb={2}>
          <Typography variant='h6'>Confirmar compra</Typography>
        </Box>
      )}
      <Boxes>
        <Typography color='primary' variant='subtitle1'> Nombre:</Typography>
        <Typography variant='subtitle1'>{props.state.name} {props.state.lastname}</Typography>
        <ButtonStyled onClick={event => props.onViewChange('form')} variant='text'>Modificar</ButtonStyled>
      </Boxes>
      <Boxes>
        <Typography color='primary' variant='subtitle1'> Datos de contacto:</Typography>
        <Typography variant='subtitle1'>
          {props.state.number}, {props.state.email}
        </Typography>
        <ButtonStyled onClick={event => props.onViewChange('form')} variant='text'>Modificar</ButtonStyled>
      </Boxes>
      <Boxes>
        <Typography color='primary' variant='subtitle1'> Direccion de envio:</Typography>
        <Typography variant='subtitle1'>
          {props.state.street_number}
          , {props.state.suburb}
          , {props.state.postal_code}
          , {props.state.city}
          , {props.state.state}
        </Typography>
        <ButtonStyled onClick={event => props.onViewChange('form')} variant='text'>Modificar</ButtonStyled>
      </Boxes>
      <Boxes>
        <Typography color='primary' variant='subtitle1'> Methodo de pago:</Typography>
        <Typography variant='subtitle1'>
          {methodsPay[props.state.methodPay]}
        </Typography>
        <ButtonStyled onClick={event => props.onViewChange('methodPay')} variant='text'>Modificar</ButtonStyled>
      </Boxes>
      <Box mt={5} mb={5}>
        <Grid container spacing={1} justify='flex-end'>
          <Grid item xs={6} md={5} lg={4}>
            <Button
              style={{ fontSize: '.8em' }}
              size='medium'
              fullWidth
              variant='outlined'
              color='primary'
              onClick={props.onBack}
            >Atrás
            </Button>
          </Grid>
          <Grid item xs={6} md={5} lg={4}>
            {props.state.methodPay === 'cash' && (
              <Button fullWidth onClick={() => handleSaveOperation('pending', {}, props.state)} variant='contained'>Generar orden de pago</Button>
            )}
            {props.state.methodPay === 'card' && (
              <Button fullWidth onClick={() => props.onViewChange('card')} variant='contained'>Siguente</Button>
            )}
            {props.state.methodPay === 'paypal' && (
              <ButtonStyledPaypal fullWidth variant='contained'><ButtonShadow id='render_button_paypal' />Pagar con Paypal </ButtonStyledPaypal>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

Finally.propTypes = {
  state: propTypes.object,
  onBack: propTypes.func,
  onViewChange: propTypes.func,
  country: propTypes.string
}

// o n l y   s  t y l e s
const ButtonShadow = styled.div`
  background: red;
  height: 47px;
  position: absolute;
  width: 300px;
  opacity: 0.01;
`
const ButtonStyledPaypal = styled(Button)`
  position: relative;
  overflow: hidden;
`
const Boxes = styled(Paper)`
  margin-bottom: 10px;
  position: relative;
  padding-right: 100px;
  padding: 30px;
`
const ButtonStyled = styled(Button)`
  position: absolute!important;
  bottom: 5px!important;
  right: 5px!important;
`

export default Finally
