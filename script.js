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

// Titik hujung laluan (x, y) berdasarkan viewBox 1000 x 1200.
// Zon blok tengah didekati dari tepi kanan (x: 820).
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

// Lorong menegak yang kosong: x=142 (antara dua rak kiri), x=350 (kiri rak Roti).
// Semua zon lain guna lorong x=842 (antara blok tengah dan rak kanan).
const laneX = { airSejuk: 142, vendor: 350, roti1: 350, roti2: 350 };

// Setiap kategori dan zon item
const categories = {
  "Makanan & Keperluan Dapur": {
    zones: ['airSejuk','vendor','roti1','snek','mi','roti2','biskut','gula','minuman','bahan','aiskrim','goreng'],
    items: [
      ["Air Mineral","airSejuk"], ["Milo Tin","airSejuk"],
      ["Nasi Lemak","vendor"], ["Kuih-muih","vendor"],
      ["Roti Putih","roti1"], ["Roti Gandum","roti2"],
      ["Keropok","snek"], ["Kerepek Pisang","snek"],
      ["Mi Segera Kari","mi"], ["Mi Segera Ayam","mi"],
      ["Biskut Marie","biskut"], ["Biskut Krim","biskut"],
      ["Gula-gula Getah","gula"], ["Coklat","gula"],
      ["Kopi O Kampung","minuman"], ["Teh Tarik Sachet","minuman"], ["Susu Pekat","minuman"],
      ["Beras Wangi","bahan"], ["Minyak Masak","bahan"], ["Sos Tomato","bahan"], ["Gula Pasir","bahan"], ["Tepung Gandum","bahan"],
      ["Aiskrim Kon","aiskrim"], ["Aiskrim Tub","aiskrim"],
      ["Karipap","goreng"], ["Pisang Goreng","goreng"]
    ]
  },
  "Barangan Rumah": {
    zones: ['rumah'],
    items: [
      ["Sabun Basuh","rumah"], ["Pencuci Lantai","rumah"], ["Baldi Plastik","rumah"], ["Penyapu","rumah"],
      ["Tuala Dapur","rumah"], ["Berus Lantai","rumah"], ["Pewangi Bilik","rumah"], ["Beg Sampah","rumah"]
    ]
  },
  "Kelengkapan Diri": {
    zones: ['tisu'],
    items: [
      ["Sabun Mandi","tisu"], ["Syampu","tisu"], ["Berus Gigi","tisu"], ["Pencuci Muka","tisu"],
      ["Losyen Badan","tisu"], ["Ubat Gigi","tisu"], ["Pewangi Badan","tisu"], ["Pencukur","tisu"],
      ["Tisu Muka","tisu"], ["Tisu Tandas","tisu"]
    ]
  },
  "Kelengkapan Sekolah & Sampingan": {
    zones: ['alat'],
    items: [
      ["Buku Tulis","alat"], ["Pen & Pensel","alat"], ["Beg Sekolah","alat"], ["Gunting","alat"],
      ["Pembaris","alat"], ["Kotak Pensel","alat"], ["Kalkulator","alat"], ["Pemadam","alat"]
    ]
  }
};

const popularNames = ["Kopi O Kampung", "Minyak Masak", "Sabun Mandi", "Syampu", "Pencuci Lantai", "Beg Sekolah"];

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

// Indeks carian rata: semua item merentas semua kategori
const searchIndex = [];
Object.entries(categories).forEach(([category, data]) => {
  data.items.forEach(([name, zone]) => searchIndex.push({ name, category, zone }));
});
const findItem = name => searchIndex.find(i => i.name === name);

// Zon pada pelan
const zoneEls = {};
document.querySelectorAll('.plan .zone').forEach((g, i) => {
  zoneEls[g.dataset.zone] = g;
  g.style.animationDelay = (i * 45) + 'ms';
});

// Hijau = zon kategori, merah = rak item terpilih
function renderMap(catZones, focusZone){
  Object.entries(zoneEls).forEach(([id, el]) => {
    el.classList.toggle('item-on', id === focusZone);
    el.classList.toggle('cat-on', id !== focusZone && catZones.includes(id));
  });
}

// Isi dropdown kategori
Object.keys(categories).forEach(name => {
  const opt = document.createElement('option');
  opt.value = name;
  opt.textContent = name;
  categorySelect.appendChild(opt);
});

function chooseItem(it, keepText){
  highlightItem = it.name;
  itemSearchInput.value = keepText ? it.name : '';
  closeSuggestions();
  categorySelect.value = it.category;
  showCategory();
}

function renderPopular(){
  popularGridEl.innerHTML = '';
  popularNames.forEach((name, i) => {
    const it = findItem(name);
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

// Laluan ikut lorong kosong: mendatar -> menegak -> mendatar
function createRoute(sx, sy, ex, ey, lane){
  return `M ${sx} ${sy} H ${lane} V ${ey} H ${ex}`;
}

function hideRoute(){
  if(!routePath) return;
  routePath.style.display = 'none';
  routePath.removeAttribute('marker-end');
  routePath.ontransitionend = null;
}

// Lukis laluan dengan animasi; anak panah muncul selepas garisan siap
function drawRoute(d){
  routePath.setAttribute('d', d);
  routePath.style.display = 'block';
  routePath.removeAttribute('marker-end');
  routePath.style.animation = 'none';

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const len = routePath.getTotalLength();
  routePath.style.transition = 'none';
  routePath.style.strokeDasharray = len;
  routePath.style.strokeDashoffset = reduce ? 0 : len;
  routePath.getBoundingClientRect(); // paksa reflow

  if(reduce){
    routePath.setAttribute('marker-end', 'url(#arrow)');
    return;
  }
  routePath.style.transition = 'stroke-dashoffset 1.2s ease-out';
  routePath.style.strokeDashoffset = 0;
  routePath.ontransitionend = () =>
    routePath.setAttribute('marker-end', 'url(#arrow)');
}

// Kemas kini mesej, pelan, dan laluan panah
function updateView(){
  const value = categorySelect.value;

  if(!value){
    resultMsg.innerHTML = 'Pilih kategori atau cari item untuk melihat lokasinya.';
    renderMap([], null);
    popularSectionEl.style.display = '';
    hideRoute();
    return;
  }

  popularSectionEl.style.display = 'none';
  const cat = categories[value];
  const focus = highlightItem ? findItem(highlightItem).zone : null;

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

  renderMap(cat.zones, focus);
  itemListEl.querySelectorAll('.item-row').forEach(r => {
    r.classList.toggle('highlight', r.dataset.name === highlightItem);
  });
}

// Bina senarai item bagi kategori terpilih
function showCategory(){
  const value = categorySelect.value;
  itemListEl.innerHTML = '';

  if(value){
    categories[value].items.forEach(([name, zone], i) => {
      const row = document.createElement('div');
      row.className = 'item-row';
      row.dataset.name = name;
      row.style.animationDelay = Math.min(i * 40, 600) + 'ms';
      row.innerHTML = `<span>${esc(name)}</span><span class="rak-tag">${esc(zoneLabels[zone])}</span>`;
      row.addEventListener('click', () => {
        highlightItem = (highlightItem === name) ? null : name;
        updateView();
        if(highlightItem){
          document.querySelector('.rack-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
      itemListEl.appendChild(row);
    });
  }
  updateView();
}

// ---------- Carian item ----------
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
      `<div class="sug-empty">Tiada item sepadan dengan "<b>${esc(query)}</b>". Cuba kata kunci lain atau pilih kategori di bawah.</div>`;
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
  itemSearchInput.value = '';
  closeSuggestions();
  showCategory();
});

renderPopular();
showCategory();