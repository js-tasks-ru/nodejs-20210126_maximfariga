const { Transform } = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends Transform {
  constructor(options) {
    super(options);

    this.limit = options.limit || null;
    this.length = 0;
  }

  _transform(chunk, encoding, callback) {
    this.length += Buffer.byteLength(chunk);

    if (this.length > this.limit) {
      return callback(new LimitExceededError())
    } else {
      callback(null, chunk)
    }
  }
}

module.exports = LimitSizeStream;
