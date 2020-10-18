/* eslint-disable quote-props */
import React from 'react'
import { requires } from 'helpers/validate'
import styled from 'styled-components'
import { Grid, Typography, Box, Button } from '@material-ui/core'
import Input from 'components/inputs/group'
import { Paper } from 'components/main'
import propTypes from 'prop-types'
import { Alert } from '@material-ui/lab'
import useObjectState from 'hooks/useState'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { active, desactive } from 'flux/loading'
import useModel from '../useModel'

const months = { '01': '01', '02': '02', '03': '03', '04': '04', '05': '05', '06': '06', '07': '07', '08': '08', '09': '09', '10': '10', '11': '11', '12': '12' }
const years = { 20: '20', 21: '21', 22: '22', 23: '23', 24: '24', 25: '25', 26: '26', 27: '27', 28: '28', 29: '29', 30: '30', 31: '31', 32: '32', 33: '33', 34: '34', 35: '35', 36: '36', 37: '37', 38: '38', 39: '39', 40: '40' }
const errorsParser = {
  'Brand / card type is invalid or not supported': 'Tarjeta no valida',
  'Credit card is expired or expiration date is invalid.': 'Fecha de vencimiento no valio',
  'Duplicate transaction.': 'Transaccion duplicado'
}
const Card = props => {
  const [state, setState] = useObjectState({})
  const dispatch = useDispatch()

  const { handleSaveOperation, total } = useModel(props.country)

  const axiosWrapper = async (data) => {
    try {
      const response = await Axios(data)
      return response.data
    } catch (error) {
      return error.response.data
    }
  }

  const handlePay = async () => {
    const requiresInputs = ['name', 'number', 'cvv', 'month', 'year']
    const errors = requires(state, requiresInputs)
    if (errors) {
      return setState({ errors, errorMessage: 'Todos los campos son requeridos' })
    }
    if (state.number.toString().length !== 16) {
      return setState({ errors: ['number'], errorMessage: 'El numero de la tarjeta no es valido' })
    }
    if (state.cvv.toString().length !== 3) {
      return setState({ errors: ['cvv'], errorMessage: 'cvv no valido' })
    }

    dispatch(active('Estamos procesando tu pago...'))
    const response = await axiosWrapper({
      method: 'post',
      url: '/api/payment/charge',
      data: {
        total: total.toFixed(2).toString(),
        cardNumber: state.number.toString(),
        cardCode: state.cvv.toString(),
        cardMonth: state.month.toString(),
        cardYear: state.year.toString()
      }
    })

    if (response.status === 'error') {
      setState({ errorMessage: errorsParser[response.errorMessage] || 'Pago rechazado, intente con otra tarjeta u otro methodo de pago' })
      return dispatch(desactive())
    }

    handleSaveOperation('payed', { response }, props.state)
  }

  return (
    <>
      <Box pt={2} pb={2}>
        <Typography variant='h6'>Datos de la tarjeta</Typography>
      </Box>
      <Paper>
        <Limiter>
          {state.errorMessage && (
            <Box mb={2}>
              <Alert severity='error'>
                {state.errorMessage}
              </Alert>
            </Box>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input
                margin='none'
                state={state}
                setState={setState}
                name='name'
                label='Nombre completo'
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                name='number'
                margin='none'
                label='numero de tarjeta 16 digitos'
                state={state}
                setState={setState}
                filter='number'
                limit={16}
              />
            </Grid>
            <Grid item xs={4}>
              <Input
                type='select'
                options={{ ...months }}
                name='month'
                margin='none'
                label='Mes'
                state={state}
                setState={setState}
              />
            </Grid>
            <Grid item xs={4}>
              <Input
                type='select'
                options={years}
                name='year'
                margin='none'
                label='Año'
                state={state}
                setState={setState}
              />
            </Grid>
            <Grid item xs={4}>
              <Input
                type='password'
                name='cvv'
                margin='none'
                label='cvv'
                state={state}
                setState={setState}
                limit={3}
              />
            </Grid>
          </Grid>
        </Limiter>
      </Paper>
      <Box mt={5} mb={5}>
        <Grid container spacing={1} justify='flex-end'>
          <Grid item xs={6} md={5} lg={4}>
            <Button
              size='medium'
              fullWidth
              variant='outlined'
              color='primary'
              onClick={props.onBack}
            >Atrás
            </Button>
          </Grid>
          <Grid item xs={6} md={5} lg={4}>
            <Button
              onClick={handlePay}
              size='medium'
              fullWidth
              variant='contained'
              color='primary'
            >Pagar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

Card.propTypes = {
  onBack: propTypes.func,
  state: propTypes.object,
  country: propTypes.string
}

// o n l y   s  t y l e s
const Limiter = styled.div`
  margin: 100px;
  @media screen and (max-width:1600px) {
    margin: 50px
  }
  @media screen and (max-width:1400px) {
    margin: 50px 30px;
  }
  @media screen and (max-width:1000px) {
    margin: 20px;
  }
`

export default Card
