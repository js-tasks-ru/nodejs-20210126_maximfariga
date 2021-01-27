const isNumber = (value) => typeof value === 'number';

function sum(...rest) {
  if (rest.length < 2) {
    throw new SyntaxError('Недостаточно аргументов')
  }

  const filteredArg = rest.slice(0, 2)

  filteredArg.forEach(item => {
    if (!isNumber(item)) {
      throw new TypeError(`${item} не число`)
    }
  })
  
  return filteredArg.reduce((sum, item) => sum + item, 0)
}

module.exports = sum;
