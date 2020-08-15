import TextFiled from 'components/inputs/textfiled'
import React from 'react'
import { array, string, object, func, oneOfType, number } from 'prop-types'
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'

const GroupInput = props => {
  const { state = {}, setState, ...otherProps } = props
  state.errors = state.errors || []

  const handleChange = event => {
    if (props.onChange) return props.onChange(event)
    setState({ [event.target.name]: event.target.value })
  }

  const handleRemoveError = event => {
    const newErrors = state.errors.filter(error => event.target.name !== error)

    if (state.errors.length === newErrors.length) return true
    setState({
      ...state,
      errors: newErrors,
      errorMessage: newErrors.length ? state.errorMessage : null
    })
  }

  const inputProps = {
    value: props.value ? props.value : state[props.name] ? state[props.name] : '',
    error: state.errors ? state.errors.includes(props.name) : false,
    onChange: handleChange,
    onFocus: handleRemoveError,
    size: 'small',
    ...otherProps
  }

  if (!props.type || props.type === 'string' || props.type === 'password') {
    return (
      <TextFiled
        {...inputProps}
      />
    )
  }

  if (props.type === 'select') {
    const { onFocus, options, label, margin, ...otherSelectProps } = inputProps
    return (
      <FormControl fullWidth variant='outlined' {...otherSelectProps} margin={margin}>
        <InputLabel>{label}</InputLabel>
        <Select {...otherSelectProps} label={label} onFocus={() => onFocus({ target: { name: otherSelectProps.name } })}>
          {Object.keys(options).map((keyname) => (
            <MenuItem key={keyname} value={keyname}>{options[keyname]}</MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }

  return null
}

GroupInput.propTypes = {
  type: string,
  state: object,
  setState: func,
  errors: array,
  name: string,
  onChange: func,
  value: oneOfType([string, number])
}

export default GroupInput
