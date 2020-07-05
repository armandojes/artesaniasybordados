import { useEffect } from 'react'
import { onSessionChange } from 'core/user'
import { setSession } from 'flux/session'
import { useDispatch } from 'react-redux'

const Definers = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    onSessionChange(data => {
      dispatch(setSession(data))
    })
  }, [])

  return null
}

export default Definers
