function clone (obj) {
  let newObj
  if (Array.isArray(obj)) {
    newObj = []
    for (let i = obj.length - 1; i >= 0; i--) {
      newObj[i] = clone(obj[i])
    }
  } else if (typeof obj === 'object' && obj !== null) {
    newObj = {}
    for (item in obj) {
      newObj[item] = clone(obj[item])
    }
  } else {
    newObj = obj
  }
  return newObj
}
