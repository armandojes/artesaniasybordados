import React from 'react'
import { Stepper, Step, StepLabel } from '@material-ui/core'
import { array, number } from 'prop-types'
import styled from 'styled-components'

const StepperComponent = props => {
  return (
    <StepperStyled activeStep={props.activeStep} alternativeLabel style={{ backgroundColor: 'transparent' }}>
      {props.steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </StepperStyled>
  )
}

const StepperStyled = styled(Stepper)`
    & .MuiStepLabel-labelContainer {
    @media (max-width:600px) {
      display: none;
    }
  }
`

StepperComponent.propTypes = {
  steps: array,
  activeStep: number
}

export default StepperComponent
