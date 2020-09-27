import React, { useEffect } from 'react'
import Layout from 'components/layout'
import Container from 'components/container'
import styled from 'styled-components'
import coverAbout from '../../assets/coverabout.png'
import { Box } from '@material-ui/core'

const Header = styled.div`
  background: #d891ef;
  color: #fff;
  background-image: url(${coverAbout});
  background-position: center;
  background-size: cover;
  background-color: #08080836;
  background-blend-mode: color;
`
const FlexCentered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  font-size: 4em;
  font-family: 'Baloo Tamma 2';
  @media screen and (max-width:1400px) {
    height: 400px;
  }
  @media screen and (max-width:1000px) {
    height: 300px;
    font-size: 3em;
  }
  @media screen and (max-width:500px) {
    height: 200px;
    font-size: 2em;
  }
`
const Paragraph = styled.p`
  font-size: 1.7em;
  line-height: 1.4em;
  font-family: 'Baloo Tamma 2';
  @media screen and (max-width:800px) {
    font-size: 1.5em;
  }
  @media screen and (max-width:500px) {
    font-size: 1.3em;
  }
`
const Fullwidth = styled.div`
  background: #fff;
`
const ContainerMaterialStyled = styled('div')`
  width: 50%;
  margin: auto;
  @media screen and (max-width:1100px) {
    width: 80%;
  }
`

const About = props => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
      <Fullwidth>
        <Header>
          <Container>
            <FlexCentered>
              Quiénes somos
            </FlexCentered>
          </Container>
        </Header>
        <Container>
          <Box pb={{ xs: 5, md: 10 }} pt={{ xs: 5, md: 10 }}>
            <ContainerMaterialStyled>
              <Paragraph>
                "Artesanías y bordados" nace para impulsar a nuestros artesanos, promoviendo el genuino arte popular chiapaneco, con el fomento y difusión dentro y fuera de sus espacios.
              </Paragraph>
              <Paragraph>
                Queremos ayudar a nuestros artesanos brindando espacios dignos para comercializar sus piezas de la forma más justa para todos, contribuyendo a mejorar su calidad de vida y la de sus familias.
              </Paragraph>
            </ContainerMaterialStyled>
          </Box>
        </Container>
      </Fullwidth>
    </Layout>
  )
}

export default About
