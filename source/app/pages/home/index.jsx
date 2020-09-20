import React from 'react'
import Layout from 'components/layout'
import ContainerBase from 'components/container'
import styled from 'styled-components'
import { Paper } from 'components/main'
import { Grid, Typography, Button, Box, Hidden, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import useResponsive from 'hooks/useResponsive'
import { Link } from 'react-router-dom'
import woman from '../../assets/woman.png'
import man from '../../assets/man.png'
import jewelry from '../../assets/jewelry.png'
import { WhatsApp, Email, Phone, Facebook, Instagram } from '@material-ui/icons'
import contactSrc from '../../assets/contact.png'
import Cover from './cover.jsx'
import calzado from '../../assets/calzado.png'
import design from '../../assets/design.png'
import pottery from '../../assets/pottery.png'
import { contact } from '../../../config'

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
  @media screen and (max-width:1500px) {
    width: 220px;
  }

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

const PaperStyled = styled(Paper)`
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
  background-blend-mode: multiply;
  background-position: bottom;
  background-size: 60%;
  background-repeat: no-repeat;
  background-position-x: right;
  background-image: url(${contactSrc});
  @media screen and (max-width:1600px) {
    background-size: 60%;
  }
  @media screen and (max-width:900px) {
    background-size: 80%;
    background-position-x: center;
  }
  @media screen and (max-width:600px) {
    background-size: 100%;
  }
  .MuiListItemAvatar-root {
    min-width: 40px!important;
  }
  .MuiListItem-root {
    padding: 3px 0px;
  }
`
const IconsCOntainerStyled = styled.div`
  svg {
    font-size:30px!important;
  }
`

const LinkOut = styled.a`
  :hover li {
    color: #3483fa;
    text-decoration: underline;
  }
`

const home = props => {
  const responsive = useResponsive()

  return (
    <Layout>
      <Cover />
      <Container $page>

        <Box mb={5} mt={{ xs: 2, md: 5 }}>
          <Grid container spacing={responsive({ xs: 1, md: 2, lg: 4 })}>
            <Grid item xs={12}>
              <Typography variant='h4'>
                Elige tus piezas favoritas
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Link to={{ pathname: '/articulos', state: { gender: 'female' } }}>
                <SectionBoxes>
                  <Grid container alignItems='center' direction={responsive({ xs: 'column-reverse', md: 'row' })}>
                    <Grid item xs>
                      <Typography align='center' variant='h5'>Para ellas</Typography>
                      <Hidden xsDown>
                        <Typography variant='subtitle1' align='center'>Viste con blusas, huipiles, vestidos y ropa artesanal</Typography>
                      </Hidden>
                      <Box mt={responsive({ xs: 1, md: 2, lg: 4 })} mb={responsive({ xs: 1, md: 2, lg: 4 })}>
                        <ButtonStyled variant='contained' color='primary'>Ver mas</ButtonStyled>
                      </Box>
                    </Grid>
                    <Picture src={woman} />
                  </Grid>
                </SectionBoxes>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link to={{ pathname: '/articulos', state: { gender: 'male' } }}>
                <SectionBoxes>
                  <Grid container alignItems='center' direction={responsive({ xs: 'column-reverse', md: 'row' })}>
                    <Grid item xs>
                      <Typography align='center' variant='h5'>Para el</Typography>
                      <Hidden xsDown>
                        <Typography variant='subtitle1' align='center'>Moda con bordados mexicanos</Typography>
                      </Hidden>
                      <Box mt={responsive({ xs: 1, md: 2, lg: 4 })} mb={responsive({ xs: 1, md: 2, lg: 4 })}>
                        <ButtonStyled variant='contained' color='primary'>Ver mas</ButtonStyled>
                      </Box>
                    </Grid>
                    <Picture src={man} />
                  </Grid>
                </SectionBoxes>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link to={{ pathname: '/articulos', state: { category: 'accesorio' } }}>
                <SectionBoxes>
                  <Grid container alignItems='center' direction={responsive({ xs: 'column-reverse', md: 'row' })}>
                    <Grid item xs>
                      <Typography align='center' variant='h5'>Joyeria y accesorios</Typography>
                      <Hidden xsDown>
                        <Typography variant='subtitle1' align='center'>Detalles y piezas personalizables con estilo mexicano</Typography>
                      </Hidden>
                      <Box mt={responsive({ xs: 1, md: 2, lg: 4 })} mb={responsive({ xs: 1, md: 2, lg: 4 })}>
                        <ButtonStyled variant='contained' color='primary'>Ver mas</ButtonStyled>
                      </Box>
                    </Grid>
                    <Picture src={jewelry} />
                  </Grid>
                </SectionBoxes>
              </Link>
            </Grid>

            <Grid item xs={6}>
              <Link to={{ pathname: '/articulos', state: { category: 'calzado' } }}>
                <SectionBoxes>
                  <Grid container alignItems='center' direction={responsive({ xs: 'column-reverse', md: 'row' })}>
                    <Grid item xs>
                      <Typography align='center' variant='h5'>Calzado</Typography>
                      <Typography variant='subtitle1' align='center'> </Typography>
                      <Box mt={responsive({ xs: 1, md: 2, lg: 4 })} mb={responsive({ xs: 1, md: 2, lg: 4 })}>
                        <ButtonStyled variant='contained' color='primary'>Ver mas</ButtonStyled>
                      </Box>
                    </Grid>
                    <Picture src={calzado} />
                  </Grid>
                </SectionBoxes>
              </Link>
            </Grid>

            <Grid item xs={6}>
              <Link to={{ pathname: '/articulos', state: { category: 'pottery' } }}>
                <SectionBoxes>
                  <Grid container alignItems='center' direction={responsive({ xs: 'column-reverse', md: 'row' })}>
                    <Grid item xs>
                      <Typography align='center' variant='h5'>Alfarería</Typography>
                      <Typography variant='subtitle1' align='center'> </Typography>
                      <Box mt={responsive({ xs: 1, md: 2, lg: 4 })} mb={responsive({ xs: 1, md: 2, lg: 4 })}>
                        <ButtonStyled variant='contained' color='primary'>Ver mas</ButtonStyled>
                      </Box>
                    </Grid>
                    <Picture src={pottery} />
                  </Grid>
                </SectionBoxes>
              </Link>
            </Grid>

            <Grid item xs={6}>
              <Link to={{ pathname: '/articulos', state: { category: 'design' } }}>
                <SectionBoxes>
                  <Grid container alignItems='center' direction={responsive({ xs: 'column-reverse', md: 'row' })}>
                    <Grid item xs>
                      <Typography align='center' variant='h5'>Diseños únicos y personalizados</Typography>
                      <Typography variant='subtitle1' align='center'> </Typography>
                      <Box mt={responsive({ xs: 1, md: 2, lg: 4 })} mb={responsive({ xs: 1, md: 2, lg: 4 })}>
                        <ButtonStyled variant='contained' color='primary'>Ver mas</ButtonStyled>
                      </Box>
                    </Grid>
                    <Picture src={design} />
                  </Grid>
                </SectionBoxes>
              </Link>
            </Grid>

            <Grid item xs={12}>
              <PaperStyled id='contacto'>
                <Box p={responsive({ xs: 2, sm: 4, md: 6, lg: 10 })}>
                  <Grid container spacing={5} justify='flex-start'>
                    <Grid item xs={12} md={7} lg={5}>
                      <Box mb={2}>
                        <Typography color='primary' variant='h4'>Contactanos</Typography>
                      </Box>
                      <Typography variant='body1'>
                        Cualquier duda o sugerencia contáctanos por cualquiera de nuestros medios disponibles.
                      </Typography>
                      <Box mt={3}>
                        <List>
                          <LinkOut href={`https://wa.me/+521${contact.whatsapp}`} target='_blank'>
                            <ListItem>
                              <ListItemAvatar>
                                <IconsCOntainerStyled>
                                  <WhatsApp />
                                </IconsCOntainerStyled>
                              </ListItemAvatar>
                              <ListItemText style={{ color: '#3483fa' }} primary={contact.whatsapp} />
                            </ListItem>
                          </LinkOut>
                          <LinkOut href={`mailto:${contact.email}`}>
                            <ListItem>
                              <ListItemAvatar>
                                <IconsCOntainerStyled>
                                  <Email />
                                </IconsCOntainerStyled>
                              </ListItemAvatar>
                              <ListItemText style={{ color: '#3483fa' }} primary={contact.email} />
                            </ListItem>
                          </LinkOut>
                          <LinkOut href={`tel:${contact.number}`}>
                            <ListItem>
                              <ListItemAvatar>
                                <IconsCOntainerStyled>
                                  <Phone />
                                </IconsCOntainerStyled>
                              </ListItemAvatar>
                              <ListItemText style={{ color: '#3483fa' }} primary='9671388451' />
                            </ListItem>
                          </LinkOut>
                          <LinkOut href={contact.facebookPage} target='_blank'>
                            <ListItem>
                              <ListItemAvatar>
                                <IconsCOntainerStyled>
                                  <Facebook />
                                </IconsCOntainerStyled>
                              </ListItemAvatar>
                              <ListItemText style={{ color: '#3483fa' }} primary='Pagina en Facebook' />
                            </ListItem>
                          </LinkOut>
                          <LinkOut href={contact.instagram} target='_blank'>
                            <ListItem>
                              <ListItemAvatar>
                                <IconsCOntainerStyled>
                                  <Instagram />
                                </IconsCOntainerStyled>
                              </ListItemAvatar>
                              <ListItemText style={{ color: '#3483fa' }} primary='Instagram' />
                            </ListItem>
                          </LinkOut>
                        </List>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Hidden smUp>
                  <Box mb={10} />
                </Hidden>
              </PaperStyled>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Layout>
  )
}

export default home
