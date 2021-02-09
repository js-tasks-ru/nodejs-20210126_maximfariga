const fs = require('fs');

module.exports = (filePath, res) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      res.statusCode = 500;
      res.end('Something went wrong');
      return;
    }

    res.statusCode = 200;
    res.end();
  })
}
