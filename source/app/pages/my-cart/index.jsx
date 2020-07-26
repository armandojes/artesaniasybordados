import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import View from './view'
import { shippingPrice } from '../../../config'
import calculatePrice from 'helpers/calculatePrice'
import useObjectState from 'hooks/useState'
import { remove } from 'flux/cart'
import { useHistory } from 'react-router-dom'
import { requires } from 'helpers/validate'

const Mycart = props => {
  const history = useHistory()
  const { items, loading } = useSelector(state => state.cart)
  const [view, setView] = useState('finally') // products || form || methodPay || finally
  const subTotal = calculatePrice(items)
  const total = subTotal + shippingPrice
  const [state, setState] = useObjectState({
    city: 'san cristobal de las casas',
    email: 'armando@gmail.com',
    errorMessage: null,
    errors: [],
    lastname: 'santiz lopez',
    name: 'armando de jesus',
    number: '6565564556',
    postal_code: '29247',
    references: 'puerta negra ',
    state: 'chiapas',
    street_number: 'lazaro cardenas numero 7',
    suburb: 'la frontera'
  })

  // reset scroll when change currentView
  useEffect(() => { window.scrollTo(0, 0) }, [view])

  const dispatch = useDispatch()

  const handleDelete = id => dispatch(remove(id))

  const handleNext = event => {
    if (view === 'products') setView('form')
    if (view === 'form') {
      const errors = requires(state, ['name', 'lastname', 'number', 'email', 'street_number', 'postal_code', 'suburb', 'state', 'city', 'references'])
      if (errors) setState({ errors, errorMessage: 'Todos los campos son obligatorios' })
      else setView('methodPay')
    }
    if (view === 'methodPay') {
      if (!state.methodPay) setState({ errorMessage: 'Selecciona un metodo de pago' })
      else setView('finally')
    }
  }

  const handleBack = event => {
    if (view === 'products') history.push('/articulos')
    if (view === 'form') setView('products')
    if (view === 'methodPay') setView('form')
    if (view === 'finally') setView('methodPay')
  }

  return (
    <View
      onNext={handleNext}
      onBack={handleBack}
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
