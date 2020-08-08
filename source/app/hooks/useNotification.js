import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { onNotificationChange } from 'core/notification'

const useNotification = (initialState) => {
  const session = useSelector(state => state.session)
  const [isActive, setActive] = useState(false)

  useEffect(() => {
    if (!!session && session !== 'loading') {
      const unSubscribe = onNotificationChange(session.id, status => {
        if (isActive !== status) {
          setActive(status)
        }
      })
      return unSubscribe
    }
  }, [session, isActive])
  return isActive
}

export default useNotification
