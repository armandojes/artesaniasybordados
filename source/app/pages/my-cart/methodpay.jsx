import React from 'react'
import styled from 'styled-components'
import { Paper } from 'components/main'
import { Typography, Box, Radio } from '@material-ui/core'
import { methodsPay } from '../../constants'
import propTypes from 'prop-types'
import { Alert } from '@material-ui/lab'

const MethodPayItem = styled(Paper)`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  cursor: pointer;
  min-height: 50px;
`

const MethodPay = props => {
  const handleChangeMethodPay = value => event => {
    props.setState({
      methodPay: value,
      errorMessage: null
    })
  }

  return (
    <>
      <Box pt={2} pb={2}>
        <Typography variant='h6'>Metódo de pago</Typography>
      </Box>
      {props.state.errorMessage && (
        <Box mb={2}>
          <Alert severity='error'>
            {props.state.errorMessage}
          </Alert>
        </Box>
      )}
      {Object.keys(methodsPay).map(methdPay => (
        <MethodPayItem key={methdPay} onClick={handleChangeMethodPay(methdPay)}>
          <Radio checked={props.state.methodPay === methdPay} />
          {methodsPay[methdPay]}
        </MethodPayItem>
      ))}
    </>
  )
}

MethodPay.propTypes = {
  state: propTypes.object,
  setState: propTypes.func,
  errorMessage: propTypes.string
}

export default MethodPay
