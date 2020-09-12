import React from 'react'
import styled from 'styled-components'
import Container from 'components/container'
import { Button, Box, useMediaQuery } from '@material-ui/core'
import { HashLink as Link } from 'react-router-hash-link'
import coverSrc from '../../assets/cover.jpg'
import logoSrc from '../../assets/logo.png'

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
const Logo = styled.img`
  position: absolute;
  width: 250px;
  top: 10%;
  left: 10%;
  display: block;
  @media screen and (max-width:1000px) {
    width: 150px;
  }
  @media screen and (max-width:480px) {
    width: 120px;
  }
`
const FirstCover = props => {
  const isMobile = useMediaQuery('(max-width:600px)')

  return (
    <Fullwidth style={{ position: 'relative' }}>
      <Container>
        <Logo src={logoSrc} />
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
