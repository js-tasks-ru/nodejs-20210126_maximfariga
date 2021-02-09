const fs = require('fs');
const path = require('path');
const deleteFile = require('./deleteFile')

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
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.end('File doesn\'t exist');
      return
    }

    deleteFile(filePath, res);
  })
}
