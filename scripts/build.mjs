import { fileURLToPath } from 'node:url';
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { createHash } from 'node:crypto';
import { site } from '../src/site.mjs';
import { products, families, bundle } from '../src/products.mjs';
import {
  homePage,
  shopPage,
  productPage,
  offersPage,
  cartPage,
  wishlistPage,
  aboutPage,
  contactPage,
  notFoundPage,
  orderCheckPage,
  redirectPage,
  productPath,
  noteIndex,
  noteKey,
} from '../src/templates.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const src = (p) => join(root, 'src', p);

const keepUnits = (html) =>
  html.replace(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>)|(\d) (ml|EGP)\b/g, (m, block, d, unit) =>
    block ? block : `${d}&nbsp;${unit}`
  );

function write(path, content) {
  if (path.endsWith('.html')) content = keepUnits(content);
  const file = join(root, path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
}

function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};,>])\s*/g, '$1')
    .replace(/:\s+/g, ':')
    .replace(/;}/g, '}')
    .trim();
}

for (const dir of ['shop', 'perfumes', 'cart', 'wishlist', 'offers', 'about', 'contact', 'order-check']) {
  rmSync(join(root, dir), { recursive: true, force: true });
}

const css = minifyCss(readFileSync(src('styles.css'), 'utf8'));

const clientData = {
  currency: site.currency,
  whatsapp: site.whatsapp,
  shipping: site.shipping,
  bundle: { slug: bundle.slug, name: bundle.name, price: bundle.price, ml: bundle.ml },
  products: products.map((p) => ({
    slug: p.slug,
    name: p.name,
    sizes: p.sizes,
    accord: p.accord,
    notes: p.notes,
    familyName: families.find((f) => f.key === p.family).name,
    from: Math.min(...p.sizes.map((s) => s.price)),
  })),
  popularNotes: [
    ...new Set([
      ...noteIndex()
        .slice(0, 6)
        .map((n) => n.name),
      'Oud',
      'Rose',
      'Coffee',
    ]),
  ].map((name) => ({ name, key: noteKey(name) })),
};
const js = readFileSync(src('app.js'), 'utf8').replace('__DATA__', JSON.stringify(clientData));
write('assets/js/site.js', js);
const jsVersion = createHash('sha1').update(js).digest('hex').slice(0, 8);

const ctx = { css, jsVersion };

write('index.html', homePage(ctx));
write('shop/index.html', shopPage(ctx));
for (const f of families) write(`shop/${f.key}/index.html`, shopPage(ctx, f));
for (const p of products) write(`perfumes/${p.slug}/index.html`, productPage(ctx, p));
write('offers/index.html', offersPage(ctx));
write('cart/index.html', cartPage(ctx));
write('wishlist/index.html', wishlistPage(ctx));
write('about/index.html', aboutPage(ctx));
write('contact/index.html', contactPage(ctx));
write('404.html', notFoundPage(ctx));
write('order-check/index.html', orderCheckPage(ctx));

const moved = {
  'collection.html': '/shop/',
  'cart.html': '/cart/',
  'favourites.html': '/wishlist/',
  'offers.html': '/offers/',
  'about.html': '/about/',
  'contact.html': '/contact/',
};
for (const [from, to] of Object.entries(moved)) write(from, redirectPage(to));

const today = new Date().toISOString().slice(0, 10);
const urls = [
  { path: '/', priority: '1.0' },
  { path: '/shop/', priority: '0.9' },
  ...families.map((f) => ({ path: `/shop/${f.key}/`, priority: '0.8' })),
  ...products.map((p) => ({ path: productPath(p), priority: '0.8' })),
  { path: '/offers/', priority: '0.7' },
  { path: '/about/', priority: '0.5' },
  { path: '/contact/', priority: '0.5' },
];
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${site.url}${u.path}</loc><lastmod>${today}</lastmod><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>
`
);
write(
  'robots.txt',
  `User-agent: *
Allow: /
Disallow: /cart/
Disallow: /wishlist/
Disallow: /order-check/

Sitemap: ${site.url}/sitemap.xml
`
);
write(
  'site.webmanifest',
  JSON.stringify(
    {
      name: 'X Note',
      short_name: 'X Note',
      start_url: '/',
      display: 'browser',
      background_color: '#f3f4f1',
      theme_color: '#f3f4f1',
      icons: [
        { src: '/assets/img/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        { src: '/assets/img/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2
  ) + '\n'
);
write('.nojekyll', '');

console.log(`Built ${urls.length + 4} pages`);
