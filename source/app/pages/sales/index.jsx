import React, { useMemo } from 'react'
import Layout from 'components/admin'
import Container from 'components/container'
import { TitlePage, Paper } from 'components/main'
import { Grid, Typography, Box } from '@material-ui/core'
import { getList } from 'core/sale'
import useObjectState from 'hooks/useState'
import useFetch from 'hooks/useFetch'
import Skeleton from 'components/skeletonGrid'
import currency from 'helpers/currency'
import { toString } from 'helpers/date'
import { status } from '../../constants'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Sales = props => {
  const loadNextPage = useMemo(() => getList(), [])
  const [state, setState] = useObjectState({ items: [], loading: true })

  useFetch(async () => {
    const items = await loadNextPage()
    console.log('loadNextPageResponse', items)
    setState({ ...state.items, items })
  }, [])

  const PaperStyled = styled(Paper)`
    transition: all 0.3s;
    padding: 30px;
    height: 100%;
    box-sizing: border-box;
    background: ${p => p.$focused ? '#e7f3ff' : '#fff'};
    cursor: pointer;
    :hover {
      box-shadow: 10px 5px 10px #cdcdcd;
    }
  `

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
                  <Link to={`/admin/sale/${item.id}`}>
                    <PaperStyled $focused={!item.viewed}>
                      <Typography align='center' variant='subtitle1'>{toString(item.date.toDate())}</Typography>
                      <Typography align='center' variant='subtitle1'>Articulos: {item.items.length}</Typography>
                      <Typography align='center' variant='subtitle1'>{currency.toPrice(item.total)}</Typography>
                      <Typography align='center' variant='subtitle1'>{item.info.name}</Typography>
                      <Typography style={{ color: item.status === 'payed' ? 'green' : 'orange' }} align='center' variant='subtitle1'>{status[item.status]}</Typography>
                    </PaperStyled>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Layout>
  )
}

export default Sales
