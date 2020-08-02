import React from 'react'
import Layout from 'components/layout'
import Container from 'components/container'
import styled from 'styled-components'
import Summary from './summary'
import Form from './form'
import Products from './products'
import MethodPay from './methodpay'
import Finally from './finally'
import { string, func, object } from 'prop-types'
import { Button } from 'components/main'
import { Box, Grid } from '@material-ui/core'
import useResponsive from 'hooks/useResponsive'

const Wrapper = styled.section`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  @media screen and (max-width:950px) {
    flex-wrap: wrap;
    flex-direction: column-reverse
  }
`
const Body = styled.div`
  width: 60%;
  @media screen and (max-width:950px) {
    width: 100%;;
  }
`

const Aside = styled.div`
  width: 35%;
  padding: 0px 10px;
  @media screen and (max-width:950px) {
    width: 100%;
    padding: 0px;
    margin-bottom: 20px;
  }
`

const ContainerMaterial = styled.div`
  width: 80%;
  margin: auto;
  max-width: 1280px;
  @media screen and (max-width:1200px) {
    width: 100%;
  }
  @media screen and (max-width:950px) {
    max-width: 600px;
    width: 100%;
  }
`
const ButtonStyled = styled(Button)`
  margin-right: 20px!important;
  min-width: 150px!important;
  @media screen and (max-width:600px) {
    min-width: 120px!important;
    width: 48%;
    margin-right: 0px!important;
  }
  :last-of-type {
    margin-right: 0px!important;
  }
`
const ButtonShadow = styled.div`
  background: red;
  height: 47px;
  position: absolute;
  width: 300px;
  opacity: 0.01;
`
const ButtonStyledPaypal = styled(ButtonStyled)`
  position: relative;
  overflow: hidden;
`

const View = props => {
  const responsive = useResponsive()

  return (
    <Layout>
      <Container $page>
        <ContainerMaterial>
          <Wrapper>
            <Body>
              {props.view === 'form' && (
                <Form {...props} />
              )}
              {props.view === 'finally' && (
                <Finally {...props} />
              )}
              {props.view === 'methodPay' && (
                <MethodPay {...props} />
              )}
              {props.view === 'products' && (
                <Products {...props} />
              )}
              <Grid mt={2} component={Box} container justify={responsive({ xs: 'space-between', sm: 'flex-end', d: 'flex-end' })}>
                <ButtonStyled onClick={props.onBack}>{props.view === 'products' ? 'Seguir comprando' : 'Atras'}</ButtonStyled>
                {props.view !== 'finally' && (
                  <ButtonStyled onClick={props.onNext} variant='contained'>Siguiente</ButtonStyled>
                )}
                {props.view === 'finally' && props.state.methodPay !== 'paypal' && (
                  <ButtonStyled onClick={props.onNext} variant='contained'>Pagar</ButtonStyled>
                )}
                {props.view === 'finally' && props.state.methodPay === 'paypal' && (
                  <ButtonStyledPaypal variant='contained'><ButtonShadow id='render_button_paypal' />Pagar con Paypal </ButtonStyledPaypal>
                )}
              </Grid>
            </Body>
            <Aside>
              <Summary {...props} />
            </Aside>
          </Wrapper>
        </ContainerMaterial>
      </Container>
    </Layout>
  )
}

View.propTypes = {
  view: string,
  onNext: func,
  onBack: func,
  state: object
}

export default View
