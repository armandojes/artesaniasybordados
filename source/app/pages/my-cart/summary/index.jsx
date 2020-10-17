import React from 'react'
import { useSelector } from 'react-redux'
import View from './view'
import calculatePrice from 'helpers/calculatePrice'
import shippingCostCalculator from 'helpers/ShppingCostCalculator'
import propTypes from 'prop-types'

const Sumary = props => {
  const { items } = useSelector(state => state.cart)
  const subTotal = calculatePrice(items)
  const shippingPrice = props.country === 'us' ? 'A acordar' : shippingCostCalculator(items || [])
  const total = props.country === 'us' ? subTotal : subTotal + shippingPrice

  return (
    <View
      shippingPrice={shippingPrice}
      subTotal={subTotal}
      items={items || []}
      total={total}
    />
  )
}

Sumary.propTypes = {
  country: propTypes.string.isRequired
}

export default Sumary
