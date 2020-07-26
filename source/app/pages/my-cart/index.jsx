import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import View from './view'
import { shippingPrice } from '../../../config'
import calculatePrice from 'helpers/calculatePrice'
import useObjectState from 'hooks/useState'
import { remove } from 'flux/cart'

const Mycart = props => {
  const { items, loading } = useSelector(state => state.cart)
  const [view, setView] = useState('products')
  const subTotal = calculatePrice(items)
  const total = subTotal + shippingPrice
  const [state, setState] = useObjectState({})
  const dispatch = useDispatch()

  const handleDelete = id => dispatch(remove(id))

  return (
    <View
      onDelete={handleDelete}
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
