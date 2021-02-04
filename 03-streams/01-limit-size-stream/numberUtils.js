const isNumber = (value) => isFinite(value) && isFinite(parseInt(value));
const isInteger = (value) => (value ^ 0) === value;

module.exports = {
  isNumber,
  isInteger
}