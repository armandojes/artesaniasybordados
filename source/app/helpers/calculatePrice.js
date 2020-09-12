const sumPrice = items => {
  const price = items.reduce((acumulator, currentItem) => {
    console.log('parseInt(currentItem.price', parseInt(currentItem.quantity))
    return acumulator + (parseInt(currentItem.price) * parseInt(currentItem.quantity))
  }, 0)
  return price
}

export default sumPrice
