const { Transform } = require('stream');
const LimitExceededError = require('./LimitExceededError');
const { isNumber, isInteger } = require('./numberUtils');

class LimitSizeStream extends Transform {
  constructor({ limit, ...rest } = {}) {
    super(rest);

    this.length = 0;

    this._checkLimit(limit);
  }

  _checkLimit (limit) {
    if (!isNumber(limit)) {
      this.limit = null
      return
    }

    if (!isInteger(limit)) {
      throw new Error('Limit must be integer value')
    }

    if (limit <= 0) {
      throw new Error('Limit must greater than 0')
    }

    this.limit = limit
  }

  _transform(chunk, encoding, callback) {
    this.length += Buffer.byteLength(chunk);

    if (this.limit && this.length > this.limit) {
      return callback(new LimitExceededError())
    } else {
      callback(null, chunk)
    }
  }
}

module.exports = LimitSizeStream;
