import { TextField } from '@material-ui/core'
import React from 'react'
import { func, string, number } from 'prop-types'
import useResponsive from 'hooks/useResponsive'

const TextFiled = props => {
  const { filter, limit, ...otherProps } = props
  const responsive = useResponsive()

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
    <TextField
      size={responsive({ xs: 'small', sm: 'medium' })}
      autoComplete='off'
      fullWidth
      variant='outlined'
      color='primary'
      margin='normal'
      {...otherProps}
      onChange={handleChange}
    />
  )
}

TextFiled.propTypes = {
  onChange: func,
  filter: string,
  limit: number
}

export default TextFiled
