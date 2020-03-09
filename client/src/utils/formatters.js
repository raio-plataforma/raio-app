const getCheckboxes = (group) => {
  const keys = Object.keys(group);

  const filtered = keys.filter(function(key) {
      return group[key]
  });

  return filtered.join(', ')
}

const parseDate = date => {
  const day = date.substring(8, 10)
  const month = date.substring(5, 7) 
  const year = date.substring(0, 4)

  return `${day}/${month}/${year}`
}

export {
  getCheckboxes,
  parseDate
}