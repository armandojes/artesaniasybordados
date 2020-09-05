import React from 'react'
import styled from 'styled-components'
import TextField from 'components/inputs/textfiled'
import { useHistory, useLocation } from 'react-router'
import debounce from 'helpers/debounce'
import queryString from 'query-string'

const TextFieldStyled = styled(TextField)`

`
const Searcher = props => {
  const history = useHistory()
  const location = useLocation()
  const { keywords = '' } = queryString.parse(location.search)

  console.log('searcherKeywords', keywords)

  const handleRedirect = debounce(function (value) {
    const destination = { pathname: '/articulos', search: `keywords=${value}` }
    keywords ? history.replace(destination) : history.push(destination)
  }, 1000)

  const handleChange = event => {
    handleRedirect(event.target.value)
  }

  return (
    <TextFieldStyled
      margin='none'
      size='small'
      placeholder='Buscar'
      color='secondary'
      focused
      defaultValue={keywords}
      onChange={handleChange}
    />
  )
}

export default Searcher
