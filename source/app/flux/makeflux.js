function createFlux (moduleName) {
  return {
    handlers: {},
    createAction (actionType, handler) {
      // crear action y reducer para initial state
      if (!actionType) {
        const actionTypeInitialState = `${moduleName}/${'set_initial_state'}`
        this.handlers[actionTypeInitialState] = state => state
        return () => ({ type: actionTypeInitialState })
      } else {
        // crear action y reducer personlizado
        const actionTypeComposed = `${moduleName}/${actionType}`
        this.handlers[actionTypeComposed] = handler
        return (payload) => ({ type: actionTypeComposed, payload })
      }
    },
    createReducer (initialState) {
      // return reducer
      return (state = initialState, action = {}) => {
        if (!this.handlers[action.type]) return state
        return this.handlers[action.type](state, action.payload)
      }
    }
  }
}

export default createFlux
