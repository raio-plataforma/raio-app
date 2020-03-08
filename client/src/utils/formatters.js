const getCheckboxes = (group) => {
  const keys = Object.keys(group);

  const filtered = keys.filter(function(key) {
      return group[key]
  });

  return filtered.join(', ')
}

export {
  getCheckboxes
}