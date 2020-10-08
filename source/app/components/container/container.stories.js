import Container from './index'
import React from 'react'

export default {
  component: Container,
  title: 'components/Container'
}

const Template = (args) => <Container {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'hello world'
}
