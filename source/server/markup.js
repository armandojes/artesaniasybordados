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
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
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
