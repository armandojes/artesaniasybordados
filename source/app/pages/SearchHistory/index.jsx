import { Box, Grid } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import Container from 'components/container'
import LayoutUser from 'components/layout_user'
import React from 'react'
import styled from 'styled-components'

const SearchStyled = styled(Search)`
  font-size: 80px!important;
  color: #d891ef73!important;
`

const SearchHistory = props => {
  return (
    <LayoutUser>
      <Container>
        <Grid container justify='center' alignItems='center' style={{ minHeight: '90vh' }}>
          <Box width='100%'>
            <Grid container alignItems='center' justify='center'>
              <SearchStyled />
            </Grid>
          </Box>
        </Grid>
      </Container>
    </LayoutUser>
  )
}

export default SearchHistory
