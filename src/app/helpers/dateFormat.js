import { format } from 'date-fns'

const dateOnlyFormat = (date) => {
  const dateOnly = format(new Date(date), 'dd/MM/yyy')
  return dateOnly
}

const hourMinFormat = (date) => {
  const hours = format(new Date(date), 'HH:mm')
  return hours
}

const dateTimeFormat = (date) => {
  const dateTime = format(new Date(date), 'dd/MM/yyyy HH:mm')
  return dateTime
}

export default {
  dateOnlyFormat,
  hourMinFormat,
  dateTimeFormat,
}
