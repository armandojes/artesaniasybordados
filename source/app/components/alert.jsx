import React from 'react'
import styled from 'styled-components'
import { Modal as ModalBase, CircularProgress, Typography, Grid } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { setInitialState, action } from 'flux/alert'
import { FullWidthCentered, Paper, Button } from 'components/main'

const Modal = props => {
  const dispatch = useDispatch()
  const { description, active, loading } = useSelector(state => state.alert)

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
            {!!description && (<Typography variant='h6'>{description}</Typography>)}
            <Grid container spacing={2} justify='center' style={{ width: '100%' }}>
              <Grid item xs={12} md={6}>
                <Button fullWidth onClick={_event => dispatch(setInitialState())}>Cancelar</Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button fullWidth onClick={_event => dispatch(action())}>Aceptar</Button>
              </Grid>
            </Grid>
          </Body>
        )}
      </>
    </FullWidthCentered>
  )
}

export default Modal

const Body = styled(Paper)`
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
const BodyCentered = styled(Body)`
  align-items: center;
  justify-content: center;
`
