import React from 'react'
import { FullWidthCentered } from 'components/main'
import { CircularProgress, Typography, Box } from '@material-ui/core'
import styled from 'styled-components'
import propTypes from 'prop-types'

const FullWidthCenteredStyled = styled(FullWidthCentered)`
  flex-direction: column;
`

const Loading = props => (
  <FullWidthCenteredStyled>
    <CircularProgress />
    <Box mt={10}>
      <Typography variant='h5'>{props.message || 'Guardando datos...'}</Typography>
    </Box>
  </FullWidthCenteredStyled>
)

Loading.propTypes = {
  message: propTypes.string
}

export default Loading
