import React from 'react'
import Layout from 'components/layout'
import ContainerPage from 'components/container'
import { FullWidthCentered } from 'components/main'
import { Box } from '@material-ui/core'
import RegisterComponent from './Box'

const Login = () => (
  <Layout>
    <ContainerPage page>
      <FullWidthCentered>
        <Box pt={5} pb={5}>
          <RegisterComponent />
        </Box>
      </FullWidthCentered>
    </ContainerPage>
  </Layout>
)

export default Login
