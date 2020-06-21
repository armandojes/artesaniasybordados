import TextFiled from 'components/inputs/textfiled'
import React from 'react'

const GroupInput = props => {
  const inputProps = {
    ...props,
    value: props.state[props.name] || '',
    error: props.errors ? props.errors.includes(props.name) : false
  }

  if (!props.type || props.type === 'string' || props.type === 'password') {
    return (
      <TextFiled {...inputProps} />
    )
  }
}

export default GroupInput
