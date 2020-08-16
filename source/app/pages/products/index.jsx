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

import { object } from 'prop-types'
import EmptyMessage from 'components/EmptyContent'
import { useSelector } from 'react-redux'
import { transformPrice } from 'helpers/calculatePrice'

const Articles = props => {
  const initialFilters = props.location.state || {}
  const [state, setState] = useObjectState({ items: [], loading: true })
  const session = useSelector(state => state.session)
  const userType = (!!session && session !== 'loading') ? session.type : 'client'

  // fetcher
  const loadNextPage = useMemo(() => getList(null, initialFilters), [initialFilters.category, initialFilters.subcategory, initialFilters.gender])

  // fetch initial items
  useFetch(async () => {
    setState({ loading: true })
    const items = await loadNextPage()
    setState({ items, loading: false })
  }, [loadNextPage])

  // reset scrolled
  useEffect(() => { window.scrollTo(0, 0) }, [initialFilters])

  return (
    <Layout>
      <Container $page>
        {state.loading && (
          <Skeleton />
        )}
        {!state.loading && !!state.items.length && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box mt={{ xs: 3, md: 3 }}>
                <Typography variant='h4'>Catálogo</Typography>
              </Box>
            </Grid>
            {state.items.map(item => (
              <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                <Article {...item} price={transformPrice(item.price, userType)} />
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
