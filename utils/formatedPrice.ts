function formatedPrice(price: number): string {
  const newPrice = new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'USD',
    currencySign: 'accounting'
  })
    .format(price)
    .replace('.00', '')

  return newPrice
}

export default formatedPrice
