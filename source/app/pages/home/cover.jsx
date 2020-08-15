import React, { useState } from 'react'
import { autoPlay } from 'react-swipeable-views-utils'
import SwipeableViews from 'react-swipeable-views'
// import { MobileStepper } from '@material-ui/core'

// covers
import FirstCover from './firstCover'
import SecondCover from './secondaCover'
import styled from 'styled-components'

const Heaigth = styled.div`
  height: 500px;
  @media screen and (max-width: 1500px) {
    height: 420px;
  }
  @media screen and (max-width: 1100px) {
    height: 350px;
  }
  @media screen and (max-width: 600px) {
    height: 300px;
  }
`

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const Mayor = props => {
  const [currentStep, setStep] = useState(0)

  return (
    <AutoPlaySwipeableViews index={currentStep} onChangeIndex={setStep} enableMouseEvents disableLazyLoading interval={10000}>
      <Heaigth>
        <FirstCover />
      </Heaigth>
      <Heaigth>
        <SecondCover />
      </Heaigth>
    </AutoPlaySwipeableViews>

  )
}

export default Mayor
