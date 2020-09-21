import React from 'react'
import { FullWidthCentered, Button, Link } from 'components/main'
import { Box, Grid, Typography, Container } from '@material-ui/core'
import { CheckCircle } from '@material-ui/icons'
import styled from 'styled-components'
import propTypes from 'prop-types'

const FullWidthCenteredStyled = styled(FullWidthCentered)`
  flex-direction: column;
`

const Success = props => (
  <FullWidthCenteredStyled>
    <Box p={2}>
      <CheckCircle color='secondary' style={{ fontSize: '80px' }} />
    </Box>
    <Box p={2}>
      <Typography variant='h6' align='center'>Articulo publicado correctamente</Typography>
    </Box>
    <Box pt={5} p={2} style={{ width: '100%' }}>
      <Container maxWidth='sm'>
        <Grid container spacing={2} justify='center'>
          <Grid item xs={12} sm={6}>
            <Link to={`/articulo/${props.id}`}>
              <Button fullWidth color='primary' variant='outlined'>Ver Articulo</Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Link to='/admin/articles'>
              <Button fullWidth color='primary' variant='outlined'>Ver lista de articulos</Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </FullWidthCenteredStyled>
)

Success.propTypes = {
  id: propTypes.string
}

export default Success
