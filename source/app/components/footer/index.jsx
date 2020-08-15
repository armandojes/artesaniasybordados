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
              message='Paga con tarjeta o en efectivo'
              Icon={CreditCard}
            />
          </Grid>
          <Grid item xs={4}>
            <Cards
              message='Envíos a cualquier parte de la republica'
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
          <LinkStyled>Términos y condiciones</LinkStyled> | <LinkStyled to='/notice-of-privacy'>Políticas de privacidad</LinkStyled> | <LinkStyled to='/acerca-de-nosotros'>Sobre nosotros</LinkStyled>
        </div>
      </Hidden>
      <Hidden mdUp>
        <Swype>
          <Cards
            message='Paga con tarjeta o en efectivo'
            Icon={CreditCard}
          />
          <Cards
            message='Envíos a cualquier parte de la republica'
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
        <LinkStyledDesk>Términos y condiciones</LinkStyledDesk>
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
  color: initial;
  text-decoration: none;
`

const LinkStyledDesk = styled(Link)`
  color: initial;
  text-decoration: none;
  display: block;
  text-align: center;
  margin-bottom: 10px;
  &:last-of-type {
    margin-bottom: 0px;
  }
`
