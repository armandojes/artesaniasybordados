import { useDispatch, useSelector } from 'react-redux'
import calculatePrice from 'helpers/calculatePrice'
import shippingCostCalculator from 'helpers/ShppingCostCalculator'
import { active, desactive } from 'flux/loading'
import { removeAll } from 'flux/cart'
import { add } from 'core/sale'
import { useHistory } from 'react-router'

/**
 * @param {String} country country will be used for calculate shipping cost
 */
const useModel = country => {
  const { items } = useSelector(state => state.cart)
  const session = useSelector(state => state.session)

  const dispatch = useDispatch()
  const history = useHistory()
  const subTotal = calculatePrice(items)
  const shippingPrice = country === 'us' ? 'A acordar' : shippingCostCalculator(items || [])
  const total = country === 'us' ? subTotal : subTotal + shippingPrice

  const handleSaveOperation = async (status = 'pending', meta = {}, state = {}) => {
    dispatch(active('Estamos generando tu orden de pago'))
    const id = await add({ userId: session.id, items, total, shipping: shippingPrice, info: state, meta, status, methodPay: state.methodPay })
    dispatch(removeAll())
    dispatch(desactive())
    history.replace({ pathname: `/compra/${id}`, state: { success: true } })
  }

  return { total, subTotal, shippingPrice, handleSaveOperation, items }
}

export default useModel
