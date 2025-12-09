const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const port = 3000;  // You can change this port to any other if needed
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const options = {
  key: fs.readFileSync('./certificates/server.key'),
  cert: fs.readFileSync('./certificates/server.cert')
};

app.prepare().then(() => {
  createServer(options, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on https://localhost:${port}`)
  });
});