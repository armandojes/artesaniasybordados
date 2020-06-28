import React, { useMemo, useEffect } from 'react'
import Admin from 'components/admin'
import Container from 'components/container'
import { TitlePage } from 'components/main'
import { Grid } from '@material-ui/core'
import { getListAll } from 'core/articles'
import useState from 'hooks/useState'
import Skeleton from 'components/skeletonGrid'
import Card from './card'

const List = props => {
  const [state, setState] = useState({
    limit: 10,
    items: [],
    finished: false
  })

  const fetchNextpage = useMemo(() => getListAll(10), [])

  const handlefetch = async () => {
    console.log('fetched')
    setState({ loading: true })
    const items = await fetchNextpage()
    console.log(items)
    setState({
      items: [...state.items, ...items],
      finished: items.length < state.limit,
      loading: false
    })
  }

  useEffect(() => {
    handlefetch()
  }, [])

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
    if (state.finished) return false
    handlefetch()
  }

  return (
    <Admin>
      <Container page>
        <TitlePage>Mis articulos</TitlePage>
        <Grid container spacing={2}>
          {state.items.map(item => (
            <Grid key={item.id} item xs={6} sm={4} md={3}>
              <Card {...item} />
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

export default List
