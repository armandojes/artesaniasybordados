import React from 'react'
import Layout from 'components/layout'
import ContainerBase from 'components/container'
import styled from 'styled-components'
import { Paper } from 'components/main'
import { Grid, Typography, Button, Box } from '@material-ui/core'
import testSrc from '../../assets/test.png'
import useResponsive from 'hooks/useResponsive'
import { menuHome } from '../../constants'
import { Link } from 'react-router-dom'

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
  :hover {
    box-shadow: 6px 6px 15px #cdcdcd;
  }
  :hover button{
    text-decoration: underline;
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
                    <Typography align='center' variant='h5'>Prueba de seccion 1</Typography>
                    <Box mt={responsive({ xs: 1, md: 2, lg: 4 })} mb={responsive({ xs: 1, md: 2, lg: 4 })}>
                      <ButtonStyled variant='contained' color='primary'>Ver mas</ButtonStyled>
                    </Box>
                  </Grid>
                  <Picture src={testSrc} />
                </Grid>
              </SectionBoxes>
            </Grid>
            <Grid item xs={6}>
              <SectionBoxes>
                <Grid container alignItems='center' direction={responsive({ xs: 'column-reverse', md: 'row' })}>
                  <Grid item xs>
                    <Typography align='center' variant='h5'>Prueba de seccion 2</Typography>
                    <Box mt={responsive({ xs: 1, md: 2, lg: 4 })} mb={responsive({ xs: 1, md: 2, lg: 4 })}>
                      <ButtonStyled variant='contained' color='primary'>Ver mas</ButtonStyled>
                    </Box>
                  </Grid>
                  <Picture src={testSrc} />
                </Grid>
              </SectionBoxes>
            </Grid>
          </Grid>
        </Box>
        {menuHome.map((section, index) => (
          <Box mb={5} key={index}>
            <Grid container spacing={responsive({ xs: 1, md: 2 })}>
              <Grid item xs={12}>
                <Typography variant='h4'> {section.label} </Typography>
              </Grid>
              {section.filters.map((subcategory, index) => (
                <Grid item xs={6} md={4} lg={2} key={index}>
                  <SectionBoxes>
                    <Box mb={2}>
                      <Picture src={testSrc} />
                    </Box>
                    <Grid container alignItems='center' direction='row'>
                      <Grid item xs={12}>
                        <Typography align='center' variant='h5'>{subcategory.label}</Typography>
                        <Box mt={responsive({ xs: 1, md: 2 })} mb={responsive({ xs: 1, md: 2 })}>
                          <Link to={{ pathname: '/articulos', state: { category: section.value, subcategory: subcategory.value } }}>
                            <ButtonStyled variant='text' color='primary'>Ver mas</ButtonStyled>
                          </Link>
                        </Box>
                      </Grid>
                    </Grid>
                  </SectionBoxes>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}

      </Container>
    </Layout>
  )
}

export default home
