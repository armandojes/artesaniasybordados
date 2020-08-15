import React from 'react'
import styled from 'styled-components'
import { Text } from 'components/main'
import { string } from 'prop-types'

const Cards = props => {
  return (
    <Content>
      <props.Icon />
      <Text align='center'>
        {props.message}
      </Text>
    </Content>
  )
}

Cards.propTypes = {
  message: string
}

export default Cards

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  flex-direction: column;
  color: #530b4c;

  & svg {
    font-size: 70px;
    margin-bottom: 10px;
    color: gray;
  }
`
