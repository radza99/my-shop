const priceFormatter = new Intl.NumberFormat('th-TH')

export function formatPrice(value) {
  return `฿${priceFormatter.format(value)}`
}

const dateFormatter = new Intl.DateTimeFormat('th-TH', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

export function formatDate(value) {
  return dateFormatter.format(value)
}
