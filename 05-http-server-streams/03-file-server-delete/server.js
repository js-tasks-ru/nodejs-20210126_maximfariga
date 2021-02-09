const { URL } = require('url');
const { Server } = require('http');
const checkConditions = require('./checkConditions')

const server = new Server();

server.on('request', (req, res) => {
  const baseURL = `${req.protocol || 'http://'}${req.headers.host}`
  const pathname = new URL(req.url, baseURL).pathname.slice(1);

  switch (req.method) {
    case 'DELETE':
      if (pathname.length) {
        checkConditions(pathname, res, req)
      }

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
