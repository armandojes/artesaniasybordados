var mercadopago = require('mercadopago')
mercadopago.configure({
  access_token: 'TEST-8396803236714228-011504-d0b89cbbb2e6f19be1a8ed130959d73d__LA_LB__-240842411'
})

const charge = async (request, response) => {
  console.log(mercadopago)

  const preference = {
    items: [
      {
        title: 'Artesanias y bordados',
        unit_price: 100,
        quantity: 1
      }
    ]
  }
  const responseMercadoPago = await mercadopago.preferences.create(preference)
  console.log(responseMercadoPago)
  response.json({
    status: 'ok',
    id: responseMercadoPago.body.id,
    init_point: responseMercadoPago.body.init_point
  })
  response.end()
}

export default charge
