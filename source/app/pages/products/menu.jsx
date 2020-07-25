import React from 'react'
// import styled from 'styled-components'
import { Box, Typography } from '@material-ui/core'
import { object, func } from 'prop-types'
import { menu } from '../../constants'
import styled from 'styled-components'
import useHeightHeader from 'hooks/useHeightHeader'

const Content = styled.aside`
  position: sticky;
  top: 0px;
  max-height: ${props => 'calc(100vh - ' + props.$headerHeight + 'px)'};
  overflow-y: scroll;
  &:hover {
    ::-webkit-scrollbar {
    display: initial;
  }
  }
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    display: none;
  }

  ::-webkit-scrollbar:vertical {
    width: 8px;
  }

  ::-webkit-scrollbar:horizontal {
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #cdcdcd;
    border-radius: 10px;
  }
`

const Menu = props => {
  const top = useHeightHeader()

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
    <Content style={{ top }} $headerHeight={top}>
      {menu.map((section, index) => (
        <Box key={index} p={1}>
          <Box onClick={event => setSection(section)}>
            <Typography variant='subtitle1'>{section.label}</Typography>
          </Box>
          {((props.filters.category === section.value && section.keyname === 'category') || (props.filters.gender === section.value && section.keyname === 'gender')) && (
            <Box>
              {section.filters.map((subSection, index) => (
                <Box p={1} key={index} onClick={event => setSubSection(section, subSection)}>
                  <Typography varian='subtitle2'>{subSection.label}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Content>
  )
}

Menu.propTypes = {
  filters: object,
  setStrictFilters: func
}

export default Menu
