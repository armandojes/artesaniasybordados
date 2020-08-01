/* eslint-disable react/prop-types */
import React from 'react'
import { Typography } from '@material-ui/core'
import styled from 'styled-components'
import { Paper } from './main'
import { Link } from 'react-router-dom'
import currency from 'helpers/currency'
import { status, statusColors } from '../constants'
import { toString } from 'helpers/date'

const PaperStyled = styled(Paper)`
  transition: all 0.3s;
  padding: 30px;
  height: 100%;
  box-sizing: border-box;
  background: ${p => p.$focused ? '#e7f3ff' : '#fff'};
  @media screen and (max-width:600px) {
    padding: 10px;
  }
  cursor: pointer;
  :hover {
    box-shadow: 10px 5px 10px #cdcdcd;
  }
`

const Sale = props => (
  <Link to={`/${props.admin ? 'admin/sale' : 'compra'}/${props.id}`}>
    <PaperStyled $focused={!props.viewed && props.admin}>
      <Typography style={{ fontWeight: 'bold', marginBottom: '10px' }} align='center' variant='h6'>{toString(props.date.toDate())}</Typography>
      <Typography align='center' variant='subtitle1'>Articulos: {props.items.length}</Typography>
      <Typography align='center' variant='subtitle1'>{currency.toPrice(props.total)}</Typography>
      {props.admin && (<Typography align='center' variant='subtitle1'>{props.info.name}</Typography>)}
      <Typography style={{ color: statusColors[props.status], fontWeight: 'bold' }} align='center' variant='subtitle1'>{status[props.status]}</Typography>
    </PaperStyled>
  </Link>
)

export default Sale
