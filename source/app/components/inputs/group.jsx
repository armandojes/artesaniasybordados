import TextFiled from 'components/inputs/textfiled'
import React from 'react'
import { array, string, object, func } from 'prop-types'

const GroupInput = props => {
  const { state, setState, ...otherProps } = props

  const inputProps = {
    ...otherProps,
    value: state[props.name] || '',
    error: state.errors.includes(props.name)
  }

  const onAnyInputChange = event => {
    setState({ [event.target.name]: event.target.value })
  }

  const handleRemoveError = event => {
    console.log(event.target.name)
    const newErrors = props.state.errors.filter(error => event.target.name !== error)
    setState({
      ...state,
      errors: newErrors,
      errorMessage: newErrors.length ? state.errorMessage : null
    })
  }

  if (!props.type || props.type === 'string' || props.type === 'password') {
    return (
      <TextFiled {...inputProps} onChange={onAnyInputChange} onFocus={handleRemoveError} />
    )
  }

  return null
}

GroupInput.propTypes = {
  type: string,
  state: object,
  setState: func,
  errors: array,
  name: string
}

export default GroupInput
