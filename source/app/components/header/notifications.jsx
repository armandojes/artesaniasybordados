/* eslint-disable react/prop-types */
import React, { useMemo, useEffect } from 'react'
import { Menu, Box, Grid, CircularProgress } from '@material-ui/core'
import styled from 'styled-components'
import useObjectState from 'hooks/useState'
import { useSelector } from 'react-redux'
import { getList, setNotification } from 'core/notification'
import List from '../../pages/notification/list'
import { Notifications } from '@material-ui/icons'

const Container = styled.div`
  width: 350px;
  min-height: 200px;
  max-height: 500px;
  overflow-y: scroll;
  &:hover {
    ::-webkit-scrollbar {
    display: initial;
  }
  }
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    display: none;
  }

  ::-webkit-scrollbar:vertical {
    width: 8px;
  }

  ::-webkit-scrollbar:horizontal {
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #cdcdcd;
    border-radius: 10px;
  }
`
const Text = styled.div`
  text-align: center;
  margin-top: 40px;
  font-size: 1.3em;
  color: #2196f373;
`
const Notific = styled(Notifications)`
  color: #9bd0faab;
  display: block!important;
  margin: auto;
  margin-top: 40px;
  font-size: 60px!important;
`

const MenuComponent = props => {
  const [state, setState] = useObjectState({ loading: true, items: [], isFinally: false })
  const session = useSelector(state => state.session)

  const fetcher = useMemo(() => getList(session.id, 10), [])

  const handleFetch = async () => {
    setState({ loading: true })
    const items = await fetcher()
    console.log('response', items)
    setState({ items: [...state.items, ...items], loading: false, isFinally: !items.length })
  }

  // fetch initial data
  useEffect(() => {
    handleFetch()
    setNotification(session.id, false)
  }, [])

  const handleScroll = event => {
    if (state.loading) return false
    if (state.isFinally) return false
    const notification = document.getElementById('notificacionContainer')
    const scrolled = event.target.scrollTop
    const viewportHeight = notification.clientHeight
    const fullHeight = document.getElementById('fullheight').clientHeight
    if ((scrolled + viewportHeight + 50) < fullHeight) return false
    console.log('fetch next')
    handleFetch()
  }

  // pagination
  useEffect(() => {
    try {
      const notification = document.getElementById('notificacionContainer')
      notification.addEventListener('scroll', handleScroll)
      return () => notification.removeEventListener('scroll', handleScroll)
    } catch (error) {
      console.log('error', error)
    }
  }, [state.loading, state.isFinally, props.open])

  return (
    <Box p={1}>
      <Container id='notificacionContainer'>
        {!!state.items.length && (
          <>
            <List items={state.items} id='fullheight' />
            {state.loading && (
              <Box pt={2} pb={2}>
                <Grid container justify='center' alignItems='center'>
                  <CircularProgress />
                </Grid>
              </Box>
            )}
          </>
        )}
        {!state.items.length && !state.loading && (
          <>
            <Notific />
            <Text>
              Aun no tienes notificaciones
            </Text>
          </>

        )}
        {!!state.loading && !state.items.length && (
          <Grid container justify='center' alignItems='center' style={{ minHeight: '200px' }}>
            <CircularProgress />
          </Grid>
        )}
      </Container>
    </Box>

  )
}

const MenuWrapper = (props) => {
  return (
    <Menu {...props} onClick={props.onClose}>
      {props.open && (
        <MenuComponent {...props} />
      )}
    </Menu>
  )
}

export default MenuWrapper
