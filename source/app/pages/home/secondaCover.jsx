import React from 'react'
import styled from 'styled-components'
import coverSrc from '../../assets/cover2.jpg'
import Container from 'components/container'
import { Button, Box, useMediaQuery } from '@material-ui/core'
import { HashLink as Link } from 'react-router-hash-link'

const Fullwidth = styled.div`
  background-image: url(${coverSrc});
  height: 100%;
  background-color: #00000066;
  background-blend-mode: color;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
`
const Title = styled.div`
  font-size: 3em;
  font-family: 'Mali', cursive;
  @media screen and (max-width:1300px) {
    font-size: 2em;
  }
  @media screen and (max-width:600px) {
    font-size: 1.7em;
  }
`

const FirstCover = props => {
  const isMobile = useMediaQuery('(max-width:600px)')

  return (
    <Fullwidth>
      <Container>
        <Title>
          Precios especiales a <br /> mayoristas
        </Title>
        <Box mt={3}>
          <Link to='/#contacto'>
            <Button variant='contained' color='primary' size={isMobile ? 'medium' : 'large'}>Contactanos</Button>
          </Link>
        </Box>
      </Container>
    </Fullwidth>
  )
}

export default FirstCover
