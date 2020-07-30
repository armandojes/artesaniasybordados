/* eslint-disable react/prop-types */
import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from 'components/inputs/group'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Box } from '@material-ui/core'
import { companiesSending } from '../../constants'
import { Alert } from '@material-ui/lab'

export default function FormDialog (props) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <Box style={{ width: '400px' }} p={3}>
        <DialogTitle>Confirmar envio</DialogTitle>
        <DialogContent>
          {props.state.errorMessage && (
            <Alert severity='error'>{props.state.errorMessage}</Alert>
          )}
          <Box mt={2} />
          <TextField
            state={props.state}
            setState={props.setState}
            type='string'
            name='code'
            label='Codigo de rastreo'
          />
          <Box mt={2} />
          <TextField
            state={props.state}
            setState={props.setState}
            options={companiesSending}
            type='select'
            name='company'
            label='Compañia de envíos'
          />
          <Box mt={2} />
          <Button style={{ display: 'block', margin: 'auto' }} fullWidth variant='outlined' onClick={props.onSent} color='primary'>
            Guardar
          </Button>
        </DialogContent>
      </Box>
    </Dialog>
  )
}
