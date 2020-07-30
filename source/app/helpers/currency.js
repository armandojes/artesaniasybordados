export const toPrice = number => {
  const formated = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `$ ${formated}.00`
}

export default {
  toPrice
}
