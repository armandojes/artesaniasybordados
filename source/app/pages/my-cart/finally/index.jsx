import React, { useEffect } from 'react'
import View from './view'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { active, desactive } from 'flux/loading'
import { removeAll } from 'flux/cart'
import { add } from 'core/sale'
import calculatePrice from 'helpers/calculatePrice'
import shippingCostCalculator from 'helpers/ShppingCostCalculator'
import { useHistory } from 'react-router'

const Finally = props => {
  const dispatch = useDispatch()
  const session = useSelector(state => state.session)
  const { items } = useSelector(state => state.cart)
  const subTotal = calculatePrice(items || [])
  const shippingPrice = shippingCostCalculator(items || [])
  const total = subTotal + shippingPrice
  const history = useHistory()

  // on payment aproved
  const handleSaveOperation = async (status = 'pending', meta = {}) => {
    dispatch(active('Estamos generando tu orden de pago'))
    const id = await add({ userId: session.id, items, total, shipping: shippingPrice, info: props.state, meta, status, methodPay: props.state.methodPay })
    dispatch(removeAll())
    dispatch(desactive())
    history.replace({ pathname: `/compra/${id}`, state: { success: true } })
  }

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
      },
      onError: () => {
        dispatch(desactive())
      },
      onCancel: () => {
        dispatch(desactive())
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
  }, [total, props.state.methodPay])

  return (
    <View
      state={props.state}
      onBack={props.onBack}
      onPay={() => handleSaveOperation()}
      onViewChange={props.onViewChange}
    />
  )
}

Finally.propTypes = {
  state: propTypes.object,
  onBack: propTypes.func,
  onViewChange: propTypes.func
}

export default Finally
