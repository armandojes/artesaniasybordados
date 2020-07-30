/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import { Box } from '@material-ui/core'

function ChangeOption (props) {
  return (
    <Dialog color='primary' onClose={props.onClose} aria-labelledby='change status' open={props.open}>
      <Box p={5} style={{ width: '400px' }}>
        <DialogTitle id='simple-dialog-title'>Cambiar Estado</DialogTitle>
        <List>
          <ListItem autoFocus button onClick={props.onSetPending}>
            <ListItemText primary='Confirmar pago pendiente' />
          </ListItem>
          <ListItem autoFocus button onClick={props.onSetPayed}>
            <ListItemText primary='Confirmar pagado' />
          </ListItem>
          <ListItem autoFocus button onClick={props.onSetSent}>
            <ListItemText primary='Confirmar envio' />
          </ListItem>
          <ListItem autoFocus button onClick={props.onSetDelivered}>
            <ListItemText primary='Confirmar entregado' />
          </ListItem>
        </List>
      </Box>
    </Dialog>
  )
}

ChangeOption.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
}

export default ChangeOption
