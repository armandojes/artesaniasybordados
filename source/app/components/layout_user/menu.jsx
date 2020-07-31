import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { menu } from '../../constants'
import styled from 'styled-components'
import useHeightHeader from 'hooks/useHeightHeader'
import { useHistory, useLocation } from 'react-router'

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
  const history = useHistory()
  const { state = {} } = useLocation()

  const setSection = data => {
    console.log(props)
    history.replace({ pathname: '/articulos', state: { [data.keyname]: data.value } })
  }

  const setSubSection = (section, subSection) => {
    history.replace({
      pathname: '/articulos',
      state: {
        [section.keyname]: section.value,
        [subSection.keyname]: subSection.value
      }
    })
  }

  return (
    <Content style={{ top }} $headerHeight={top}>
      {menu.map((section, index) => (
        <Box key={index} p={1} style={{ cursor: 'pointer' }}>
          <Box onClick={event => setSection(section)}>
            <Typography variant='subtitle1'>{section.label}</Typography>
          </Box>
          {((state.category === section.value && section.keyname === 'category') || (state.gender === section.value && section.keyname === 'gender')) && (
            <Box>
              {section.filters.map((subSection, index) => (
                <Box p={1} style={{ cursor: 'pointer' }} key={index} onClick={event => setSubSection(section, subSection)}>
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

export default Menu
