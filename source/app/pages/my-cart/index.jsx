import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import View from './view'
import { shippingPrice } from '../../../config'
import calculatePrice from 'helpers/calculatePrice'
import useObjectState from 'hooks/useState'

const Mycart = props => {
  const { items, loading } = useSelector(state => state.cart)
  const [view, setView] = useState('products')
  const subTotal = calculatePrice(items)
  const total = subTotal + shippingPrice
  const [state, setState] = useObjectState({})

  return (
    <View
      loading={loading}
      items={items}
      view={view}
      setView={setView}
      shippingPrice={shippingPrice}
      subTotal={subTotal}
      total={total}
      state={state}
      setState={setState}
    />
  )
}

export default Mycart
