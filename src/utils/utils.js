export const getDict = str => {
  const arr = []
    
  JSON.parse(localStorage.getItem('dict'))[str].map(e => {
    arr.push({
      title: e.dictLabel,
      value: Number(e.dictValue),
    })
  })
  
  return arr
}

export const getDictStr = str => {
  const arr = []
    
  JSON.parse(localStorage.getItem('dict'))[str].map(e => {
    arr.push({
      title: e.dictLabel,
      value: e.dictValue,
    })
  })
  
  return arr
}

export const getDictObj = str => {
  const arr = {}

  JSON.parse(localStorage.getItem('dict'))[str].forEach(e => {
    arr[e.dictValue] = e.dictLabel
  })
  
  return arr
}
