/* eslint-disable quote-props */
import crypto from 'crypto-js'
import axios from 'axios'
import { fiServe } from '../../config'

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

export const pay = async (_data, uuid) => {
  const data = {
    'transactionAmount': {
      'total': '100.00',
      'currency': 'MXN'
    },
    'requestType': 'PaymentCardSaleTransaction',
    'paymentMethod': {
      'paymentCard': {
        'number': '5204730000001004',
        'securityCode': '200',
        'expiryDate': {
          'month': '02',
          'year': '23'
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
