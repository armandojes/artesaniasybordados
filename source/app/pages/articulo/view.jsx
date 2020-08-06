import React, { useState } from 'react'
import Layout from 'components/layout_user'
import Container from 'components/container'
import { Grid, Box, Typography } from '@material-ui/core'
import { Paper, Button } from 'components/main'
import Picture from 'components/Picture'
import propTypes from 'prop-types'
import styled from 'styled-components'
import currency from 'helpers/currency'
import visaSrc from '../../assets/visa.jpg'
import mastercardSrc from '../../assets/mastercard.png'
import paypalSrc from '../../assets/paypal.png'
import oxxoSrc from '../../assets/oxxo.png'
import { LocalShipping } from '@material-ui/icons'
import InputGroup from 'components/inputs/group'
import useResponsive from 'hooks/useResponsive'
import ReactMarkdown from 'react-markdown'

const View = props => {
  const [currentPicture, setCurrentPicture] = useState(0)
  const responsive = useResponsive()

  if (props.loading) return 'Loading'

  return (
    <Layout>
      <Container $page>
        <Content>
          <Grid container spacing={responsive({ xs: 2, lg: 6 })} alignItems='flex-start'>
            <Grid item xs={12} md={7}>
              <Paper>
                <Box p={responsive({ xs: 0, md: 2 })}>
                  <Picture src={props.pictures[currentPicture]} height={80} />
                  <Box mt={2}>
                    <Grid container spacing={responsive({ xs: 1, md: 2 })}>
                      {props.pictures.map((picture, index) => (
                        <Tumb key={picture} item xs>
                          <PictureIcon src={picture} onClick={event => setCurrentPicture(index)} />
                        </Tumb>
                      ))}
                    </Grid>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={5} style={{ position: responsive({ xs: 'static', md: 'sticky' }), top: '50px' }}>
              <Paper>
                <Box p={responsive({ xs: 2, md: 2, lg: 3 })}>
                  <ActionsContainer>
                    <Typography variant='h5'>{props.data.title}</Typography>
                    <Box pt={responsive({ xs: 1, md: 2 })} pb={responsive({ xs: 1, md: 2 })}>
                      <Typography variant='h5' color='primary'>{currency.toPrice(props.data.price)}</Typography>
                      <Typography variant='caption' color='primary'>IVA incluido</Typography>
                    </Box>
                    <Box pt={responsive({ xs: 1, md: 2 })} pb={responsive({ xs: 1, md: 2 })}>
                      <Typography variant='subtitle1'>Metodos de pago</Typography>
                      <MethoPayIcon src={paypalSrc} />
                      <MethoPayIcon src={oxxoSrc} />
                      <MethoPayIcon src={mastercardSrc} />
                      <MethoPayIcon src={visaSrc} />
                    </Box>
                    <Box pt={responsive({ xs: 1, md: 2 })} pb={responsive({ xs: 1, md: 2 })}>
                      <Grid container alignItems='center'>
                        <LocalShippingStyled /><Typography variant='subtitle1'>Envios a toda la republica</Typography>
                      </Grid>
                    </Box>
                    <Grid container alignItems='center' spacing={2}>
                      <Grid item xs={6}>
                        <InputGroup
                          state={props.options}
                          setState={props.setOptions}
                          type='select'
                          options={{ xs: 'xs', md: 'md' }}
                          size='small'
                          label='Talla'
                          name='size'
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <InputGroup
                          state={props.options}
                          setState={props.setOptions}
                          margin='none'
                          size='small'
                          label='Cantidad'
                          name='quantity'
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button variant='contained' fullWidth>Agregar al carrito</Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Button fullWidth>Seguir comprando</Button>
                      </Grid>
                    </Grid>
                  </ActionsContainer>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={7}>
              <Box mb={1}>
                <Typography style={{ color: 'gray' }} variant='h5'>Descripcion</Typography>
              </Box>
              <Paper>
                <Box p={responsive({ xs: 1, md: 2 })}>
                  <DescriptionContainer>
                    <ReactMarkdown source={props.data.description} />
                  </DescriptionContainer>
                </Box>
              </Paper>
            </Grid>

          </Grid>
        </Content>
      </Container>
    </Layout>
  )
}

View.propTypes = {
  data: propTypes.object,
  loading: propTypes.bool,
  pictures: propTypes.array,
  options: propTypes.object,
  setOptions: propTypes.func
}

const PictureIcon = styled(Picture)`
  cursor: pointer;
  box-sizing: border-box;
  :hover {
    border: 1px solid red;
  }
`
const MethoPayIcon = styled.img`
  height: 25px;
  margin-right: 12px;
  @media screen and (max-width:959px) {
    height: 20px;
  }
`

const Tumb = styled(Grid)`
  max-width: 110px!important;
  @media screen and (max-width:959px) {
    max-width: 65px;
  }
`

const LocalShippingStyled = styled(LocalShipping)`
  color: #3785fa;
  margin-right: 10px;
  font-size: 40px!important;
`

const ActionsContainer = styled.div`
  margin: auto;
  max-width: 350px;
  padding: 20px 0px;
`

const Content = styled.div`
  @media screen and (max-width:959px) {
    max-width: 600px;
    margin: auto;
  }
`
const DescriptionContainer = styled.div`
  line-height: 1.6em;
`

export default View
