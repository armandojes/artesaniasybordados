import Layout from 'components/layout'
import React, { useMemo } from 'react'
import Container from 'components/container'
import { getList } from 'core/articles'
import useObjectState from 'hooks/useState'
import useFetch from 'hooks/useFetch'
import Skeleton from 'components/skeletonGrid'
import { Grid, Hidden } from '@material-ui/core'
import Article from 'components/article'
import styled from 'styled-components'
import Menu from './menu'

const Home = props => {
  const [state, setState] = useObjectState({ items: [], loading: true })
  const [filters, setfilters, setStrictFilters] = useObjectState({ category: null, subcategory: null, gender: null })

  // fetcher
  const loadNextPage = useMemo(() => getList(20, filters), [filters.category, filters.subcategory, filters.gender])

  useFetch(async () => {
    setState({ loading: true })
    const items = await loadNextPage()
    setState({ items, loading: false })
  }, [loadNextPage])

  return (
    <Layout>
      <Container $page>
        <ContainerBody>
          <Hidden xsDown>
            <MenuWrapper>
              <Menu
                setStrictFilters={setStrictFilters}
                filters={filters}
                setfilters={setfilters}
              />
            </MenuWrapper>
          </Hidden>
          <BodyWrapper>
            {state.loading && (
              <Skeleton />
            )}
            {!state.loading && (
              <Grid container spacing={3}>
                {state.items.map(item => (
                  <Grid key={item.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Article {...item} />
                  </Grid>
                ))}
              </Grid>
            )}
          </BodyWrapper>
        </ContainerBody>
      </Container>
    </Layout>
  )
}

const ContainerBody = styled.section`
  display: flex;
`

const MenuWrapper = styled.div`
  border: 1px dashed #cdcdcd;
  width: 20%;
  margin-right: 20px;
  
`
const BodyWrapper = styled.div`
  border: 1px dashed #cdcdcd;
  width: 80%;
  @media (max-width:600px) {
    width: 100%;
  }
`

export default Home
