import { TextField } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

const TextFiled = props => {
  return (
    <TextFiledStyled {...props} />
  )
}

export default TextFiled

const TextFiledStyled = styled(TextField)`
  & .MuiOutlinedInput-input {
    padding: 10px
  }
  & .MuiInputLabel-outlined {
    transform: translate(14px, 13px) scale(1);
  }
`
