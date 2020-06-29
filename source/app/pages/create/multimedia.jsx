import React from 'react'
import Dropzone from './dropzone'
import { Grid, Box } from '@material-ui/core'
import propTypes from 'prop-types'
import Picture from 'components/Picture'

const Multimedia = props => {
  const handleDelete = file => {
    const nameToDelete = typeof file === 'string' ? file : file.name
    const pictures = props.state.pictures.filter(file => {
      return typeof file === 'string'
        ? nameToDelete !== file
        : nameToDelete !== file.name
    })
    props.setState({ pictures })
  }

  const handleDeletePrimary = _event => {
    props.setState({ picture: null })
  }

  return (
    <>
      <Box pt={2} pb={2}>
        <Dropzone {...props} name='picture' />
        <Box pt={2} pb={2}>
          <Grid container justify='center' spacing={2}>
            {props.state.picture && (
              <Grid item xs={6} sm={4} md={3}>
                <Picture
                  src={typeof props.state.picture === 'object' ? props.state.picture.preview : props.state.picture}
                  onClick={handleDeletePrimary}
                />
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
      <Box pt={2} pb={2}>
        <Dropzone {...props} name='pictures' multiple />
        <Box pt={2} pb={2}>
          <Grid container justify='center' spacing={2}>
            {props.state.pictures && props.state.pictures.map(picture => (
              <Grid key={typeof picture === 'object' ? picture.preview : picture} item xs={6} sm={4} md={3}>
                <Picture src={typeof picture === 'object' ? picture.preview : picture} onClick={_event => handleDelete(picture)} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>

  )
}

Multimedia.propTypes = {
  state: propTypes.object,
  setState: propTypes.func
}

export default Multimedia
