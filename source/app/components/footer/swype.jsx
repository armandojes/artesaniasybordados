import React from 'react'
import styled from 'styled-components'
import { MobileStepper as MobileStepperBase } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'
import propTypes from 'prop-types'
import { FlexCentered } from 'components/main'

const PictureViewer = props => {
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = props.children.length

  const handleStepChange = (step) => {
    setActiveStep(step)
  }

  return (
    <>
      <PicturesContainer>
        <SwipeableViews onChangeIndex={handleStepChange}>
          {props.children}
        </SwipeableViews>
        <FlexCentered>
          <MobileStepper steps={maxSteps} position='static' variant='dots' activeStep={activeStep} />
        </FlexCentered>
      </PicturesContainer>

    </>
  )
}

PictureViewer.propTypes = {
  children: propTypes.oneOfType([propTypes.string, propTypes.array, propTypes.object, propTypes.element])
}

const PicturesContainer = styled('div')`
  position: relative;
`

const MobileStepper = styled(MobileStepperBase)`
  background: none;
`
export default PictureViewer
