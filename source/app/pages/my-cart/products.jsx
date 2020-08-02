import React, { Fragment } from 'react'
// import styled from 'styled-components'
import { Paper } from 'components/main'
import { Typography, Divider, Box } from '@material-ui/core'
import { useSelector } from 'react-redux'
import Item from './item'
import { func } from 'prop-types'

const Products = props => {
  const { items, loading } = useSelector(state => state.cart)

  if (loading) return 'loading...'

  return (
    <>
      <Box pt={2} pb={2}>
        <Typography variant='h6'>
          Mi Carrito
        </Typography>
      </Box>
      <Paper>
        <Box p={{ xs: 0, md: 2, lg: 5 }}>
          {items.map(item => (
            <Fragment key={item.id}>
              <Item {...item} onDelete={props.onDelete} />
              <Box mt={1} mb={1}>
                <Divider />
              </Box>
            </Fragment>
          ))}
        </Box>
      </Paper>
    </>
  )
}

Products.propTypes = {
  onDelete: func
}

export default Products
