import makeFlux from 'flux/makeflux'

const flux = makeFlux('SESSION')
const initialState = 'loading' // {...data} || null || loading

export const setSession = flux.createAction('SET_SESSION', (state, payload) => {
  return payload ? { ...payload } : null
})

export const setLoading = flux.createAction('SET_LOADING', () => {
  return 'loading'
})

export default flux.createReducer(initialState)
