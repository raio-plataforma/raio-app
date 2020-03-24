const parseDate = date => {
  const day = date.substring(8, 10)
  const month = date.substring(5, 7) 
  const year = date.substring(0, 4)

  return `${day}/${month}/${year}`
}

const dateToString = date => {
  const day = date.substring(0, 2)
  const month = date.substring(3, 5) 
  const year = date.substring(6, 10)

  return `${year}-${month}-${day}`
}

export {
  parseDate,
  dateToString
}
