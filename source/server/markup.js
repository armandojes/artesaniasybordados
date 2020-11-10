import { paypal } from '../config'

const markup = (html, states, materialCss, styledCss) => {
  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <style id="jss-server-side">${materialCss}</style>
        <script src="https://www.paypal.com/sdk/js?client-id=${ENV === 'development' ? paypal.token : paypal.prodToken}&currency=MXN&components=marks,buttons&disable-funding=credit,card"></script>
        ${styledCss}
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Artesanias y bordados | Encuentra todo los que buscas en un solo lugar</title>
        <meta name="description" content="Trabajamos directo con fabricantes, envios naciones e internacionales, seguridad de principio a fin">
        <link rel="stylesheet" href="${publicPath}/styles.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link href="https://fonts.googleapis.com/css2?family=Baloo+Tamma+2:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Mali:ital,wght@0,600;1,700&display=swap" rel="stylesheet">
        <script src="https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js"></script>

        <meta property="og:url" content="https://artesaniasybordados.com.mx/" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Encuentra todo los que buscas en un solo lugar | Artesanias y Bordados" />
        <meta property="og:description" content="Envios nacionales e internacionales, trabajamos directo con fabricantes, seguridad de principio a fin" />
        <meta property="og:image" content="${publicPath}/landing.png" />

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

        <!-- Facebook Pixel Code -->
        <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '990339921371649');
        fbq('track', 'PageView');
        </script>
        <noscript><img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=990339921371649&ev=PageView&noscript=1"
        /></noscript>
        <!-- End Facebook Pixel Code -->

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
