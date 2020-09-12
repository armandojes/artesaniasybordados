import React, { useState } from 'react'
import styled from 'styled-components'
import { IconButton, Modal } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'
import { array } from 'prop-types'
import { ArrowLeft, ArrowRight, Close } from '@material-ui/icons'

const ModalStyled = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Body = styled.div`
  background: #000;
  width: 95vw;
  height: 95vh;
  outline: none;
  position: relative;
  @media screen and (max-width: 800px) {
    width: 95vw;
    height: 80vh;
  }
`

const Picture = styled.img`
  width: 95vw;
  height: 95vh;
  display: block;
  object-fit: contain;
  @media screen and (max-width: 800px) {
    width: 95vw;
    height: 80vh;
  }
`

const IconButtonStyled = styled(IconButton)`
  position: absolute!important;
  background: #cdcdcd!important;
  right: 10px!important;
  top: 10px!important;
  cursor: pointer!important;
  z-index: 2;
`
const NextButton = styled(IconButtonStyled)`
  top: 0px!important;
  bottom: 0px!important;
  margin: auto!important;
  right: 3%!important;
  height: 30px;
`
const PrevButton = styled(IconButtonStyled)`
  top: 0px!important;
  bottom: 0px!important;
  margin: auto!important;
  left: 3%!important;
  right: auto!important;
  height: 30px;
`

const Counter = styled(IconButtonStyled)`
  color: #000!important;
  bottom:  15px!important;
  top: auto!important;
  border-radius: 5px!important;
  right: 15px!important;
  font-weight: bold;
  padding: 7px 15px!important;
`

const ModalPictureHooK = WrappedComponent => props => {
  const [currentPictureIndex, setCurrentPictureIndex] = useState(null)
  const maxIndex = (props.pictures.length - 1)

  const handleClose = () => setCurrentPictureIndex(null)

  const handleIndexChange = index => {
    setCurrentPictureIndex(index)
  }

  const handleNext = () => {
    currentPictureIndex === maxIndex ? setCurrentPictureIndex(0) : setCurrentPictureIndex(currentPictureIndex + 1)
  }

  const handlePrev = () => {
    currentPictureIndex === 0 ? setCurrentPictureIndex(maxIndex) : setCurrentPictureIndex(currentPictureIndex - 1)
  }

  return (
    <>
      <ModalStyled open={currentPictureIndex !== null} onClose={handleClose}>
        <Body>
          <IconButtonStyled size='small' onClick={handleClose}>
            <Close />
          </IconButtonStyled>

          <NextButton size='small' onClick={handleNext}>
            <ArrowRight />
          </NextButton>

          <PrevButton size='small' onClick={handlePrev}>
            <ArrowLeft />
          </PrevButton>

          <Counter size='small' onClick={handlePrev}>
            Foto {currentPictureIndex + 1} / {props.pictures.length}
          </Counter>

          <SwipeableViews index={currentPictureIndex} onChangeIndex={handleIndexChange} enableMouseEvents disableLazyLoading interval={10000}>
            {props.pictures.map(picture => (
              <Picture key={picture} src={picture} />
            ))}
          </SwipeableViews>
        </Body>
      </ModalStyled>

      <WrappedComponent {...props} onSetIndexPicture={handleIndexChange} />
    </>
  )
}

ModalPictureHooK.propTypes = {
  pictures: array
}

export default ModalPictureHooK
