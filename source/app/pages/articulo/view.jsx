import React, { useState } from 'react'
import { Grid, Box, Typography } from '@material-ui/core'
import { Paper, Button } from 'components/main'
import Picture from 'components/Picture'
import propTypes from 'prop-types'
import styled from 'styled-components'
import currency from 'helpers/currency'
import speisrc from '../../assets/spei.png'
import paypalSrc from '../../assets/paypal.png'
import oxxoSrc from '../../assets/oxxo.png'
import { LocalShipping } from '@material-ui/icons'
import InputGroup from 'components/inputs/group'
import useResponsive from 'hooks/useResponsive'
import ReactMarkdown from 'react-markdown'
import { Skeleton } from '@material-ui/lab'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ModalPicture from './picturesModalHoc'
import SwipeableViews from 'react-swipeable-views'

const View = props => {
  const responsive = useResponsive()
  const session = useSelector(state => state.session)
  const [currentPictureIndex, setCurrentPictureIndex] = useState(null)
  const { options = {} } = props

  const handleIndexChange = index => {
    setCurrentPictureIndex(index)
  }

  return (
    <>
      {props.loading && (
        <Content>
          <Grid container spacing={responsive({ xs: 2, lg: 6 })} alignItems='flex-start'>
            <Grid item xs={12} md={7}>
              <Paper>
                <Box p={responsive({ xs: 0, md: 2 })}>
                  <Skeleton variant='rect' height={responsive({ xs: 300, md: 500, sm: 400 })} />
                  <Box mt={2}>
                    <Grid container spacing={responsive({ xs: 1, md: 2 })}>
                      {[1, 2, 3, 4, 5, 6].map((picture) => (
                        <Tumb key={picture} item xs>
                          <Skeleton variant='rect' height={60} />
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
                    <Skeleton height={30} variant='text' />
                    <Skeleton height={30} variant='text' />
                    <Skeleton height={30} variant='text' />
                    <Skeleton height={30} variant='text' />
                  </ActionsContainer>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Content>
      )}
      {!props.loading && (
        <Content>
          <Grid container spacing={responsive({ xs: 2, lg: 2 })} alignItems='flex-start'>
            <Grid item xs={12} md={7}>
              <Paper>
                <Box overflow='hidden' pr={responsive({ xs: 0, md: 4 })} pl={responsive({ xs: 0, md: 4 })}>
                  <SwipeableViews index={currentPictureIndex} onChangeIndex={handleIndexChange} enableMouseEvents disableLazyLoading interval={10000}>
                    {props.pictures.map((picture, index) => (
                      <PicturePrimary key={index} src={picture} height={95} onClick={event => props.onSetIndexPicture(index)} />
                    ))}
                  </SwipeableViews>
                  <Box mt={1}>
                    <Grid container spacing={responsive({ xs: 1, md: 2 })}>
                      {props.pictures.map((picture, index) => (
                        <Tumb key={picture} item xs>
                          <PictureIcon src={picture} onClick={event => setCurrentPictureIndex(index)} />
                        </Tumb>
                      ))}
                    </Grid>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={5} lg={5} style={{ position: responsive({ xs: 'static', md: 'sticky' }), top: '50px' }}>
              <MenuContainerExt>
                <Paper>
                  <Box p={responsive({ xs: 2 })}>
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
                        <MethoPayIcon src={speisrc} />

                      </Box>
                      <Box pt={responsive({ xs: 1, md: 2 })} pb={responsive({ xs: 1, md: 2 })}>
                        <Grid container alignItems='center'>
                          <LocalShippingStyled /><Typography variant='subtitle1'>Envíos nacionales e internaciones</Typography>
                        </Grid>
                      </Box>
                      <Grid container alignItems='center' spacing={2}>

                        {props.data.sizes && props.data.sizes.length && (
                          <Grid item xs={6}>
                            <InputGroup
                              state={options}
                              setState={props.setOptions}
                              type='select'
                              options={props.data.sizes.reduce((acum, current) => { acum[current] = current; return acum }, {})}
                              size='small'
                              label='Talla'
                              name='size'
                            />
                          </Grid>
                        )}

                        <Grid item xs={6}>
                          <InputGroup
                            filter='number'
                            state={options}
                            setState={props.setOptions}
                            margin='none'
                            size='small'
                            label='Cantidad'
                            name='quantity'
                            limit={2}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            onClick={props.onAddToCart}
                            disabled={!options.quantity || session === 'loading'}
                            variant='contained'
                            fullWidth
                          >Agregar al carrito
                          </Button>
                        </Grid>
                        <Grid item xs={12}>
                          <Link to='/articulos'>
                            <Button fullWidth>Seguir comprando</Button>
                          </Link>
                        </Grid>
                      </Grid>
                    </ActionsContainer>
                  </Box>
                </Paper>
              </MenuContainerExt>
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
      )}
    </>
  )
}

View.propTypes = {
  data: propTypes.object,
  loading: propTypes.bool,
  pictures: propTypes.array,
  options: propTypes.object,
  setOptions: propTypes.func,
  onAddToCart: propTypes.func,
  onSetIndexPicture: propTypes.func // created by hooc
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
`
const MenuContainerExt = styled.div`
  max-width: 450px;
  @media screen and (max-width:1500px) {
    max-width: 400px;
  }
  @media screen and (max-width:1400px) {
    max-width: 350px;
  }
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

const PicturePrimary = styled(Picture)`
  cursor: pointer;
  transition: all 300ms;
  margin: auto;
`

export default ModalPicture(View)
