import React from 'react'
import styled from 'styled-components'
import { Grid, Typography, Box } from '@material-ui/core'
import Input from 'components/inputs/group'
import { Paper } from 'components/main'
import { object, func, string } from 'prop-types'
import { Alert } from '@material-ui/lab'

const Limiter = styled.div`
  margin: 100px;
  @media screen and (max-width:1000px) {
    margin: 20px;
  }
`

const Form = props => {
  return (
    <>
      <Box pt={2} pb={2}>
        <Typography variant='h6'>Dirreccion de envío:</Typography>
      </Box>
      <Paper>
        <Limiter>
          {props.state.errorMessage && (
            <Box mb={2}>
              <Alert severity='error'>
                {props.state.errorMessage}
              </Alert>
            </Box>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Input
                margin='none'
                state={props.state}
                setState={props.setState}
                name='name'
                label='Nombre'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                margin='none'
                label='Apellidos'
                state={props.state}
                setState={props.setState}
                name='lastname'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                name='number'
                margin='none'
                label='Numero de contacto'
                state={props.state}
                setState={props.setState}
                filter='number'
                limit={10}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                name='email'
                margin='none'
                label='Correo electronico'
                state={props.state}
                setState={props.setState}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                name='street_number'
                margin='none'
                label='Calle y numero'
                state={props.state}
                setState={props.setState}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                name='postal_code'
                margin='none'
                label='Codigo postal'
                state={props.state}
                setState={props.setState}
                filter='number'
                limit={5}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                name='suburb'
                margin='none'
                label='Colonia'
                state={props.state}
                setState={props.setState}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                name='state'
                margin='none'
                label='Estado'
                state={props.state}
                setState={props.setState}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                name='city'
                margin='none'
                label='Delegacion o municipio'
                state={props.state}
                setState={props.setState}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                name='references'
                margin='none'
                label='Referencias'
                state={props.state}
                setState={props.setState}
              />
            </Grid>
          </Grid>
        </Limiter>
      </Paper>
    </>
  )
}

Form.propTypes = {
  state: object,
  setState: func,
  errorMessage: string
}

export default Form
