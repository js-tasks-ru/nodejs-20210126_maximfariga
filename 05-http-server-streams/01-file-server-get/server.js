const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'GET':
      const stream = fs.createReadStream('video.mp4');

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

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

function checkPath() {

}

const ROOT = __dirname + '/public'

function sendFileSave (filePath, res) {
  try {
    filePath = decodeURIComponent(filePath)
  } catch (e) {
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

  if (filePath.inexOf(ROOT) != 0) {
    res.statusCode = 404;
    res.end('File not found');
    return
  }

  fs.stat(filePath, function(err, stats) {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.end('File not found');
      return
    }

    sendFile(filePath, res);
  })
}

function sendFile (filePath, res) {
  fs.readFile(filePath, function(err, content) {
    if (err) throw err;

    const mime = require('mime').lookup(filePath); // npm i mime
    res.setHeader('Content-Type', mime + "; charset=utf-8");
    res.end(content);
  })
}

module.exports = server;
