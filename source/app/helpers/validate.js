export const requires = (state, requires) => {
  const emptyInputs = requires.filter(name => !state[name])
  return emptyInputs.length ? emptyInputs : false
}

export const filterObject = (object, allows) => {
  const scoppedObject = { ...object }
  Object.keys(scoppedObject).forEach(keyname => {
    if (!allows.includes(keyname)) delete scoppedObject[keyname]
  })
  return scoppedObject
}
