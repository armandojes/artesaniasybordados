export const categories = {
  ropa: 'ropa',
  calzado: 'Calzado',
  accesorio: 'Accesorio',
  pottery: 'Alfarería',
  design: 'Diseños únicos y personalizados'
}

export const subCategories = {
  blouse: 'Blusa',
  dress: 'Vestido',
  jacket: 'Chamarra',
  shawl: 'Rebozo',
  bag: 'Bolsa',
  none: 'Ningúno'
}

export const genders = {
  male: 'Hombre',
  female: 'Mujer',
  boy: 'Niño',
  girl: 'Niña',
  none: 'Ningúno'
}

export const menu = [
  {
    label: 'Mujeres',
    keyname: 'gender',
    value: 'female',
    filters: [
      { label: 'Blusas', value: 'blouse', keyname: 'subcategory' },
      { label: 'Vestidos', value: 'dress', keyname: 'subcategory' },
      { label: 'Chamarras', value: 'jacket', keyname: 'subcategory' },
      { label: 'Rebozos', value: 'shawl', keyname: 'subcategory' },
      { label: 'Bolsas', value: 'bag', keyname: 'subcategory' }
    ]
  },
  {
    label: 'hombres',
    keyname: 'gender',
    value: 'male',
    filters: []
  },
  {
    label: 'Calzado',
    keyname: 'category',
    value: 'calzado',
    filters: []
  },
  {
    label: 'Accesorios',
    keyname: 'category',
    value: 'accesorio',
    filters: []
  },
  {
    label: 'Alfarería',
    keyname: 'category',
    value: 'pottery',
    filters: []
  },
  {
    label: 'Diseños unicos y personalizados',
    keyname: 'category',
    value: 'design',
    filters: []
  }
]

export const methodsPay = {
  paypal: 'Paypal',
  cash: 'Deposito en efectivo, bancos y oxxo'
}

export const status = {
  pending: 'Pago pendiente',
  payed: 'Pagado',
  sent: 'En camino',
  delivered: 'Entregado'
}

export const statusColors = {
  pending: 'orange',
  payed: '#cddc39',
  sent: '#2196f3',
  delivered: 'green'
}

export const companiesSending = {
  estafeta: 'Estafeta',
  dhl: 'DHL'
}

export const fakeCheckoutData = {
  city: 'san cristobal de las casas',
  email: 'armando@gmail.com',
  errorMessage: null,
  errors: [],
  lastname: 'santiz lopez',
  name: 'armando de jesus',
  number: '6565564556',
  postal_code: '29247',
  references: 'puerta negra ',
  state: 'chiapas',
  street_number: 'lazaro cardenas numero 7',
  suburb: 'la frontera'
}
