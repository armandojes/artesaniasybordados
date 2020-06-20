const markup = (html, states, materialCss, styledCss) => {
  console.log('env', ENV)

  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <style id="jss-server-side">${materialCss}</style>
        ${styledCss}
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="stylesheet" href="${publicPath}/styles.css">
      </head>
      <body>
        <div id="render_target">${html}</div>
      </body>
      <script>${states}</script>
      <script src="${publicPath}/app.js"></script>
    </html>
  `
}

export default markup
