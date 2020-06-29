import React from 'react'
import TextFiled from 'components/inputs/group'
import { object, func } from 'prop-types'
const Description = props => (

  <TextFiled
    multiline
    rows={25}
    state={props.state}
    setState={props.setState}
    name='description'
  />
)

Description.propTypes = {
  state: object,
  setState: func
}

export default Description
