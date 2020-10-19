import Layout from 'components/layout_user'
import React, { useMemo, useEffect } from 'react'
import Container from 'components/container'
import { getList } from 'core/articles'
import useObjectState from 'hooks/useState'
import useFetch from 'hooks/useFetch'
import Skeleton from 'components/skeletonGrid'
import { Grid, Typography, Box } from '@material-ui/core'
import Article from 'components/article'
import { Loyalty } from '@material-ui/icons'
import queryString from 'query-string'
import { object } from 'prop-types'
import EmptyMessage from 'components/EmptyContent'
import { useLocation } from 'react-router'

const Articles = props => {
  const initialFilters = props.location.state || {}
  const [state, setState] = useObjectState({ items: [], loading: true })
  const location = useLocation()
  const { keywords } = queryString.parse(location.search)

  // fetcher
  const loadNextPage = useMemo(() => {
    return getList(10, { ...initialFilters, keywords })
  }, [initialFilters.category, initialFilters.subcategory, initialFilters.gender, keywords])

  // fetch initial items
  useFetch(async () => {
    setState({ loading: true })
    const items = await loadNextPage()
    setState({ items, loading: false })
  }, [loadNextPage])

  const handleLoadNextPage = async () => {
    setState({ loading: true })
    const newItems = await loadNextPage()
    setState({ loading: false, items: [...state.items, ...newItems] })
  }

  // load next page
  const handleScroll = _event => {
    if (state.loading) return false
    const scrolled = window.scrollY
    const viewportHeight = window.innerHeight
    const fullHeight = document.getElementById('render_target').clientHeight
    console.log((scrolled + viewportHeight + 100) < fullHeight)
    if ((scrolled + viewportHeight + 500) < fullHeight) return false
    console.log('loading: false')
    if (state.finished) return false
    handleLoadNextPage()
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  // reset scrolled
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [loadNextPage])

  return (
    <Layout>
      <Container $page>
        {state.loading && !state.items.length && (
          <Skeleton />
        )}
        {!!state.items.length && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box mt={{ xs: 3, md: 3 }}>
                <Typography variant='h4'>{keywords || 'Catálogo'}</Typography>
              </Box>
            </Grid>
            {state.items.map(item => (
              <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                <Article {...item} />
              </Grid>
            ))}
          </Grid>
        )}
        {!state.loading && !state.items.length && (
          <EmptyMessage
            title='Opps!!'
            message='No encontramos lo que buscabas'
            icon={Loyalty}
          />
        )}
      </Container>
    </Layout>
  )
}

Articles.propTypes = {
  location: object
}

export default Articles
