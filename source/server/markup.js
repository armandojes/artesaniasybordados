import { paypal } from '../config'

const markup = (html, states, materialCss, styledCss) => {
  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <style id="jss-server-side">${materialCss}</style>
        <script src="https://www.paypal.com/sdk/js?client-id=${paypal.token}&currency=MXN&components=marks,buttons&disable-funding=credit,card"></script>
        ${styledCss}
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Artesanias y bordados</title>
        <link rel="stylesheet" href="${publicPath}/styles.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link href="https://fonts.googleapis.com/css2?family=Baloo+Tamma+2:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Mali:ital,wght@0,600;1,700&display=swap" rel="stylesheet">
        <script src="https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js"></script>
      </head>
      <body>
        <div id="render_target">${html}</div>
        <script>${states}</script>
        <script src="${publicPath}/app.js"></script>
        
      </body>
    </html>
  `
}

export default markup
