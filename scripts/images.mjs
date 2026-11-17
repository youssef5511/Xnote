import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { products, bundle } from '../src/products.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const out = join(root, 'assets/img');
mkdirSync(join(out, 'products'), { recursive: true });

function magick(args) {
  execFileSync('magick', args, { stdio: 'inherit' });
}

function productImages(source, slug) {
  const src = join(root, source);
  if (!existsSync(src)) throw new Error('Missing image: ' + source);
  for (const width of [320, 480, 720, 960]) {
    magick([
      src,
      '-resize',
      `${width}x${width * 1.25}^`,
      '-gravity',
      'center',
      '-extent',
      `${width}x${width * 1.25}`,
      '-strip',
      '-quality',
      '72',
      '-define',
      'webp:method=6',
      join(out, 'products', `${slug}-${width}.webp`),
    ]);
    magick([
      src,
      '-resize',
      `${width}x${width * 1.25}^`,
      '-gravity',
      'center',
      '-extent',
      `${width}x${width * 1.25}`,
      '-strip',
      '-quality',
      '50',
      join(out, 'products', `${slug}-${width}.avif`),
    ]);
  }
  magick([
    src,
    '-resize',
    '1200x630',
    '-background',
    '#0e0d0c',
    '-gravity',
    'center',
    '-extent',
    '1200x630',
    '-strip',
    '-quality',
    '80',
    join(out, 'products', `${slug}-share.jpg`),
  ]);
}

for (const p of products) productImages(p.source, p.slug);
productImages(bundle.source, bundle.slug);

const hero = join(root, bundle.source);
for (const width of [768, 1536]) {
  magick([
    hero,
    '-resize',
    `${width}x`,
    '-strip',
    '-quality',
    '72',
    '-define',
    'webp:method=6',
    join(out, `hero-${width}.webp`),
  ]);
  magick([hero, '-resize', `${width}x`, '-strip', '-quality', '50', join(out, `hero-${width}.avif`)]);
}
magick([
  hero,
  '-resize',
  '1200x630^',
  '-gravity',
  'center',
  '-extent',
  '1200x630',
  '-strip',
  '-quality',
  '82',
  join(out, 'share.jpg'),
]);

const logo = join(root, 'assets/brand/logo.png');
magick([logo, '-trim', '+repage', '-resize', 'x96', '-strip', '-quality', '90', join(out, 'logo.webp')]);
for (const [size, name] of [
  [32, 'favicon-32.png'],
  [180, 'apple-touch-icon.png'],
  [512, 'icon-512.png'],
]) {
  const inner = Math.round(size * 0.72);
  magick([
    '-size',
    `${size}x${size}`,
    'xc:#241C17',
    '(',
    logo,
    '-trim',
    '+repage',
    '-resize',
    `${inner}x${inner}`,
    ')',
    '-gravity',
    'center',
    '-composite',
    '-strip',
    join(out, name),
  ]);
}
magick([join(out, 'favicon-32.png'), '-define', 'icon:auto-resize=32,16', join(root, 'favicon.ico')]);
console.log('Images written to assets/img');
