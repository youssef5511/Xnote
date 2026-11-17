import { site, sizeGuide, faqs } from './site.mjs';
import { products, families, bundle } from './products.mjs';

export const esc = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const nameHtml = (name) => esc(name).replace(/ (\S{1,2})$/, '&nbsp;$1');
export const money = (n) => n.toLocaleString('en-US') + '\u00a0' + site.currency;
export const productPath = (p) => `/perfumes/${p.slug}/`;
export const noteKey = (note) =>
  note
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
export const familyOf = (key) => families.find((f) => f.key === key);
export const fromPrice = (p) => Math.min(...p.sizes.map((s) => s.price));
export const toPrice = (p) => Math.max(...p.sizes.map((s) => s.price));
export const bySlug = (slug) => products.find((p) => p.slug === slug);

const listJoin = (items) =>
  items.length < 2 ? items.join('') : items.slice(0, -1).join(', ') + ' and ' + items[items.length - 1];
const imgSrc = (slug, w) => `/assets/img/products/${slug}-${w}.webp`;
const abs = (path) => site.url + path;
const waLink = (text) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text.replace(/\u00a0/g, ' '))}`;

export function noteIndex() {
  const counts = new Map();
  for (const p of products) for (const n of p.notes) counts.set(n, (counts.get(n) || 0) + 1);
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count, key: noteKey(name) }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

const icon = {
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 8h14l-1.2 12.1a1 1 0 0 1-1 .9H7.2a1 1 0 0 1-1-.9L5 8Z"/><path d="M9 10V7a3 3 0 0 1 6 0v3"/></svg>',
  heart:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7.5-4.6-9.2-9.4C1.6 7.2 4 4 7.3 4c2 0 3.5 1.1 4.7 2.7C13.2 5.1 14.7 4 16.7 4 20 4 22.4 7.2 21.2 10.6 19.5 15.4 12 20 12 20Z"/></svg>',
  heartLine:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M12 20s-7.5-4.6-9.2-9.4C1.6 7.2 4 4 7.3 4c2 0 3.5 1.1 4.7 2.7C13.2 5.1 14.7 4 16.7 4 20 4 22.4 7.2 21.2 10.6 19.5 15.4 12 20 12 20Z"/></svg>',
  search:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  close:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10"/></svg>',
  arrow:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>',
  truck:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/></svg>',
  wallet:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M16 15h2"/></svg>',
  chat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/></svg>',
};

const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
].join('; ');

const WIDTHS = [320, 480, 720, 960];
const srcset = (slug, ext) => WIDTHS.map((w) => `/assets/img/products/${slug}-${w}.${ext} ${w}w`).join(', ');

function picture(slug, alt, { sizes, eager = false, className = '' } = {}) {
  return `<picture><source type="image/avif" srcset="${srcset(slug, 'avif')}" sizes="${sizes}"><img${className ? ` class="${className}"` : ''} src="${imgSrc(slug, 480)}" srcset="${srcset(slug, 'webp')}" sizes="${sizes}" width="480" height="600" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"></picture>`;
}

const HERO_SIZES_SET = (ext) => `/assets/img/hero-768.${ext} 768w, /assets/img/hero-1536.${ext} 1536w`;
function heroPicture(alt, sizes, eager) {
  return `<picture><source type="image/avif" srcset="${HERO_SIZES_SET('avif')}" sizes="${sizes}"><img src="/assets/img/hero-768.webp" srcset="${HERO_SIZES_SET('webp')}" sizes="${sizes}" width="768" height="512" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"></picture>`;
}

export function productCard(p, { eager = false } = {}) {
  const smallest = p.sizes.reduce((a, b) => (a.price <= b.price ? a : b));
  return `<article class="card" data-card data-slug="${p.slug}" data-family="${p.family}" data-notes="${p.notes.map(noteKey).join(' ')}" data-price="${fromPrice(p)}" data-name="${esc(p.name.toLowerCase())}">
  <a class="card__media" href="${productPath(p)}" tabindex="-1" aria-hidden="true">${picture(p.slug, p.name + ' by X Note with ' + listJoin(p.notes.slice(0, 3)).toLowerCase(), { sizes: '(min-width: 1080px) 280px, (min-width: 720px) 31vw, 46vw', eager })}</a>
  <button class="wish" type="button" data-wish="${p.slug}" aria-pressed="false" aria-label="Save ${esc(p.name)} to wishlist">${icon.heart}</button>
  <div class="card__body">
    <p class="card__accord">${esc(p.accord)}</p>
    <h3 class="card__name"><a href="${productPath(p)}">${nameHtml(p.name)}</a></h3>
    <p class="card__notes">${esc(p.notes.slice(0, 3).join(', '))}</p>
    <p class="card__price">From ${money(fromPrice(p))}</p>
    <div class="card__add"><button class="btn btn--ghost btn--small" type="button" data-add="${p.slug}" data-ml="${smallest.ml}"><span>Add ${smallest.ml} ml to cart</span></button></div>
  </div>
</article>`;
}

const navItems = [
  { href: '/shop/', label: 'Shop all' },
  ...families.map((f) => ({ href: `/shop/${f.key}/`, label: f.name })),
  { href: '/offers/', label: 'Bundle offer' },
  { href: '/contact/', label: 'Help' },
];

function searchBox(id, extraClass = '') {
  return `<div class="search ${extraClass}" data-search>
  <form class="search__form" action="/shop/" role="search">
    <label class="sr" for="${id}">Search fragrances</label>
    <input class="search__input" id="${id}" name="q" type="search" placeholder="Search names or notes" maxlength="80" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="search" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="${id}-results">
    <button class="search__clear" type="button" data-search-clear aria-label="Clear search" hidden>${icon.close}</button>
  </form>
  <div class="search__panel" id="${id}-results" data-search-panel hidden></div>
</div>`;
}

function header(path) {
  const links = navItems
    .map((i) => `<a href="${i.href}"${i.href === path ? ' aria-current="page"' : ''}>${esc(i.label)}</a>`)
    .join('');
  return `<header class="header">
  <div class="wrap header__inner">
    <button class="icon-btn header__menu" type="button" data-open-menu aria-label="Open menu" aria-haspopup="dialog" aria-controls="menu">${icon.menu}</button>
    <a class="logo" href="/" aria-label="X Note home"><img src="/assets/img/logo.webp" width="77" height="96" alt=""></a>
    <nav class="nav" aria-label="Main">${links}</nav>
    ${searchBox('site-search', 'search--header')}
    <button class="header__cancel" type="button" data-close-search>Cancel</button>
    <div class="tools">
      <button class="icon-btn tools__search" type="button" data-open-search aria-label="Search" aria-controls="site-search" aria-expanded="false">${icon.search}</button>
      <a class="icon-btn tools__wish" href="/wishlist/" aria-label="Wishlist">${icon.heartLine}<span class="count" data-wish-count hidden></span></a>
      <a class="icon-btn" href="/cart/" data-open-cart aria-label="Cart">${icon.bag}<span class="count" data-cart-count hidden></span></a>
    </div>
  </div>
</header>
<div class="search-scrim" data-close-search hidden></div>`;
}

function menu(path) {
  const item = (href, label, meta) =>
    `<a href="${href}"${href === path ? ' aria-current="page"' : ''}><span>${esc(label)}</span>${meta ? `<span class="menu-nav__meta">${esc(meta)}</span>` : ''}${icon.arrow}</a>`;
  return `<dialog class="sheet sheet--left" id="menu" aria-label="Menu">
  <div class="sheet__inner">
    <div class="sheet__head">
      <img src="/assets/img/logo.webp" width="77" height="96" alt="X Note">
      <button class="icon-btn" type="button" data-close-sheet aria-label="Close menu" autofocus>${icon.close}</button>
    </div>
    <div class="sheet__body">
      <nav class="menu-nav" aria-label="Shop">
        ${item('/shop/', 'Shop all', products.length + ' fragrances')}
        ${families
          .map((f) => {
            const n = products.filter((p) => p.family === f.key).length;
            return item(`/shop/${f.key}/`, f.name, n + (n === 1 ? ' fragrance' : ' fragrances'));
          })
          .join('')}
        ${item('/offers/', 'Trilogy bundle', money(bundle.price))}
      </nav>
      <ul class="menu-links">
        <li><a href="/wishlist/">Wishlist <span class="count count--inline" data-wish-count hidden></span></a></li>
        <li><a href="/contact/">Help and contact</a></li>
        <li><a href="/contact/#delivery">Delivery and payment</a></li>
        <li><a href="/about/">About X Note</a></li>
      </ul>
    </div>
    <div class="sheet__foot">
      <a class="btn btn--wa btn--block" href="https://wa.me/${site.whatsapp}" rel="noopener" target="_blank">Chat with us on WhatsApp</a>
    </div>
  </div>
</dialog>`;
}

function footer() {
  return `<footer class="footer">
  <div class="wrap">
    <div class="footer__grid">
      <div class="footer__brand">
        <img src="/assets/img/logo.webp" width="77" height="96" alt="X Note" loading="lazy">
        <p>Fragrances in 10, 30 and 50 ml with every note listed. Orders confirmed personally on WhatsApp and delivered across Egypt.</p>
      </div>
      <div>
        <h2>Shop</h2>
        <ul>
          <li><a href="/shop/">All fragrances</a></li>
          ${families.map((f) => `<li><a href="/shop/${f.key}/">${esc(f.name)}</a></li>`).join('')}
          <li><a href="/offers/">Trilogy bundle</a></li>
        </ul>
      </div>
      <div>
        <h2>Help</h2>
        <ul>
          <li><a href="/contact/">Contact and FAQ</a></li>
          <li><a href="/contact/#delivery">Delivery and payment</a></li>
          <li><a href="/about/">About X Note</a></li>
          <li><a href="/wishlist/">Wishlist</a></li>
        </ul>
      </div>
      <div>
        <h2>Follow</h2>
        <ul>
          ${site.social.map((s) => `<li><a href="${s.url}" rel="noopener" target="_blank">${s.name}</a></li>`).join('')}
          <li><a href="https://wa.me/${site.whatsapp}" rel="noopener" target="_blank">WhatsApp</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__base">
      <p>&copy; <span data-year>${new Date().getFullYear()}</span> X Note. All rights reserved.</p>
      <p>Site by <a href="${site.credit.url}" rel="noopener" target="_blank">${site.credit.name}</a></p>
    </div>
  </div>
</footer>`;
}

function drawer() {
  return `<dialog class="sheet sheet--right" id="cart-drawer" aria-labelledby="drawer-title">
  <div class="sheet__inner">
    <div class="sheet__head">
      <h2 id="drawer-title" class="sheet__title">Your cart <span class="muted" data-drawer-count></span></h2>
      <button class="icon-btn" type="button" data-close-sheet aria-label="Close cart">${icon.close}</button>
    </div>
    <div class="sheet__body" data-drawer-lines></div>
    <div class="sheet__foot" data-drawer-foot>
      <div class="totals"><div class="total"><span>Subtotal</span><span data-drawer-subtotal></span></div></div>
      <p class="small muted">Shipping is added at checkout: ${money(site.shipping[0].price)} normal or ${money(site.shipping[1].price)} fast.</p>
      <a class="btn btn--block" href="/cart/">Go to checkout</a>
      <button class="btn btn--ghost btn--block" type="button" data-close-sheet>Keep shopping</button>
    </div>
  </div>
</dialog>`;
}

export function layout({
  path,
  title,
  description,
  body,
  image,
  jsonld = [],
  preload = '',
  css,
  jsVersion,
  noindex = false,
}) {
  const fullTitle = path === '/' ? title : `${title} | X Note`;
  const shareImage = abs(image || '/assets/img/share.jpg');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="${CSP}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${abs(path)}">
${noindex ? '<meta name="robots" content="noindex">\n' : ''}<meta name="theme-color" content="#f3f4f1">
<link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta property="og:site_name" content="X Note">
<meta property="og:type" content="${path.startsWith('/perfumes/') ? 'product' : 'website'}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${abs(path)}">
<meta property="og:image" content="${shareImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="en_EG">
<meta name="twitter:card" content="summary_large_image">
<link rel="preload" href="/assets/fonts/bodoni-moda-latin.woff2" as="font" type="font/woff2" crossorigin>
${preload}<style>${css}</style>
${jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`).join('\n')}
<script src="/assets/js/site.js?v=${jsVersion}" defer></script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<aside class="bar" aria-label="Delivery and payment"><p><span>Delivery across Egypt in 1 to 5 days.</span> <span class="bar__more">Pay with Vodafone Cash or InstaPay.</span></p></aside>
${header(path)}
<main id="main">
${body}
</main>
${footer()}
${menu(path)}
${drawer()}
<div class="toast" role="status" aria-live="polite" data-toast></div>
</body>
</html>
`;
}

const breadcrumbs = (items) =>
  `<nav class="crumbs wrap" aria-label="Breadcrumb"><ol>${items.map((it, i) => `<li>${i === items.length - 1 ? `<span aria-current="page">${esc(it.name)}</span>` : `<a href="${it.path}">${esc(it.name)}</a>`}</li>`).join('')}</ol></nav>`;

const breadcrumbLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
});

const organizationLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': site.url + '/#org',
  name: 'X Note',
  url: site.url + '/',
  logo: abs('/assets/img/icon-512.png'),
  sameAs: site.social.map((s) => s.url),
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+' + site.whatsapp,
    contactType: 'customer service',
    areaServed: 'EG',
    availableLanguage: ['English', 'Arabic'],
  },
});

const bundleTotal = () =>
  bundle.items.reduce((sum, slug) => sum + bySlug(slug).sizes.find((s) => s.ml === bundle.ml).price, 0);

function faqList(items) {
  return `<div class="faq">${items.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</div>`;
}

const faqLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

function bundleBand({ headingLevel = 'h2', eager = false } = {}) {
  const total = bundleTotal();
  const H = headingLevel;
  return `<section class="band section" aria-labelledby="bundle-title">
  <div class="wrap band__grid">
    <div class="band__media">${heroPicture('Le Male Elixir, Creed Silver Mountain Water and Imperial Valley Qisah bottles with lavender, citrus and wood', '(min-width: 900px) 56vw, 100vw', eager)}</div>
    <div class="band__text">
      <${H} class="h2" id="bundle-title">${esc(bundle.name)}</${H}>
      <p class="lede">Three ${bundle.ml} ml bottles, one fresh, one warm and one smoky, for every kind of day.</p>
      <ul class="band__list">
        ${bundle.items
          .map((slug) => {
            const p = bySlug(slug);
            return `<li><a href="${productPath(p)}">${esc(p.name)}</a><span class="muted">${esc(p.accord)}</span></li>`;
          })
          .join('')}
      </ul>
      <p class="band__price"><strong>${money(bundle.price)}</strong><s>${money(total)}</s><span>You save ${money(total - bundle.price)}</span></p>
      <div class="band__actions">
        <button class="btn btn--light" type="button" data-add-bundle><span>Add bundle to cart</span></button>
        <a class="btn btn--outline-light" href="${waLink(`Hello, I would like to order ${bundle.name} (${bundle.items.map((s) => bySlug(s).name).join(', ')}) for ${money(bundle.price)}.`)}" rel="noopener" target="_blank">Ask on WhatsApp</a>
      </div>
    </div>
  </div>
</section>`;
}

export function homePage(ctx) {
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const notes = noteIndex().filter((n) => n.count > 1);
  const fromAll = Math.min(...products.map(fromPrice));
  const body = `
<section class="hero">
  <div class="wrap hero__grid">
    <div class="hero__text">
      <h1>Find your scent by the notes you love.</h1>
      <p class="lede">${products.length} X Note fragrances in 10, 30 and 50 ml. Every bottle lists its notes, so you know what you are getting before you order.</p>
      <div class="hero__actions">
        <a class="btn" href="/shop/">Shop all fragrances</a>
        <a class="btn btn--ghost" href="#notes">Shop by note</a>
      </div>
      <ul class="hero__facts">
        <li>10 ml from ${money(fromAll)}</li>
        <li>Delivery across Egypt</li>
        <li>Pay after we confirm</li>
      </ul>
    </div>
    <div class="hero__media">${heroPicture('Three X Note bottles surrounded by lavender, citrus, tea and wood', '(min-width: 1240px) 700px, (min-width: 900px) 56vw, 100vw', true)}</div>
  </div>
</section>

<section class="section section--tight" id="notes" aria-labelledby="notes-title">
  <div class="wrap">
    <div class="section__head">
      <h2 id="notes-title">Shop by note</h2>
      <p class="muted">Pick a note to see every fragrance that contains it. The number shows how many we have.</p>
    </div>
    <ul class="notes-index">
      ${notes.map((n) => `<li><a href="/shop/?note=${n.key}" style="--w:${n.count}">${esc(n.name)}<sup><span class="sr">, </span>${n.count}<span class="sr"> fragrances</span></sup></a></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="signatures-title">
  <div class="wrap">
    <div class="section__head">
      <h2 id="signatures-title">Our signatures</h2>
      <a class="link" href="/shop/">See all ${products.length} fragrances</a>
    </div>
    <div class="grid">${featured.map((p) => productCard(p)).join('')}</div>
  </div>
</section>

<section class="section section--tight" aria-labelledby="families-title">
  <div class="wrap">
    <div class="section__head"><h2 id="families-title">Shop by family</h2></div>
    <div class="families">
      ${families
        .map((f) => {
          const list = products.filter((p) => p.family === f.key);
          const cover = list.find((p) => p.featured) || list[0];
          return `<a class="family" href="/shop/${f.key}/"><div class="family__media">${picture(cover.slug, '', { sizes: '(min-width: 900px) 280px, 46vw' })}</div><h3>${esc(f.name)}</h3><p>${esc(f.blurb)} ${list.length} ${list.length === 1 ? 'fragrance' : 'fragrances'}.</p></a>`;
        })
        .join('')}
    </div>
  </div>
</section>

${bundleBand()}

<section class="section" aria-labelledby="how-title">
  <div class="wrap">
    <div class="section__head"><h2 id="how-title">How ordering works</h2></div>
    <ol class="steps">
      <li><h3>Choose your fragrance and size</h3><p>Add as many as you like to your cart. Sizes are 10, 30 and 50 ml.</p></li>
      <li><h3>Enter your delivery details</h3><p>Pick normal or fast shipping and see your total before you order.</p></li>
      <li><h3>Send your order on WhatsApp</h3><p>WhatsApp opens with your order written out. Send it and we confirm, usually within 24 hours.</p></li>
      <li><h3>Pay and receive it</h3><p>Pay with Vodafone Cash or InstaPay once confirmed. We deliver anywhere in Egypt.</p></li>
    </ol>
  </div>
</section>

<section class="section section--tight" aria-labelledby="faq-title">
  <div class="wrap">
    <div class="section__head"><h2 id="faq-title">Questions</h2><a class="link" href="/contact/">All questions and contact</a></div>
    ${faqList(faqs.slice(0, 4))}
  </div>
</section>`;

  return layout({
    ...ctx,
    path: '/',
    title: 'X Note | Perfumes in 10, 30 and 50 ml, delivered across Egypt',
    description: site.description,
    body,
    preload: `<link rel="preload" as="image" type="image/avif" imagesrcset="${HERO_SIZES_SET('avif')}" imagesizes="(min-width: 1240px) 700px, (min-width: 900px) 56vw, 100vw" fetchpriority="high">\n`,
    jsonld: [
      organizationLd(),
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'X Note',
        url: site.url + '/',
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: site.url + '/shop/?q={search_term_string}' },
          'query-input': 'required name=search_term_string',
        },
      },
      faqLd(faqs.slice(0, 4)),
    ],
  });
}

export function shopPage(ctx, family) {
  const list = family ? products.filter((p) => p.family === family.key) : products;
  const path = family ? `/shop/${family.key}/` : '/shop/';
  const notes = [...new Set(list.flatMap((p) => p.notes))].sort((a, b) => a.localeCompare(b));
  const title = family ? `${family.name} perfumes` : 'All fragrances';
  const crumbs = family
    ? [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop/' },
        { name: family.name, path },
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop/' },
      ];
  const description = family
    ? `${family.name} perfumes by X Note. ${family.blurb} ${list.length} ${list.length === 1 ? 'fragrance' : 'fragrances'} in 10, 30 and 50 ml from ${money(Math.min(...list.map(fromPrice)))}, delivered across Egypt.`
    : `All ${products.length} X Note perfumes in 10, 30 and 50 ml from ${money(Math.min(...products.map(fromPrice)))}. Filter by family or by note, from vanilla and amber to oud and bergamot.`;

  const body = `
${breadcrumbs(crumbs)}
<div class="wrap">
  <header class="page-head">
    <h1>${esc(title)}</h1>
    <p class="lede">${family ? esc(family.blurb) : 'Every X Note fragrance in one place. Filter by family or by a note you love.'}</p>
  </header>
  <div class="shop-tools">
    <nav class="chips" aria-label="Families">
      <a class="chip" href="/shop/"${!family ? ' aria-current="page"' : ''}>All</a>
      ${families.map((f) => `<a class="chip" href="/shop/${f.key}/"${family && family.key === f.key ? ' aria-current="page"' : ''}>${esc(f.name)}</a>`).join('')}
    </nav>
    <form class="filters" data-filters>
      <div class="field field--search"><label for="search">Search</label><input class="input" id="search" name="q" type="search" maxlength="80" enterkeyhint="search" placeholder="Name or note, for example vanilla" autocomplete="off"></div>
      <div class="field"><label for="note">Note</label><select class="input" id="note" name="note"><option value="">Any note</option>${notes.map((n) => `<option value="${noteKey(n)}">${esc(n)}</option>`).join('')}</select></div>
      <div class="field"><label for="sort">Sort by</label><select class="input" id="sort" name="sort"><option value="">Featured</option><option value="price-asc">Price, low to high</option><option value="price-desc">Price, high to low</option><option value="name">Name, A to Z</option></select></div>
    </form>
  </div>
  <h2 class="sr">Fragrances</h2>
  <div class="result-line"><p data-result-count aria-live="polite">${list.length} ${list.length === 1 ? 'fragrance' : 'fragrances'}</p><button type="button" data-clear-filters hidden>Clear filters</button></div>
  <div class="grid" data-grid>${list.map((p, i) => productCard(p, { eager: i < 2 })).join('')}</div>
  <div class="empty" data-empty hidden>
    <h2>No fragrance matches all of that</h2>
    <p class="muted">Try another note, or clear the filters to see everything${family ? ' in this family' : ''}.</p>
    <button class="btn" type="button" data-clear-filters>Clear filters</button>
  </div>
</div>
<div class="section--tight"></div>`;

  return layout({
    ...ctx,
    path,
    title,
    description,
    body,
    jsonld: [
      breadcrumbLd(crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: title,
        itemListElement: list.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: abs(productPath(p)),
          name: p.name,
        })),
      },
    ],
  });
}

function related(p) {
  return products
    .filter((o) => o.slug !== p.slug)
    .map((o) => ({
      o,
      score: o.notes.filter((n) => p.notes.includes(n)).length + (o.family === p.family ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score || fromPrice(a.o) - fromPrice(b.o))
    .slice(0, 4)
    .map((r) => r.o);
}

export function productPage(ctx, p) {
  const fam = familyOf(p.family);
  const path = productPath(p);
  const first = p.sizes[0];
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop/' },
    { name: fam.name, path: `/shop/${fam.key}/` },
    { name: p.name, path },
  ];
  const description = `${p.name} by X Note: ${p.accord.toLowerCase()} with ${listJoin(p.notes.slice(0, 4)).toLowerCase()}. ${p.sizes
    .map((s) => s.ml)
    .join(', ')
    .replace(/, (\d+)$/, ' and $1')} ml from ${money(fromPrice(p))}, delivered across Egypt.`;
  const sizeGuideFor = sizeGuide.filter((g) => p.sizes.some((s) => s.ml === g.ml));

  const body = `
${breadcrumbs(crumbs)}
<div class="wrap">
  <div class="pdp">
    <div class="pdp__media" style="view-transition-name:product-photo">${picture(p.slug, `${p.name} by X Note, shown with ${listJoin(p.notes.slice(0, 4)).toLowerCase()}`, { sizes: '(min-width: 1240px) 640px, (min-width: 900px) 52vw, 100vw', eager: true })}</div>
    <div class="pdp__info">
      <div class="pdp__title">
        <a href="/shop/${fam.key}/">${esc(p.accord)}</a>
        <h1>${nameHtml(p.name)}</h1>
      </div>
      <p class="pdp__price"><span data-pdp-price>${money(first.price)}</span> <span data-pdp-ml>for ${first.ml} ml</span></p>
      <p>${esc(p.description)}</p>
      <form class="buy" data-buy="${p.slug}">
        <fieldset class="options options--row">
          <legend>Size</legend>
          ${p.sizes.map((s, i) => `<label class="option"><input type="radio" name="ml" value="${s.ml}" data-price="${s.price}"${i === 0 ? ' checked' : ''}><span class="option__box"><strong>${s.ml} ml</strong><span>${money(s.price)}</span></span></label>`).join('')}
        </fieldset>
        <div class="buy__row">
          <div class="qty"><button type="button" data-step="-1" aria-label="Decrease quantity">&minus;</button><input name="qty" type="number" inputmode="numeric" min="1" max="10" value="1" aria-label="Quantity"><button type="button" data-step="1" aria-label="Increase quantity">+</button></div>
          <button class="btn" type="submit" data-buy-submit><span>Add to cart</span></button>
          <button class="wish wish--inline" type="button" data-wish="${p.slug}" aria-pressed="false" aria-label="Save ${esc(p.name)} to wishlist">${icon.heart}</button>
        </div>
        <a class="btn btn--wa btn--block" data-wa-now href="${waLink(`Hello, I would like to order ${p.name} (${first.ml} ml).`)}" rel="noopener" target="_blank">Order now on WhatsApp</a>
      </form>
      <section aria-labelledby="notes-h">
        <h2 id="notes-h" class="sr">Notes</h2>
        <p class="small muted" style="margin-bottom:10px">Notes. Tap one to find other fragrances with it.</p>
        <ul class="pdp__notes">${p.notes.map((n) => `<li><a href="/shop/?note=${noteKey(n)}">${esc(n)}</a></li>`).join('')}</ul>
      </section>
      <ul class="facts">
        <li>${icon.truck}<span>${esc(site.shipping[0].name)} ${money(site.shipping[0].price)}, ${esc(site.shipping[0].days)}. ${esc(site.shipping[1].name)} ${money(site.shipping[1].price)}, ${esc(site.shipping[1].days)}.</span></li>
        <li>${icon.wallet}<span>Pay with Vodafone Cash or InstaPay after we confirm your order.</span></li>
        <li>${icon.chat}<span>Questions about this scent? <a class="link" href="${waLink(`Hello, I have a question about ${p.name}.`)}" rel="noopener" target="_blank">Ask us on WhatsApp</a>.</span></li>
      </ul>
    </div>
  </div>
</div>

<section class="section section--tight" aria-labelledby="size-title" style="border-top:1px solid var(--line)">
  <div class="wrap split">
    <div class="prose">
      <h2 id="size-title">Which size is right for you?</h2>
      <p>If ${esc(p.name)} is new to you, start with ${p.sizes[0].ml} ml. You can always come back for a bigger bottle.</p>
    </div>
    <ul class="size-guide">${sizeGuideFor.map((g) => `<li><strong>${g.ml} ml</strong><p>${esc(g.use)} That is ${esc(g.sprays)}, ${money(p.sizes.find((s) => s.ml === g.ml).price)}.</p></li>`).join('')}</ul>
  </div>
</section>

<section class="section section--tight" aria-labelledby="related-title">
  <div class="wrap">
    <div class="section__head"><h2 id="related-title">You may also like</h2><a class="link" href="/shop/${fam.key}/">More ${esc(fam.name.toLowerCase())} fragrances</a></div>
    <div class="grid">${related(p)
      .map((o) => productCard(o))
      .join('')}</div>
  </div>
</section>

<div class="buybar" data-buybar aria-hidden="true">
  <p>${esc(p.name)}<strong data-buybar-price>${money(first.price)}, ${first.ml} ml</strong></p>
  <button class="btn" type="button" data-buybar-add tabindex="-1"><span>Add to cart</span></button>
</div>`;

  const lowPrice = fromPrice(p);
  const highPrice = toPrice(p);
  return layout({
    ...ctx,
    path,
    title: `${p.name}, ${p.accord.toLowerCase()} perfume`,
    description,
    body,
    image: `/assets/img/products/${p.slug}-share.jpg`,
    preload: `<link rel="preload" as="image" type="image/avif" imagesrcset="${srcset(p.slug, 'avif')}" imagesizes="(min-width: 1240px) 640px, (min-width: 900px) 52vw, 100vw" fetchpriority="high">\n`,
    jsonld: [
      breadcrumbLd(crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: p.name,
        description: p.description,
        image: [abs(imgSrc(p.slug, 960))],
        sku: p.slug,
        brand: { '@type': 'Brand', name: 'X Note' },
        category: 'Perfume',
        additionalProperty: p.notes.map((n) => ({ '@type': 'PropertyValue', name: 'Note', value: n })),
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: site.currency,
          lowPrice,
          highPrice,
          offerCount: p.sizes.length,
          availability: 'https://schema.org/InStock',
          url: abs(path),
          seller: { '@id': site.url + '/#org' },
        },
      },
    ],
  });
}

export function offersPage(ctx) {
  const total = bundleTotal();
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Bundle offer', path: '/offers/' },
  ];
  const body = `
${breadcrumbs(crumbs)}
${bundleBand({ headingLevel: 'h1', eager: true })}
<section class="section" aria-labelledby="inside-title">
  <div class="wrap">
    <div class="section__head"><h2 id="inside-title">What is inside</h2><p class="muted">Each bottle is ${bundle.ml} ml. Bought separately they cost ${money(total)}.</p></div>
    <div class="grid">${bundle.items.map((slug) => productCard(bySlug(slug))).join('')}</div>
  </div>
</section>`;
  return layout({
    ...ctx,
    path: '/offers/',
    title: `${bundle.name}, three ${bundle.ml} ml perfumes for ${money(bundle.price)}`,
    description: `${bundle.items.map((s) => bySlug(s).name).join(', ')} in ${bundle.ml} ml bottles for ${money(bundle.price)} instead of ${money(total)}. Delivered across Egypt.`,
    body,
    image: `/assets/img/share.jpg`,
    jsonld: [
      breadcrumbLd(crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: bundle.name,
        description: `Three ${bundle.ml} ml X Note perfumes: ${bundle.items.map((s) => bySlug(s).name).join(', ')}.`,
        image: [abs('/assets/img/hero-1536.webp')],
        sku: bundle.slug,
        brand: { '@type': 'Brand', name: 'X Note' },
        offers: {
          '@type': 'Offer',
          price: bundle.price,
          priceCurrency: site.currency,
          availability: 'https://schema.org/InStock',
          url: abs('/offers/'),
        },
      },
    ],
  });
}

export function cartPage(ctx) {
  const governorates = [
    'Cairo',
    'Giza',
    'Alexandria',
    'Qalyubia',
    'Sharqia',
    'Dakahlia',
    'Gharbia',
    'Monufia',
    'Beheira',
    'Kafr El Sheikh',
    'Damietta',
    'Port Said',
    'Ismailia',
    'Suez',
    'Faiyum',
    'Beni Suef',
    'Minya',
    'Asyut',
    'Sohag',
    'Qena',
    'Luxor',
    'Aswan',
    'Red Sea',
    'New Valley',
    'Matrouh',
    'North Sinai',
    'South Sinai',
  ];
  const body = `
<div class="wrap">
  <header class="page-head"><h1 data-cart-title>Your cart</h1></header>
  <div data-cart-view>
    <div class="empty" data-cart-empty hidden>
      <h2>Your cart is empty</h2>
      <p class="muted">Find a fragrance by its notes, or start with a 10 ml bottle to try something new.</p>
      <a class="btn" href="/shop/">Shop all fragrances</a>
    </div>
    <form class="cart" id="checkout" data-checkout novalidate hidden>
      <div class="cart__form">
        <section class="form-block" aria-labelledby="items-title">
          <h2 id="items-title" class="form-title">Items</h2>
          <div class="lines" data-cart-lines></div>
        </section>
        <section class="form-block" aria-labelledby="details-title">
          <h2 id="details-title" class="form-title">Delivery details</h2>
          <div class="form-grid form-grid--2">
            <div class="field"><label for="c-name">Full name</label><input class="input" id="c-name" name="name" autocomplete="name" maxlength="80" required><p class="error" id="c-name-error"></p></div>
            <div class="field"><label for="c-phone">Mobile number <span class="hint">used for WhatsApp and delivery</span></label><input class="input" id="c-phone" name="phone" type="tel" maxlength="20" inputmode="tel" autocomplete="tel" placeholder="01X XXXX XXXX" required><p class="error" id="c-phone-error"></p></div>
            <div class="field"><label for="c-gov">Governorate</label><select class="input" id="c-gov" name="governorate" autocomplete="address-level1" required><option value="">Choose your governorate</option>${governorates.map((g) => `<option>${g}</option>`).join('')}</select><p class="error" id="c-gov-error"></p></div>
            <div class="field"><label for="c-city">City or area</label><input class="input" id="c-city" name="city" autocomplete="address-level2" maxlength="60" required><p class="error" id="c-city-error"></p></div>
            <div class="field span-2"><label for="c-address">Street address <span class="hint">building, floor and apartment</span></label><textarea class="input" id="c-address" name="address" autocomplete="street-address" maxlength="200" rows="2" required></textarea><p class="error" id="c-address-error"></p></div>
            <div class="field span-2"><label for="c-notes">Order notes <span class="hint">optional, for example gift wrapping or a card message</span></label><textarea class="input" id="c-notes" name="notes" rows="2" maxlength="300"></textarea></div>
            <label class="check span-2"><input type="checkbox" id="c-remember" name="remember" checked><span>Remember my details on this device for next time</span></label>
          </div>
        </section>
        <fieldset class="form-block options">
          <legend class="form-title">Shipping</legend>
          ${site.shipping.map((s, i) => `<label class="option option--row"><input type="radio" name="shipping" value="${s.key}"${i === 0 ? ' checked' : ''}><span class="option__box"><span><strong>${esc(s.name)}</strong><br><span>${esc(s.days)}</span></span><strong>${money(s.price)}</strong></span></label>`).join('')}
        </fieldset>
        <fieldset class="form-block options">
          <legend class="form-title">Payment</legend>
          ${site.payments.map((m, i) => `<label class="option option--row"><input type="radio" name="payment" value="${esc(m)}"${i === 0 ? ' checked' : ''}><span class="option__box"><span><strong>${esc(m)}</strong><br><span>We send payment details after we confirm your order</span></span></span></label>`).join('')}
        </fieldset>
      </div>
      <aside class="cart__summary" aria-labelledby="summary-title">
        <h2 id="summary-title" class="form-title">Order summary</h2>
        <div class="totals">
          <div><span>Subtotal</span><span data-subtotal></span></div>
          <div><span>Shipping</span><span data-shipping></span></div>
          <div class="total"><span>Total</span><span data-total></span></div>
        </div>
        <button class="btn btn--wa btn--block" type="submit">Place order on WhatsApp</button>
        <p class="small muted">WhatsApp opens with your order written out. Send the message to confirm it. You pay only after we confirm.</p>
        <p class="error" data-form-error role="alert"></p>
      </aside>
    </form>
    <div class="checkout-bar" data-checkout-bar aria-hidden="true">
      <p>Total<strong data-total-bar></strong></p>
      <button class="btn btn--wa" type="submit" form="checkout" tabindex="-1">Place order</button>
    </div>
  </div>
  <section class="done" data-done hidden tabindex="-1" aria-labelledby="done-title">
    <h2 id="done-title" class="h1">Almost done. Send the message in WhatsApp.</h2>
    <p class="lede">Your order is written out in WhatsApp. It is confirmed once you send that message, and we reply with payment details, usually within 24 hours.</p>
    <p class="done__ref">Order reference <strong data-done-ref></strong></p>
    <div class="hero__actions">
      <a class="btn btn--wa" data-done-wa href="#" rel="noopener" target="_blank">Open WhatsApp again</a>
      <a class="btn btn--ghost" href="/shop/">Continue shopping</a>
    </div>
  </section>
</div>`;
  return layout({
    ...ctx,
    path: '/cart/',
    title: 'Cart and checkout',
    description: 'Review your cart, enter your delivery details and send your X Note order on WhatsApp.',
    body,
    noindex: true,
  });
}

export function wishlistPage(ctx) {
  const body = `
<div class="wrap">
  <header class="page-head"><h1>Wishlist</h1><p class="lede">Fragrances you saved. They stay on this device until you remove them.</p></header>
  <h2 class="sr">Saved fragrances</h2>
  <div class="grid" data-wishlist-grid>${products.map((p) => productCard(p).replace('<article class="card"', '<article hidden class="card"')).join('')}</div>
  <div class="empty" data-wishlist-empty hidden>
    <h2>Nothing saved yet</h2>
    <p class="muted">Tap the heart on any fragrance to keep it here while you decide.</p>
    <a class="btn" href="/shop/">Shop all fragrances</a>
  </div>
</div>
<div class="section"></div>`;
  return layout({
    ...ctx,
    path: '/wishlist/',
    title: 'Wishlist',
    description: 'Fragrances you saved at X Note.',
    body,
    noindex: true,
  });
}

export function aboutPage(ctx) {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about/' },
  ];
  const body = `
${breadcrumbs(crumbs)}
<div class="wrap">
  <header class="page-head"><h1>About X Note</h1><p class="lede">A fragrance house from Egypt, founded in 2026, built around one idea: you should know what a scent is made of before you wear it.</p></header>
</div>
<section class="section section--tight">
  <div class="wrap split">
    <div class="hero__media" style="aspect-ratio:4/5">${picture('imperial-valley-qisah', 'Imperial Valley Qisah bottle with oud, vetiver, pink pepper and leather', { sizes: '(min-width: 900px) 600px, 100vw' })}</div>
    <div class="prose">
      <h2>Scent as memory</h2>
      <p>A great fragrance is not just worn. It becomes part of how people remember you, how a room changes when you walk in, and how a moment stays with you.</p>
      <p>Every X Note fragrance comes in 10, 30 and 50 ml. The small bottle lets you live with a scent before you commit, and the large one is there when you have found yours.</p>
      <h2 style="margin-top:20px">Every note listed</h2>
      <p>Each fragrance page lists its notes, and the shop lets you filter by them. If you love vanilla, or cannot stand oud, you can see that before you order.</p>
      <h2 style="margin-top:20px">A person on the other end</h2>
      <p>Every order is handled personally. You talk to us on WhatsApp, we confirm your order, then pack and ship it with care.</p>
      <p><a class="btn" href="/shop/">Shop all fragrances</a></p>
    </div>
  </div>
</section>`;
  return layout({
    ...ctx,
    path: '/about/',
    title: 'About X Note',
    description:
      'X Note is a fragrance house from Egypt. Every fragrance comes in 10, 30 and 50 ml with its notes listed, and every order is handled personally.',
    body,
    jsonld: [breadcrumbLd(crumbs), organizationLd()],
  });
}

export function contactPage(ctx) {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Help', path: '/contact/' },
  ];
  const body = `
${breadcrumbs(crumbs)}
<div class="wrap">
  <header class="page-head"><h1>Help and contact</h1><p class="lede">The fastest way to reach us is WhatsApp. We reply within 24 hours, usually much sooner.</p></header>
  <div class="contact-cards">
    <div class="contact-card"><h2>WhatsApp</h2><p>Questions, help choosing a scent, or changes to an order.</p><a class="btn btn--wa" href="https://wa.me/${site.whatsapp}" rel="noopener" target="_blank">Chat on WhatsApp</a></div>
    <div class="contact-card" id="delivery"><h2>Delivery</h2><p>${site.shipping.map((s) => `${esc(s.name)}: ${esc(s.days)}, ${money(s.price)}.`).join(' ')} We deliver to every governorate.</p></div>
    <div class="contact-card"><h2>Payment</h2><p>${site.payments.join(' or ')}. We send the details after we confirm your order, so you never pay before we have checked it.</p></div>
  </div>
</div>
<section class="section" aria-labelledby="faq-title">
  <div class="wrap">
    <div class="section__head"><h2 id="faq-title">Frequently asked questions</h2></div>
    ${faqList(faqs)}
    <p style="margin-top:28px" class="muted">Follow us on ${site.social
      .map((s) => `<a class="link" href="${s.url}" rel="noopener" target="_blank">${s.name}</a>`)
      .join(', ')
      .replace(/, ([^,]+)$/, ' and $1')}.</p>
  </div>
</section>`;
  return layout({
    ...ctx,
    path: '/contact/',
    title: 'Help and contact',
    description:
      'Contact X Note on WhatsApp. Delivery times and costs, payment with Vodafone Cash or InstaPay, sizes and answers to common questions.',
    body,
    jsonld: [breadcrumbLd(crumbs), faqLd(faqs)],
  });
}

export function orderCheckPage(ctx) {
  const body = `
<div class="wrap">
  <header class="page-head">
    <h1>Check an order</h1>
    <p class="lede">For the X Note team. Paste an order message from WhatsApp and every line is recalculated with today's prices, so anything changed before it was sent stands out.</p>
  </header>
  <form class="order-check" data-order-check>
    <div class="field"><label for="oc-text">Order message</label><textarea class="input" id="oc-text" rows="12" maxlength="6000" placeholder="Paste the whole message here" spellcheck="false"></textarea></div>
    <div class="hero__actions"><button class="btn" type="submit">Check order</button><button class="btn btn--ghost" type="button" data-oc-clear>Clear</button></div>
  </form>
  <section class="oc-result" data-oc-result hidden tabindex="-1" aria-live="polite" aria-label="Result"></section>
</div>
<div class="section"></div>`;
  return layout({
    ...ctx,
    path: '/order-check/',
    title: 'Check an order',
    description: 'Recalculate an X Note WhatsApp order with current prices.',
    body,
    noindex: true,
  });
}

export function notFoundPage(ctx) {
  const body = `
<div class="wrap not-found">
  <h1>This page does not exist</h1>
  <p class="lede">The link may be old or mistyped. Every fragrance is still in the shop.</p>
  <div class="hero__actions"><a class="btn" href="/shop/">Shop all fragrances</a><a class="btn btn--ghost" href="/">Go to the home page</a></div>
</div>`;
  return layout({
    ...ctx,
    path: '/404.html',
    title: 'Page not found',
    description: 'This page does not exist.',
    body,
    noindex: true,
  });
}

export function redirectPage(to) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Moved</title>
<link rel="canonical" href="${abs(to)}">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${to}">
</head>
<body>
<p>This page has moved to <a href="${to}">${abs(to)}</a>.</p>
</body>
</html>
`;
}
