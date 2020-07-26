import Layout from 'components/layout'
import React, { useMemo, useEffect, useState } from 'react'
import Container from 'components/container'
import { getList } from 'core/articles'
import useObjectState from 'hooks/useState'
import useFetch from 'hooks/useFetch'
import Skeleton from 'components/skeletonGrid'
import { Grid, Hidden } from '@material-ui/core'
import Article from 'components/article'
import styled from 'styled-components'
import Menu from './menu'
import { object } from 'prop-types'
import Drawer from './drawer'

const Articles = props => {
  const initialFilters = props.location.state || {}
  const [state, setState] = useObjectState({ items: [], loading: true })
  const [filters, setfilters, setStrictFilters] = useObjectState({ category: null, subcategory: null, gender: null, ...initialFilters })
  const [isMobileFilterActive, setmobileFilterStatus] = useState(false)

  // fetcher
  const loadNextPage = useMemo(() => getList(20, filters), [filters.category, filters.subcategory, filters.gender])

  // fetch initial items
  useFetch(async () => {
    setState({ loading: true })
    const items = await loadNextPage()
    setState({ items, loading: false })
  }, [loadNextPage])

  // reset scrolled
  useEffect(() => { window.scrollTo(0, 0) }, [filters])

  return (
    <Layout>
      <Drawer
        setStrictFilters={setStrictFilters}
        filters={filters}
        setfilters={setfilters}
        open={isMobileFilterActive}
        onClose={event => setmobileFilterStatus(false)}
        onOpen={event => setmobileFilterStatus(true)}
      />
      <Container $page>
        <ContainerBody>
          <Hidden smDown>
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
                  <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
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
Articles.propTypes = {
  location: object
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
  @media (max-width:960px) {
    width: 100%;
  }
`

export default Articles
