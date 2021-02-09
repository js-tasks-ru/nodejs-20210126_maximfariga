const fs = require('fs');
const LimitSizeStream = require('./LimitSizeStream')

const FILE_LIMIT = 1048576; // Bytes



const removeFile = (filePath) => {
  fs.unlink(filePath, () => {})
}

module.exports = (filePath, res, req) => {
  const limitedStream = new LimitSizeStream({ limit: FILE_LIMIT });

  const writeStream = fs.createWriteStream(filePath);

  req.on('aborted', () => {
    writeStream.destroy();
    removeFile(filePath);
  })

  limitedStream.on('error', () => {
    limitedStream.destroy();
    writeStream.destroy();

    removeFile(filePath);
    res.statusCode = 413;
    res.end('File size is too big. Limit if 1Mb');
  })

  writeStream.on('error', (err) => {
    limitedStream.destroy();
    writeStream.destroy();
    res.statusCode = 500;
    res.end();
  })

  req.pipe(limitedStream).pipe(writeStream)

  writeStream.on('finish', () => {
    res.statusCode = 201;
    res.end('File was created');
  })
}
