import React from 'react'
import styled from 'styled-components'
import TextField from 'components/inputs/textfiled'

const TextFieldStyled = styled(TextField)`

`
const Searcher = props => {
  return (
    <TextFieldStyled
      margin='none'
      size='small'
      placeholder='Buscar'
    />
  )
}

export default Searcher
