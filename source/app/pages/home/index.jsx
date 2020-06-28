import Layout from 'components/layout'
import React from 'react'
import Container from 'components/container'
import { getList } from 'core/articles'
import useObjectState from 'hooks/useState'
import useFetch from 'hooks/useFetch'
import Skeleton from 'components/skeletonGrid'
import { Grid } from '@material-ui/core'
import Article from 'components/article'

const Home = props => {
  const [state, setState] = useObjectState({
    items: [],
    loading: true
  })

  useFetch(async () => {
    const items = await getList()
    setState({ items, loading: false })
  }, [])

  return (
    <Layout>
      <Container page>
        {state.loading && (
          <Skeleton />
        )}
        {!state.loading && (
          <Grid container justify='center' spacing={3}>
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

export default Home
