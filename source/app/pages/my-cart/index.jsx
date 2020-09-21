import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import View from './view'
import shippingCostCalculator from 'helpers/ShppingCostCalculator'
import calculatePrice from 'helpers/calculatePrice'
import useObjectState from 'hooks/useState'
import { remove, removeAll } from 'flux/cart'
import { useHistory } from 'react-router-dom'
import { requires } from 'helpers/validate'
import { active, desactive } from 'flux/loading'
import { add } from 'core/sale'
import session from 'components/session'
import { fakeCheckoutData } from '../../constants'

const Mycart = props => {
  const history = useHistory()
  const { items, loading } = useSelector(state => state.cart)
  const session = useSelector(state => state.session)
  const shippingPrice = shippingCostCalculator(items || [])
  const [view, setView] = useState('products') // products || form || methodPay || finally
  const subTotal = calculatePrice(items)
  const total = subTotal + shippingPrice
  const [state, setState] = useObjectState(ENV === 'development' ? fakeCheckoutData : {})

  // reset scroll when change currentView
  useEffect(() => { window.scrollTo(0, 0) }, [view])

  const dispatch = useDispatch()

  const handleDelete = data => {
    dispatch(remove(data))
  }

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

  // on payment aproved
  const handleSaveOperation = async (status = 'pending', meta = {}) => {
    const id = await add({ userId: session.id, items, total, shipping: shippingPrice, info: state, meta, status, methodPay: state.methodPay })
    dispatch(removeAll())
    dispatch(desactive())
    history.replace({ pathname: `/compra/${id}`, state: { success: true } })
  }

  // paypal config
  const paypalConfig = props => {
    return {
      createOrder: function (data, actions) {
        dispatch(active('Estamos procesando el pago'))
        return actions.order.create({
          purchase_units: [{
            amount: { value: total }
          }]
        })
      },
      onApprove: (data, actions) => {
        const status = actions.order.capture().then((details) => {
          const { id, payer } = details
          handleSaveOperation('payed', { id, payer })
        })
        return status
      }
    }
  }

  // render button paypal
  useEffect(any => {
    setTimeout(() => {
      try {
        window.document.getElementById('render_button_paypal').innerHTML = ''
        window.paypal.Buttons(paypalConfig({ ...props })).render('#render_button_paypal')
      } catch (error) { console.log('_error_', error) }
    }, 200)
  }, [total, state.methodPay, view])

  const handlePay = async _event => {
    dispatch(active('Estamos generando tu orden de pago'))
    await handleSaveOperation()
  }

  return (
    <View
      onPay={handlePay}
      onSuccessOperation={handleSaveOperation}
      paypalConfig={paypalConfig}
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

export default session(Mycart)
