import { remove } from 'flux/cart'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import View from './view'
import propTypes from 'prop-types'

const Products = (props) => {
  const { items, loading } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const handleDelete = data => {
    dispatch(remove(data))
  }

  return (
    <View
      items={items}
      loading={loading}
      onDelete={handleDelete}
      onNext={props.onNext}
      onBack={props.onBack}
    />
  )
}

Products.propTypes = {
  onNext: propTypes.func,
  onBack: propTypes.func
}

export default Products
