import makeFlux from 'flux/makeflux'

const flux = makeFlux('SESSION')
const initialState = 'loading' // {...data} || null || loading

export const setSession = flux.createAction('SET_SESSION', (state, payload) => {
  return payload ? { ...payload } : null
})

export default flux.createReducer(initialState)
