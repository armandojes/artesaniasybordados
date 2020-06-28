import React from 'react'
import TextFiled from 'components/inputs/group'
import { Box, Grid } from '@material-ui/core'
import { object, func } from 'prop-types'
const Description = props => (
  <Box>
    <Grid container justify='center'>
      <Grid item xs={12} md={10} lg={8}>
        <TextFiled
          multiline
          rows={25}
          state={props.state}
          setState={props.setState}
          name='description'
        />
      </Grid>
    </Grid>
  </Box>
)

Description.propTypes = {
  state: object,
  setState: func
}

export default Description
