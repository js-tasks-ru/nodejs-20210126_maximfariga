const { URL } = require('url');
const http = require('http');
const checkPath = require('./chekPath');

const server = new http.Server();

server.on('request', (req, res) => {
  const baseURL = `${req.protocol || 'http://'}${req.headers.host}`
  const pathname = new URL(req.url, baseURL).pathname.slice(1);

  switch (req.method) {
    case 'GET':
      if (pathname.length) {
        checkPath(pathname, res, req);
      }

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
