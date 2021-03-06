import React from 'react'
import Container from 'components/container'
import { Hidden, Grid, Divider, Box } from '@material-ui/core'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Cards from './cards'
import { CreditCard, VerifiedUser, LocalShipping } from '@material-ui/icons'
import Swype from './swype'

const Footer = props => (
  <FooterStyled>
    <Container>
      <Hidden smDown>
        <Grid container justify='center' alignItems='center' spacing={2}>
          <Grid item xs={4}>
            <Cards
              message='Paga con paypal o en efectivo'
              Icon={CreditCard}
            />
          </Grid>
          <Grid item xs={4}>
            <Cards
              message='Envíos nacionales e internaciones'
              Icon={LocalShipping}
            />
          </Grid>
          <Grid item xs={4}>
            <Cards
              message='Seguridad, de principio a fin'
              Icon={VerifiedUser}
            />
          </Grid>
        </Grid>
        <Box paddingTop={2} paddingBottom={2}>
          <Divider />
        </Box>
        <div>
          <LinkStyled as='span'>Términos y condiciones</LinkStyled> | <LinkStyled to='/notice-of-privacy'>Políticas de privacidad</LinkStyled> | <LinkStyled to='/acerca-de-nosotros'>Sobre nosotros</LinkStyled>
        </div>
      </Hidden>
      <Hidden mdUp>
        <Swype>
          <Cards
            message='Paga con paypal o en efectivo'
            Icon={CreditCard}
          />
          <Cards
            message='Envíos nacionales e internaciones'
            Icon={LocalShipping}
          />
          <Cards
            message='Seguridad, de principio a fin'
            Icon={VerifiedUser}
          />
        </Swype>
        <Box paddingTop={2} paddingBottom={2}>
          <Divider />
        </Box>
        <LinkStyledDesk as='span'>Términos y condiciones</LinkStyledDesk>
        <LinkStyledDesk to='/notice-of-privacy'>Políticas de privacidad</LinkStyledDesk>
        <LinkStyledDesk to='/acerca-de-nosotros'>Sobre nosotros</LinkStyledDesk>
      </Hidden>
    </Container>
  </FooterStyled>
)

export default Footer

const FooterStyled = styled.footer`
  background: #fff;
  padding: 10px 0px;
`

const LinkStyled = styled(Link)`
  color: #000;
  text-decoration: none;
`

const LinkStyledDesk = styled(Link)`
  background: #fff;
  text-decoration: none;
  display: block;
  text-align: center;
  margin-bottom: 10px;
  &:last-of-type {
    margin-bottom: 0px;
  }
`
