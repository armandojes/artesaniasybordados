/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import Picture from 'components/Picture'
import { Typography } from '@material-ui/core'
import currency from 'helpers/currency'

const Content = styled.div`
  display: flex;
`
const PictureStyled = styled(Picture)`
  width: 100px;
  margin-right: 15px;
  @media screen and (max-width:800px){
    width: 90px;
  }
`

const Data = styled.div`
  flex-grow: 2;
`

const Span = styled.span`
  color: gray;
`
const TypographySyled = styled(Typography)`
  line-height: 1em;
`

const ItemSecondary = props => {
  return (
    <Content>
      <PictureStyled src={props.picture} />
      <Data>
        <TypographySyled color='primary' variant='subtitle1'>{props.title}</TypographySyled>
        <TypographySyled variant='subtitle2'>{currency.toPrice(props.price)}</TypographySyled>
        {props.size && (<TypographySyled variant='subtitle2'><Span>Talla: </Span>{props.size}</TypographySyled>)}
        <TypographySyled variant='subtitle2'><Span>Cantidad: </Span>{props.quantity}</TypographySyled>
      </Data>
    </Content>
  )
}

export default ItemSecondary
