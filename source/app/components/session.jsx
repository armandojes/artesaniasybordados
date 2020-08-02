import React from 'react'
import Loggin from '../pages/login'
import { useSelector } from 'react-redux'
import LayoutUser from './layout_user'
import { CircularProgress } from '@material-ui/core'
import { FullWidthCentered } from './main'

const Session = (WrappedComponent, admin) => {
  const EnhancedComponent = props => {
    const session = useSelector(state => state.session)

    if (session === null) {
      return (<Loggin />)
    }

    if (session === 'loading') {
      return (
        <LayoutUser>
          <FullWidthCentered>
            <CircularProgress />
          </FullWidthCentered>
        </LayoutUser>
      )
    }

    if ((typeof session === 'object' && !admin) || (typeof session === 'object' && !!session.admin)) {
      return <WrappedComponent {...props} />
    }

    return (
      <div>No tienes permisos...</div>
    )
  }
  return EnhancedComponent
}

export default Session
