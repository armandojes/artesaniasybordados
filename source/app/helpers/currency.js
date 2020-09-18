export const toPrice = number => {
  try {
    const formated = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return `$ ${formated}.00`
  } catch (error) {
    console.error('toPriceError', error)
    return 0
  }
}

export default {
  toPrice
}
