export const secret = '' // secret for security
export const isProduction = ENV === 'production'

const firebaseConfigProduction = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: ''
}
const firebaseConfigDevelop = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: ''
}

export const domains = {
  production: '' // url production project
}

export const firebaseConfig = isProduction ? firebaseConfigProduction : firebaseConfigDevelop

export const paypal = {
  token: '',
  prodToken: ''
}

export const mercadopago = {
  PublicKey: ''
}

export const fiServe = {
  apiKey: '',
  apiSecret: '',
  url: ''
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
