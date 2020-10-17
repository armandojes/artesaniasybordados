import React from 'react'
import View from './view'
import propTypes from 'prop-types'
import { requires } from 'helpers/validate'
import { useDispatch } from 'react-redux'
import { setAlert } from 'flux/alert'

const Form = props => {
  const dispatch = useDispatch()

  const handleNext = () => {
    const errors = requires(props.value, ['name', 'lastname', 'number', 'email', 'street_number', 'postal_code', 'suburb', 'state', 'city', 'references', 'country'])
    if (errors) {
      props.onChange({ errors, errorMessage: 'Todos los campos son obligatorios' })
    } else {
      props.country === 'us' ? handleNextWithAlert() : props.onNext()
    }
  }

  const handleNextWithAlert = () => {
    dispatch(setAlert({
      description: 'Para envios a Estados Unidos necesitamos calcular el costo del envio de forma manual, despues de realizar la compra nos pondremos en contacto contigo... si tienes alguna duda contactanos',
      action: () => props.onNext()
    }))
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
  value: propTypes.object,
  country: propTypes.string
}

export default Form
