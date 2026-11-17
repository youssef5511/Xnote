import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize, sep } from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const port = Number(process.env.PORT) || 8080;
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

createServer(async (req, res) => {
  let file;
  try {
    const url = new URL(req.url, 'http://localhost');
    file = normalize(join(root, decodeURIComponent(url.pathname)));
  } catch {
    res.writeHead(400);
    res.end();
    return;
  }
  if (file !== root && !file.startsWith(root.endsWith(sep) ? root : root + sep)) {
    res.writeHead(403);
    res.end();
    return;
  }
  const headers = {
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  };
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    const body = await readFile(file);
    res.writeHead(200, { ...headers, 'Content-Type': types[extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    const body = await readFile(join(root, '404.html'));
    res.writeHead(404, { ...headers, 'Content-Type': types['.html'] });
    res.end(body);
  }
}).listen(port, '127.0.0.1', () => console.log(`Preview at http://localhost:${port}`));
