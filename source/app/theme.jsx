import React from 'react'
import { createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles'
import { oneOfType, array, object, element, node } from 'prop-types'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#9767CB'
    },
    secondary: {
      main: '#2b0028'
    }
  }
})

const themeResponsive = responsiveFontSizes(theme)

const MaterialUIThemeProvider = props => (
  <ThemeProvider theme={themeResponsive}>
    {props.children}
  </ThemeProvider>
)

MaterialUIThemeProvider.propTypes = {
  children: oneOfType([array, object, element, node])
}

export default MaterialUIThemeProvider
