import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import useObjectState from 'hooks/useState'
import { useHistory } from 'react-router-dom'
import session from 'components/session'
import { fakeCheckoutData } from '../../constants'
import Layout from 'components/layout'
import Container from 'components/container'
import styled from 'styled-components'
import Summary from './summary'
import Form from './form'
import Products from './products'
import MethodPay from './methodpay'
import Finally from './finally'
import EmptyMessage from 'components/EmptyContent'
import { Loyalty } from '@material-ui/icons'
import { useMediaQuery } from '@material-ui/core'
import Card from './card'

const Mycart = props => {
  const history = useHistory()
  const { items, loading } = useSelector(state => state.cart)
  const [view, setView] = useState('products') // products || form || methodPay || finally || card
  const [state, setState] = useObjectState(ENV === 'development' ? fakeCheckoutData : {})
  const isMobile = useMediaQuery('(max-width:950px)')

  useEffect(() => { window.scrollTo(0, 0) }, [view])

  return (
    <Layout>
      <Container $page>
        {!loading && !!items.length && (
          <ContainerMaterial>
            <Wrapper>
              <Body>
                {view === 'products' && (
                  <Products
                    onNext={() => setView('form')}
                    onBack={() => history.push('/articulos')}
                  />
                )}
                {view === 'form' && (
                  <Form
                    onNext={() => setView('methodPay')}
                    onBack={() => setView('products')}
                    value={state}
                    onChange={setState}
                    country={state.country}
                  />
                )}
                {view === 'card' && (
                  <Card
                    state={state}
                    onNext={() => setView('methodPay')}
                    onBack={() => setView('finally')}
                    value={state}
                    onChange={setState}
                    country={state.country}
                  />
                )}
                {view === 'methodPay' && (
                  <MethodPay
                    onNext={() => setView('finally')}
                    onBack={() => setView('form')}
                    value={state.methodPay}
                    onChange={val => setState({ methodPay: val })}
                  />
                )}
                {view === 'finally' && (
                  <Finally
                    onBack={() => setView('methodPay')}
                    methodPay={state.methodPay}
                    state={state}
                    onViewChange={setView}
                  />
                )}
              </Body>
              {(!isMobile || view === 'finally') && (
                <Aside>
                  <Summary
                    country={state.country}
                  />
                </Aside>
              )}
            </Wrapper>
          </ContainerMaterial>
        )}
        {!loading && !items.length && (
          <EmptyMessage
            icon={Loyalty}
            message='Aun no tienes articulos en tu carrito'
          />
        )}
        {loading && (
          <EmptyMessage
            icon={Loyalty}
            message='Cargando...'
          />
        )}
      </Container>
    </Layout>
  )
}

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

export default session(Mycart)
