import { site, sizeGuide, faqs, governorates } from './site.mjs';
import { products, families, bundle, notesAr } from './products.mjs';
import { ui } from './i18n.mjs';

export const esc = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const nameHtml = (name) => esc(name).replace(/ (\S{1,2})$/, '&nbsp;$1');
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
export const LANGS = ['en', 'ar'];

const imgSrc = (slug, w) => `/assets/img/products/${slug}-${w}.webp`;
const abs = (path) => site.url + path;
const waLink = (text) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text.replace(/\u00a0/g, ' '))}`;

export function locale(lang) {
  const ar = lang === 'ar';
  const t = ui[lang];
  return {
    lang,
    ar,
    t,
    dir: ar ? 'rtl' : 'ltr',
    other: ar ? 'en' : 'ar',
    path: (p) => (ar ? '/ar' + p : p),
    money: (n) => n.toLocaleString('en-US') + '\u00a0' + (ar ? site.currencyAr : site.currency),
    note: (n) => (ar ? notesAr[n] : n),
    accord: (p) => (ar ? p.accordAr : p.accord),
    desc: (p) => (ar ? p.descriptionAr : p.description),
    famName: (f) => (ar ? f.nameAr : f.name),
    famBlurb: (f) => (ar ? f.blurbAr : f.blurb),
    bundleName: () => (ar ? bundle.nameAr : bundle.name),
    ship: (s, money) => ({
      name: ar ? s.nameAr : s.name,
      days: ar ? s.daysAr : s.days,
      price: money(s.price),
    }),
    pay: (m) => (ar ? m.nameAr : m.name),
    list: (items) =>
      items.length < 2
        ? items.join('')
        : ar
          ? items.slice(0, -1).join('، ') + ' و' + items[items.length - 1]
          : items.slice(0, -1).join(', ') + ' and ' + items[items.length - 1],
    sep: ar ? '، ' : ', ',
  };
}

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
    '<svg class="flip" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>',
  globe:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z"/></svg>',
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

function picture(slug, alt, { sizes, eager = false } = {}) {
  return `<picture><source type="image/avif" srcset="${srcset(slug, 'avif')}" sizes="${sizes}"><img src="${imgSrc(slug, 480)}" srcset="${srcset(slug, 'webp')}" sizes="${sizes}" width="480" height="600" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"></picture>`;
}

const HERO_SET = (ext) => `/assets/img/hero-768.${ext} 768w, /assets/img/hero-1536.${ext} 1536w`;
function heroPicture(alt, sizes, eager) {
  return `<picture><source type="image/avif" srcset="${HERO_SET('avif')}" sizes="${sizes}"><img src="/assets/img/hero-768.webp" srcset="${HERO_SET('webp')}" sizes="${sizes}" width="768" height="512" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"></picture>`;
}

export function productCard(L, p, { eager = false } = {}) {
  const { t } = L;
  const smallest = p.sizes.reduce((a, b) => (a.price <= b.price ? a : b));
  const notes = p.notes.slice(0, 3).map(L.note);
  return `<article class="card" data-card data-slug="${p.slug}" data-family="${p.family}" data-notes="${p.notes.map(noteKey).join(' ')}" data-price="${fromPrice(p)}" data-name="${esc(p.name.toLowerCase())}">
  <a class="card__media" href="${L.path(productPath(p))}" tabindex="-1" aria-hidden="true">${picture(p.slug, t.cardAlt(p.name, L.list(notes)), { sizes: '(min-width: 1080px) 280px, (min-width: 720px) 31vw, 46vw', eager })}</a>
  <button class="wish" type="button" data-wish="${p.slug}" aria-pressed="false" aria-label="${esc(t.saveTo(p.name))}">${icon.heart}</button>
  <div class="card__body">
    <p class="card__accord">${esc(L.accord(p))}</p>
    <h3 class="card__name"><a href="${L.path(productPath(p))}" lang="en" dir="ltr">${nameHtml(p.name)}</a></h3>
    ${L.ar ? `<p class="card__translit">${esc(p.nameAr)}</p>` : ''}
    <p class="card__notes">${esc(notes.join(L.sep))}</p>
    <p class="card__price">${esc(t.from(L.money(fromPrice(p))))}</p>
    <div class="card__add"><button class="btn btn--ghost btn--small" type="button" data-add="${p.slug}" data-ml="${smallest.ml}"><span>${esc(t.addMl(smallest.ml))}</span></button></div>
  </div>
</article>`;
}

function searchBox(L) {
  const { t } = L;
  return `<div class="search search--header" data-search>
  <form class="search__form" action="${L.path('/shop/')}" role="search">
    <label class="sr" for="site-search">${t.searchLabel}</label>
    <input class="search__input" id="site-search" name="q" type="search" placeholder="${esc(t.searchPlaceholder)}" maxlength="80" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="search" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="site-search-results">
    <button class="search__clear" type="button" data-search-clear aria-label="${t.clearSearch}" hidden>${icon.close}</button>
  </form>
  <div class="search__panel" id="site-search-results" data-search-panel hidden></div>
</div>`;
}

function langLink(L, path, className) {
  const other = locale(L.other);
  return `<a class="${className}" href="${other.path(path)}" hreflang="${other.lang}" lang="${other.lang}" data-lang-switch>${icon.globe}<span>${other.t.langName}</span></a>`;
}

function header(L, path, switchPath) {
  const { t } = L;
  const items = [
    ['/shop/', t.shopAll],
    ...families.map((f) => [`/shop/${f.key}/`, L.famName(f)]),
    ['/offers/', t.bundleOffer],
    ['/contact/', t.help],
  ];
  const links = items
    .map(
      ([href, label]) =>
        `<a href="${L.path(href)}"${href === path ? ' aria-current="page"' : ''}>${esc(label)}</a>`
    )
    .join('');
  return `<header class="header">
  <div class="wrap header__inner">
    <button class="icon-btn header__menu" type="button" data-open-menu aria-label="${t.openMenu}" aria-haspopup="dialog" aria-controls="menu">${icon.menu}</button>
    <a class="logo" href="${L.path('/')}" aria-label="${esc(t.home)}"><img src="/assets/img/logo.webp" width="77" height="96" alt=""></a>
    <nav class="nav" aria-label="${t.mainNav}">${links}</nav>
    ${searchBox(L)}
    <button class="header__cancel" type="button" data-close-search>${t.cancel}</button>
    <div class="tools">
      ${langLink(L, switchPath, 'lang-switch')}
      <button class="icon-btn tools__search" type="button" data-open-search aria-label="${t.search}" aria-controls="site-search" aria-expanded="false">${icon.search}</button>
      <a class="icon-btn tools__wish" href="${L.path('/wishlist/')}" aria-label="${t.wishlist}">${icon.heartLine}<span class="count" data-wish-count hidden></span></a>
      <a class="icon-btn" href="${L.path('/cart/')}" data-open-cart aria-label="${t.cart}">${icon.bag}<span class="count" data-cart-count hidden></span></a>
    </div>
  </div>
</header>
<div class="search-scrim" data-close-search hidden></div>`;
}

function menu(L, path, switchPath) {
  const { t } = L;
  const item = (href, label, meta) =>
    `<a href="${L.path(href)}"${href === path ? ' aria-current="page"' : ''}><span>${esc(label)}</span>${meta ? `<span class="menu-nav__meta">${esc(meta)}</span>` : ''}${icon.arrow}</a>`;
  return `<dialog class="sheet sheet--start" id="menu" aria-label="${t.menu}">
  <div class="sheet__inner">
    <div class="sheet__head">
      <img src="/assets/img/logo.webp" width="77" height="96" alt="X Note">
      <button class="icon-btn" type="button" data-close-sheet aria-label="${t.closeMenu}" autofocus>${icon.close}</button>
    </div>
    <div class="sheet__body">
      <nav class="menu-nav" aria-label="${t.menuShop}">
        ${item('/shop/', t.shopAll, t.count(products.length))}
        ${families.map((f) => item(`/shop/${f.key}/`, L.famName(f), t.count(products.filter((p) => p.family === f.key).length))).join('')}
        ${item('/offers/', t.trilogy, L.money(bundle.price))}
      </nav>
      <ul class="menu-links">
        <li><a href="${L.path('/wishlist/')}">${t.wishlist} <span class="count count--inline" data-wish-count hidden></span></a></li>
        <li><a href="${L.path('/contact/')}">${t.helpContact}</a></li>
        <li><a href="${L.path('/contact/')}#delivery">${t.deliveryPayment}</a></li>
        <li><a href="${L.path('/about/')}">${t.about}</a></li>
        <li>${langLink(L, switchPath, 'menu-lang')}</li>
      </ul>
    </div>
    <div class="sheet__foot">
      <a class="btn btn--wa btn--block" href="https://wa.me/${site.whatsapp}" rel="noopener" target="_blank">${t.chatWhatsApp}</a>
    </div>
  </div>
</dialog>`;
}

function footer(L, switchPath) {
  const { t } = L;
  return `<footer class="footer">
  <div class="wrap">
    <div class="footer__grid">
      <div class="footer__brand">
        <img src="/assets/img/logo.webp" width="77" height="96" alt="X Note" loading="lazy">
        <p>${t.footerBlurb}</p>
      </div>
      <div>
        <h2>${t.footShop}</h2>
        <ul>
          <li><a href="${L.path('/shop/')}">${t.allFragrances}</a></li>
          ${families.map((f) => `<li><a href="${L.path(`/shop/${f.key}/`)}">${esc(L.famName(f))}</a></li>`).join('')}
          <li><a href="${L.path('/offers/')}">${t.trilogy}</a></li>
        </ul>
      </div>
      <div>
        <h2>${t.footHelp}</h2>
        <ul>
          <li><a href="${L.path('/contact/')}">${t.contactFaq}</a></li>
          <li><a href="${L.path('/contact/')}#delivery">${t.deliveryPayment}</a></li>
          <li><a href="${L.path('/about/')}">${t.about}</a></li>
          <li><a href="${L.path('/wishlist/')}">${t.wishlist}</a></li>
        </ul>
      </div>
      <div>
        <h2>${t.follow}</h2>
        <ul>
          ${site.social.map((s) => `<li><a href="${s.url}" rel="noopener" target="_blank">${L.ar ? s.nameAr : s.name}</a></li>`).join('')}
          <li><a href="https://wa.me/${site.whatsapp}" rel="noopener" target="_blank">${L.ar ? 'واتساب' : 'WhatsApp'}</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__base">
      <p>&copy; <span data-year>${new Date().getFullYear()}</span> ${t.rights}</p>
      ${langLink(L, switchPath, 'footer-lang')}
      <p>${t.siteBy} <a href="${site.credit.url}" rel="noopener" target="_blank">${site.credit.name}</a></p>
    </div>
  </div>
</footer>`;
}

function drawer(L) {
  const { t } = L;
  return `<dialog class="sheet sheet--end" id="cart-drawer" aria-labelledby="drawer-title">
  <div class="sheet__inner">
    <div class="sheet__head">
      <h2 id="drawer-title" class="sheet__title">${t.yourCart} <span class="muted" data-drawer-count></span></h2>
      <button class="icon-btn" type="button" data-close-sheet aria-label="${t.closeCart}">${icon.close}</button>
    </div>
    <div class="sheet__body" data-drawer-lines></div>
    <div class="sheet__foot" data-drawer-foot>
      <div class="totals"><div class="total"><span>${t.subtotal}</span><span data-drawer-subtotal></span></div></div>
      <p class="small muted">${t.shippingAdded(L.money(site.shipping[0].price), L.money(site.shipping[1].price))}</p>
      <a class="btn btn--block" href="${L.path('/cart/')}">${t.goCheckout}</a>
      <button class="btn btn--ghost btn--block" type="button" data-close-sheet>${t.keepShopping}</button>
    </div>
  </div>
</dialog>`;
}

export function layout(
  L,
  {
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
    alternates = true,
  }
) {
  const { t } = L;
  const url = L.path(path);
  const fullTitle = path === '/' ? title : `${title} | X Note`;
  const switchPath = alternates ? path : '/';
  const shareImage = abs(image || '/assets/img/share.jpg');
  const alt = alternates
    ? LANGS.map(
        (lang) => `<link rel="alternate" hreflang="${lang}" href="${abs(locale(lang).path(path))}">`
      ).join('\n') + `\n<link rel="alternate" hreflang="x-default" href="${abs(path)}">\n`
    : '';
  return `<!doctype html>
<html lang="${L.lang}" dir="${L.dir}">
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="${CSP}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${abs(url)}">
${alt}${noindex ? '<meta name="robots" content="noindex">\n' : ''}<meta name="theme-color" content="#f3f4f1">
<link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta property="og:site_name" content="X Note">
<meta property="og:type" content="${path.startsWith('/perfumes/') ? 'product' : 'website'}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${abs(url)}">
<meta property="og:image" content="${shareImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="${L.ar ? 'ar_EG' : 'en_EG'}">
<meta property="og:locale:alternate" content="${L.ar ? 'en_EG' : 'ar_EG'}">
<meta name="twitter:card" content="summary_large_image">
<link rel="preload" href="/assets/fonts/${L.ar ? 'amiri-arabic' : 'bodoni-moda-latin'}.woff2" as="font" type="font/woff2" crossorigin>
${preload}<style>${css}</style>
${jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`).join('\n')}
<script src="/assets/js/site.js?v=${jsVersion}" defer></script>
</head>
<body>
<a class="skip" href="#main">${t.skip}</a>
<aside class="bar" aria-label="${t.barLabel}"><p><span>${t.barMain}</span> <span class="bar__more">${t.barMore}</span></p></aside>
${header(L, path, switchPath)}
<main id="main">
${body}
</main>
${footer(L, switchPath)}
${menu(L, path, switchPath)}
${drawer(L)}
<div class="toast" role="status" aria-live="polite" data-toast></div>
</body>
</html>
`;
}

const breadcrumbs = (L, items) =>
  `<nav class="crumbs wrap" aria-label="${L.ar ? 'مسار التنقل' : 'Breadcrumb'}"><ol>${items.map((it, i) => `<li>${i === items.length - 1 ? `<span aria-current="page">${esc(it.name)}</span>` : `<a href="${L.path(it.path)}">${esc(it.name)}</a>`}</li>`).join('')}</ol></nav>`;

const breadcrumbLd = (L, items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: abs(L.path(it.path)),
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

function bundleBand(L, { headingLevel = 'h2', eager = false } = {}) {
  const { t } = L;
  const total = bundleTotal();
  const H = headingLevel;
  const names = bundle.items.map((s) => bySlug(s).name);
  return `<section class="band section" aria-labelledby="bundle-title">
  <div class="wrap band__grid">
    <div class="band__media">${heroPicture(t.bundleAlt, '(min-width: 900px) 56vw, 100vw', eager)}</div>
    <div class="band__text">
      <${H} class="h2" id="bundle-title">${esc(L.bundleName())}</${H}>
      <p class="lede">${t.bundleLede(bundle.ml)}</p>
      <ul class="band__list">
        ${bundle.items
          .map((slug) => {
            const p = bySlug(slug);
            return `<li><a href="${L.path(productPath(p))}" lang="en" dir="ltr">${esc(p.name)}</a><span class="muted">${esc(L.accord(p))}</span></li>`;
          })
          .join('')}
      </ul>
      <p class="band__price"><strong>${L.money(bundle.price)}</strong><s>${L.money(total)}</s><span>${t.youSave(L.money(total - bundle.price))}</span></p>
      <div class="band__actions">
        <button class="btn btn--light" type="button" data-add-bundle><span>${t.addBundle}</span></button>
        <a class="btn btn--outline-light" href="${waLink(t.waBundle(L.bundleName(), names.join(L.sep), L.money(bundle.price)))}" rel="noopener" target="_blank">${t.askWhatsApp}</a>
      </div>
    </div>
  </div>
</section>`;
}

export function homePage(ctx, L) {
  const { t } = L;
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const notes = noteIndex().filter((n) => n.count > 1);
  const fromAll = Math.min(...products.map(fromPrice));
  const faqItems = faqs[L.lang].slice(0, 4);
  const body = `
<section class="hero">
  <div class="wrap hero__grid">
    <div class="hero__text">
      <h1>${t.heroTitle}</h1>
      <p class="lede">${t.heroLede(products.length)}</p>
      <div class="hero__actions">
        <a class="btn" href="${L.path('/shop/')}">${t.shopAllFragrances}</a>
        <a class="btn btn--ghost" href="#notes">${t.shopByNote}</a>
      </div>
      <ul class="hero__facts">
        <li>${t.factFrom(L.money(fromAll))}</li>
        <li>${t.factDelivery}</li>
        <li>${t.factPay}</li>
      </ul>
    </div>
    <div class="hero__media">${heroPicture(t.heroAlt, '(min-width: 1240px) 700px, (min-width: 900px) 56vw, 100vw', true)}</div>
  </div>
</section>

<section class="section section--tight" id="notes" aria-labelledby="notes-title">
  <div class="wrap">
    <div class="section__head">
      <h2 id="notes-title">${t.shopByNote}</h2>
      <p class="muted">${t.notesIntro}</p>
    </div>
    <ul class="notes-index">
      ${notes.map((n) => `<li><a href="${L.path('/shop/')}?note=${n.key}" style="--w:${n.count}">${esc(L.note(n.name))}<sup><span class="sr">${L.sep}</span>${n.count}<span class="sr"> ${esc(t.count(n.count).replace(/^\d+ /, ''))}</span></sup></a></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="signatures-title">
  <div class="wrap">
    <div class="section__head">
      <h2 id="signatures-title">${t.signatures}</h2>
      <a class="link" href="${L.path('/shop/')}">${t.seeAll(products.length)}</a>
    </div>
    <div class="grid">${featured.map((p) => productCard(L, p)).join('')}</div>
  </div>
</section>

<section class="section section--tight" aria-labelledby="families-title">
  <div class="wrap">
    <div class="section__head"><h2 id="families-title">${t.byFamily}</h2></div>
    <div class="families">
      ${families
        .map((f) => {
          const list = products.filter((p) => p.family === f.key);
          const cover = list.find((p) => p.featured) || list[0];
          return `<a class="family" href="${L.path(`/shop/${f.key}/`)}"><div class="family__media">${picture(cover.slug, '', { sizes: '(min-width: 900px) 280px, 46vw' })}</div><h3>${esc(L.famName(f))}</h3><p>${esc(L.famBlurb(f))} ${esc(t.count(list.length))}.</p></a>`;
        })
        .join('')}
    </div>
  </div>
</section>

${bundleBand(L)}

<section class="section" aria-labelledby="how-title">
  <div class="wrap">
    <div class="section__head"><h2 id="how-title">${t.howTitle}</h2></div>
    <ol class="steps">
      ${t.steps.map(([h, p]) => `<li><h3>${h}</h3><p>${p}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="section section--tight" aria-labelledby="faq-title">
  <div class="wrap">
    <div class="section__head"><h2 id="faq-title">${t.questions}</h2><a class="link" href="${L.path('/contact/')}">${t.allQuestions}</a></div>
    ${faqList(faqItems)}
  </div>
</section>`;

  return layout(L, {
    ...ctx,
    path: '/',
    title: t.homeTitle,
    description: L.ar ? site.descriptionAr : site.description,
    body,
    preload: `<link rel="preload" as="image" type="image/avif" imagesrcset="${HERO_SET('avif')}" imagesizes="(min-width: 1240px) 700px, (min-width: 900px) 56vw, 100vw" fetchpriority="high">\n`,
    jsonld: [
      organizationLd(),
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'X Note',
        url: abs(L.path('/')),
        inLanguage: L.lang,
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: abs(L.path('/shop/')) + '?q={search_term_string}' },
          'query-input': 'required name=search_term_string',
        },
      },
      faqLd(faqItems),
    ],
  });
}

export function shopPage(ctx, L, family) {
  const { t } = L;
  const list = family ? products.filter((p) => p.family === family.key) : products;
  const path = family ? `/shop/${family.key}/` : '/shop/';
  const notes = [...new Set(list.flatMap((p) => p.notes))].sort((a, b) =>
    L.note(a).localeCompare(L.note(b), L.lang)
  );
  const title = family ? t.familyTitle(family) : t.allTitle;
  const crumbs = [
    { name: t.crumbHome, path: '/' },
    { name: t.crumbShop, path: '/shop/' },
    ...(family ? [{ name: L.famName(family), path }] : []),
  ];
  const minPrice = L.money(Math.min(...list.map(fromPrice)));
  const description = family
    ? t.familyDesc(family, list.length, minPrice)
    : t.allDesc(products.length, minPrice);

  const body = `
${breadcrumbs(L, crumbs)}
<div class="wrap">
  <header class="page-head">
    <h1>${esc(title)}</h1>
    <p class="lede">${family ? esc(L.famBlurb(family)) : t.shopLede}</p>
  </header>
  <div class="shop-tools">
    <nav class="chips" aria-label="${t.familiesLabel}">
      <a class="chip" href="${L.path('/shop/')}"${!family ? ' aria-current="page"' : ''}>${t.all}</a>
      ${families.map((f) => `<a class="chip" href="${L.path(`/shop/${f.key}/`)}"${family && family.key === f.key ? ' aria-current="page"' : ''}>${esc(L.famName(f))}</a>`).join('')}
    </nav>
    <form class="filters" data-filters>
      <div class="field field--search"><label for="search">${t.searchField}</label><input class="input" id="search" name="q" type="search" maxlength="80" enterkeyhint="search" placeholder="${esc(t.searchFieldPlaceholder)}" autocomplete="off"></div>
      <div class="field"><label for="note">${t.note}</label><select class="input" id="note" name="note"><option value="">${t.anyNote}</option>${notes.map((n) => `<option value="${noteKey(n)}">${esc(L.note(n))}</option>`).join('')}</select></div>
      <div class="field"><label for="sort">${t.sortBy}</label><select class="input" id="sort" name="sort"><option value="">${t.featured}</option><option value="price-asc">${t.priceAsc}</option><option value="price-desc">${t.priceDesc}</option><option value="name">${t.nameAz}</option></select></div>
    </form>
  </div>
  <h2 class="sr">${t.fragrances}</h2>
  <div class="result-line"><p data-result-count aria-live="polite">${esc(t.count(list.length))}</p><button type="button" data-clear-filters hidden>${t.clearFilters}</button></div>
  <div class="grid" data-grid>${list.map((p, i) => productCard(L, p, { eager: i < 2 })).join('')}</div>
  <div class="empty" data-empty hidden>
    <h2>${t.emptyTitle}</h2>
    <p class="muted">${t.emptyText(!!family)}</p>
    <button class="btn" type="button" data-clear-filters>${t.clearFilters}</button>
  </div>
</div>
<div class="section--tight"></div>`;

  return layout(L, {
    ...ctx,
    path,
    title,
    description,
    body,
    jsonld: [
      breadcrumbLd(L, crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: title,
        itemListElement: list.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: abs(L.path(productPath(p))),
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

export function productPage(ctx, L, p) {
  const { t } = L;
  const fam = familyOf(p.family);
  const path = productPath(p);
  const first = p.sizes[0];
  const crumbs = [
    { name: t.crumbHome, path: '/' },
    { name: t.crumbShop, path: '/shop/' },
    { name: L.famName(fam), path: `/shop/${fam.key}/` },
    { name: p.name, path },
  ];
  const notes4 = L.list(p.notes.slice(0, 4).map(L.note));
  const sizes = L.list(p.sizes.map((s) => String(s.ml)));
  const description = t.productDesc(p, L.ar ? notes4 : notes4.toLowerCase(), sizes, L.money(fromPrice(p)));
  const sizeGuideFor = sizeGuide.filter((g) => p.sizes.some((s) => s.ml === g.ml));
  const [s1, s2] = site.shipping.map((s) => L.ship(s, L.money));

  const body = `
${breadcrumbs(L, crumbs)}
<div class="wrap">
  <div class="pdp">
    <div class="pdp__media" style="view-transition-name:product-photo">${picture(p.slug, t.productAlt(p.name, L.ar ? notes4 : notes4.toLowerCase()), { sizes: '(min-width: 1240px) 640px, (min-width: 900px) 52vw, 100vw', eager: true })}</div>
    <div class="pdp__info">
      <div class="pdp__title">
        <a href="${L.path(`/shop/${fam.key}/`)}">${esc(L.accord(p))}</a>
        <h1><span lang="en" dir="ltr">${nameHtml(p.name)}</span>${L.ar ? `<span class="pdp__translit">${esc(p.nameAr)}</span>` : ''}</h1>
      </div>
      <p class="pdp__price"><span data-pdp-price>${L.money(first.price)}</span> <span data-pdp-ml>${t.forMl(first.ml)}</span></p>
      <p>${esc(L.desc(p))}</p>
      <form class="buy" data-buy="${p.slug}">
        <fieldset class="options options--row">
          <legend>${t.size}</legend>
          ${p.sizes.map((s, i) => `<label class="option"><input type="radio" name="ml" value="${s.ml}" data-price="${s.price}"${i === 0 ? ' checked' : ''}><span class="option__box"><strong>${s.ml} ${t.ml}</strong><span>${L.money(s.price)}</span></span></label>`).join('')}
        </fieldset>
        <div class="buy__row">
          <div class="qty"><button type="button" data-step="-1" aria-label="${t.decQty}">&minus;</button><input name="qty" type="number" inputmode="numeric" min="1" max="10" value="1" aria-label="${t.quantity}"><button type="button" data-step="1" aria-label="${t.incQty}">+</button></div>
          <button class="btn" type="submit" data-buy-submit><span>${t.addToCart}</span></button>
          <button class="wish wish--inline" type="button" data-wish="${p.slug}" aria-pressed="false" aria-label="${esc(t.saveTo(p.name))}">${icon.heart}</button>
        </div>
        <a class="btn btn--wa btn--block" data-wa-now href="${waLink(t.waOrder(p.name, first.ml))}" rel="noopener" target="_blank">${t.orderNow}</a>
      </form>
      <section aria-labelledby="notes-h">
        <h2 id="notes-h" class="sr">${t.notes}</h2>
        <p class="small muted" style="margin-bottom:10px">${t.notesHint}</p>
        <ul class="pdp__notes">${p.notes.map((n) => `<li><a href="${L.path('/shop/')}?note=${noteKey(n)}">${esc(L.note(n))}</a></li>`).join('')}</ul>
      </section>
      <ul class="facts">
        <li>${icon.truck}<span>${esc(t.shipFact(s1, s2))}</span></li>
        <li>${icon.wallet}<span>${t.payFact}</span></li>
        <li>${icon.chat}<span>${t.questionFact} <a class="link" href="${waLink(t.waQuestion(p.name))}" rel="noopener" target="_blank">${t.askUs}</a>.</span></li>
      </ul>
    </div>
  </div>
</div>

<section class="section section--tight" aria-labelledby="size-title" style="border-top:1px solid var(--line)">
  <div class="wrap split">
    <div class="prose">
      <h2 id="size-title">${t.sizeTitle}</h2>
      <p>${esc(t.sizeIntro(p.name, p.sizes[0].ml))}</p>
    </div>
    <ul class="size-guide">${sizeGuideFor.map((g) => `<li><strong>${g.ml} ${t.ml}</strong><p>${esc(t.sizeLine(L.ar ? g.useAr : g.use, L.ar ? g.spraysAr : g.sprays, L.money(p.sizes.find((s) => s.ml === g.ml).price)))}</p></li>`).join('')}</ul>
  </div>
</section>

<section class="section section--tight" aria-labelledby="related-title">
  <div class="wrap">
    <div class="section__head"><h2 id="related-title">${t.related}</h2><a class="link" href="${L.path(`/shop/${fam.key}/`)}">${esc(t.moreFamily(fam))}</a></div>
    <div class="grid">${related(p)
      .map((o) => productCard(L, o))
      .join('')}</div>
  </div>
</section>

<div class="buybar" data-buybar aria-hidden="true">
  <p><span lang="en" dir="ltr">${esc(p.name)}</span><strong data-buybar-price>${L.money(first.price)}${L.sep}${first.ml} ${t.ml}</strong></p>
  <button class="btn" type="button" data-buybar-add tabindex="-1"><span>${t.addToCart}</span></button>
</div>`;

  return layout(L, {
    ...ctx,
    path,
    title: t.productTitle(p),
    description,
    body,
    image: `/assets/img/products/${p.slug}-share.jpg`,
    preload: `<link rel="preload" as="image" type="image/avif" imagesrcset="${srcset(p.slug, 'avif')}" imagesizes="(min-width: 1240px) 640px, (min-width: 900px) 52vw, 100vw" fetchpriority="high">\n`,
    jsonld: [
      breadcrumbLd(L, crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: p.name,
        ...(L.ar ? { alternateName: p.nameAr } : {}),
        description: L.desc(p),
        inLanguage: L.lang,
        image: [abs(imgSrc(p.slug, 960))],
        sku: p.slug,
        brand: { '@type': 'Brand', name: 'X Note' },
        category: L.ar ? 'عطور' : 'Perfume',
        additionalProperty: p.notes.map((n) => ({
          '@type': 'PropertyValue',
          name: L.ar ? 'نوتة' : 'Note',
          value: L.note(n),
        })),
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: site.currency,
          lowPrice: fromPrice(p),
          highPrice: toPrice(p),
          offerCount: p.sizes.length,
          availability: 'https://schema.org/InStock',
          url: abs(L.path(path)),
          seller: { '@id': site.url + '/#org' },
        },
      },
    ],
  });
}

export function offersPage(ctx, L) {
  const { t } = L;
  const total = bundleTotal();
  const names = bundle.items.map((s) => bySlug(s).name);
  const crumbs = [
    { name: t.crumbHome, path: '/' },
    { name: t.bundleCrumb, path: '/offers/' },
  ];
  const body = `
${breadcrumbs(L, crumbs)}
${bundleBand(L, { headingLevel: 'h1', eager: true })}
<section class="section" aria-labelledby="inside-title">
  <div class="wrap">
    <div class="section__head"><h2 id="inside-title">${t.inside}</h2><p class="muted">${t.insideText(bundle.ml, L.money(total))}</p></div>
    <div class="grid">${bundle.items.map((slug) => productCard(L, bySlug(slug))).join('')}</div>
  </div>
</section>`;
  return layout(L, {
    ...ctx,
    path: '/offers/',
    title: t.offersTitle(bundle, L.money(bundle.price)),
    description: t.offersDesc(names.join(L.sep), bundle.ml, L.money(bundle.price), L.money(total)),
    body,
    image: `/assets/img/share.jpg`,
    jsonld: [
      breadcrumbLd(L, crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: L.bundleName(),
        description: t.offersDesc(names.join(L.sep), bundle.ml, L.money(bundle.price), L.money(total)),
        inLanguage: L.lang,
        image: [abs('/assets/img/hero-1536.webp')],
        sku: bundle.slug,
        brand: { '@type': 'Brand', name: 'X Note' },
        offers: {
          '@type': 'Offer',
          price: bundle.price,
          priceCurrency: site.currency,
          availability: 'https://schema.org/InStock',
          url: abs(L.path('/offers/')),
        },
      },
    ],
  });
}

export function cartPage(ctx, L) {
  const { t } = L;
  const body = `
<div class="wrap">
  <header class="page-head"><h1 data-cart-title>${t.yourCart}</h1></header>
  <div data-cart-view>
    <div class="empty" data-cart-empty hidden>
      <h2>${t.emptyCart}</h2>
      <p class="muted">${t.emptyCartText}</p>
      <a class="btn" href="${L.path('/shop/')}">${t.shopAllFragrances}</a>
    </div>
    <form class="cart" id="checkout" data-checkout novalidate hidden>
      <div class="cart__form">
        <section class="form-block" aria-labelledby="items-title">
          <h2 id="items-title" class="form-title">${t.items}</h2>
          <div class="lines" data-cart-lines></div>
        </section>
        <section class="form-block" aria-labelledby="details-title">
          <h2 id="details-title" class="form-title">${t.deliveryDetails}</h2>
          <div class="form-grid form-grid--2">
            <div class="field"><label for="c-name">${t.fullName}</label><input class="input" id="c-name" name="name" autocomplete="name" maxlength="80" required><p class="error" id="c-name-error"></p></div>
            <div class="field"><label for="c-phone">${t.mobile} <span class="hint">${t.mobileHint}</span></label><input class="input" id="c-phone" name="phone" type="tel" dir="ltr" maxlength="20" inputmode="tel" autocomplete="tel" placeholder="01X XXXX XXXX" required><p class="error" id="c-phone-error"></p></div>
            <div class="field"><label for="c-gov">${t.governorate}</label><select class="input" id="c-gov" name="governorate" autocomplete="address-level1" required><option value="">${t.chooseGov}</option>${governorates.map(([en, ar]) => `<option value="${en}">${L.ar ? ar : en}</option>`).join('')}</select><p class="error" id="c-gov-error"></p></div>
            <div class="field"><label for="c-city">${t.city}</label><input class="input" id="c-city" name="city" autocomplete="address-level2" maxlength="60" required><p class="error" id="c-city-error"></p></div>
            <div class="field span-2"><label for="c-address">${t.street} <span class="hint">${t.streetHint}</span></label><textarea class="input" id="c-address" name="address" autocomplete="street-address" maxlength="200" rows="2" required></textarea><p class="error" id="c-address-error"></p></div>
            <div class="field span-2"><label for="c-notes">${t.orderNotes} <span class="hint">${t.orderNotesHint}</span></label><textarea class="input" id="c-notes" name="notes" rows="2" maxlength="300"></textarea></div>
            <label class="check span-2"><input type="checkbox" id="c-remember" name="remember" checked><span>${t.remember}</span></label>
          </div>
        </section>
        <fieldset class="form-block options">
          <legend class="form-title">${t.shipping}</legend>
          ${site.shipping
            .map((s, i) => {
              const v = L.ship(s, L.money);
              return `<label class="option option--row"><input type="radio" name="shipping" value="${s.key}"${i === 0 ? ' checked' : ''}><span class="option__box"><span><strong>${esc(v.name)}</strong><br><span>${esc(v.days)}</span></span><strong>${v.price}</strong></span></label>`;
            })
            .join('')}
        </fieldset>
        <fieldset class="form-block options">
          <legend class="form-title">${t.payment}</legend>
          ${site.payments.map((m, i) => `<label class="option option--row"><input type="radio" name="payment" value="${m.key}"${i === 0 ? ' checked' : ''}><span class="option__box"><span><strong>${esc(L.pay(m))}</strong><br><span>${t.payDetails}</span></span></span></label>`).join('')}
        </fieldset>
      </div>
      <aside class="cart__summary" aria-labelledby="summary-title">
        <h2 id="summary-title" class="form-title">${t.summary}</h2>
        <div class="totals">
          <div><span>${t.subtotal}</span><span data-subtotal></span></div>
          <div><span>${t.shipping}</span><span data-shipping></span></div>
          <div class="total"><span>${t.total}</span><span data-total></span></div>
        </div>
        <button class="btn btn--wa btn--block" type="submit">${t.placeOrder}</button>
        <p class="small muted">${t.placeNote}</p>
        <p class="error" data-form-error role="alert"></p>
      </aside>
    </form>
    <div class="checkout-bar" data-checkout-bar aria-hidden="true">
      <p>${t.total}<strong data-total-bar></strong></p>
      <button class="btn btn--wa" type="submit" form="checkout" tabindex="-1">${t.placeShort}</button>
    </div>
  </div>
  <section class="done" data-done hidden tabindex="-1" aria-labelledby="done-title">
    <h2 id="done-title" class="h1">${t.doneTitle}</h2>
    <p class="lede">${t.doneText}</p>
    <p class="done__ref">${t.orderRef} <strong data-done-ref dir="ltr"></strong></p>
    <div class="hero__actions">
      <a class="btn btn--wa" data-done-wa href="#" rel="noopener" target="_blank">${t.openAgain}</a>
      <a class="btn btn--ghost" href="${L.path('/shop/')}">${t.continueShopping}</a>
    </div>
  </section>
</div>`;
  return layout(L, {
    ...ctx,
    path: '/cart/',
    title: t.cartTitle,
    description: t.cartDesc,
    body,
    noindex: true,
  });
}

export function wishlistPage(ctx, L) {
  const { t } = L;
  const body = `
<div class="wrap">
  <header class="page-head"><h1>${t.wishTitle}</h1><p class="lede">${t.wishLede}</p></header>
  <h2 class="sr">${t.savedFragrances}</h2>
  <div class="grid" data-wishlist-grid>${products.map((p) => productCard(L, p).replace('<article class="card"', '<article hidden class="card"')).join('')}</div>
  <div class="empty" data-wishlist-empty hidden>
    <h2>${t.nothingSaved}</h2>
    <p class="muted">${t.tapHeart}</p>
    <a class="btn" href="${L.path('/shop/')}">${t.shopAllFragrances}</a>
  </div>
</div>
<div class="section"></div>`;
  return layout(L, {
    ...ctx,
    path: '/wishlist/',
    title: t.wishTitle,
    description: t.wishDesc,
    body,
    noindex: true,
  });
}

export function aboutPage(ctx, L) {
  const { t } = L;
  const crumbs = [
    { name: t.crumbHome, path: '/' },
    { name: t.aboutCrumb, path: '/about/' },
  ];
  const body = `
${breadcrumbs(L, crumbs)}
<div class="wrap">
  <header class="page-head"><h1>${t.aboutTitle}</h1><p class="lede">${t.aboutLede}</p></header>
</div>
<section class="section section--tight">
  <div class="wrap split">
    <div class="hero__media" style="aspect-ratio:4/5">${picture('imperial-valley-qisah', t.aboutAlt, { sizes: '(min-width: 900px) 600px, 100vw' })}</div>
    <div class="prose">
      ${t.aboutSections.map(([h, ...ps], i) => `<h2${i ? ' style="margin-top:20px"' : ''}>${h}</h2>${ps.map((p) => `<p>${p}</p>`).join('')}`).join('')}
      <p><a class="btn" href="${L.path('/shop/')}">${t.shopAllFragrances}</a></p>
    </div>
  </div>
</section>`;
  return layout(L, {
    ...ctx,
    path: '/about/',
    title: t.aboutTitle,
    description: t.aboutDesc,
    body,
    jsonld: [breadcrumbLd(L, crumbs), organizationLd()],
  });
}

export function contactPage(ctx, L) {
  const { t } = L;
  const crumbs = [
    { name: t.crumbHome, path: '/' },
    { name: t.helpCrumb, path: '/contact/' },
  ];
  const list = faqs[L.lang];
  const methods = site.payments.map(L.pay);
  const socials = site.social.map(
    (s) => `<a class="link" href="${s.url}" rel="noopener" target="_blank">${L.ar ? s.nameAr : s.name}</a>`
  );
  const body = `
${breadcrumbs(L, crumbs)}
<div class="wrap">
  <header class="page-head"><h1>${t.contactTitle}</h1><p class="lede">${t.contactLede}</p></header>
  <div class="contact-cards">
    <div class="contact-card"><h2>${L.ar ? 'واتساب' : 'WhatsApp'}</h2><p>${t.waCardText}</p><a class="btn btn--wa" href="https://wa.me/${site.whatsapp}" rel="noopener" target="_blank">${t.chatOnWhatsApp}</a></div>
    <div class="contact-card" id="delivery"><h2>${t.delivery}</h2><p>${site.shipping.map((s) => esc(t.deliveryLine(L.ship(s, L.money)))).join(' ')} ${t.everyGov}</p></div>
    <div class="contact-card"><h2>${t.payment}</h2><p>${esc(t.payText(methods.join(' ' + t.or + ' ')))}</p></div>
  </div>
</div>
<section class="section" aria-labelledby="faq-title">
  <div class="wrap">
    <div class="section__head"><h2 id="faq-title">${t.faqTitle}</h2></div>
    ${faqList(list)}
    <p style="margin-top:28px" class="muted">${t.followUs} ${L.list(socials)}.</p>
  </div>
</section>`;
  return layout(L, {
    ...ctx,
    path: '/contact/',
    title: t.contactTitle,
    description: t.contactDesc,
    body,
    jsonld: [breadcrumbLd(L, crumbs), faqLd(list)],
  });
}

export function orderCheckPage(ctx) {
  const L = locale('en');
  const body = `
<div class="wrap">
  <header class="page-head">
    <h1>Check an order</h1>
    <p class="lede">For the X Note team. Paste an order message from WhatsApp, in English or Arabic, and every line is recalculated with today's prices, so anything changed before it was sent stands out.</p>
  </header>
  <form class="order-check" data-order-check>
    <div class="field"><label for="oc-text">Order message</label><textarea class="input" id="oc-text" rows="12" maxlength="6000" placeholder="Paste the whole message here" spellcheck="false" dir="auto"></textarea></div>
    <div class="hero__actions"><button class="btn" type="submit">Check order</button><button class="btn btn--ghost" type="button" data-oc-clear>Clear</button></div>
  </form>
  <section class="oc-result" data-oc-result hidden tabindex="-1" aria-live="polite" aria-label="Result"></section>
</div>
<div class="section"></div>`;
  return layout(L, {
    ...ctx,
    path: '/order-check/',
    title: 'Check an order',
    description: 'Recalculate an X Note WhatsApp order with current prices.',
    body,
    noindex: true,
    alternates: false,
  });
}

export function notFoundPage(ctx) {
  const L = locale('en');
  const ar = locale('ar');
  const body = `
<div class="wrap not-found">
  <h1>This page does not exist</h1>
  <p class="lede">The link may be old or mistyped. Every fragrance is still in the shop.</p>
  <div class="hero__actions"><a class="btn" href="/shop/">Shop all fragrances</a><a class="btn btn--ghost" href="/">Go to the home page</a></div>
  <div lang="ar" dir="rtl" class="not-found__ar">
    <h2>${ar.t.notFoundTitle}</h2>
    <p class="lede">ربما الرابط قديم أو به خطأ. كل العطور ما زالت في المتجر.</p>
    <div class="hero__actions"><a class="btn" href="/ar/shop/">تسوّق كل العطور</a><a class="btn btn--ghost" href="/ar/">الصفحة الرئيسية</a></div>
  </div>
</div>`;
  return layout(L, {
    ...ctx,
    path: '/404.html',
    title: 'Page not found',
    description: 'This page does not exist.',
    body,
    noindex: true,
    alternates: false,
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
