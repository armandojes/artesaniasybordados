import React, { useMemo } from 'react'
import Layout from 'components/admin'
import Container from 'components/container'
import { TitlePage } from 'components/main'
import { Grid, Box } from '@material-ui/core'
import { getList } from 'core/sale'
import useObjectState from 'hooks/useState'
import useFetch from 'hooks/useFetch'
import Skeleton from 'components/skeletonGrid'
import ItemSale from 'components/sale'
import Session from 'components/session'

const Sales = props => {
  const loadNextPage = useMemo(() => getList(), [])
  const [state, setState] = useObjectState({ items: [], loading: true })

  useFetch(async () => {
    const items = await loadNextPage()
    console.log('loadNextPageResponse', items)
    setState({ ...state.items, items })
  }, [])

  return (
    <Layout>
      <Container $page name='page'>
        <TitlePage>Ventas</TitlePage>
        {state.loading && !state.items.length && (
          <Skeleton />
        )}
        {!!state.items.length && (
          <Box mt={5}>
            <Grid container spacing={3}>
              {state.items.map(item => (
                <Grid item xs={3} key={item.id}>
                  <ItemSale admin {...item} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Layout>
  )
}

export default Session(Sales, true)
