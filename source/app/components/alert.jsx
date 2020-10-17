import React from 'react'
import styled from 'styled-components'
import { Modal as ModalBase, CircularProgress, Typography, Grid, IconButton } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { setInitialState, action as actionCreator } from 'flux/alert'
import { FullWidthCentered, Paper, Button } from 'components/main'
import { Close } from '@material-ui/icons'

const Modal = props => {
  const dispatch = useDispatch()
  const { description, active, loading, action } = useSelector(state => state.alert)

  return (
    <FullWidthCentered as={ModalBase} open={active} onClose={() => {}}>
      <>
        {loading && (
          <BodyCentered>
            <CircularProgress />
          </BodyCentered>
        )}
        {!loading && (
          <Body>
            {!action && (
              <CloeContainer onClick={_event => dispatch(setInitialState())}>
                <Close />
              </CloeContainer>
            )}
            {!!description && (<Typography variant='h6'>{description}</Typography>)}
            {!!action && (
              <Grid container spacing={2} justify='center' style={{ width: '100%' }}>
                <Grid item xs={6} md={6}>
                  <Button fullWidth onClick={_event => dispatch(setInitialState())}>Cancelar</Button>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Button fullWidth variant='contained' onClick={_event => dispatch(actionCreator())}>Aceptar</Button>
                </Grid>
              </Grid>
            )}
          </Body>
        )}
      </>
    </FullWidthCentered>
  )
}

export default Modal

const Body = styled(Paper)`
  position: relative;
  width: 500px;
  min-height: 400px;
  border: none;
  outline: none;
  padding: 50px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;

  @media (max-width:1000px) {
    width: 80%;
    max-width: 500px;
    min-height: 400px;
  }
  @media (max-width:500px) {
    width: 90%;
    max-width: 400px;
    min-height: 300px;
    padding: 10px;
  }
`
const CloeContainer = styled(IconButton)`
  position: absolute!important;
  top: 0!important;
  right: 0!important; 
`

const BodyCentered = styled(Body)`
  align-items: center;
  justify-content: center;
`
