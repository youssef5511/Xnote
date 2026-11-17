(function () {
  'use strict';

  if (window.self !== window.top) {
    document.documentElement.style.display = 'none';
    try {
      window.top.location.replace(window.location.href);
    } catch (e) {}
    return;
  }

  var DATA = __DATA__;
  var CART_KEY = 'xnote_cart_v2';
  var WISH_KEY = 'xnote_wish_v2';
  var CUSTOMER_KEY = 'xnote_customer';
  var MAX_QTY = 10;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  var AR = document.documentElement.lang === 'ar';
  var BASE = AR ? '/ar' : '';
  var iso = function (s) {
    return AR ? '\u2068' + s + '\u2069' : s;
  };
  var countAr = function (n, forms) {
    return n === 1
      ? forms[0]
      : n === 2
        ? forms[1]
        : n >= 3 && n <= 10
          ? n + ' ' + forms[2]
          : n + ' ' + forms[3];
  };
  var I = AR
    ? {
        ml: 'مل',
        bundleMeta: function (ml) {
          return 'ثلاث زجاجات ' + ml + '\u00a0مل';
        },
        lineMeta: function (ml, price) {
          return ml + '\u00a0مل، ' + price + ' للزجاجة';
        },
        lineLabel: function (name, ml) {
          return iso(name) + '، ' + ml + '\u00a0مل';
        },
        addedToast: function (label) {
          return 'تمت إضافة ' + label + ' إلى السلة';
        },
        added: 'تمت الإضافة',
        removedToast: function (label) {
          return 'تم حذف ' + label;
        },
        wishSaved: function (name) {
          return 'تم حفظ ' + iso(name) + ' في المفضلة';
        },
        wishRemoved: function (name) {
          return 'تم حذف ' + iso(name) + ' من المفضلة';
        },
        wishAria: function (on, name) {
          return on ? 'حذف ' + name + ' من المفضلة' : 'حفظ ' + name + ' في المفضلة';
        },
        cartAria: function (n) {
          return 'السلة، ' + (n === 0 ? 'فارغة' : countAr(n, ['منتج واحد', 'منتجان', 'منتجات', 'منتجًا']));
        },
        dec: function (l) {
          return 'تقليل كمية ' + l;
        },
        inc: function (l) {
          return 'زيادة كمية ' + l;
        },
        qtyOf: function (l) {
          return 'كمية ' + l;
        },
        removeOf: function (l) {
          return 'حذف ' + l;
        },
        remove: 'حذف',
        drawerEmpty: 'سلتك فارغة.',
        drawerEmptyHint: 'اكتشف عطرًا من النوتات التي تحبها.',
        shopAll: 'تسوّق كل العطور',
        popular: 'نوتات شائعة',
        none: function (q) {
          return 'لا توجد نتائج لـ «' + q + '». جرّب نوتة:';
        },
        resultsLabel: 'العطور',
        resultLine: function (p, price) {
          return p.nameAr + '، يبدأ من ' + price;
        },
        seeAll: function (n) {
          return 'شاهد كل النتائج (' + n + ')';
        },
        showIt: 'اعرضه في المتجر',
        showThese: 'اعرضها في المتجر',
        forMl: function (q, ml) {
          return q > 1 ? 'لعدد ' + q + ' × ' + ml + '\u00a0مل' : 'لحجم ' + ml + '\u00a0مل';
        },
        barPrice: function (price, q, ml) {
          return price + '، ' + (q > 1 ? q + ' × ' : '') + ml + '\u00a0مل';
        },
        waOrder: function (name, ml, q) {
          return 'مرحبًا، أريد طلب ' + name + ' (' + ml + ' مل)' + (q > 1 ? ' × ' + q : '') + '.';
        },
        count: function (n) {
          return n === 0 ? 'لا توجد عطور' : countAr(n, ['عطر واحد', 'عطران', 'عطور', 'عطرًا']);
        },
        withNote: function (name) {
          return ' تحتوي على ' + name;
        },
        forQuery: function (q) {
          return ' لبحث «' + q + '»';
        },
        errName: 'اكتب اسمك بالكامل.',
        errPhone: 'اكتب رقم موبايل مصري، مثل 010 1234 5678.',
        errGov: 'اختر محافظتك.',
        errCity: 'اكتب المدينة أو المنطقة.',
        errAddress: 'اكتب العنوان بالتفصيل.',
        formError: function (n) {
          return n === 1
            ? 'يوجد بيان واحد يحتاج تصحيحًا بالأعلى.'
            : 'يوجد ' + n + ' بيانات تحتاج تصحيحًا بالأعلى.';
        },
        msg: {
          title: 'طلب جديد من موقع X Note',
          order: 'رقم الطلب',
          items: 'المنتجات',
          subtotal: 'المجموع الفرعي',
          shipping: 'الشحن',
          total: 'الإجمالي',
          payment: 'الدفع',
          delivery: 'التوصيل',
          name: 'الاسم',
          mobile: 'الموبايل',
          address: 'العنوان',
          notes: 'ملاحظات',
          confirm: 'برجاء تأكيد طلبي.',
          sep: '، ',
        },
        doneTitle: 'طلبك جاهز للإرسال',
      }
    : {
        ml: 'ml',
        bundleMeta: function (ml) {
          return 'Three ' + ml + '\u00a0ml bottles';
        },
        lineMeta: function (ml, price) {
          return ml + '\u00a0ml, ' + price + ' each';
        },
        lineLabel: function (name, ml) {
          return name + ', ' + ml + '\u00a0ml';
        },
        addedToast: function (label) {
          return label + ' added to your cart';
        },
        added: 'Added',
        removedToast: function (label) {
          return label + ' removed';
        },
        wishSaved: function (name) {
          return name + ' saved to your wishlist';
        },
        wishRemoved: function (name) {
          return name + ' removed from your wishlist';
        },
        wishAria: function (on, name) {
          return (on ? 'Remove ' : 'Save ') + name + (on ? ' from' : ' to') + ' wishlist';
        },
        cartAria: function (n) {
          return 'Cart, ' + n + (n === 1 ? ' item' : ' items');
        },
        dec: function (l) {
          return 'Decrease quantity of ' + l;
        },
        inc: function (l) {
          return 'Increase quantity of ' + l;
        },
        qtyOf: function (l) {
          return 'Quantity of ' + l;
        },
        removeOf: function (l) {
          return 'Remove ' + l;
        },
        remove: 'Remove',
        drawerEmpty: 'Your cart is empty.',
        drawerEmptyHint: 'Find a fragrance by the notes you love.',
        shopAll: 'Shop all fragrances',
        popular: 'Popular notes',
        none: function (q) {
          return 'Nothing matches “' + q + '”. Try a note instead:';
        },
        resultsLabel: 'Fragrances',
        resultLine: function (p, price) {
          return p.accord + ', from ' + price;
        },
        seeAll: function (n) {
          return 'See all ' + n + ' results';
        },
        showIt: 'Show it in the shop',
        showThese: 'Show these in the shop',
        forMl: function (q, ml) {
          return q > 1 ? 'for ' + q + ' × ' + ml + '\u00a0ml' : 'for ' + ml + '\u00a0ml';
        },
        barPrice: function (price, q, ml) {
          return price + ', ' + (q > 1 ? q + ' × ' : '') + ml + '\u00a0ml';
        },
        waOrder: function (name, ml, q) {
          return 'Hello, I would like to order ' + name + ' (' + ml + ' ml)' + (q > 1 ? ' × ' + q : '') + '.';
        },
        count: function (n) {
          return n + (n === 1 ? ' fragrance' : ' fragrances');
        },
        withNote: function (name) {
          return ' with ' + name;
        },
        forQuery: function (q) {
          return ' for “' + q + '”';
        },
        errName: 'Enter your full name.',
        errPhone: 'Enter an Egyptian mobile number like 01012345678.',
        errGov: 'Choose your governorate.',
        errCity: 'Enter your city or area.',
        errAddress: 'Enter your street address.',
        formError: function (n) {
          return n === 1 ? 'One detail needs fixing above.' : n + ' details need fixing above.';
        },
        msg: {
          title: 'New order from the X Note website',
          order: 'Order',
          items: 'Items',
          subtotal: 'Subtotal',
          shipping: 'Shipping',
          total: 'Total',
          payment: 'Payment',
          delivery: 'Delivery',
          name: 'Name',
          mobile: 'Mobile',
          address: 'Address',
          notes: 'Notes',
          confirm: 'Please confirm my order.',
          sep: ', ',
        },
        doneTitle: 'Order ready to send',
      };
  function money(n, lang) {
    var ar = lang ? lang === 'ar' : AR;
    return n.toLocaleString('en-US') + '\u00a0' + (ar ? DATA.currencyAr : DATA.currency);
  }
  function pName(p) {
    return AR ? p.nameAr : p.name;
  }
  function bySlug(slug) {
    for (var i = 0; i < DATA.products.length; i++)
      if (DATA.products[i].slug === slug) return DATA.products[i];
    return null;
  }
  function clampQty(n) {
    n = parseInt(n, 10);
    return isNaN(n) ? 1 : Math.max(1, Math.min(MAX_QTY, n));
  }
  function quiet(vt) {
    var noop = function () {};
    vt.ready.catch(noop);
    vt.updateCallbackDone.catch(noop);
    vt.finished.catch(noop);
    return vt;
  }
  function withTransition(update) {
    if (!reduceMotion && document.startViewTransition) quiet(document.startViewTransition(update));
    else update();
  }
  function retrigger(el, cls) {
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
  }

  var store = {
    get: function (key, fallback) {
      try {
        var v = localStorage.getItem(key);
        return v ? JSON.parse(v) : fallback;
      } catch (e) {
        return fallback;
      }
    },
    set: function (key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {}
    },
    remove: function (key) {
      try {
        localStorage.removeItem(key);
      } catch (e) {}
    },
  };

  var STOP =
    ' perfume perfumes fragrance fragrances scent scents cologne the a an for of with and by x xnote note notes ml edp parfum eau de i want need me my some please ' +
    'عطر عطور برفان برفيوم بارفان ريحه رايحه رائحه مل من في عن او و اريد عايز عاوز ابحث اكس نوت نوته نوتات زجاجه ';
  var SYNONYMS = {
    sweet: ['vanilla', 'caramel', 'praline', 'honey', 'tonka', 'candied', 'rum', 'gourmand', 'benzoin'],
    fresh: [
      'citrus',
      'lemon',
      'bergamot',
      'mint',
      'tea',
      'aquatic',
      'grapefruit',
      'mandarin',
      'neroli',
      'fresh',
    ],
    citrus: ['lemon', 'bergamot', 'orange', 'mandarin', 'grapefruit', 'neroli'],
    spicy: ['pepper', 'cinnamon', 'cardamom', 'ginger', 'spice'],
    spice: ['pepper', 'cinnamon', 'cardamom', 'ginger'],
    smoky: ['incense', 'oud', 'leather', 'birch', 'smoky'],
    smoke: ['incense', 'oud', 'leather', 'birch'],
    woody: ['cedarwood', 'sandalwood', 'oud', 'vetiver', 'birch', 'patchouli', 'oakmoss', 'woody'],
    wood: ['cedarwood', 'sandalwood', 'oud', 'vetiver', 'birch', 'patchouli', 'woody'],
    floral: ['rose', 'jasmine', 'orchid', 'iris', 'mimosa', 'neroli', 'lily', 'blossom', 'flower', 'floral'],
    flower: ['rose', 'jasmine', 'orchid', 'iris', 'mimosa', 'neroli', 'lily', 'blossom', 'flower', 'floral'],
    fruity: ['pineapple', 'apple', 'pear', 'fruit', 'currant', 'mandarin', 'orange', 'fruity'],
    fruit: ['pineapple', 'apple', 'pear', 'fruit', 'currant', 'mandarin', 'orange'],
    warm: ['amber', 'vanilla', 'tonka', 'cinnamon', 'oriental', 'benzoin'],
    night: ['amber', 'vanilla', 'oud', 'leather', 'tonka', 'oriental'],
    evening: ['amber', 'vanilla', 'oud', 'leather', 'tonka', 'oriental'],
    summer: ['citrus', 'lemon', 'bergamot', 'mint', 'aquatic', 'fresh', 'grapefruit'],
    winter: ['amber', 'vanilla', 'tonka', 'cinnamon', 'oud', 'coffee'],
    office: ['tea', 'bergamot', 'musk', 'fresh', 'citrus'],
    clean: ['musk', 'tea', 'bergamot', 'aquatic', 'fresh'],
    aquatic: ['aquatic', 'tea', 'mint'],
    gourmand: ['vanilla', 'caramel', 'praline', 'coffee', 'tonka', 'honey', 'gourmand'],
    oriental: ['amber', 'vanilla', 'oud', 'incense', 'oriental'],
  };
  [
    ['حلو سكري مسكر حلوه', 'sweet'],
    ['منعش فريش منعشه انتعاش', 'fresh'],
    ['حمضي حمضيات', 'citrus'],
    ['حار توابل بهارات', 'spicy'],
    ['مدخن دخاني دخان', 'smoky'],
    ['خشبي خشب اخشاب', 'woody'],
    ['زهري ورود زهور زهر', 'floral'],
    ['فاكهي فواكه فاكهه', 'fruity'],
    ['دافي دافيه دفا', 'warm'],
    ['ليلي سهره مسائي مسا ليل', 'night'],
    ['صيفي صيف', 'summer'],
    ['شتوي شتا شتاء', 'winter'],
    ['مكتب شغل عمل رسمي', 'office'],
    ['نظيف نظافه', 'clean'],
    ['مائي بحري', 'aquatic'],
    ['جورماند', 'gourmand'],
    ['شرقي شرقيه', 'oriental'],
  ].forEach(function (pair) {
    pair[0].split(' ').forEach(function (w) {
      SYNONYMS[w] = SYNONYMS[pair[1]];
    });
  });

  function norm(s) {
    return String(s)
      .toLowerCase()
      .replace(/º/g, 'o')
      .replace(/[\u0660-\u0669]/g, function (d) {
        return String(d.charCodeAt(0) - 0x0660);
      })
      .normalize('NFD')
      .replace(/[\u0300-\u036f\u064b-\u065f\u0670\u0640]/g, '')
      .replace(/[\u0622\u0623\u0625\u0671]/g, '\u0627')
      .replace(/\u0629/g, '\u0647')
      .replace(/\u0649/g, '\u064a')
      .replace(/\u0624/g, '\u0648')
      .replace(/\u0626/g, '\u064a')
      .replace(/[^a-z0-9\u0621-\u064a]+/g, ' ')
      .trim();
  }
  function stem(w) {
    if (/^[a-z]/.test(w)) {
      if (w.length > 3 && /s$/.test(w) && !/(ss|us|is)$/.test(w)) return w.slice(0, -1);
      return w;
    }
    if (w.length > 4 && w.indexOf('\u0648\u0627\u0644') === 0) return w.slice(3);
    if (w.length > 3 && w.indexOf('\u0627\u0644') === 0) return w.slice(2);
    if (w.length > 4 && /^[\u0628\u0644\u0641\u0643]\u0627\u0644/.test(w)) return w.slice(3);
    return w;
  }
  function words(s) {
    return norm(s).split(' ').filter(Boolean).map(stem);
  }
  function lev(a, b, max) {
    if (Math.abs(a.length - b.length) > max) return max + 1;
    var prev = [],
      cur,
      i,
      j;
    for (j = 0; j <= b.length; j++) prev[j] = j;
    for (i = 1; i <= a.length; i++) {
      cur = [i];
      var best = i;
      for (j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        if (cur[j] < best) best = cur[j];
      }
      if (best > max) return max + 1;
      prev = cur;
    }
    return prev[b.length];
  }

  var INDEX = DATA.products.map(function (p) {
    var fields = [];
    words(p.name + ' ' + p.nameAr).forEach(function (w) {
      fields.push([w, 10]);
    });
    p.notes.concat(p.notesAr).forEach(function (n) {
      words(n).forEach(function (w) {
        fields.push([w, 6]);
      });
    });
    words([p.accord, p.familyName, p.accordAr, p.familyNameAr].join(' ')).forEach(function (w) {
      fields.push([w, 4]);
    });
    return { p: p, fields: fields, name: norm(p.name), nameAr: norm(p.nameAr) };
  });

  function tokenScore(t, entry) {
    var best = 0;
    var typo = t.length >= 7 ? 2 : 1;
    entry.fields.forEach(function (f) {
      var w = f[0],
        weight = f[1],
        s = 0;
      if (w === t) s = weight;
      else if (t.length >= 2 && w.indexOf(t) === 0) s = weight * 0.8;
      else if (t.length >= 4 && w.indexOf(t) > 0) s = weight * 0.5;
      else if (t.length >= 4 && lev(t, w, typo) <= typo) s = weight * 0.6;
      if (s > best) best = s;
    });
    var syn = SYNONYMS[t];
    if (syn && best < 3) {
      entry.fields.forEach(function (f) {
        if (syn.indexOf(f[0]) !== -1) best = Math.max(best, 3);
      });
    }
    return best;
  }

  function search(query) {
    var tokens = words(query).filter(function (t) {
      return STOP.indexOf(' ' + t + ' ') === -1;
    });
    if (!tokens.length) return null;
    var phrase = norm(query);
    var out = [];
    INDEX.forEach(function (entry, order) {
      var total = 0;
      for (var i = 0; i < tokens.length; i++) {
        var s = tokenScore(tokens[i], entry);
        if (!s) return;
        total += s;
      }
      if (phrase.length > 2 && (entry.name.indexOf(phrase) !== -1 || entry.nameAr.indexOf(phrase) !== -1))
        total += 15;
      out.push({ p: entry.p, score: total, order: order });
    });
    out.sort(function (a, b) {
      return b.score - a.score || a.order - b.order;
    });
    return out;
  }

  function readCart() {
    var raw = store.get(CART_KEY, []);
    if (!Array.isArray(raw)) return [];
    return raw.filter(function (item) {
      if (!item || !item.key) return false;
      if (item.isBundle) return item.id === DATA.bundle.slug;
      var p = bySlug(item.id);
      return (
        p &&
        p.sizes.some(function (s) {
          return s.ml === parseInt(item.size, 10);
        })
      );
    });
  }
  function writeCart(items) {
    store.set(CART_KEY, items);
    refresh();
  }

  function cartLines() {
    return readCart().map(function (item) {
      var qty = clampQty(item.qty);
      if (item.isBundle) {
        return {
          key: item.key,
          qty: qty,
          name: AR ? DATA.bundle.nameAr : DATA.bundle.name,
          href: BASE + '/offers/',
          img: '/assets/img/products/' + DATA.bundle.slug + '-320.webp',
          meta: I.bundleMeta(DATA.bundle.ml),
          label: AR ? DATA.bundle.nameAr : DATA.bundle.name,
          msgLabel: AR ? DATA.bundle.nameAr : DATA.bundle.name,
          unit: DATA.bundle.price,
          total: DATA.bundle.price * qty,
        };
      }
      var p = bySlug(item.id);
      var ml = parseInt(item.size, 10);
      var size = p.sizes.filter(function (s) {
        return s.ml === ml;
      })[0];
      return {
        key: item.key,
        qty: qty,
        name: p.name,
        sub: AR ? p.nameAr : '',
        href: BASE + '/perfumes/' + p.slug + '/',
        img: '/assets/img/products/' + p.slug + '-320.webp',
        meta: I.lineMeta(ml, money(size.price)),
        label: I.lineLabel(p.name, ml),
        msgLabel: p.name + I.msg.sep + ml + ' ' + I.ml,
        unit: size.price,
        total: size.price * qty,
      };
    });
  }
  function subtotal() {
    return cartLines().reduce(function (s, l) {
      return s + l.total;
    }, 0);
  }
  function itemCount() {
    return readCart().reduce(function (s, i) {
      return s + clampQty(i.qty);
    }, 0);
  }

  function addItem(slug, ml, qty, button) {
    var p = bySlug(slug);
    if (!p) return;
    var key = slug + '|' + ml + 'ml';
    var items = readCart();
    var found = items.filter(function (i) {
      return i.key === key;
    })[0];
    if (found) found.qty = clampQty(clampQty(found.qty) + qty);
    else items.push({ key: key, id: slug, size: ml + 'ml', qty: clampQty(qty) });
    writeCart(items);
    added(button, I.addedToast(I.lineLabel(p.name, ml)));
  }
  function addBundle(button) {
    var key = 'bundle|' + DATA.bundle.slug;
    var items = readCart();
    var found = items.filter(function (i) {
      return i.key === key;
    })[0];
    if (found) found.qty = clampQty(clampQty(found.qty) + 1);
    else
      items.push({
        key: key,
        id: DATA.bundle.slug,
        size: 'Bundle',
        qty: 1,
        isBundle: true,
        bundleName: DATA.bundle.name,
        bundlePrice: DATA.bundle.price,
      });
    writeCart(items);
    added(button, I.addedToast(AR ? DATA.bundle.nameAr : DATA.bundle.name));
  }
  function added(button, message) {
    $$('[data-cart-count]').forEach(function (c) {
      retrigger(c, 'bump');
    });
    if (button) {
      var label = button.querySelector('span');
      if (label && !button.classList.contains('is-added')) {
        var original = label.textContent;
        button.style.minWidth = button.offsetWidth + 'px';
        button.classList.add('is-added');
        label.textContent = I.added;
        setTimeout(function () {
          button.classList.remove('is-added');
          label.textContent = original;
          button.style.minWidth = '';
        }, 1600);
      }
    }
    toast(message);
    setTimeout(openDrawer, reduceMotion ? 0 : 280);
  }
  function setQty(key, qty) {
    var items = readCart();
    items.forEach(function (i) {
      if (i.key === key) i.qty = clampQty(qty);
    });
    writeCart(items);
  }
  function removeItem(key) {
    var line = cartLines().filter(function (l) {
      return l.key === key;
    })[0];
    var el = $$('.line').filter(function (n) {
      return n.getAttribute('data-key') === key;
    });
    var done = function () {
      writeCart(
        readCart().filter(function (i) {
          return i.key !== key;
        })
      );
      if (line) toast(I.removedToast(line.label));
    };
    if (reduceMotion || !el.length) return done();
    el.forEach(function (n) {
      n.classList.add('is-leaving');
    });
    setTimeout(done, 220);
  }

  function readWish() {
    var w = store.get(WISH_KEY, []);
    return Array.isArray(w) ? w.filter(bySlug) : [];
  }
  function toggleWish(slug, button) {
    var list = readWish();
    var p = bySlug(slug);
    var i = list.indexOf(slug);
    if (i === -1) {
      list.push(slug);
      toast(I.wishSaved(p.name));
    } else {
      list.splice(i, 1);
      toast(I.wishRemoved(p.name));
    }
    store.set(WISH_KEY, list);
    if (button) retrigger(button, 'pop');
    $$('[data-wish-count]').forEach(function (c) {
      retrigger(c, 'bump');
    });
    if ($('[data-wishlist-grid]')) withTransition(refresh);
    else refresh();
  }

  var toastTimer;
  function toast(msg) {
    var el = $('[data-toast]');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('is-shown');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.classList.remove('is-shown');
    }, 2600);
  }

  function lineHtml(l) {
    return (
      '<div class="line" data-key="' +
      esc(l.key) +
      '">' +
      '<a class="line__media" href="' +
      l.href +
      '" tabindex="-1" aria-hidden="true"><img src="' +
      l.img +
      '" width="320" height="400" alt="" decoding="async"></a>' +
      '<div class="line__info"><a class="line__name" dir="auto" href="' +
      l.href +
      '">' +
      esc(l.name) +
      '</a>' +
      (l.sub ? '<p class="line__translit">' + esc(l.sub) + '</p>' : '') +
      '<p class="line__meta">' +
      esc(l.meta) +
      '</p>' +
      '<div class="qty qty--small"><button type="button" data-line-step="-1" aria-label="' +
      esc(I.dec(l.label)) +
      '"' +
      (l.qty <= 1 ? ' disabled' : '') +
      '>&minus;</button>' +
      '<input type="number" inputmode="numeric" min="1" max="' +
      MAX_QTY +
      '" value="' +
      l.qty +
      '" data-line-qty aria-label="' +
      esc(I.qtyOf(l.label)) +
      '">' +
      '<button type="button" data-line-step="1" aria-label="' +
      esc(I.inc(l.label)) +
      '"' +
      (l.qty >= MAX_QTY ? ' disabled' : '') +
      '>+</button></div></div>' +
      '<div class="line__end"><span class="line__price">' +
      money(l.total) +
      '</span>' +
      '<button type="button" class="line__remove" data-line-remove aria-label="' +
      esc(I.removeOf(l.label)) +
      '">' +
      I.remove +
      '</button></div></div>'
    );
  }

  function restoreFocus(container, render) {
    var active = document.activeElement;
    var line = active && container.contains(active) && active.closest('[data-key]');
    var key = line && line.getAttribute('data-key');
    var sel = !line
      ? null
      : active.hasAttribute('data-line-qty')
        ? '[data-line-qty]'
        : active.hasAttribute('data-line-step')
          ? '[data-line-step="' + active.getAttribute('data-line-step') + '"]'
          : null;
    render();
    if (key && sel) {
      var again = $('[data-key="' + CSS.escape(key) + '"] ' + sel, container);
      if (again && !again.disabled) again.focus();
      else if (again) {
        var other = $('[data-key="' + CSS.escape(key) + '"] [data-line-qty]', container);
        if (other) other.focus();
      }
    }
  }

  var drawer = $('#cart-drawer');
  var menuSheet = $('#menu');
  function canModal(d) {
    return d && typeof d.showModal === 'function';
  }

  function renderDrawer() {
    if (!drawer) return;
    var lines = cartLines();
    var body = $('[data-drawer-lines]', drawer);
    var foot = $('[data-drawer-foot]', drawer);
    var n = itemCount();
    $('[data-drawer-count]', drawer).textContent = n ? '(' + n + ')' : '';
    if (!lines.length) {
      body.innerHTML =
        '<div class="empty empty--sheet"><p>' +
        I.drawerEmpty +
        '</p><p class="muted small">' +
        I.drawerEmptyHint +
        '</p><a class="btn" href="' +
        BASE +
        '/shop/">' +
        I.shopAll +
        '</a></div>';
      foot.hidden = true;
      return;
    }
    foot.hidden = false;
    restoreFocus(body, function () {
      body.innerHTML = '<div class="lines">' + lines.map(lineHtml).join('') + '</div>';
    });
    $('[data-drawer-subtotal]', drawer).textContent = money(subtotal());
  }
  var lockedY = 0;
  var bodyStyle = document.body.style;
  function lockScroll() {
    if (bodyStyle.position === 'fixed') return;
    lockedY = window.scrollY;
    bodyStyle.position = 'fixed';
    bodyStyle.top = -lockedY + 'px';
    bodyStyle.left = '0';
    bodyStyle.right = '0';
  }
  function unlockScroll() {
    if (bodyStyle.position !== 'fixed') return;
    bodyStyle.position = '';
    bodyStyle.top = '';
    bodyStyle.left = '';
    bodyStyle.right = '';
    window.scrollTo({ top: lockedY, behavior: 'instant' });
  }
  function syncSheets() {
    if ($$('dialog.sheet[open]').length) lockScroll();
    else unlockScroll();
    var menuOpen = !!(menuSheet && menuSheet.open);
    $$('[data-open-menu]').forEach(function (b) {
      b.setAttribute('aria-expanded', menuOpen ? 'true' : 'false');
    });
  }
  function openSheet(sheet) {
    if (!canModal(sheet)) return false;
    $$('dialog.sheet[open]').forEach(function (d) {
      if (d !== sheet) d.close();
    });
    lockScroll();
    if (!sheet.open) sheet.showModal();
    syncSheets();
    return true;
  }
  function openDrawer() {
    if (!drawer || location.pathname === BASE + '/cart/') return;
    renderDrawer();
    openSheet(drawer);
  }
  function closeSheets() {
    $$('dialog.sheet[open]').forEach(function (d) {
      d.close();
    });
    syncSheets();
  }

  function swipeToClose(sheet, direction) {
    var x0 = 0;
    var y0 = 0;
    var dx = 0;
    var axis = null;
    var tracking = false;
    sheet.addEventListener(
      'touchstart',
      function (e) {
        if (e.touches.length !== 1) return;
        x0 = e.touches[0].clientX;
        y0 = e.touches[0].clientY;
        dx = 0;
        axis = null;
        tracking = true;
      },
      { passive: true }
    );
    sheet.addEventListener(
      'touchmove',
      function (e) {
        if (!tracking) return;
        var mx = e.touches[0].clientX - x0;
        var my = e.touches[0].clientY - y0;
        if (axis === null && (Math.abs(mx) > 10 || Math.abs(my) > 10)) {
          axis = Math.abs(mx) > Math.abs(my) * 1.3 ? 'x' : 'y';
          if (axis === 'x' && document.activeElement && sheet.contains(document.activeElement)) {
            document.activeElement.blur();
          }
        }
        if (axis !== 'x') return;
        dx = direction < 0 ? Math.min(0, mx) : Math.max(0, mx);
        sheet.style.transition = 'none';
        sheet.style.transform = 'translateX(' + dx + 'px)';
      },
      { passive: true }
    );
    var end = function () {
      if (!tracking) return;
      tracking = false;
      sheet.style.transition = '';
      sheet.style.transform = '';
      if (axis === 'x' && Math.abs(dx) > Math.min(90, sheet.offsetWidth * 0.25)) closeSheets();
    };
    sheet.addEventListener('touchend', end, { passive: true });
    sheet.addEventListener('touchcancel', end, { passive: true });
  }

  $$('dialog.sheet').forEach(function (d) {
    d.addEventListener('close', syncSheets);
    var startSide = d.classList.contains('sheet--start');
    swipeToClose(d, startSide === !AR ? -1 : 1);
  });
  if (window.matchMedia) {
    var desktop = window.matchMedia('(min-width: 960px)');
    var onDesktop = function (e) {
      if (e.matches && menuSheet && menuSheet.open) {
        menuSheet.close();
        syncSheets();
      }
    };
    if (desktop.addEventListener) desktop.addEventListener('change', onDesktop);
  }
  window.addEventListener('pagehide', function () {
    $$('dialog.sheet[open]').forEach(function (d) {
      d.close();
    });
    unlockScroll();
    mobileSearch.close(false);
  });

  function refresh() {
    var n = itemCount();
    $$('[data-cart-count]').forEach(function (el) {
      el.textContent = n;
      el.hidden = n === 0;
    });
    var w = readWish();
    $$('[data-wish-count]').forEach(function (el) {
      el.textContent = w.length;
      el.hidden = w.length === 0;
    });
    $$('[data-wish]').forEach(function (btn) {
      var slug = btn.getAttribute('data-wish');
      var on = w.indexOf(slug) !== -1;
      var p = bySlug(slug);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      if (p) btn.setAttribute('aria-label', I.wishAria(on, p.name));
    });
    $$('[data-open-cart]').forEach(function (a) {
      a.setAttribute('aria-label', I.cartAria(n));
    });
    if (drawer && drawer.open) renderDrawer();
    renderWishlist();
    renderCartPage();
  }

  document.addEventListener('click', function (e) {
    var t = e.target;
    var el;
    if (t.closest('dialog.sheet a[href]') && !e.defaultPrevented) closeSheets();
    if ((el = t.closest('[data-add]'))) {
      addItem(el.getAttribute('data-add'), parseInt(el.getAttribute('data-ml'), 10), 1, el);
    } else if ((el = t.closest('[data-add-bundle]'))) {
      addBundle(el);
    } else if ((el = t.closest('[data-wish]'))) {
      e.preventDefault();
      toggleWish(el.getAttribute('data-wish'), el);
    } else if ((el = t.closest('[data-open-cart]'))) {
      if (location.pathname === BASE + '/cart/' || !canModal(drawer)) return;
      e.preventDefault();
      openDrawer();
    } else if (t.closest('[data-open-search]')) {
      mobileSearch.open();
    } else if (t.closest('[data-close-search]')) {
      mobileSearch.close(t.matches('button'));
    } else if ((el = t.closest('[data-open-menu]'))) {
      mobileSearch.close(false);
      openSheet(menuSheet);
    } else if (t.closest('[data-close-sheet]')) {
      closeSheets();
    } else if (t.matches('dialog.sheet')) {
      closeSheets();
    } else if ((el = t.closest('[data-line-step]'))) {
      var line = el.closest('[data-key]');
      var input2 = $('[data-line-qty]', line);
      setQty(
        line.getAttribute('data-key'),
        clampQty(input2.value) + parseInt(el.getAttribute('data-line-step'), 10)
      );
    } else if ((el = t.closest('[data-line-remove]'))) {
      removeItem(el.closest('[data-key]').getAttribute('data-key'));
    } else if ((el = t.closest('[data-lang-switch]'))) {
      if (/\/shop\//.test(location.pathname)) {
        e.preventDefault();
        location.href = el.getAttribute('href') + location.search;
      }
    } else if ((el = t.closest('[data-card] a[href*="/perfumes/"]')) && !reduceMotion) {
      var media = $('.card__media', el.closest('[data-card]'));
      $$('.card__media').forEach(function (m) {
        m.style.viewTransitionName = '';
      });
      if (media) media.style.viewTransitionName = 'product-photo';
    }
  });

  window.addEventListener('pageshow', function () {
    $$('.card__media').forEach(function (m) {
      m.style.viewTransitionName = '';
    });
    closeSheets();
    $$('[data-search-panel]').forEach(function (panel) {
      panel.hidden = true;
    });
    refresh();
  });

  document.addEventListener('change', function (e) {
    if (e.target.matches('[data-line-qty]')) {
      setQty(e.target.closest('[data-key]').getAttribute('data-key'), e.target.value);
    }
  });

  window.addEventListener('storage', function (e) {
    if (e.key === CART_KEY || e.key === WISH_KEY) refresh();
  });

  var mobileSearch = { open: function () {}, close: function () {} };

  function initSearchBox(box) {
    var input = $('.search__input', box);
    var panel = $('[data-search-panel]', box);
    var form = $('form', box);
    var id = input.id;
    var active = -1;
    var items = [];
    var timer;
    var clear = $('[data-search-clear]', box);
    var header = box.closest('.header');
    var scrim = $('.search-scrim');
    var toggles = $$('[data-open-search]');
    var compact = window.matchMedia ? window.matchMedia('(max-width: 959px)') : { matches: false };
    var searching = function () {
      return !!header && header.classList.contains('is-searching');
    };

    function openMode() {
      if (!header) return;
      closeSheets();
      lockScroll();
      header.classList.add('is-searching');
      if (scrim) scrim.hidden = false;
      toggles.forEach(function (b) {
        b.setAttribute('aria-expanded', 'true');
      });
      input.focus({ preventScroll: true });
      render();
    }
    function closeMode(restoreFocus) {
      if (!searching()) return;
      header.classList.remove('is-searching');
      if (scrim) scrim.hidden = true;
      toggles.forEach(function (b) {
        b.setAttribute('aria-expanded', 'false');
      });
      open(false);
      if (document.activeElement === input) input.blur();
      input.value = '';
      syncClear();
      if (!$$('dialog.sheet[open]').length) unlockScroll();
      if (restoreFocus && toggles[0]) toggles[0].focus({ preventScroll: true });
    }
    mobileSearch.open = openMode;
    mobileSearch.close = closeMode;

    function syncClear() {
      if (clear) clear.hidden = !input.value;
    }
    function open(show) {
      panel.hidden = !show;
      input.setAttribute('aria-expanded', show ? 'true' : 'false');
      box.classList.toggle('is-open', show);
    }
    function setActive(i) {
      var opts = $$('[role="option"]', panel);
      active = opts.length ? (i + opts.length) % opts.length : -1;
      opts.forEach(function (o, n) {
        o.setAttribute('aria-selected', n === active ? 'true' : 'false');
      });
      if (active >= 0) {
        input.setAttribute('aria-activedescendant', opts[active].id);
        opts[active].scrollIntoView({ block: 'nearest' });
      } else input.removeAttribute('aria-activedescendant');
    }
    function chips() {
      return (
        '<div class="results__chips">' +
        DATA.popularNotes
          .map(function (n) {
            return (
              '<a class="chip chip--small" href="' +
              BASE +
              '/shop/?note=' +
              n.key +
              '">' +
              esc(AR ? n.nameAr : n.name) +
              '</a>'
            );
          })
          .join('') +
        '</div>'
      );
    }
    function render() {
      var q = input.value.trim();
      active = -1;
      input.removeAttribute('aria-activedescendant');
      if (!q) {
        items = [];
        panel.innerHTML = '<p class="results__label">' + I.popular + '</p>' + chips();
        open(document.activeElement === input);
        return;
      }
      var found = search(q) || [];
      items = found.slice(0, 6);
      if (!items.length) {
        panel.innerHTML = '<p class="results__empty">' + esc(I.none(q)) + '</p>' + chips();
        open(true);
        return;
      }
      panel.innerHTML =
        '<ul class="results" role="listbox" aria-label="' +
        I.resultsLabel +
        '">' +
        items
          .map(function (r, i) {
            var p = r.p;
            return (
              '<li role="option" id="' +
              id +
              '-opt-' +
              i +
              '" aria-selected="false"><a href="' +
              BASE +
              '/perfumes/' +
              p.slug +
              '/" tabindex="-1">' +
              '<img src="/assets/img/products/' +
              p.slug +
              '-320.webp" width="320" height="400" alt="" decoding="async">' +
              '<span class="results__text"><strong lang="en" dir="ltr">' +
              esc(p.name) +
              '</strong><span>' +
              esc(I.resultLine(p, money(p.from))) +
              '</span></span></a></li>'
            );
          })
          .join('') +
        '</ul>' +
        '<a class="results__all" href="' +
        BASE +
        '/shop/?q=' +
        encodeURIComponent(q) +
        '">' +
        (found.length > items.length ? I.seeAll(found.length) : found.length === 1 ? I.showIt : I.showThese) +
        '</a>';
      open(true);
    }

    input.addEventListener('input', function () {
      syncClear();
      clearTimeout(timer);
      timer = setTimeout(render, 70);
    });
    if (clear) {
      clear.addEventListener('click', function () {
        input.value = '';
        syncClear();
        render();
        input.focus();
      });
    }
    panel.addEventListener(
      'touchmove',
      function () {
        if (searching() && document.activeElement === input) input.blur();
      },
      { passive: true }
    );
    input.addEventListener('focus', render);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (panel.hidden) render();
        setActive(active + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive(active - 1);
      } else if (e.key === 'Enter' && active >= 0 && items[active]) {
        e.preventDefault();
        location.href = BASE + '/perfumes/' + items[active].p.slug + '/';
      } else if (e.key === 'Escape') {
        if (searching()) {
          e.preventDefault();
          closeMode(true);
        } else if (!panel.hidden) {
          e.preventDefault();
          open(false);
        }
      }
    });
    form.addEventListener('submit', function (e) {
      if (!input.value.trim()) {
        e.preventDefault();
        input.focus();
      }
    });
    panel.addEventListener('mousedown', function (e) {
      e.preventDefault();
    });
    document.addEventListener('click', function (e) {
      if (searching()) return;
      if (!box.contains(e.target)) open(false);
    });
    input.addEventListener('blur', function () {
      setTimeout(function () {
        if (!searching() && !box.contains(document.activeElement)) open(false);
      }, 120);
    });
    var onWidth = function () {
      if (!compact.matches) closeMode(false);
    };
    if (compact.addEventListener) compact.addEventListener('change', onWidth);
    if (location.pathname.indexOf(BASE + '/shop/') === 0) {
      var q = new URLSearchParams(location.search).get('q');
      if (q) input.value = q;
    }
    syncClear();
  }

  function initProduct() {
    var form = $('[data-buy]');
    if (!form) return;
    var slug = form.getAttribute('data-buy');
    var p = bySlug(slug);
    var qty = $('input[name="qty"]', form);
    var priceEl = $('[data-pdp-price]');
    var mlEl = $('[data-pdp-ml]');
    var wa = $('[data-wa-now]', form);
    var bar = $('[data-buybar]');
    var barPrice = $('[data-buybar-price]');
    var submit = $('[data-buy-submit]', form);

    function current() {
      var r = $('input[name="ml"]:checked', form);
      return { ml: parseInt(r.value, 10), price: parseInt(r.getAttribute('data-price'), 10) };
    }
    function update() {
      var c = current();
      var q = clampQty(qty.value);
      priceEl.textContent = money(c.price * q);
      mlEl.textContent = I.forMl(q, c.ml);
      retrigger(priceEl, 'tick');
      if (barPrice) barPrice.textContent = I.barPrice(money(c.price * q), q, c.ml);
      $$('[data-step]', form).forEach(function (b) {
        var step = parseInt(b.getAttribute('data-step'), 10);
        b.disabled = step < 0 ? q <= 1 : q >= MAX_QTY;
      });
      if (wa) {
        var text = I.waOrder(p.name, c.ml, q);
        wa.href =
          'https://wa.me/' + DATA.whatsapp + '?text=' + encodeURIComponent(text.replace(/\u00a0/g, ' '));
      }
    }
    form.addEventListener('change', update);
    form.addEventListener('input', function (e) {
      if (e.target === qty) update();
    });
    $$('[data-step]', form).forEach(function (b) {
      b.addEventListener('click', function () {
        qty.value = clampQty(clampQty(qty.value) + parseInt(b.getAttribute('data-step'), 10));
        update();
      });
    });
    qty.addEventListener('blur', function () {
      qty.value = clampQty(qty.value);
      update();
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      qty.value = clampQty(qty.value);
      addItem(slug, current().ml, clampQty(qty.value), submit);
    });

    if (bar) {
      var barBtn = $('[data-buybar-add]', bar);
      var shown = false;
      var ticking = false;
      var check = function () {
        ticking = false;
        var show = submit.getBoundingClientRect().bottom < 0;
        if (show === shown) return;
        shown = show;
        bar.classList.toggle('is-shown', show);
        bar.setAttribute('aria-hidden', show ? 'false' : 'true');
        barBtn.tabIndex = show ? 0 : -1;
      };
      window.addEventListener(
        'scroll',
        function () {
          if (!ticking) {
            ticking = true;
            requestAnimationFrame(check);
          }
        },
        { passive: true }
      );
      check();
      barBtn.addEventListener('click', function () {
        qty.value = clampQty(qty.value);
        addItem(slug, current().ml, clampQty(qty.value), barBtn);
      });
    }
    update();
  }

  function initShop() {
    var form = $('[data-filters]');
    var grid = $('[data-grid]');
    if (!form || !grid) return;
    var cards = $$('[data-card]', grid);
    cards.forEach(function (c, i) {
      c.setAttribute('data-order', i);
    });
    var q = $('#search', form);
    var note = $('#note', form);
    var sort = $('#sort', form);
    var countEl = $('[data-result-count]');
    var empty = $('[data-empty]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
    });
    var clears = $$('[data-clear-filters]');

    var params = new URLSearchParams(location.search);
    q.value = params.get('q') || '';
    var n = params.get('note') || '';
    if (n && $('option[value="' + CSS.escape(n) + '"]', note)) note.value = n;
    var s = params.get('sort') || '';
    if ($('option[value="' + CSS.escape(s) + '"]', sort)) sort.value = s;

    function apply(animate) {
      var run = function () {
        var nv = note.value;
        var results = search(q.value);
        var scores = {};
        if (results)
          results.forEach(function (r) {
            scores[r.p.slug] = r.score;
          });
        var shown = 0;
        cards.forEach(function (c) {
          var slug = c.getAttribute('data-slug');
          var ok =
            (!results || scores[slug] !== undefined) &&
            (!nv || (' ' + c.getAttribute('data-notes') + ' ').indexOf(' ' + nv + ' ') !== -1);
          c.hidden = !ok;
          if (ok) shown++;
        });
        var sorted = cards.slice().sort(function (a, b) {
          if (sort.value === 'price-asc') return a.getAttribute('data-price') - b.getAttribute('data-price');
          if (sort.value === 'price-desc') return b.getAttribute('data-price') - a.getAttribute('data-price');
          if (sort.value === 'name')
            return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
          if (results)
            return (
              (scores[b.getAttribute('data-slug')] || 0) - (scores[a.getAttribute('data-slug')] || 0) ||
              a.getAttribute('data-order') - b.getAttribute('data-order')
            );
          return a.getAttribute('data-order') - b.getAttribute('data-order');
        });
        sorted.forEach(function (c) {
          grid.appendChild(c);
        });
        var filtered = q.value.trim() || nv;
        var label = I.count(shown);
        if (nv) label += I.withNote(note.options[note.selectedIndex].text);
        if (q.value.trim()) label += I.forQuery(q.value.trim());
        countEl.textContent = label;
        empty.hidden = shown !== 0;
        grid.hidden = shown === 0;
        clears.forEach(function (b) {
          if (!b.closest('[data-empty]')) b.hidden = !filtered;
        });
        var p = new URLSearchParams();
        if (q.value.trim()) p.set('q', q.value.trim());
        if (nv) p.set('note', nv);
        if (sort.value) p.set('sort', sort.value);
        var qs = p.toString();
        history.replaceState(null, '', location.pathname + (qs ? '?' + qs : '') + location.hash);
      };
      if (animate === false || reduceMotion || !document.startViewTransition) return run();
      var clearNames = function () {
        cards.forEach(function (c) {
          c.style.viewTransitionName = '';
        });
      };
      cards.forEach(function (c) {
        c.style.viewTransitionName = 'card-' + c.getAttribute('data-slug');
      });
      var vt = quiet(document.startViewTransition(run));
      vt.finished.then(clearNames, clearNames);
    }
    var timer;
    q.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(apply, 180);
    });
    q.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        q.blur();
      }
    });
    note.addEventListener('change', apply);
    sort.addEventListener('change', apply);
    clears.forEach(function (b) {
      b.addEventListener('click', function () {
        q.value = '';
        note.value = '';
        apply();
      });
    });
    apply(false);
    if (location.hash === '#search') q.focus();
  }

  function renderWishlist() {
    var grid = $('[data-wishlist-grid]');
    if (!grid) return;
    var w = readWish();
    var shown = 0;
    $$('[data-card]', grid).forEach(function (c) {
      var on = w.indexOf(c.getAttribute('data-slug')) !== -1;
      c.hidden = !on;
      if (on) shown++;
    });
    grid.hidden = shown === 0;
    $('[data-wishlist-empty]').hidden = shown !== 0;
  }

  var checkout = $('[data-checkout]');
  var checkoutBarCheck = null;
  function shippingChoice() {
    var r = checkout && $('input[name="shipping"]:checked', checkout);
    var key = r ? r.value : DATA.shipping[0].key;
    return (
      DATA.shipping.filter(function (s) {
        return s.key === key;
      })[0] || DATA.shipping[0]
    );
  }
  function renderCartPage() {
    if (!checkout) return;
    if (!$('[data-done]').hidden) return;
    var lines = cartLines();
    $('[data-cart-empty]').hidden = lines.length !== 0;
    checkout.hidden = lines.length === 0;
    var bar = $('[data-checkout-bar]');
    if (bar) bar.hidden = lines.length === 0;
    if (!lines.length) return;
    var linesEl = $('[data-cart-lines]', checkout);
    restoreFocus(linesEl, function () {
      linesEl.innerHTML = lines.map(lineHtml).join('');
    });
    var sub = subtotal();
    var ship = shippingChoice();
    $('[data-subtotal]', checkout).textContent = money(sub);
    $('[data-shipping]', checkout).textContent = money(ship.price);
    $('[data-total]', checkout).textContent = money(sub + ship.price);
    var tb = $('[data-total-bar]');
    if (tb) tb.textContent = money(sub + ship.price);
    if (checkoutBarCheck) requestAnimationFrame(checkoutBarCheck);
  }

  function normalizePhone(v) {
    var d = String(v)
      .replace(/[٠-٩]/g, function (c) {
        return String(c.charCodeAt(0) - 1632);
      })
      .replace(/[^\d+]/g, '');
    if (d.indexOf('+20') === 0) d = '0' + d.slice(3);
    else if (d.indexOf('0020') === 0) d = '0' + d.slice(4);
    else if (d.indexOf('20') === 0 && d.length === 12) d = '0' + d.slice(2);
    else if (d.length === 10 && d.charAt(0) === '1') d = '0' + d;
    return /^01[0125]\d{8}$/.test(d) ? d : null;
  }

  function initCheckout() {
    if (!checkout) return;
    var fields = {
      name: $('#c-name'),
      phone: $('#c-phone'),
      governorate: $('#c-gov'),
      city: $('#c-city'),
      address: $('#c-address'),
      notes: $('#c-notes'),
    };
    var remember = $('#c-remember');
    var saved = store.get(CUSTOMER_KEY, {});
    if (remember) {
      remember.addEventListener('change', function () {
        if (!remember.checked) store.remove(CUSTOMER_KEY);
      });
    }
    Object.keys(fields).forEach(function (k) {
      if (saved && saved[k] && k !== 'notes') fields[k].value = saved[k];
    });
    if (saved && saved.shipping) {
      var r = $('input[name="shipping"][value="' + CSS.escape(saved.shipping) + '"]', checkout);
      if (r) r.checked = true;
    }
    if (saved && saved.payment) {
      var pm = $('input[name="payment"][value="' + CSS.escape(saved.payment) + '"]', checkout);
      if (pm) pm.checked = true;
    }

    checkout.addEventListener('change', function (e) {
      if (e.target.name === 'shipping') renderCartPage();
    });

    var bar = $('[data-checkout-bar]');
    var summaryBtn = $('.cart__summary button[type="submit"]', checkout);
    if (bar && summaryBtn) {
      var barBtn = $('button', bar);
      var ticking = false;
      var typing = false;
      var check = function () {
        ticking = false;
        var r = summaryBtn.getBoundingClientRect();
        var show = !typing && window.innerWidth < 960 && !checkout.hidden && r.top > window.innerHeight;
        bar.classList.toggle('is-shown', show);
        bar.setAttribute('aria-hidden', show ? 'false' : 'true');
        barBtn.tabIndex = show ? 0 : -1;
      };
      checkoutBarCheck = check;
      var onScroll = function () {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(check);
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      var isField = function (el) {
        return (
          el && el.matches && el.matches('input:not([type="radio"]):not([type="checkbox"]), select, textarea')
        );
      };
      checkout.addEventListener('focusin', function (e) {
        if (!isField(e.target)) return;
        typing = true;
        check();
      });
      checkout.addEventListener('focusout', function () {
        setTimeout(function () {
          typing = isField(document.activeElement) && checkout.contains(document.activeElement);
          check();
        }, 150);
      });
      check();
    }

    function setError(input, msg) {
      var err = $('#' + input.id + '-error');
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (msg) input.setAttribute('aria-describedby', input.id + '-error');
      else input.removeAttribute('aria-describedby');
      if (err) err.textContent = msg || '';
    }
    var rules = [
      [fields.name, I.errName],
      [fields.phone, I.errPhone],
      [fields.governorate, I.errGov],
      [fields.city, I.errCity],
      [fields.address, I.errAddress],
    ];
    var attempted = false;
    function problemFor(input, msg) {
      if (input === fields.phone) return normalizePhone(input.value) ? '' : msg;
      return input.value.trim() ? '' : msg;
    }
    function validate() {
      attempted = true;
      checkout.classList.add('was-validated');
      var problems = [];
      rules.forEach(function (r) {
        var msg = problemFor(r[0], r[1]);
        setError(r[0], msg);
        if (msg) problems.push(r[0]);
      });
      return problems;
    }
    rules.forEach(function (r) {
      var input = r[0];
      var clearWhenFixed = function () {
        if (input.getAttribute('aria-invalid') === 'true' && !problemFor(input, r[1])) setError(input, '');
      };
      input.addEventListener('input', clearWhenFixed);
      input.addEventListener('change', clearWhenFixed);
      input.addEventListener('blur', function () {
        if (attempted) setError(input, problemFor(input, r[1]));
      });
    });

    checkout.addEventListener('submit', function (e) {
      e.preventDefault();
      var lines = cartLines();
      var formError = $('[data-form-error]', checkout);
      formError.textContent = '';
      if (!lines.length) {
        renderCartPage();
        return;
      }
      var problems = validate();
      if (problems.length) {
        formError.textContent = I.formError(problems.length);
        problems[0].scrollIntoView({ block: 'center', behavior: 'instant' });
        problems[0].focus({ preventScroll: true });
        return;
      }
      var ship = shippingChoice();
      var paymentKey = $('input[name="payment"]:checked', checkout).value;
      var payMethod =
        DATA.payments.filter(function (m) {
          return m.key === paymentKey;
        })[0] || DATA.payments[0];
      var payment = AR ? payMethod.nameAr : payMethod.name;
      var govText = fields.governorate.options[fields.governorate.selectedIndex].text;
      var M = I.msg;
      var phone = normalizePhone(fields.phone.value);
      var sub = subtotal();
      var ref = 'XN-' + Date.now().toString(36).toUpperCase().slice(-6);
      var msg =
        '\uD83D\uDECD\uFE0F *' +
        M.title +
        '*\n' +
        M.order +
        ': *' +
        ref +
        '*\n\n' +
        '*' +
        M.items +
        '*\n' +
        lines
          .map(function (l) {
            return '\u2022 ' + l.msgLabel + ' \u00D7 ' + l.qty + ' = ' + money(l.total);
          })
          .join('\n') +
        '\n\n' +
        M.subtotal +
        ': ' +
        money(sub) +
        '\n' +
        M.shipping +
        ': ' +
        (AR ? ship.nameAr : ship.name) +
        ' (' +
        (AR ? ship.daysAr : ship.days) +
        ') ' +
        money(ship.price) +
        '\n' +
        '*' +
        M.total +
        ': ' +
        money(sub + ship.price) +
        '*\n' +
        M.payment +
        ': ' +
        payment +
        '\n\n' +
        '*' +
        M.delivery +
        '*\n' +
        M.name +
        ': ' +
        fields.name.value.trim() +
        '\n' +
        M.mobile +
        ': ' +
        phone +
        '\n' +
        M.address +
        ': ' +
        [fields.address.value.trim(), fields.city.value.trim(), govText].join(M.sep) +
        '\n' +
        (fields.notes.value.trim() ? M.notes + ': ' + fields.notes.value.trim() + '\n' : '') +
        '\n' +
        M.confirm;
      var url = 'https://wa.me/' + DATA.whatsapp + '?text=' + encodeURIComponent(msg.replace(/\u00a0/g, ' '));

      if (!remember || remember.checked) {
        store.set(CUSTOMER_KEY, {
          name: fields.name.value.trim(),
          phone: phone,
          governorate: fields.governorate.value,
          city: fields.city.value.trim(),
          address: fields.address.value.trim(),
          shipping: ship.key,
          payment: paymentKey,
        });
      } else store.remove(CUSTOMER_KEY);

      window.open(url, '_blank', 'noopener');

      withTransition(function () {
        var done = $('[data-done]');
        $('[data-done-ref]', done).textContent = ref;
        $('[data-done-wa]', done).href = url;
        $('[data-cart-view]').hidden = true;
        $('[data-cart-title]').textContent = I.doneTitle;
        done.hidden = false;
        store.set(CART_KEY, []);
        refresh();
        var b = $('[data-checkout-bar]');
        if (b) b.hidden = true;
        window.scrollTo(0, 0);
        done.focus();
      });
    });
  }

  function initImages() {
    $$('img[loading="lazy"]').forEach(function (img) {
      if (img.complete) return;
      img.classList.add('is-loading');
      var done = function () {
        img.classList.remove('is-loading');
      };
      img.addEventListener('load', done, { once: true });
      img.addEventListener('error', done, { once: true });
    });
  }

  function initOrderCheck() {
    var form = $('[data-order-check]');
    if (!form) return;
    var text = $('#oc-text', form);
    var result = $('[data-oc-result]');
    var num = function (v) {
      return parseInt(String(v).replace(/[^\d]/g, ''), 10) || 0;
    };
    var byName = function (name) {
      var key = norm(name);
      for (var i = 0; i < DATA.products.length; i++)
        if (norm(DATA.products[i].name) === key || norm(DATA.products[i].nameAr) === key)
          return DATA.products[i];
      return null;
    };

    function check(message) {
      var lines = message
        .replace(/\u00a0/g, ' ')
        .replace(/\*/g, '')
        .split(/\r?\n/)
        .map(function (l) {
          return l.trim();
        });
      var out = { items: [], problems: 0, ref: '', claimed: {}, shipping: null };
      lines.forEach(function (l) {
        var m;
        var CUR = '\\s*(?:EGP|ج\\.م)';
        if ((m = l.match(/^(?:Order|رقم الطلب):\s*(\S+)/i))) out.ref = m[1];
        else if (
          (m = l.match(
            new RegExp(
              '^[•\\-]\\s*(.+?)[,،]\\s*(\\d+)\\s*(?:ml|مل)\\s*[×x]\\s*(\\d+)\\s*=\\s*([\\d,]+)' + CUR + '$',
              'i'
            )
          ))
        ) {
          var p = byName(m[1]);
          var size =
            p &&
            p.sizes.filter(function (s) {
              return s.ml === parseInt(m[2], 10);
            })[0];
          var qty = parseInt(m[3], 10);
          var item = { label: m[1] + ', ' + m[2] + ' ml × ' + qty, claimed: num(m[4]) };
          if (!p) item.error = 'Not a product in the shop';
          else if (!size) item.error = 'This size does not exist for ' + p.name;
          else item.correct = size.price * qty;
          out.items.push(item);
        } else if (
          (m = l.match(new RegExp('^[•\\-]\\s*(.+?)\\s*[×x]\\s*(\\d+)\\s*=\\s*([\\d,]+)' + CUR + '$', 'i')))
        ) {
          var qtyB = parseInt(m[2], 10);
          var bundle = { label: m[1] + ' × ' + qtyB, claimed: num(m[3]) };
          if (norm(m[1]) === norm(DATA.bundle.name) || norm(m[1]) === norm(DATA.bundle.nameAr))
            bundle.correct = DATA.bundle.price * qtyB;
          else bundle.error = 'Not a product in the shop';
          out.items.push(bundle);
        } else if ((m = l.match(/^(?:Subtotal|المجموع الفرعي):\s*([\d,]+)/i)))
          out.claimed.subtotal = num(m[1]);
        else if (
          (m = l.match(new RegExp('^(?:Shipping|الشحن):\\s*(.+?)\\s*\\(.*?\\)\\s*([\\d,]+)' + CUR, 'i')))
        ) {
          var ship = DATA.shipping.filter(function (s) {
            return norm(s.name) === norm(m[1]) || norm(s.nameAr) === norm(m[1]);
          })[0];
          out.shipping = { label: m[1], claimed: num(m[2]), correct: ship ? ship.price : null };
        } else if ((m = l.match(/^(?:Total|الإجمالي):\s*([\d,]+)/i))) out.claimed.total = num(m[1]);
      });
      return out;
    }

    function row(label, claimed, correct, error) {
      var ok = !error && correct === claimed;
      var detail = error
        ? esc(error)
        : ok
          ? money(correct)
          : 'says ' + money(claimed) + ', should be <strong>' + money(correct) + '</strong>';
      return (
        '<li class="oc-row' +
        (ok ? '' : ' oc-row--bad') +
        '"><span>' +
        esc(label) +
        '</span><span>' +
        detail +
        '</span></li>'
      );
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var r = check(text.value);
      result.hidden = false;
      if (!r.items.length) {
        result.innerHTML =
          '<p class="notice notice--warn">This does not look like an X Note order. Paste the whole message, starting from “New order from the X Note website”.</p>';
        return;
      }
      var problems = 0;
      var subtotal = 0;
      var rows = r.items.map(function (it) {
        if (it.error || it.correct !== it.claimed) problems++;
        subtotal += it.correct || 0;
        return row(it.label, it.claimed, it.correct, it.error);
      });
      var shipPrice = r.shipping && r.shipping.correct !== null ? r.shipping.correct : 0;
      if (r.shipping) {
        var shipError = r.shipping.correct === null ? 'Unknown shipping option' : '';
        if (shipError || r.shipping.correct !== r.shipping.claimed) problems++;
        rows.push(row('Shipping: ' + r.shipping.label, r.shipping.claimed, r.shipping.correct, shipError));
      } else {
        problems++;
        rows.push(row('Shipping', 0, 0, 'No shipping line found'));
      }
      if (r.claimed.subtotal !== undefined) {
        if (r.claimed.subtotal !== subtotal) problems++;
        rows.push(row('Subtotal', r.claimed.subtotal, subtotal));
      }
      var total = subtotal + shipPrice;
      if (r.claimed.total !== total) problems++;
      rows.push(row('Total', r.claimed.total || 0, total));
      result.innerHTML =
        (problems
          ? '<p class="notice notice--warn"><strong>' +
            problems +
            (problems === 1 ? ' problem' : ' problems') +
            ' found.</strong> The correct total is ' +
            money(total) +
            '. Confirm it with the customer before accepting payment.</p>'
          : '<p class="notice"><strong>Everything matches today’s prices.</strong> The total of ' +
            money(total) +
            ' is correct.</p>') +
        (r.ref ? '<p class="small muted">Order ' + esc(r.ref) + '</p>' : '') +
        '<ul class="oc-list">' +
        rows.join('') +
        '</ul>';
      result.focus();
    });
    $('[data-oc-clear]', form).addEventListener('click', function () {
      text.value = '';
      result.hidden = true;
      result.innerHTML = '';
      text.focus();
    });
  }

  $$('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
  initImages();
  $$('[data-search]').forEach(initSearchBox);
  initProduct();
  initShop();
  initCheckout();
  initOrderCheck();
  refresh();
})();
