import React from 'react'
import styled from 'styled-components'
import { Paper } from 'components/main'
import { Typography, Box, Radio, Grid, Button } from '@material-ui/core'
import { methodsPay } from '../../../constants'
import propTypes from 'prop-types'
import { Alert } from '@material-ui/lab'

const MethodPayItem = styled(Paper)`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  cursor: pointer;
  min-height: 50px;
  padding: 30px;
  border-left: ${props => props.$checked ? '5px solid #3483fa' : 'none'};
  box-sizing: border-box;
`

const MethodPay = props => {
  return (
    <>
      <Box pt={2} pb={2}>
        <Typography variant='h6'>Metódo de pago</Typography>
      </Box>
      {props.errorMessage && (
        <Box mb={2}>
          <Alert severity='error'>
            {props.errorMessage}
          </Alert>
        </Box>
      )}
      {Object.keys(methodsPay).map(methdPay => (
        <MethodPayItem key={methdPay} onClick={event => props.onChange(methdPay)} $checked={props.value === methdPay}>
          <Radio checked={props.value === methdPay} />
          {methodsPay[methdPay]}
        </MethodPayItem>
      ))}
      <Box mt={5} mb={5}>
        <Grid container spacing={1} justify='flex-end'>
          <Grid item xs={6} md={5} lg={4}>
            <Button
              size='medium'
              fullWidth
              variant='outlined'
              color='primary'
              onClick={props.onBack}
            >Atrás
            </Button>
          </Grid>
          <Grid item xs={6} md={5} lg={4}>
            <Button
              onClick={props.onNext}
              size='medium'
              fullWidth
              variant='contained'
              color='primary'
            >Siguente
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

MethodPay.propTypes = {
  onChange: propTypes.func,
  value: propTypes.string,
  errorMessage: propTypes.string,
  onBack: propTypes.func,
  onNext: propTypes.func
}

export default MethodPay
