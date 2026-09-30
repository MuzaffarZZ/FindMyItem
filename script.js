// Nama zon pada pelan kedai
const zoneLabels = {
  airSejuk: 'Air Minuman (Sejuk)',
  vendor:   'Makanan Vendor',
  roti1:    'Roti 1',
  roti2:    'Roti 2',
  snek:     'Snek Ringan',
  mi:       'Mi Segera',
  biskut:   'Biskut',
  gula:     'Gula-gula',
  minuman:  'Minuman',
  bahan:    'Bahan Dapur',
  alat:     'Alat Tulis',
  tisu:     'Tisu & Sabun',
  rumah:    'Barang Keperluan Rumah',
  aiskrim:  'Aiskrim',
  goreng:   'Makanan (Goreng)'
};

// Emoji bagi setiap zon
const zoneIcons = {
  airSejuk: '🧊', vendor: '🍱', roti1: '🍞', roti2: '🍞',
  snek: '🥨', mi: '🍜', biskut: '🍪', gula: '🍬',
  minuman: '🥤', bahan: '🧂', alat: '✏️', tisu: '🧼',
  rumah: '🧹', aiskrim: '🍦', goreng: '🥟'
};

const iconPos = {
  snek: 'left', mi: 'left', biskut: 'left', gula: 'left',
  minuman: 'left', bahan: 'left', alat: 'left', tisu: 'left', goreng: 'left'
};

Object.keys(zoneLabels).forEach(k => {
  if (zoneIcons[k]) zoneLabels[k] = `${zoneIcons[k]}${zoneLabels[k]}`;
});

const zoneCoordinates = {
  airSejuk: { x: 135, y: 430 },
  vendor:   { x: 320, y: 430 },
  roti1:    { x: 385, y: 254 },
  roti2:    { x: 385, y: 462 },
  snek:     { x: 820, y: 210 },
  mi:       { x: 820, y: 297 },
  biskut:   { x: 820, y: 418 },
  gula:     { x: 820, y: 505 },
  minuman:  { x: 820, y: 626 },
  bahan:    { x: 820, y: 713 },
  alat:     { x: 820, y: 834 },
  tisu:     { x: 820, y: 921 },
  rumah:    { x: 865, y: 235 },
  aiskrim:  { x: 865, y: 774 },
  goreng:   { x: 780, y: 1030 }
};

const laneX = { airSejuk: 142, vendor: 350, roti1: 350, roti2: 350 };

const categories = {
  "Air Minuman (Sejuk)": {
    zones: ['airSejuk'],
    items: [["F&N","airSejuk"], ["Yeo's","airSejuk"], ["Kopiko","airSejuk"], ["Pepsi","airSejuk"],
            ["Dutch Lady","airSejuk"], ["Nescafe","airSejuk"], ["Milo","airSejuk"]]
  },
  "Makanan Vendor": {
    zones: ['vendor'],
    items: [["Roti","vendor"], ["Kek","vendor"], ["Keropok","vendor"]]
  },
  "Roti": {
    zones: ['roti1','roti2'],
    items: [["Roti Putih","roti1"], ["Roti Gandum","roti2"]]
  },
  "Snek Ringan": {
    zones: ['snek'],
    items: [["Keropok Seger","snek"], ["Bika","snek"], ["Chickadees","snek"],
            ["Mr.Potato chips","snek"], ["Roller Coaster","snek"], ["Corntoz","snek"]]
  },
  "Mi Segera": {
    zones: ['mi'],
    items: [["Maggi","mi"], ["Buldak","mi"], ["PAMA","mi"], ["Mamee","mi"]]
  },
  "Biskut": {
    zones: ['biskut'],
    items: [["Chips More","biskut"], ["Munchy's","biskut"], ["Muzic","biskut"],
            ["Oreo","biskut"], ["Julie's / Toast","biskut"], ["Biskut Star","biskut"]]
  },
  "Gula-gula": {
    zones: ['gula'],
    items: [["M&M","gula"], ["KitKat","gula"], ["Cadbury","gula"],
            ["Skittles","gula"], ["Mentos","gula"], ["Hershey`s","gula"]]
  },
  "Minuman": {
    zones: ['minuman'],
    items: [["F&N","minuman"], ["Yeo's","minuman"], ["Kopiko","minuman"], ["Pepsi","minuman"],
            ["Dutch Lady","minuman"], ["Nescafe","minuman"], ["Milo","minuman"]]
  },
  "Bahan Dapur": {
    zones: ['bahan'],
    items: [["Kicap Jalen","bahan"], ["Tuna Ayam Brand","bahan"], ["Planta","bahan"],
            ["Mentega Kacang","bahan"], ["Sos cili kimball","bahan"], ["Axion Cuci Pinggan","bahan"]]
  },
  "Alat Tulis": {
    zones: ['alat'],
    items: [["Correction tape","alat"], ["Pita pelekat","alat"], ["Alat Tulis","alat"],
            ["Buku latihan","alat"], ["Kertas Graf","alat"], ["Kertas Kajian","alat"]]
  },
  "Tisu & Sabun": {
    zones: ['tisu'],
    items: [["Colgate","tisu"], ["Sunsilk","tisu"], ["Kotex","tisu"], ["Shokubutsu","tisu"],
            ["Downy","tisu"], ["Daia","tisu"], ["Lifebuoy","tisu"]]
  },
  "Barang Keperluan Rumah": {
    zones: ['rumah'],
    items: [
      ["Sabun Basuh","rumah"], ["Pencuci Lantai","rumah"], ["Baldi Plastik","rumah"], ["Penyapu","rumah"],
      ["Tuala Dapur","rumah"], ["Berus Lantai","rumah"], ["Pewangi Bilik","rumah"], ["Beg Sampah","rumah"]
    ]
  },
  "Aiskrim": {
    zones: ['aiskrim'],
    items: [["Aiskrim Kon","aiskrim"], ["Aiskrim Tub","aiskrim"]]
  },
  "Makanan (Goreng)": {
    zones: ['goreng'],
    items: [["Karipap","goreng"], ["Pisang Goreng","goreng"]]
  },
};

const popularNames = ["Kopiko", "Kicap Jalen", "Lifebuoy", "Sunsilk", "Pencuci Lantai", "Buku latihan"];

const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const resultMsg = $('resultMsg');
const categorySelect = $('categorySelect');
const itemListEl = $('itemList');
const popularGridEl = $('popularGrid');
const popularSectionEl = document.querySelector('.popular-section');
const itemSearchInput = $('itemSearchInput');
const searchSuggestionsEl = $('searchSuggestions');
const routePath = $('dynamicRoute');

let highlightItem = null;
let highlightZone = null;

const searchIndex = [];
Object.entries(categories).forEach(([category, data]) => {
  data.items.forEach(([name, zone]) => searchIndex.push({ name, category, zone }));
});
const findItem = name => searchIndex.find(i => i.name === name);

const zoneEls = {};
document.querySelectorAll('.plan .zone').forEach((g, i) => {
  zoneEls[g.dataset.zone] = g;
  g.style.animationDelay = (i * 45) + 'ms';
});

function renderMap(catZones, focusZone){
  Object.entries(zoneEls).forEach(([id, el]) => {
    el.classList.toggle('item-on', id === focusZone);
    el.classList.toggle('cat-on', id !== focusZone && catZones.includes(id));
  });
}

Object.keys(categories).forEach(name => {
  const opt = document.createElement('option');
  opt.value = name;
  opt.textContent = name;
  categorySelect.appendChild(opt);
});

function chooseItem(it, keepText){
  highlightItem = it.name;
  highlightZone = it.zone;          
  itemSearchInput.value = keepText ? it.name : '';
  closeSuggestions();
  categorySelect.value = it.category;
  showCategory();
}

function renderPopular(){
  popularGridEl.innerHTML = '';
  popularNames.forEach((name, i) => {
    const it = findItem(name);
    if (!it) return;
    const card = document.createElement('button');
    card.className = 'popular-card';
    card.style.animationDelay = (i * 60) + 'ms';
    card.innerHTML = `
      <span class="pname">${esc(it.name)}</span>
      <span class="pcat">${esc(it.category)}</span>
      <span class="prak">${esc(zoneLabels[it.zone])}</span>
    `;
    card.onclick = () => chooseItem(it, false);
    popularGridEl.appendChild(card);
  });
}

function createRoute(sx, sy, ex, ey, lane){
  return `M ${sx} ${sy} H ${lane} V ${ey} H ${ex}`;
}

function hideRoute(){
  if(!routePath) return;
  routePath.style.display = 'none';
  routePath.removeAttribute('marker-end');
  routePath.ontransitionend = null;
}

function drawRoute(d){
  if(!routePath) return;
  routePath.setAttribute('d', d);
  routePath.style.display = 'block';
  routePath.removeAttribute('marker-end');
  routePath.style.animation = 'none';

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const len = routePath.getTotalLength();
  routePath.style.transition = 'none';
  routePath.style.strokeDasharray = len;
  routePath.style.strokeDashoffset = reduce ? 0 : len;
  routePath.getBoundingClientRect();

  if(reduce){
    routePath.setAttribute('marker-end', 'url(#arrow)');
    return;
  }
  routePath.style.transition = 'stroke-dashoffset 1.2s ease-out';
  routePath.style.strokeDashoffset = 0;
  routePath.ontransitionend = () =>
    routePath.setAttribute('marker-end', 'url(#arrow)');
}

function updateView(){
  clearStops();
  const value = categorySelect.value;

  if(!value){
    resultMsg.innerHTML = 'Pilih kategori atau cari item untuk melihat lokasinya.';
    renderMap([], null);
    if(popularSectionEl) popularSectionEl.style.display = '';
    hideRoute();
    return;
  }

  if(popularSectionEl) popularSectionEl.style.display = 'none';
  const cat = categories[value];
  const focus = highlightItem ? findItem(highlightItem)?.zone : null;

  if(focus){
    resultMsg.innerHTML =
      `📍 <span><b>${esc(highlightItem)}</b> berada di <b class="rak-name">${esc(zoneLabels[focus])}</b> yang sedang menyala merah pada pelan.</span>`;

    const coords = zoneCoordinates[focus];
    if(routePath && coords){
      drawRoute(createRoute(130, 80, coords.x, coords.y, laneX[focus] ?? 842));
    }
  } else {
    resultMsg.innerHTML =
      `📍 <span>Kategori <b>${esc(value)}</b> terdapat di zon yang menyala hijau pada pelan di bawah. Tekan mana-mana item untuk lihat lokasi tepatnya.</span>`;
    hideRoute();
  }

  renderMap(cat ? cat.zones : [], focus);
  itemListEl.querySelectorAll('.item-row').forEach(r => {
    r.classList.toggle('highlight', r.dataset.name === highlightItem);
  });
}

function showCategory(){
  const value = categorySelect.value;
  itemListEl.innerHTML = '';

  if(value && categories[value]){
    categories[value].items.forEach(([name, zone], i) => {
      const row = document.createElement('div');
      row.className = 'item-row';
      row.dataset.name = name;
      row.style.animationDelay = Math.min(i * 40, 600) + 'ms';
      row.innerHTML = `<span>${esc(name)}</span><span class="rak-tag">${esc(zoneLabels[zone])}</span>`;
      row.appendChild(makeAddBtn(name, zone));
      row.addEventListener('click', () => {
        highlightItem = (highlightItem === name) ? null : name;
        highlightZone = highlightItem ? zone : null;
        updateView();
      });
      itemListEl.appendChild(row);
    });
  }
  updateView();
}

function normalize(s){
  return s.trim().toLowerCase().replace(/\s+/g, ' ');
}

function closeSuggestions(){
  searchSuggestionsEl.classList.remove('open');
  searchSuggestionsEl.innerHTML = '';
}

function renderSuggestions(matches, query){
  if(matches.length === 0){
    searchSuggestionsEl.innerHTML =
      `<div class="sug-empty">Tiada item sepadan dengan "<b>${esc(query)}</b>".</div>`;
    searchSuggestionsEl.classList.add('open');
    return;
  }
  searchSuggestionsEl.innerHTML = '';
  matches.slice(0, 6).forEach(m => {
    const row = document.createElement('div');
    row.className = 'sug-item';
    row.innerHTML = `
      <span>${esc(m.name)}<span class="sug-cat">${esc(m.category)}</span></span>
      <span class="sug-tag">${esc(zoneLabels[m.zone])}</span>
    `;
    row.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      chooseItem(m, true);
    });
    searchSuggestionsEl.appendChild(row);
  });
  searchSuggestionsEl.classList.add('open');
}

function handleItemSearchInput(){
  const query = normalize(itemSearchInput.value);
  if(!query){
    closeSuggestions();
    return;
  }

  const scored = searchIndex
    .map(item => {
      const n = normalize(item.name);
      let score = -1;
      if(n === query) score = 0;
      else if(n.startsWith(query)) score = 1;
      else if(n.includes(query)) score = 2;
      else if(normalize(zoneLabels[item.zone]).includes(query)) score = 3;
      return { ...item, score };
    })
    .filter(item => item.score >= 0)
    .sort((a, b) => a.score - b.score);

  renderSuggestions(scored, itemSearchInput.value.trim());
}

itemSearchInput.addEventListener('input', handleItemSearchInput);
itemSearchInput.addEventListener('focus', () => {
  if(itemSearchInput.value.trim()) handleItemSearchInput();
});
itemSearchInput.addEventListener('blur', closeSuggestions);

categorySelect.addEventListener('change', () => {
  highlightItem = null;
  highlightZone = null;
  itemSearchInput.value = '';
  closeSuggestions();
  showCategory();
});

// ---------- Carian Suara Biasa (Browser Web Speech API) ----------
const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRec) {
  const micBtn = document.createElement('button');
  micBtn.type = 'button';
  micBtn.id = 'micBtn';
  micBtn.textContent = '🎙️';
  micBtn.title = 'Cari guna suara';

  const wrap = document.createElement('div');
  wrap.className = 'search-wrap';
  if (itemSearchInput.parentNode) {
    itemSearchInput.parentNode.insertBefore(wrap, itemSearchInput);
    wrap.appendChild(itemSearchInput);
    wrap.appendChild(micBtn);
  }

  const rec = new SpeechRec();
  rec.lang = 'ms-MY';
  rec.interimResults = false;
  rec.maxAlternatives = 1;

  let listening = false;

  const setListening = on => {
    listening = on;
    micBtn.classList.toggle('listening', on);
    micBtn.textContent = on ? '🔴' : '🎙️';
  };

  micBtn.addEventListener('click', () => {
    if (listening) { rec.stop(); return; }
    try { rec.start(); } catch (e) {}
  });

  rec.onstart = () => setListening(true);
  rec.onend = () => setListening(false);

  rec.onresult = e => {
    const text = e.results[0][0].transcript.replace(/[.,!?]+$/, '').trim();
    itemSearchInput.value = text;
    handleItemSearchInput();

    const q = normalize(text);
    const exact = searchIndex.filter(i => normalize(i.name) === q);
    if (exact.length === 1) chooseItem(exact[0], true);
  };
}

// Senarai Beli-belah + Laluan
const START = { x: 130, y: 80 };
const CART_KEY = 'senaraiBeli';
const laneOf = z => laneX[z] ?? 842;

let cart = [];
try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { cart = []; }
cart = cart.filter(c => searchIndex.some(i => i.name === c.name && i.zone === c.zone));

let lastOrder = null;

const saveCart = () => { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {} };
const inCart = (name, zone) => cart.some(c => c.name === name && c.zone === zone);

function legPoints(from, to){
  const t = zoneCoordinates[to];
  const lane = laneOf(to);
  const pts = [];
  if (from.zone){
    const cur = laneOf(from.zone);
    pts.push([cur, from.y]);
    if (cur !== lane){ pts.push([cur, START.y]); pts.push([lane, START.y]); }
  } else {
    pts.push([lane, START.y]);
  }
  pts.push([lane, t.y]);
  pts.push([t.x, t.y]);
  return pts;
}

function planRoute(zones){
  let cur = { zone: null, x: START.x, y: START.y };
  const left = [...zones], order = [], all = [[START.x, START.y]];

  const cost = (from, to) => {
    let s = 0, px = from.x, py = from.y;
    legPoints(from, to).forEach(([x, y]) => { s += Math.abs(x - px) + Math.abs(y - py); px = x; py = y; });
    return s;
  };

  while (left.length){
    let bi = 0, bc = Infinity;
    left.forEach((z, i) => { const c = cost(cur, z); if (c < bc){ bc = c; bi = i; } });
    const z = left.splice(bi, 1)[0];
    all.push(...legPoints(cur, z));
    order.push(z);
    cur = { zone: z, ...zoneCoordinates[z] };
  }
  const d = all.map((p, i) => `${i ? 'L' : 'M'} ${p[0]} ${p[1]}`).join(' ');
  return { order, d };
}

function clearStops(){
  const g = document.getElementById('routeStops');
  if (g) g.remove();
}

function drawStops(order){
  clearStops();
  if(!routePath || !routePath.ownerSVGElement) return;
  const NS = 'http://www.w3.org/2000/svg';
  const g = document.createElementNS(NS, 'g');
  g.id = 'routeStops';
  order.forEach((z, i) => {
    const c = zoneCoordinates[z];
    const s = document.createElementNS(NS, 'g');
    s.setAttribute('class', 'route-stop');
    const circ = document.createElementNS(NS, 'circle');
    circ.setAttribute('cx', c.x); circ.setAttribute('cy', c.y); circ.setAttribute('r', 17);
    const txt = document.createElementNS(NS, 'text');
    txt.setAttribute('x', c.x); txt.setAttribute('y', c.y);
    txt.setAttribute('text-anchor', 'middle');
    txt.setAttribute('dominant-baseline', 'central');
    txt.setAttribute('font-size', 20);
    txt.textContent = i + 1;
    s.appendChild(circ); s.appendChild(txt);
    g.appendChild(s);
    setTimeout(() => s.classList.add('show'), 250 + (1000 * (i + 1)) / order.length);
  });
  routePath.ownerSVGElement.appendChild(g);
}

function showListRoute(){
  const zones = [...new Set(cart.map(c => c.zone))];
  if (!zones.length) return;

  const { order, d } = planRoute(zones);
  lastOrder = order;

  categorySelect.value = '';
  highlightItem = null;
  highlightZone = null;
  itemListEl.innerHTML = '';
  if(popularSectionEl) popularSectionEl.style.display = 'none';

  resultMsg.innerHTML =
    `🛒 <span>Laluan untuk <b>${cart.length} barang</b> melalui <b>${order.length} rak</b>. Ikut nombor <b>1</b> hingga <b>${order.length}</b> pada pelan.</span>`;
  renderMap(order, null);
  drawRoute(d);
  drawStops(order);
  renderCart();
  document.querySelector('.plan')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function setAddState(b){
  const on = inCart(b.dataset.name, b.dataset.zone);
  b.textContent = on ? '✓' : '+';
  b.classList.toggle('added', on);
  b.setAttribute('aria-label', (on ? 'Buang ' : 'Tambah ') + b.dataset.name + (on ? ' dari senarai' : ' ke senarai'));
}

function refreshAddButtons(){
  itemListEl.querySelectorAll('.add-btn').forEach(setAddState);
}

function makeAddBtn(name, zone){
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'add-btn';
  b.dataset.name = name;
  b.dataset.zone = zone;
  setAddState(b);
  b.addEventListener('click', e => { e.stopPropagation(); toggleCart(name, zone); });
  return b;
}

function toggleCart(name, zone){
  const i = cart.findIndex(c => c.name === name && c.zone === zone);
  if (i >= 0) cart.splice(i, 1); else cart.push({ name, zone });
  lastOrder = null;
  saveCart();
  refreshAddButtons();
  renderCart();
}

// Panel Senarai
const cartFab = document.createElement('button');
cartFab.type = 'button';
cartFab.id = 'cartFab';

const cartPanel = document.createElement('div');
cartPanel.id = 'cartPanel';
cartPanel.innerHTML = `
  <div class="cart-head"><b>🛒 Senarai Beli-belah</b><button type="button" id="cartClose" aria-label="Tutup">✕</button></div>
  <div id="cartBody"></div>
  <div class="cart-actions">
    <button type="button" id="cartRoute">🗺️ Tunjuk laluan</button>
    <button type="button" id="cartClear">Kosongkan</button>
  </div>`;
document.body.appendChild(cartFab);
document.body.appendChild(cartPanel);

const cartBody = cartPanel.querySelector('#cartBody');

function renderCart(){
  cartFab.textContent = `🛒 Senarai (${cart.length})`;

  if (!cart.length){
    cartBody.innerHTML = '<div class="cart-empty">Belum ada barang.<br>Tekan <b>+</b> pada mana-mana item.</div>';
    return;
  }

  const zones = lastOrder || [...new Set(cart.map(c => c.zone))];
  cartBody.innerHTML = zones.map((z, i) => {
    const items = cart.filter(c => c.zone === z);
    return `
      <div class="cart-group">
        <div class="cart-zone">${lastOrder ? `<span class="step-no">${i + 1}</span>` : ''}${esc(zoneLabels[z])}</div>
        ${items.map(c => `
          <div class="cart-item">
            <span>${esc(c.name)}</span>
            <button type="button" class="cart-del" data-name="${esc(c.name)}" data-zone="${esc(c.zone)}" aria-label="Buang ${esc(c.name)}">✕</button>
          </div>`).join('')}
      </div>`;
  }).join('');
}

cartBody.addEventListener('click', e => {
  const b = e.target.closest('.cart-del');
  if (b) toggleCart(b.dataset.name, b.dataset.zone);
});
cartFab.addEventListener('click', () => cartPanel.classList.toggle('open'));
cartPanel.querySelector('#cartClose').addEventListener('click', () => cartPanel.classList.remove('open'));
cartPanel.querySelector('#cartRoute').addEventListener('click', () => {
  if (!cart.length) return;
  cartPanel.classList.remove('open');
  showListRoute();
});
cartPanel.querySelector('#cartClear').addEventListener('click', () => {
  cart = []; lastOrder = null;
  saveCart(); refreshAddButtons(); renderCart(); clearStops(); hideRoute();
});

renderCart();
renderPopular();
showCategory();

function addZoneIcons(){
  const NS = 'http://www.w3.org/2000/svg';
  Object.entries(zoneEls).forEach(([id, g]) => {
    const icon = zoneIcons[id];
    if (!icon) return;

    const shape = g.querySelector('rect') || g;
    const b = shape.getBBox();
    const left = iconPos[id] === 'left';
    const size = left
      ? Math.min(b.height * 0.6, 32)
      : Math.min(b.width * 0.55, 34);

    const t = document.createElementNS(NS, 'text');
    t.textContent = icon;
    t.setAttribute('class', 'zone-icon');
    t.setAttribute('font-size', size);
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('dominant-baseline', 'central');
    t.setAttribute('x', left ? b.x + size * 0.9 : b.x + b.width / 2);
    t.setAttribute('y', left ? b.y + b.height / 2 : b.y + size * 0.85);
    g.appendChild(t);
  });
}
addZoneIcons();