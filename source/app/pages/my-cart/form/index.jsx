import React from 'react'
import View from './view'
import propTypes from 'prop-types'
import { requires } from 'helpers/validate'

const Form = props => {
  const handleNext = () => {
    const errors = requires(props.value, ['name', 'lastname', 'number', 'email', 'street_number', 'postal_code', 'suburb', 'state', 'city', 'references'])
    if (errors) {
      props.onChange({ errors, errorMessage: 'Todos los campos son obligatorios' })
    } else {
      props.onNext()
    }
  }

  return (
    <View
      value={props.value}
      onChange={props.onChange}
      onNext={handleNext}
      onBack={props.onBack}
    />
  )
}

Form.propTypes = {
  onNext: propTypes.func,
  onBack: propTypes.func,
  onChange: propTypes.func,
  value: propTypes.object
}

export default Form
