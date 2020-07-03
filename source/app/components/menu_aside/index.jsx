import React from 'react'
import { Box, Grid } from '@material-ui/core'

function MenuAside (props) {
  return (
    <Box p={2} component={Grid} container spacing={2}>
      <Grid style={{ cursor: 'pointer' }} item xs={12}>Inicio</Grid>
      <Grid style={{ cursor: 'pointer' }} item xs={12}>Inicio</Grid>
      <Grid style={{ cursor: 'pointer' }} item xs={12}>Inicio</Grid>
    </Box>
  )
}

export default MenuAside
