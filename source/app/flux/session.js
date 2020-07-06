import makeFlux from 'flux/makeflux'

const flux = makeFlux('SESSION')
const initialState = {
  logged: false
}

export const setSession = flux.createAction('SET_SESSION', (state, payload) => {
  return payload ? { ...state, ...payload, logged: true } : { logged: false }
})

export default flux.createReducer(initialState)
