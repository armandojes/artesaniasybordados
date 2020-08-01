import makeFlux from 'flux/makeflux'

// firm
// dispatch(setAlert({
//   description: '¿Seguro quieres borrar este articulo?',
//   action: async () => {
//     await drop(data)
//     setState({ limit: 10, items: [], finished: false, loading: false })
//     setHandleNext(() => getList(limit))
//   }
// }))

const flux = makeFlux('ALERT')
const initialState = {
  description: null,
  action: null,
  active: false
}

export const setAlert = flux.createAction('SET_ACTION', (state, payload) => {
  return {
    ...state,
    ...payload,
    active: true
  }
})

export const setInitialState = flux.createAction('SET_INITIAL_STATE', () => {
  return {
    ...initialState
  }
})

export const setLoading = flux.createAction('SET_LOADING', (state, payload) => {
  return {
    ...state,
    loading: payload
  }
})

export const action = () => async (dispatch, getState) => {
  const state = getState()
  dispatch(setLoading(true))
  await dispatch(state.alert.action)
  dispatch(setInitialState())
}

export default flux.createReducer(initialState)
