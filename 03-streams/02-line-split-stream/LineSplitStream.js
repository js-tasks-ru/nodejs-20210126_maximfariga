const { Transform } = require('stream');
const { EOL } = require('os');

class LineSplitStream extends Transform {
  constructor(options) {
    super(options);

    this.word = '';
  }

  _transform(chunk, encoding, callback) {
    const str = chunk.toString()

    for (const letter of str) {
      if (letter === EOL) {
        this.push(this.word)
        this.word = ''
      } else {
        this.word += letter
      }
    }

    callback()
  }

  _flush(callback) {
    if (this.word.length) {
      callback(null, this.word)
    } else {
      callback()
    }
  }
}

module.exports = LineSplitStream;
