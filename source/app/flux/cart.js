import makeFlux from 'flux/makeflux'
import cart from 'core/cart'
import { setAlert } from 'flux/alert'

const flux = makeFlux('CART')

const initialState = {
  items: [],
  loading: true
}

export const setItems = flux.createAction('SET_ITEMS', (state, payload) => {
  return {
    ...state,
    items: payload,
    loading: false
  }
})

export const add = data => async (dispatch, getState) => {
  const state = getState()
  const userId = state.session.id
  var newItems
  const currentItems = state.cart.items
  const isItemExist = currentItems.filter(item => item.id === data.id)
  if (isItemExist.length) {
    newItems = currentItems.map(item => {
      const newItem = { ...item }
      if (newItem.id === data.id) newItem.quantity = newItem.quantity + data.quantity
      return newItem
    })
  } else {
    newItems = [...currentItems, data]
  }
  dispatch(setItems(newItems))
  cart.add(userId, newItems)
}

export const remove = id => async (dispatch, getState) => {
  dispatch(setAlert({
    description: '¿Seguro quieres quitar este articulo de u carrito?',
    action: async () => {
      const state = getState()
      const userId = state.session.id
      const currentItems = state.cart.items
      const newItems = currentItems.filter(item => item.id !== id)
      dispatch(setItems(newItems))
      await cart.add(userId, newItems)
    }
  }))
}

export default flux.createReducer(initialState)
