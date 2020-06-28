import React from 'react'
import { createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles'
import { oneOfType, array, object, element, node } from 'prop-types'

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff385c'
    },
    secondary: {
      main: '#3483fa'
    }
  }
})

theme = responsiveFontSizes(theme)

const MaterialUIThemeProvider = props => (
  <ThemeProvider theme={theme}>
    {props.children}
  </ThemeProvider>
)

MaterialUIThemeProvider.propTypes = {
  children: oneOfType([array, object, element, node])
}

export default MaterialUIThemeProvider
