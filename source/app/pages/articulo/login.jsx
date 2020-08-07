/* eslint-disable react/prop-types */
import React from 'react'
import { Modal } from '@material-ui/core'
import LoginBox from '../../pages/login/Box'
import styled from 'styled-components'
import { string } from 'prop-types'

const ModalStyled = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoginModal = props => {
  return (
    <ModalStyled
      BackdropProps={{
        style: {
          backgroundColor: '#000000c2'
        }
      }}
      open={props.open}
      onClose={props.onClose}
    >
      <>
        <LoginBox message={props.message} />
      </>
    </ModalStyled>
  )
}

LoginModal.propTypes = {
  message: string
}

export default LoginModal
