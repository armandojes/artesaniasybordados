/* eslint-disable react/jsx-handler-names */
import React from 'react'
import styled from 'styled-components'
import { Grid, Typography, Box, Button } from '@material-ui/core'
import Input from 'components/inputs/group'
import { Paper } from 'components/main'
import { object, func } from 'prop-types'
import { Alert } from '@material-ui/lab'

const Limiter = styled.div`
  margin: 100px;
  @media screen and (max-width:1600px) {
    margin: 50px
  }
  @media screen and (max-width:1400px) {
    margin: 50px 30px;
  }
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
          {props.value.errorMessage && (
            <Box mb={2}>
              <Alert severity='error'>
                {props.value.errorMessage}
              </Alert>
            </Box>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Input
                margin='none'
                state={props.value}
                setState={props.onChange}
                name='name'
                label='Nombre'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                margin='none'
                label='Apellidos'
                state={props.value}
                setState={props.onChange}
                name='lastname'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                name='number'
                margin='none'
                label='Numero de contacto'
                state={props.value}
                setState={props.onChange}
                filter='number'
                limit={10}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                name='email'
                margin='none'
                label='Correo electronico'
                state={props.value}
                setState={props.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                name='street_number'
                margin='none'
                label='Calle y numero'
                state={props.value}
                setState={props.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                name='postal_code'
                margin='none'
                label='Codigo postal'
                state={props.value}
                setState={props.onChange}
                filter='number'
                limit={5}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                name='suburb'
                margin='none'
                label='Colonia'
                state={props.value}
                setState={props.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                name='state'
                margin='none'
                label='Estado'
                state={props.value}
                setState={props.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                name='city'
                margin='none'
                label='Delegacion o municipio'
                state={props.value}
                setState={props.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                name='references'
                margin='none'
                label='Referencias'
                state={props.value}
                setState={props.onChange}
              />
            </Grid>
          </Grid>
        </Limiter>
      </Paper>
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

Form.propTypes = {
  value: object,
  onBack: func,
  onNext: func,
  onChange: func
}

export default Form
