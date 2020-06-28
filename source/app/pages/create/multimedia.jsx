import React from 'react'
import Dropzone from './dropzone'
import { Grid, Box } from '@material-ui/core'
import propTypes from 'prop-types'
import styled from 'styled-components'

const Picture = styled.img`
  max-width: 100%;
  object-fit: cover;
  height: 250px;
  color: red;
  cursor: pointer;
  box-sizing: border-box;
  transition: all 300ms;
  @media (max-width:600px) {
    height: 150px;
  }
  &:hover {
    border: 1px dashed red;
    padding: 5px;
  }
`

const Multimedia = props => {
  const handleDelete = nameToDelete => {
    console.log(nameToDelete)
    props.setState({ pictures: props.state.pictures.filter(file => file.name !== nameToDelete) })
  }

  const handleDeletePrimary = _event => {
    props.setState({ picture: null })
  }

  return (
    <Grid container justify='center'>
      <Grid itex xs={12} md={10} lg={8}>
        <Box pt={2} pb={2}>
          <Dropzone {...props} name='picture' />
          <Box pt={2} pb={2}>
            <Grid container justify='center' spacing={2}>
              {props.state.picture && (
                <Grid key={props.state.picture.preview} item xs={6} sm={4} md={3}>
                  <Picture src={props.state.picture.preview} onClick={handleDeletePrimary} />
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
                <Grid key={picture.preview} item xs={6} sm={4} md={3}>
                  <Picture src={picture.preview} onClick={_event => handleDelete(picture.name)} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

Multimedia.propTypes = {
  state: propTypes.object,
  setState: propTypes.func
}

export default Multimedia
