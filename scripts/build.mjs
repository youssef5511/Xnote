import { fileURLToPath } from 'node:url';
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { createHash } from 'node:crypto';
import { site } from '../src/site.mjs';
import { products, families, bundle, notesAr } from '../src/products.mjs';
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
  locale,
  LANGS,
} from '../src/templates.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const src = (p) => join(root, 'src', p);

const keepUnits = (html) =>
  html.replace(
    /(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>)|(\d) (ml|EGP|مل|ج\.م)(?![\w\u0600-\u06ff])/g,
    (m, block, d, unit) => (block ? block : `${d}&nbsp;${unit}`)
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

for (const dir of [
  'shop',
  'perfumes',
  'cart',
  'wishlist',
  'offers',
  'about',
  'contact',
  'order-check',
  'ar',
]) {
  rmSync(join(root, dir), { recursive: true, force: true });
}

const css = minifyCss(readFileSync(src('styles.css'), 'utf8'));

const clientData = {
  currency: site.currency,
  currencyAr: site.currencyAr,
  whatsapp: site.whatsapp,
  shipping: site.shipping,
  payments: site.payments,
  bundle: { slug: bundle.slug, name: bundle.name, nameAr: bundle.nameAr, price: bundle.price, ml: bundle.ml },
  products: products.map((p) => {
    const fam = families.find((f) => f.key === p.family);
    return {
      slug: p.slug,
      name: p.name,
      nameAr: p.nameAr,
      sizes: p.sizes,
      accord: p.accord,
      accordAr: p.accordAr,
      notes: p.notes,
      notesAr: p.notes.map((n) => notesAr[n]),
      familyName: fam.name,
      familyNameAr: fam.nameAr,
      from: Math.min(...p.sizes.map((s) => s.price)),
    };
  }),
  popularNotes: [
    ...new Set([
      ...noteIndex()
        .slice(0, 6)
        .map((n) => n.name),
      'Oud',
      'Rose',
      'Coffee',
    ]),
  ].map((name) => ({ name, nameAr: notesAr[name], key: noteKey(name) })),
};
const js = readFileSync(src('app.js'), 'utf8').replace('__DATA__', JSON.stringify(clientData));
write('assets/js/site.js', js);
const jsVersion = createHash('sha1').update(js).digest('hex').slice(0, 8);

const ctx = { css, jsVersion };

let pageCount = 0;
for (const lang of LANGS) {
  const L = locale(lang);
  const out = (path, html) => {
    write((L.ar ? 'ar/' : '') + path, html);
    pageCount++;
  };
  out('index.html', homePage(ctx, L));
  out('shop/index.html', shopPage(ctx, L));
  for (const f of families) out(`shop/${f.key}/index.html`, shopPage(ctx, L, f));
  for (const p of products) out(`perfumes/${p.slug}/index.html`, productPage(ctx, L, p));
  out('offers/index.html', offersPage(ctx, L));
  out('cart/index.html', cartPage(ctx, L));
  out('wishlist/index.html', wishlistPage(ctx, L));
  out('about/index.html', aboutPage(ctx, L));
  out('contact/index.html', contactPage(ctx, L));
}
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
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LANGS.flatMap((lang) =>
  urls.map((u) => {
    const alts = LANGS.map(
      (l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${site.url}${locale(l).path(u.path)}"/>`
    ).join('');
    return `  <url><loc>${site.url}${locale(lang).path(u.path)}</loc>${alts}<xhtml:link rel="alternate" hreflang="x-default" href="${site.url}${u.path}"/><lastmod>${today}</lastmod><priority>${u.priority}</priority></url>`;
  })
).join('\n')}
</urlset>
`
);
write(
  'robots.txt',
  `User-agent: *
Allow: /
Disallow: /cart/
Disallow: /wishlist/
Disallow: /ar/cart/
Disallow: /ar/wishlist/
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

console.log(`Built ${pageCount + 2} pages`);
