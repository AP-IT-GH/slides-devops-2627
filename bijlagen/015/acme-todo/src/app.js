const http = require('node:http');

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function send(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function createApp(store) {
  return http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');

    if (url.pathname !== '/api/todos') {
      return send(res, 404, { error: 'niet gevonden' });
    }
    if (req.method === 'GET') {
      return send(res, 200, store.list());
    }
    if (req.method === 'POST') {
      try {
        return send(res, 201, store.add(await readJson(req)));
      } catch {
        return send(res, 400, { error: 'ongeldige JSON' });
      }
    }
    return send(res, 405, { error: 'methode niet toegelaten' });
  });
}

module.exports = { createApp };
