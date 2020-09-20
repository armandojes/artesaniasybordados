import React from 'react'
import { Box, Button, Grid } from '@material-ui/core'
import propTypes from 'prop-types'

const Menu = props => {
  return (
    <Box mb={5}>
      <Grid container spacing={2}>
        <Grid item>
          <Button color='primary' variant={props.value === 'all' ? 'contained' : 'outlined'} onClick={event => props.onChange('all')}>Todos</Button>
        </Grid>
        <Grid item>
          <Button color='primary' variant={props.value === 'disabled' ? 'contained' : 'outlined'} onClick={event => props.onChange('disabled')}>Deshabilitados</Button>
        </Grid>
      </Grid>
    </Box>
  )
}

Menu.propTypes = {
  onChange: propTypes.func,
  value: propTypes.string
}

export default Menu
