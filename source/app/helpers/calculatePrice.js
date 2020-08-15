const sumPrice = items => {
  const price = items.reduce((acumulator, currentItem) => {
    console.log('parseInt(currentItem.price', parseInt(currentItem.quantity))
    return acumulator + (parseInt(currentItem.price) * parseInt(currentItem.quantity))
  }, 0)
  return price
}

export const transformPrice = (basePrice = 0, type = 'client') => {
  const porcentReseller = 50
  const porcentClient = 100
  const applyPorcent = type === 'reseller' ? porcentReseller : porcentClient

  return parseInt(basePrice) + ((parseInt(basePrice) * applyPorcent) / 100)
}

export default sumPrice
