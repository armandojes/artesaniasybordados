export const secret = 'helloforyou'
export const isProduction = ENV === 'production'

const firebaseConfigProduction = {
  apiKey: 'AIzaSyAnYHA114ubzMjUDND3V5J852bfM1cPmUY',
  authDomain: 'arts-bfab3.firebaseapp.com',
  databaseURL: 'https://arts-bfab3.firebaseio.com',
  projectId: 'arts-bfab3',
  storageBucket: 'arts-bfab3.appspot.com',
  messagingSenderId: '804609683943',
  appId: '1:804609683943:web:893f59b6de6d63e7c40d42'
}
const firebaseConfigDevelop = {
  apiKey: 'AIzaSyCKNcHonL_1Wv-feCa6Uaviop8BQJgW5JE',
  authDomain: 'artesaniasybordados-develop.firebaseapp.com',
  databaseURL: 'https://artesaniasybordados-develop.firebaseio.com',
  projectId: 'artesaniasybordados-develop',
  storageBucket: 'artesaniasybordados-develop.appspot.com',
  messagingSenderId: '25365981751',
  appId: '1:25365981751:web:f21bc8972c40e7fd8fadb2'
}

export const domains = {
  production: 'https://artstest.vercel.app'
}

export const firebaseConfig = isProduction ? firebaseConfigProduction : firebaseConfigDevelop

export const paypal = {
  token: 'AaSWKyX_04IYi1ka8A_Qxr-xddBNxbn_K0fzZukxjYHN1BR01dv6wykgLV_zoBL16adglxM6ixmC2jps',
  prodToken: 'AQflwcCafKBrBiRwQFRPct8BESbYy4spJRt97pj47crYetM9kBkQHZjKZU-uvZFsl1hCmaVaNt5UpUfg'
}

export const mercadopago = {
  PublicKey: 'TEST-55009628-46e2-4102-ad7a-596b5922b9af'
}

export const fiServe = {
  apiKey: 'y8mlwZApi8UmtJPQGdOCiSmOwjDBnERA',
  apiSecret: 'rIoBSymVqIEQ2rzJ',
  url: 'https://cert.api.firstdata.com/gateway/v2'
}

export const limitPictures = 15
export const shippingPrice = 100

export default {
  secret,
  limitPictures,
  paypal,
  mercadopago
}

export const contact = {
  whatsapp: 9676809393,
  email: 'paulinasantiz490@gmail.com',
  number: 9676809393,
  facebookPage: 'https://facebook.com',
  instagram: 'https://instagram.com'
}
