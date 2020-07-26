import makeFlux from 'flux/makeflux'

const flux = makeFlux('LOADING')
const initialState = {
  active: false,
  message: 'Cargando...'
}

export const active = flux.createAction('active', (_state, payload) => {
  return {
    message: payload,
    active: true
  }
})

export const desactive = flux.createAction('desactive', (_state, payload) => {
  return {
    message: 'cargando...',
    active: false
  }
})

export default flux.createReducer(initialState)
