import React from 'react'
import styled from 'styled-components'
import PictureBase from 'components/Picture'
import { string, number, func } from 'prop-types'
import { Typography, IconButton as IconButtonBase } from '@material-ui/core'
import currency from 'helpers/currency'
import { Delete } from '@material-ui/icons'

const Picture = styled(PictureBase)`
  width: 90px;
  margin-right: 10px;
`
const Content = styled.div`
  display: flex;
  align-items: center;
`
const Data = styled.div`
  flex-grow: 1;
  margin-right: 10px;
`
const IconButton = styled(IconButtonBase)`
  & svg {
    color: red;
  }
`

const Item = props => {
  return (
    <Content>
      <Picture src={props.picture} />
      <Data>
        <Typography style={{ lineHeight: '1.2em' }} variant='subtitle1'>{props.title}</Typography>
        <Typography color='primary' variant='subtitle1'>{currency.toPrice(props.price)}</Typography>
        <Typography style={{ color: 'gray' }} variant='subtitle2'><span>Cantidad:</span> {props.quantity}</Typography>
        {props.size && (<Typography style={{ color: 'gray' }} variant='subtitle2'><span>Talla:</span> {props.size}</Typography>)}
      </Data>
      <IconButton onClick={event => props.onDelete(props)}>
        <Delete />
      </IconButton>
    </Content>
  )
}

Item.propTypes = {
  picture: string,
  title: string,
  price: number,
  quantity: number,
  onDelete: func,
  size: string
}

export default Item
