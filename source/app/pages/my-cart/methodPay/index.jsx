import React, { useState, useEffect } from 'react'
import View from './view'
import { func, string } from 'prop-types'

const MethodPay = props => {
  const [errorMessage, setErrorMessage] = useState(null)

  const handleNext = () => {
    if (!props.value) setErrorMessage('Selecciona un metodo de pago')
    else props.onNext()
  }

  useEffect(() => {
    if (errorMessage) setErrorMessage(null)
  }, [props.value])

  return (
    <View
      value={props.value}
      onChange={props.onChange}
      onNext={handleNext}
      onBack={props.onBack}
      errorMessage={errorMessage}
    />
  )
}

MethodPay.propTypes = {
  onNext: func,
  onBack: func,
  value: string,
  onChange: func
}

export default MethodPay
