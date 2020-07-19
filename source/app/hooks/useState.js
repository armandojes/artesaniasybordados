import { useState } from 'react'

const useObjectState = initialState => {
  const [state, setState] = useState(initialState)

  const updateState = newPartState => {
    setState({
      ...state,
      ...newPartState
    })
  }

  return [state, updateState, setState]
}

export default useObjectState
