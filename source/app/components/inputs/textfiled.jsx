import { TextField } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import { func, string, number } from 'prop-types'

const TextFiled = props => {
  const { filter, limit, ...otherProps } = props

  const handleChange = event => {
    if (filter === 'number') {
      const value = parseInt(event.target.value)
      if (isNaN(value) || !value) event.target.value = ''
      else event.target.value = value
    }

    if (limit) {
      var value = event.target.value.toString()
      if (value.length > limit) {
        value = value.slice(0, limit)
        event.target.value = filter === 'number' ? parseInt(value) : value
      }
    }

    props.onChange(event)
  }

  return (
    <TextFiledStyled {...otherProps} onChange={handleChange} />
  )
}

TextFiled.propTypes = {
  onChange: func,
  filter: string,
  limit: number
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
