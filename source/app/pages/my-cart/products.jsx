import React from 'react'
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
    <Paper>
      <Box p={{ xs: 0, md: 2, lg: 5 }}>
        <Box mb={4}>
          <Typography variant='h6'>
            Mi Carrito
          </Typography>
        </Box>
        {items.map(item => (
          <>
            <Item key={item.id} {...item} onDelete={props.onDelete} />
            <Box mt={1} mb={1}>
              <Divider />
            </Box>
          </>
        ))}
      </Box>
    </Paper>
  )
}

Products.propTypes = {
  onDelete: func
}

export default Products
