import makeFlux from 'flux/makeflux'

const flux = makeFlux('ALERT')
const initialState = {
  description: null,
  action: () => { console.log('accion ejecutado...') },
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
  await dispatch(state.action.action)
  dispatch(setInitialState())
}

export default flux.createReducer(initialState)
