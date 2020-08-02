import { paypal } from '../config'

const markup = (html, states, materialCss, styledCss) => {
  console.log('env', ENV)

  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <style id="jss-server-side">${materialCss}</style>
        <script src="https://www.paypal.com/sdk/js?client-id=${paypal.token}&currency=MXN&components=marks,buttons&disable-funding=credit,card"></script>
        ${styledCss}
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="stylesheet" href="${publicPath}/styles.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
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
