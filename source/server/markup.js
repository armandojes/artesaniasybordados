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

        <link rel="apple-touch-icon" sizes="57x57" href="${publicPath}/apple-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="${publicPath}/apple-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="${publicPath}/apple-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="${publicPath}/apple-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="${publicPath}/apple-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="${publicPath}/apple-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="${publicPath}/apple-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="${publicPath}/apple-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="${publicPath}/apple-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192"  href="${publicPath}/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="${publicPath}-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="${publicPath}-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="${publicPath}-16x16.png">
        <link rel="manifest" href="/manifest.json">
        <meta name="msapplication-TileColor" content="#ffffff">
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
        <meta name="theme-color" content="#ffffff">

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
