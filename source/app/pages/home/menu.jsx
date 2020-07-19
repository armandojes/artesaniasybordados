import React from 'react'
// import styled from 'styled-components'
import { Box, Typography } from '@material-ui/core'
import { object, func } from 'prop-types'
import { menu } from '../../constants'

const Menu = props => {
  const setSection = data => {
    console.log(props)
    props.setStrictFilters({ [data.keyname]: data.value })
  }

  const setSubSection = (section, subSection) => {
    props.setStrictFilters({
      [section.keyname]: section.value,
      [subSection.keyname]: subSection.value
    })
  }

  return (
    <Box>
      {menu.map((section, index) => (
        <Box key={index} p={2}>
          <Box onClick={event => setSection(section)}>
            <Typography variant='subtitle1'>{section.label}</Typography>
          </Box>
          {((props.filters.category === section.value && section.keyname === 'category') || (props.filters.gender === section.value && section.keyname === 'gender')) && (
            <Box>
              {section.filters.map((subSection, index) => (
                <Box key={index} onClick={event => setSubSection(section, subSection)}>
                  <Typography varian='subtitle2'>{subSection.label}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  )
}

Menu.propTypes = {
  filters: object,
  setStrictFilters: func
}

export default Menu
