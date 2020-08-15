export const categories = {
  ropa: 'ropa',
  calzado: 'Calzado',
  accesorio: 'Accesorio'
}

export const subCategories = {
  reboso: 'Reboso',
  mananita: 'Mañanita',
  chalina: 'Chalina',
  faja: 'Faja'
}

export const genders = {
  male: 'Hombre',
  female: 'Mujer',
  boy: 'Niño',
  girl: 'Niña'
}

export const menu = [
  {
    label: 'Mujeres',
    keyname: 'gender',
    value: 'female',
    filters: [
      { label: 'Reboso', value: 'reboso', keyname: 'subcategory' },
      { label: 'Mañanitas', value: 'mananita', keyname: 'subcategory' },
      { label: 'Chalinas', value: 'chalina', keyname: 'subcategory' },
      { label: 'Fajas', value: 'faja', keyname: 'subcategory' }
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
