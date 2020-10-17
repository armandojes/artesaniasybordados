/* eslint-disable quote-props */
import crypto from 'crypto-js'
import axios from 'axios'
import { fiServe } from '../../config'
import { v4 } from 'uuid'

const axiosWrapper = async (data) => {
  try {
    const response = await axios(data)
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const createMessageSignature = (apiKey, uuid, time, payload = '') => {
  console.log('payloadSignatureMessage', payload)
  const content = `${apiKey}${uuid}${time}${payload}`
  const signature = crypto.HmacSHA256(content, fiServe.apiSecret).toString(crypto.enc.Base64)
  return signature
}

export const pay = async (params) => {
  const uuid = v4()
  const data = {
    'transactionAmount': {
      'total': params.total,
      'currency': 'MXN'
    },
    'requestType': 'PaymentCardSaleTransaction',
    'paymentMethod': {
      'paymentCard': {
        'number': params.cardNumber,
        'securityCode': params.cardCode,
        'expiryDate': {
          'month': params.cardMonth,
          'year': params.cardYear
        }
      }
    }
  }

  const _time = Date.now()

  const response = await axiosWrapper({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Client-Request-Id': uuid,
      'Api-Key': fiServe.apiKey,
      'Timestamp': _time,
      'Message-Signature': createMessageSignature(fiServe.apiKey, uuid, _time, JSON.stringify(data))
    },
    url: `${fiServe.url}/payments`,
    data
  })

  return response
}

export default {
  pay
}
