import React, { useMemo, useEffect } from 'react'
import Layout from 'components/layout_user'
import Container from 'components/container'
import useObjectState from 'hooks/useState'
import { useSelector } from 'react-redux'
import Session from 'components/session'
import { getList, setNotification } from 'core/notification'
import { FullWidthCentered, TitlePage } from 'components/main'
import { CircularProgress, Container as ContainerMaterial, Box, Grid, useMediaQuery } from '@material-ui/core'
import EmptyMessage from 'components/EmptyContent'
import List from './list'
import { useHistory } from 'react-router'

const Notification = () => {
  const [state, setState] = useObjectState({ loading: true, items: [], isFinally: false })
  const session = useSelector(state => state.session)
  const isMd = useMediaQuery('(max-width:959px)')
  const history = useHistory()

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

  const handleScroll = () => {
    if (state.loading) return false
    if (state.isFinally) return false
    const scrolled = window.scrollY
    const viewportHeight = window.innerHeight
    const fullHeight = document.getElementById('render_target').clientHeight
    if ((scrolled + viewportHeight + 500) < fullHeight) return false
    console.log('fetch next')
    handleFetch()
  }

  // pagination
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [state.loading, state.isFinally])

  if (!isMd && !state.loading) {
    history.goBack()
  }

  return (
    <Layout>
      <Container $page>
        <ContainerMaterial maxWidth='xs' disableGutters>
          <TitlePage>Notificaciones</TitlePage>
        </ContainerMaterial>
        {!state.loading && !state.items.length && (
          <EmptyMessage
            message='Aun no tienes notificaciones'
          />
        )}
        {!!state.items.length && (
          <ContainerMaterial maxWidth='xs' disableGutters>
            <List items={state.items} />
            {state.loading && (
              <Box pt={3} pb={3}>
                <Grid container justify='center'>
                  <CircularProgress />
                </Grid>
              </Box>
            )}
          </ContainerMaterial>
        )}
        {!state.items.length && !!state.loading && (
          <FullWidthCentered>
            <CircularProgress />
          </FullWidthCentered>
        )}
      </Container>
    </Layout>
  )
}

export default Session(Notification)
