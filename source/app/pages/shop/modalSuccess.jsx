import React from 'react'
import { Modal, Typography, Box, IconButton } from '@material-ui/core'
import { bool, func, string } from 'prop-types'
import { Paper } from 'components/main'
import styled from 'styled-components'
import { Check, Close } from '@material-ui/icons'
import paypal from '../../assets/paypal.png'

const ModalStyled = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const PaperStyled = styled(Paper)`
  width: 600px;
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: center;
  padding: 30px;
  box-sizing: border-box;
  position: relative;
  @media screen and (max-width:1000px) {
    width: 70%!important;
    min-height: 300px;
  }
  @media screen and (max-width:500px) {
    width: 90%!important;
    min-height: 300px;
  }
`

const Picture = styled.img`
  display: block;
  margin: auto;
  width: 150px;
  @media screen and (max-width:500px) {
    width: 120px;
  }
`

const CheckStyled = styled(Check)`
  color: #3483fa!important;
  font-size: 50px!important;
  display: block!important;
  margin: auto!important;
`
const IconButtonStyled = styled(IconButton)`
  position: absolute!important;
  top: 8px!important;
  right: 8px!important;
`
const SuccessModal = props => {
  return (
    <ModalStyled open={props.open} onClose={props.onClose}>
      <>
        <PaperStyled>
          <IconButtonStyled size='small' onClick={props.onClose}>
            <Close />
          </IconButtonStyled>
          <Box>
            {props.payed && props.methodPay === 'paypal' && (<Picture src={paypal} />)}
            {!(props.payed && props.methodPay === 'paypal') && (<CheckStyled />)}
            <Box mt={2} />
            <Typography align='center' color='primary' variant='h4'>¡Gracias por tu compra!</Typography>
            <Box mt={2} />
            {!props.payed && (
              <Typography style={{ color: 'gray' }} align='center' variant='h6'>Tu compra se ha procesado correctamente, solo sigue las instrucciones de pago para finalizar tu compra</Typography>
            )}
            {props.payed && (
              <Typography style={{ color: 'gray' }} align='center' variant='h6'>Tu pago se ha procesado correctamente, en breve prepararemos tu paquete</Typography>
            )}
          </Box>
        </PaperStyled>
      </>
    </ModalStyled>
  )
}

SuccessModal.propTypes = {
  open: bool,
  onClose: func,
  payed: bool,
  methodPay: string
}

export default SuccessModal
