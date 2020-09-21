const shippingCostCalculator = Items => {
  var totalWeightKG = 0
  Items.forEach(currentItem => { totalWeightKG = totalWeightKG + (currentItem.weight * currentItem.quantity) })
  console.log('GR', totalWeightKG)
  totalWeightKG = Math.ceil(totalWeightKG / 1000)

  console.log('KG', totalWeightKG)

  if (totalWeightKG <= 1) {
    return 155
  }

  if (totalWeightKG <= 2) {
    return 174
  }

  if (totalWeightKG <= 5) {
    return 200
  }

  if (totalWeightKG <= 7) {
    return 210
  }

  if (totalWeightKG <= 10) {
    return 270
  }

  if (totalWeightKG <= 15) {
    return 363
  }

  if (totalWeightKG <= 20) {
    return 406
  }

  if (totalWeightKG <= 25) {
    return 461
  }

  if (totalWeightKG <= 30) {
    return 464
  }

  return 500
}

export default shippingCostCalculator
