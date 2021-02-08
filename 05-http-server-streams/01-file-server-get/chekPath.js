const fs = require('fs');
const path = require('path');
const sendFile = require('./sendFile')

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

  if (~filePath.indexOf('\0')) {
    res.statusCode = 400;
    res.end('Bad Request');
    return
  }

  filePath = path.normalize(path.join(ROOT, filePath));

  if (filePath.indexOf(ROOT) != 0) {
    res.statusCode = 404;
    res.end('File not found');
    return
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.end('File not found');
      return
    }

    sendFile(filePath, res, req);
  })
}
