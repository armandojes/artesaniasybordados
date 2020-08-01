import React, { useMemo } from 'react'
import Layout from 'components/layout_user'
import Container from 'components/container'
import { getList } from 'core/sale'
import { useSelector } from 'react-redux'
import useFetch from 'hooks/useFetch'
import useObjectState from 'hooks/useState'
import { CircularProgress, Grid, Box } from '@material-ui/core'
import { TitlePage } from 'components/main'
import Item from 'components/sale'
import useResponsive from 'hooks/useResponsive'

const MyShops = props => {
  const session = useSelector(state => state.session)
  const [state, setState] = useObjectState({ loading: true, items: [] })
  const responsive = useResponsive()
  const loadNextPage = useMemo(() => getList(null, session.id), [])

  useFetch(async () => {
    const items = await loadNextPage()
    console.log('response', items)
    setState({ items, loading: false })
  }, [])

  return (
    <Layout>
      <Container $page>
        <TitlePage>Mis compras</TitlePage>
        {state.loading && (
          <Grid container alignItems='center' justify='center' style={{ minHeight: '70vh' }}>
            <CircularProgress style={{ display: 'block' }} />
          </Grid>
        )}
        {!state.loading && !!state.items.length && (
          <Grid container spacing={responsive({ xs: 2, md: 4 })}>
            {state.items.map(itemData => (
              <Grid key={itemData.id} item sm={4} lg={3} xs={6}>
                <Item {...itemData} />
              </Grid>
            ))}
          </Grid>
        )}
        <Box mb={3} />
      </Container>
    </Layout>
  )
}

export default MyShops
