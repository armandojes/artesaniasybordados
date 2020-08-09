import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Collapse, Box } from '@material-ui/core'
import { Alert as AlertBase } from '@material-ui/lab'

const Notification = props => {
  const items = useSelector(state => state.notification)

  return (
    <Container>
      {items.map((item, index) => (
        <Collapse in={item.open} key={index} timeout={700}>
          <Box mb={1}>
            <Alert>
              {item.message}
            </Alert>
          </Box>
        </Collapse>
      ))}
    </Container>
  )
}

const Container = styled.section`
  position: fixed;
  z-index: 11;
  bottom: 40px;
  left: 40px;
  width: 100%;
  max-width: 300px;
  transition: all 1s;
`

const Alert = styled(AlertBase)`
  color: #fff!important;
  background-color: rgb(52 131 250)!important;
`
export default Notification
