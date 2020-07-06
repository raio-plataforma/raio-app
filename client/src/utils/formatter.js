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

const getState = (codeUF, stateList) => stateList.filter(uf => uf.id === codeUF)[0].abbr

const checkSegments = segment => {
  const segments = Object.keys(segment[0])
  const values = Object.values(segment[0])
  if (values.every(el => el === false))
    return ["Nenhum"]

  return segments.filter((v, i) => segment[0][v] && segments[i])
}

function getKeys (obj) {
  console.log(obj)
  var keys = Object.keys(obj);

  var filtered = keys.filter(key => obj[key]);
  return filtered.join(', ')
}

const normalizeArrayData = data => {
  return data ?
    getKeys(data).split(', ').filter(item => item !== "") :
    []
}
export {
  getState,
  getKeys,
  parseDate,
  dateToString,
  checkSegments,
  normalizeArrayData,
}
