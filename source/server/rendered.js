// import React from 'react'
// import { renderToStringAsync } from 'react-fetch-ssr'
import markup from './markup'
// import { StaticRouter } from 'react-router'
// import App from '../app/app'
import { ServerStyleSheets } from '@material-ui/core/styles'
import { ServerStyleSheet } from 'styled-components'

const rendered = async (request, response) => {
  // const context = {}
  const materialUiCssColector = new ServerStyleSheets()
  const styledColector = new ServerStyleSheet()

  // const { content: html, states } = await renderToStringAsync(materialUiCssColector.collect(styledColector.collectStyles(
  //   <StaticRouter location={request.url} context={context}>
  //     <App />
  //   </StaticRouter>
  // )))

  const Materialcss = materialUiCssColector.toString()
  const styledCss = styledColector.getStyleTags()
  styledColector.seal()

  const fullHtml = markup('', [], Materialcss, styledCss)
  response.send(fullHtml)
  response.end()
}

export default rendered
