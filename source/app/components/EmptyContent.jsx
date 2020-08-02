import React from 'react'
import { FullWidthCentered } from './main'
import propTypes from 'prop-types'
import { Typography, Grid } from '@material-ui/core'
import styled from 'styled-components'

const Message = styled(Typography)`
  font-size: 2em!important;
  color: #c7e1fb;
  width: 60%;
  margin-bottom: 40px!important;
  @media screen and (max-width:700px) {
    width: 80%;
    font-size: 1.5em!important;
  }
`
const Title = styled(Typography)`
  font-size: 4em!important;
  color: #c7e1fb;
  width: 60%;
  margin-bottom: 10px!important;
  @media screen and (max-width:700px) {
    width: 90%;
    font-size: 2em!important;
  }
`
const StyledIcon = styled.div`
  font-size: 120px!important;
  color: #c7e1fb;
  @media screen and (max-width:700px) {
    font-size: 80px!important;
  }
`
const FullWidthCenteredStyled = styled(FullWidthCentered)`
  background: #fff;
  min-height: 80vh;
  text-align: center;
`

const EmptyMessage = props => {
  return (
    <FullWidthCenteredStyled>
      <Grid container alignItems='center' justify='center' direction='column'>
        {props.title && (
          <Title>
            {props.title}
          </Title>
        )}
        <Message>
          {props.message || 'Agrgar un mensaje aqui...'}
        </Message>
        <StyledIcon as={props.icon} />
      </Grid>
    </FullWidthCenteredStyled>
  )
}

EmptyMessage.propTypes = {
  message: propTypes.string,
  icon: propTypes.elementType,
  title: propTypes.string
}

export default EmptyMessage
