import React, { useEffect, useState } from 'react'
import Admin from 'components/admin'
import Container from 'components/container'
import { TitlePage } from 'components/main'
import { Grid } from '@material-ui/core'
import { getList, drop } from 'core/articles'
import useObjectState from 'hooks/useState'
import Skeleton from 'components/skeletonGrid'
import Card from './card'
import { setAlert } from 'flux/alert'
import { useDispatch } from 'react-redux'
import session from 'components/session'

const List = props => {
  const limit = 5
  const dispatch = useDispatch()
  const [fetchNextpage, setHandleNext] = useState(() => getList(limit))
  const [state, setState] = useObjectState({
    items: [],
    finished: false
  })

  const handlefetch = async () => {
    setState({ loading: true })
    const items = await fetchNextpage()
    setState({
      items: [...state.items, ...items],
      finished: items.length < limit,
      loading: false
    })
  }

  useEffect(() => {
    handlefetch()
  }, [fetchNextpage])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return _event => window.removeEventListener('scroll', handleScroll)
  })

  const handleScroll = _event => {
    if (state.loading) return false
    const scrolled = window.scrollY
    const viewportHeight = window.innerHeight
    const fullHeight = document.getElementById('render_target').clientHeight
    if ((scrolled + viewportHeight + 100) < fullHeight) return false
    console.log('loading: false')
    if (state.finished) return false
    handlefetch()
  }

  const handleDelete = data => {
    dispatch(setAlert({
      description: '¿Seguro quieres borrar este articulo?',
      action: async () => {
        await drop(data)
        setState({ limit: 10, items: [], finished: false, loading: false })
        setHandleNext(() => getList(limit))
      }
    }))
  }

  return (
    <Admin>
      <Container page>
        <TitlePage>Mis articulos</TitlePage>
        <Grid container spacing={2}>
          {state.items.map(item => (
            <Grid key={item.id} item xs={6} sm={4} md={3}>
              <Card {...item} handleDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>
        {state.loading && !state.items.length && (
          <Skeleton />
        )}
      </Container>
    </Admin>
  )
}

export default session(List, true)
