import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { number, object } from 'prop-types'

const Img = styled('img')`
  width: 100%;
  object-fit: cover;
`

const Picture = props => {
  const element = useRef()
  const [height, setHeight] = useState(0)
  const defaultStyled = props.style || {}

  useEffect(() => {
    var ScoppedHeight = element.current ? element.current.offsetWidth : 0
    if (props.height) ScoppedHeight = (ScoppedHeight * props.height) / 100
    setHeight(ScoppedHeight)
  }, [height])

  const handleResize = _event => {
    var ScoppedHeight = element.current ? element.current.offsetWidth : 0
    if (props.height) ScoppedHeight = (ScoppedHeight * props.height) / 100
    setHeight(ScoppedHeight)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Img ref={element} {...props} style={{ ...defaultStyled, height }} />
  )
}

Picture.propTypes = {
  height: number,
  style: object
}

export default Picture
