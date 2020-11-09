import { Button } from '@material-ui/core'
import { Text } from 'components/main'
import React from 'react'
import { HashLink } from 'react-router-hash-link'
import styled from 'styled-components'
import customSrc from '../../assets/custom.png'

const ContainerFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5em auto!important;
  width: 60%;
  @media screen and (max-width:1100px) {
    width: 90%;
  }
  @media screen and (max-width:600px) {
    flex-wrap: wrap;
  }
`
const PictureStyled = styled.img`
  width: 300px!important;
  display: block;
  margin-right: 3em;
  @media screen and (max-width:1400px) {
    width: 250px!important;
  }
  @media screen and (max-width:1300px) {
    width: 200px!important;
  }
  @media screen and (max-width:1100px) {
    width: 150px!important;
  }
  @media screen and (max-width:500px) {
    width: 180px!important;
    margin: auto;
    margin-bottom: 2em;
  }
`
const DataCOntainer = styled.div`
  width: 70%;
  @media screen and (max-width:600px) {
    width: 100%;
  }
`
const Title = styled.div`
  font-size: 2em;
  margin-bottom: 1em;
`
const ButtonCOntainer = styled.div`
  margin-top: 2em;
`
const MakeCUstom = props => {
  return (
    <ContainerFlex>
      <PictureStyled src={customSrc} />
      <DataCOntainer>
        <Title>Productos personalizados</Title>
        <Text fontSize='1.3em'>
          Somos una basta red de artesanos, si no encuentras lo que buscas te lo podemos fabricar.
        </Text>
        <ButtonCOntainer>
          <HashLink to='/#contacto' smooth>
            <Button variant='outlined' color='primary'>Contactanos</Button>
          </HashLink>
        </ButtonCOntainer>
      </DataCOntainer>
    </ContainerFlex>
  )
}

export default MakeCUstom
