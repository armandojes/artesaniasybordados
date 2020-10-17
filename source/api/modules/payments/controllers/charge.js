import fiserv from 'models/fiserv'

const charge = async (request, response) => {
  const secureData = {
    total: request.body.total,
    cardNumber: request.body.cardNumber,
    cardCode: request.body.cardCode,
    cardMonth: request.body.cardMonth,
    cardYear: request.body.cardYear
  }

  const status = await fiserv.pay(secureData)

  if (status.transactionStatus === 'APPROVED') {
    response.json({
      status: 'success',
      orderId: status.orderId
    })
    response.end()
  }

  if (status.error) {
    response.json({
      status: 'error',
      errorMessage: status.error.message
    })
    return response.end()
  }

  response.json({
    status: 'error',
    errorMessage: status.processor.responseMessage
  })
  response.end()
}

export default charge
