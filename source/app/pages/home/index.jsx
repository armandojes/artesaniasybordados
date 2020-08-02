import React from 'react'
import Layout from 'components/layout'
import ContainerBase from 'components/container'
import styled from 'styled-components'
import { Paper } from 'components/main'
import { Grid, Typography, Button, Box, Hidden } from '@material-ui/core'
import useResponsive from 'hooks/useResponsive'
import { Link } from 'react-router-dom'
import woman from '../../assets/woman.png'
import man from '../../assets/man.png'
import jewelry from '../../assets/jewelry.png'
import calzado from '../../assets/calzado.png'

const Container = styled(ContainerBase)`
  padding: 15px;
  width: 90%;
  margin: auto;
`
const SectionBoxes = styled(Paper)`
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right;
  transition: all 500ms;
  height: 100%;
  box-sizing: border-box;
  :hover {
    box-shadow: 6px 6px 15px #cdcdcd;
  }
`
const Picture = styled.img`
  max-width: 100%;
  width: 300px;
  margin: auto;
  display: block;
  @media screen and (max-width:1300px) {
    width: 200px;
  }
  @media screen and (max-width:960px) {
    margin-bottom: 10px;
    max-width: 100%;
  }
`
const ButtonStyled = styled(Button)`
  width: 50%;
  max-width: 200px;
  font-weight: bold!important;
  display: block!important;
  margin: auto!important;
  margin: auto;
  @media screen and (max-width:1280px) {
    width: 150px;
  }
  @media screen and (max-width:1000px) {
    width: 130px;
  }
`

const home = props => {
  const responsive = useResponsive()

  return (
    <Layout>
      <Container $page>

        <Box mb={5}>
          <Grid container spacing={responsive({ xs: 1, md: 2, lg: 4 })}>
            <Grid item xs={12}>
              <Typography variant='h4'>
                Descubre
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <SectionBoxes>
                <Grid container alignItems='center' direction={responsive({ xs: 'column-reverse', md: 'row' })}>
                  <Grid item xs>
                    <Typography align='center' variant='h5'>Para ellas</Typography>
                    <Hidden xsDown>
                      <Typography variant='subtitle1' align='center'>Viste con blusas, huipiles, vestidos y ropa artesanal</Typography>
                    </Hidden>
                    <Box mt={responsive({ xs: 1, md: 2, lg: 4 })} mb={responsive({ xs: 1, md: 2, lg: 4 })}>
                      <Link to={{ pathname: '/articulos', state: { gender: 'female' } }}>
                        <ButtonStyled variant='contained' color='primary'>Ver mas</ButtonStyled>
                      </Link>
                    </Box>
                  </Grid>
                  <Picture src={woman} />
                </Grid>
              </SectionBoxes>
            </Grid>
            <Grid item xs={6}>
              <SectionBoxes>
                <Grid container alignItems='center' direction={responsive({ xs: 'column-reverse', md: 'row' })}>
                  <Grid item xs>
                    <Typography align='center' variant='h5'>Para el</Typography>
                    <Hidden xsDown>
                      <Typography variant='subtitle1' align='center'>Moda con bordados mexicanos</Typography>
                    </Hidden>
                    <Box mt={responsive({ xs: 1, md: 2, lg: 4 })} mb={responsive({ xs: 1, md: 2, lg: 4 })}>
                      <Link to={{ pathname: '/articulos', state: { gender: 'male' } }}>
                        <ButtonStyled variant='contained' color='primary'>Ver mas</ButtonStyled>
                      </Link>
                    </Box>
                  </Grid>
                  <Picture src={man} />
                </Grid>
              </SectionBoxes>
            </Grid>

            <Grid item xs={6}>
              <SectionBoxes>
                <Grid container alignItems='center' direction={responsive({ xs: 'column-reverse', md: 'row' })}>
                  <Grid item xs>
                    <Typography align='center' variant='h5'>Joyeria y accesorios</Typography>
                    <Hidden xsDown>
                      <Typography variant='subtitle1' align='center'>Detalles y piezas personalizables con estilo mexicano</Typography>
                    </Hidden>
                    <Box mt={responsive({ xs: 1, md: 2, lg: 4 })} mb={responsive({ xs: 1, md: 2, lg: 4 })}>
                      <Link to={{ pathname: '/articulos', state: { category: 'accesorio' } }}>
                        <ButtonStyled variant='contained' color='primary'>Ver mas</ButtonStyled>
                      </Link>
                    </Box>
                  </Grid>
                  <Picture src={jewelry} />
                </Grid>
              </SectionBoxes>
            </Grid>

            <Grid item xs={6}>
              <SectionBoxes>
                <Grid container alignItems='center' direction={responsive({ xs: 'column-reverse', md: 'row' })}>
                  <Grid item xs>
                    <Typography align='center' variant='h5'>Calzado</Typography>
                    <Typography variant='subtitle1' align='center'> </Typography>
                    <Box mt={responsive({ xs: 1, md: 2, lg: 4 })} mb={responsive({ xs: 1, md: 2, lg: 4 })}>
                      <Link to={{ pathname: '/articulos', state: { category: 'calzado' } }}>
                        <ButtonStyled variant='contained' color='primary'>Ver mas</ButtonStyled>
                      </Link>
                    </Box>
                  </Grid>
                  <Picture src={calzado} />
                </Grid>
              </SectionBoxes>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Layout>
  )
}

export default home
