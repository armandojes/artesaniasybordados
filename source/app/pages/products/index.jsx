import Layout from 'components/layout_user'
import React, { useMemo, useEffect } from 'react'
import Container from 'components/container'
import { getList } from 'core/articles'
import useObjectState from 'hooks/useState'
import useFetch from 'hooks/useFetch'
import Skeleton from 'components/skeletonGrid'
import { Grid } from '@material-ui/core'
import Article from 'components/article'

import { object } from 'prop-types'

const Articles = props => {
  const initialFilters = props.location.state || {}
  const [state, setState] = useObjectState({ items: [], loading: true })

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
        {!state.loading && (
          <Grid container spacing={3}>
            {state.items.map(item => (
              <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                <Article {...item} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Layout>
  )
}

Articles.propTypes = {
  location: object
}

export default Articles
