import React from 'react'
import styled from 'styled-components'
import { Paper, Button } from 'components/main'
import { Typography, Box, Grid, useMediaQuery } from '@material-ui/core'
import { methodsPay } from '../../../constants'
import propTypes from 'prop-types'

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

const MethodPay = props => {
  const isMobile = useMediaQuery('(max-width:950px)')

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
            {props.state.methodPay !== 'paypal' && (
              <Button fullWidth onClick={props.onPay} variant='contained'>Generar orden de pago</Button>
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

MethodPay.propTypes = {
  state: propTypes.object,
  onBack: propTypes.func,
  onPay: propTypes.func,
  onViewChange: propTypes.func
}

export default MethodPay
