import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import ReduxThunk from 'redux-thunk'

// r e d u c e  r s
import alert from 'flux/alert'
import session from 'flux/session'
import cart from 'flux/cart'
import loading from 'flux/loading'
import notification from 'flux/notifications'

const reducer = combineReducers({
  loading,
  alert,
  session,
  cart,
  notification
})

const configureStore = (type = 'client', session = null) => {
  var store = null
  if (type === 'client') {
    const preloadedState = window.__PRELOADED_STATE__
    const enhancer = ENV === 'production'
      ? applyMiddleware(ReduxThunk)
      : composeWithDevTools(applyMiddleware(ReduxThunk, logger))

    store = createStore(
      reducer,
      preloadedState,
      enhancer
    )
  } else if (type === 'server') {
    const initialState = session ? { session } : {}
    store = createStore(
      reducer,
      initialState,
      applyMiddleware(ReduxThunk)
    )
  }

  return store
}

export default configureStore
