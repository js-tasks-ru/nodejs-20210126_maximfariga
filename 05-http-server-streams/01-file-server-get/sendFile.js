const fs = require('fs');

module.exports = (filePath, res, req) => {
  const stream = fs.createReadStream(filePath);

  stream.pipe(res);

  stream.on('error', (error) => {
    if (error.code === 'ENOENT') {
      res.statusCode = 404;
      res.end('File not found');
    } else {
      res.statusCode = 500;
      res.end('Something went wrong');
    }
  })

  req.on('aborted', () => stream.destroy())
}