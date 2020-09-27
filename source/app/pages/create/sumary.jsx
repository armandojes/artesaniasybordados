/* eslint-disable react/prop-types */
import React from 'react'
import Preview from '../articulo/view'

const Summary = props => {
  const pictures = props.state.pictures || []
  const pictiuresUrl = pictures.map(pic => typeof pic === 'string' ? pic : pic.preview)
  const principalPictureUrl = typeof props.state.picture === 'string' ? props.state.picture : props.state.picture.preview

  return (
    <Preview
      data={{ ...props.state }}
      pictures={[principalPictureUrl, ...pictiuresUrl]}
    />
  )
}

export default Summary
