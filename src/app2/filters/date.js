import fecha from 'fecha'

export default (value, format = 'YYYY-MM-DD') => {
  return value ? fecha.format(value, format) : ''
}
