import React from 'react'
import styled from 'styled-components'
import { Paper } from 'components/main'
import { Grid, Typography, Divider } from '@material-ui/core'
import propTypes from 'prop-types'
import currency from 'helpers/currency'
import useModel from '../useModel'

const Content = styled(Paper)`
  position: sticky;
  top: 160px;
  padding: 50px;
  box-sizing: border-box;
`

const Summary = props => {
  const { shippingPrice, subTotal, total, items } = useModel(props.country)

  return (
    <Content>
      <Grid container justify='space-between' spacing={1}>
        <Grid item xs={12}>
          <Typography variant='subtitle1'>Resumen de compra</Typography>
        </Grid>
        <Grid item xs={12}><Divider /></Grid>
        <Grid item xs={7}>
          <Typography variant='subtitle2'>
            Producto{!!items.length && 's'}({items.length}):
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography align='right' variant='subtitle2'>{currency.toPrice(subTotal)}</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography variant='subtitle2'>
            Envío:
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography align='right' variant='subtitle2'>
            {typeof shippingPrice === 'string' ? shippingPrice : currency.toPrice(shippingPrice)}
          </Typography>
        </Grid>
        <Grid item xs={12}><Divider /></Grid>
        <Grid item xs={7}>
          <Typography variant='subtitle2'>
            Total:
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography align='right' variant='subtitle2'>{currency.toPrice(total)}</Typography>
        </Grid>
      </Grid>
    </Content>
  )
}

Summary.propTypes = {
  country: propTypes.string
}

export default Summary
