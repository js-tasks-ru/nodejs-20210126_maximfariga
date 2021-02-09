const fs = require('fs');
const path = require('path');
const createFile = require('./createFile')

const ROOT = __dirname + '/files'

module.exports = (filePath, res, req) => {
  try {
    filePath = decodeURIComponent(filePath)
  } catch (e) {
    res.statusCode = 400;
    res.end('Bad Request');
    return
  }

  if (filePath.indexOf('/') !== -1) {
    res.statusCode = 400;
    res.end('Bad Request');
    return
  }

  filePath = path.normalize(path.join(ROOT, filePath));

  fs.stat(filePath, (err, stats) => {
    if (!err) {
      res.statusCode = 409;
      res.end('File already exists');
      return
    }

    createFile(filePath, res, req);
  })
}
