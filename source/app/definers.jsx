import { useEffect } from 'react'
import { onSessionChange } from 'core/user'
import { setSession } from 'flux/session'
import { useDispatch, useSelector } from 'react-redux'
import { setItems as setItemsOnCart } from 'flux/cart'
import { onCartChange } from 'core/cart'

const Definers = props => {
  const dispatch = useDispatch()
  const session = useSelector(state => state.session)

  // listener form session
  useEffect(() => {
    onSessionChange(data => {
      console.log('OnSessionChangeData', data)
      dispatch(setSession(data))
    })
  }, [])

  // set items OnCart
  useEffect(() => {
    if (session !== 'loading' && !!session) {
      const unsubscrube = onCartChange(session.id, items => dispatch(setItemsOnCart(items)))
      return () => unsubscrube()
    }
  }, [session])
  return null
}

export default Definers
