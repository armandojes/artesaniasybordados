import React from 'react'
import { useSelector } from 'react-redux'
import View from './view'
import calculatePrice from 'helpers/calculatePrice'
import shippingCostCalculator from 'helpers/ShppingCostCalculator'

const Sumary = props => {
  const { items } = useSelector(state => state.cart)
  const subTotal = calculatePrice(items)
  const shippingPrice = shippingCostCalculator(items || [])
  const total = subTotal + shippingPrice

  return (
    <View
      shippingPrice={shippingPrice}
      subTotal={subTotal}
      items={items || []}
      total={total}
    />
  )
}

export default Sumary
