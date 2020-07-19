import React from 'react'
import Layout from 'components/layout'
import Container from 'components/container'
import styled from 'styled-components'
import Summary from './summary'
import Form from './form'
import Products from './products'
import { string } from 'prop-types'
import { Button } from 'components/main'
import { Box } from '@material-ui/core'

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`
const Body = styled.div`
  width: 60%;
`

const Aside = styled.div`
  width: 35%;
  padding: 0px 10px;
`

const ContainerMaterial = styled.div`
  width: 80%;
  margin: auto;
  max-width: 1280px;
`

const View = props => {
  return (
    <Layout>
      <Container $page>
        <ContainerMaterial>
          <Wrapper>
            <Body>
              {props.view === 'form' && (
                <Form {...props} />
              )}
              {props.view === 'products' && (
                <Products {...props} />
              )}
              <Box mt={2}>
                <Button>Seguir comprando</Button>
                <Button variant='contained'>Siguente</Button>
              </Box>
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
  view: string
}

export default View
