import fiserv from 'models/fiserv'

const charge = async (request, response) => {
  console.log('request recived--------------------------------')

  const status = await fiserv.pay({}, '0904fbfe-10af-11eb-adc1-0242ac120007')
  console.log(status)
  response.json(status)
  response.end()
}

export default charge
