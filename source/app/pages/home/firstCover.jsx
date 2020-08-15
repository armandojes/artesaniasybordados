import React from 'react'
import styled from 'styled-components'
import coverSrc from '../../assets/cover.jpg'
import logoSrc from '../../assets/logo.png'
import Container from 'components/container'

const Fullwidth = styled.div`
  height: 100%;
  background-image: url(${coverSrc});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 9em;
  line-height: 1.1em;
  color: #fff;
`
const Picture = styled.img`
  width: 30%;
  display: block;
  margin: auto;
  @media screen and (max-width:1100px) {
    width: 50%;
  }
  @media screen and (max-width:600px) {
    width: 70%;
    margin-bottom: 150px;
  }
`

const FirstCover = props => {
  return (
    <Fullwidth>
      <Container style={{ width: '100%' }}>
        <Picture src={logoSrc} />
      </Container>
    </Fullwidth>
  )
}

export default FirstCover
