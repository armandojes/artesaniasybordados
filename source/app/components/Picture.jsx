import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'

const Img = styled('img')`
  width: 100%;
  object-fit: cover;
`

const Picture = props => {
  const element = useRef()
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const ScoppedHeight = element.current ? element.current.offsetWidth : 0
    setHeight(ScoppedHeight)
  }, [height])

  const handleResize = _event => {
    const ScoppedHeight = element.current ? element.current.offsetWidth : 0
    setHeight(ScoppedHeight)
  }

  useEffect(() => {
    if (ENV !== 'production') {
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Img ref={element} {...props} style={{ height }} />
  )
}

export default Picture
