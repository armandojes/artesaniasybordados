import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Paper, Button } from 'components/main'
import { Typography, Box } from '@material-ui/core'
import { methodsPay } from '../../constants'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { active, desactive } from 'flux/loading'

const Boxes = styled(Paper)`
  margin-bottom: 10px;
  position: relative;
  padding-right: 100px;
`
const ButtonStyled = styled(Button)`
  position: absolute!important;
  bottom: 5px!important;
  right: 5px!important;
`

const MethodPay = props => {
  const dispath = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispath(active('we are procesing your payment'))
      setTimeout(() => dispath(desactive()), 5000)
    }, 2000)
  }, [])

  return (
    <>
      <Box pt={2} pb={2}>
        <Typography variant='h6'>Confirmar compra</Typography>
      </Box>
      <Boxes>
        <Typography color='primary' variant='subtitle1'> Nombre:</Typography>
        <Typography variant='subtitle1'>{props.state.name} {props.state.lastname}</Typography>
        <ButtonStyled onClick={event => props.setView('form')} variant='text'>Modificar</ButtonStyled>
      </Boxes>
      <Boxes>
        <Typography color='primary' variant='subtitle1'> Datos de contacto:</Typography>
        <Typography variant='subtitle1'>
          {props.state.number}, {props.state.email}
        </Typography>
        <ButtonStyled onClick={event => props.setView('form')} variant='text'>Modificar</ButtonStyled>
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
        <ButtonStyled onClick={event => props.setView('form')} variant='text'>Modificar</ButtonStyled>
      </Boxes>
      <Boxes>
        <Typography color='primary' variant='subtitle1'> Methodo de pago:</Typography>
        <Typography variant='subtitle1'>
          {methodsPay[props.state.methodPay]}
        </Typography>
        <ButtonStyled onClick={event => props.setView('methodPay')} variant='text'>Modificar</ButtonStyled>
      </Boxes>
    </>
  )
}

MethodPay.propTypes = {
  state: propTypes.object,
  setView: propTypes.func
}

export default MethodPay
