import React, { Fragment } from 'react'
import { Paper } from 'components/main'
import { Typography, Divider, Box, Grid, Button } from '@material-ui/core'
import Item from '../item'
import { func, bool, array } from 'prop-types'

const Products = props => {
  if (props.loading) return 'loading...'

  return (
    <>
      <Box pt={2} pb={2}>
        <Typography variant='h6'>
          Mi Carrito
        </Typography>
      </Box>
      <Paper>
        <Box p={{ xs: 0, md: 2, lg: 5 }}>
          {props.items.map(item => (
            <Fragment key={item.id}>
              <Item {...item} onDelete={props.onDelete} />
              <Box mt={1} mb={1}>
                <Divider />
              </Box>
            </Fragment>
          ))}
        </Box>
      </Paper>
      <Box mt={5} mb={5}>
        <Grid container spacing={1} justify='flex-end'>
          <Grid item xs={6} md={5} lg={4}>
            <Button
              style={{ fontSize: '.8em' }}
              size='medium'
              fullWidth
              variant='outlined'
              color='primary'
              onClick={props.onBack}
            >Seguir comprando
            </Button>
          </Grid>
          <Grid item xs={6} md={5} lg={4}>
            <Button
              onClick={props.onNext}
              style={{ fontSize: '.8em' }}
              size='medium'
              fullWidth
              variant='contained'
              color='primary'
            >Siguente
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

Products.propTypes = {
  onDelete: func,
  loading: bool,
  items: array,
  onNext: func,
  onBack: func
}

export default Products
