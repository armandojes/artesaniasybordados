import React from 'react'
import styled from 'styled-components'
import PictureBase from 'components/Picture'
import { string, number } from 'prop-types'
import { Typography } from '@material-ui/core'
import currency from 'helpers/currency'

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

const Item = props => {
  return (
    <Content>
      <Picture src={props.picture} />
      <Data>
        <Typography style={{ lineHeight: '1.2em' }} variant='subtitle1'>{props.title}</Typography>
        <Typography color='primary' variant='subtitle1'>{currency.toPrice(props.price)}</Typography>
        <Typography style={{ color: 'gray' }} variant='subtitle2'><span>Cantidad:</span> {props.quantity}</Typography>
      </Data>
    </Content>
  )
}

Item.propTypes = {
  picture: string,
  title: string,
  price: number,
  quantity: number
}

export default Item
