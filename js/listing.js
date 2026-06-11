let filtered = [...products];
let isGrid = true;
let activeF = { cats: [], types: [], ratings: [], brands: [] };

function render() {
  const grid = document.getElementById('listingGrid');
  const count = document.getElementById('prodCount');
  grid.innerHTML = '';
  grid.className = 'listing-grid' + (isGrid ? '' : ' list-view');
  count.textContent = `Cars (${filtered.length})`;
  if (!filtered.length) {
    grid.innerHTML = '<div class="no-res"><h3>No cars found</h3><p>Try adjusting your filters.</p></div>';
    return;
  }
  filtered.forEach(p => {
    grid.appendChild(productCard(p, (id) => {
      localStorage.setItem('selectedProduct', id);
      window.location.href = 'detail.html';
    }));
  });
}

function sort() {
  const v = document.getElementById('sortSel').value;
  filtered.sort((a, b) => {
    if (v === 'az') return a.name.localeCompare(b.name);
    if (v === 'za') return b.name.localeCompare(a.name);
    if (v === 'pl') return a.price - b.price;
    if (v === 'ph') return b.price - a.price;
    if (v === 'rd') return b.rating - a.rating;
    return 0;
  });
}

function applyFilters() {
  activeF.cats = [...document.querySelectorAll('.fc:checked')].map(c => c.value);
  activeF.types = [...document.querySelectorAll('.ft:checked')].map(c => c.value);
  activeF.ratings = [...document.querySelectorAll('.fr:checked')].map(c => parseFloat(c.value));
  activeF.brands = [...document.querySelectorAll('.fb:checked')].map(c => c.value);

  filtered = products.filter(p => {
    const cm = !activeF.cats.length || activeF.cats.includes(p.category);
    const tm = !activeF.types.length || activeF.types.includes(p.type);
    const rm = !activeF.ratings.length || activeF.ratings.some(r => p.rating >= r);
    const bm = !activeF.brands.length || activeF.brands.includes(p.brand);
    return cm && tm && rm && bm;
  });
  sort(); render(); renderTags();
  document.getElementById('filterPanel').classList.remove('open');
}

function resetFilters() {
  document.querySelectorAll('.fc,.ft,.fr,.fb').forEach(c => c.checked = false);
  activeF = { cats: [], types: [], ratings: [], brands: [] };
  filtered = [...products]; sort(); render(); renderTags();
}

function renderTags() {
  const c = document.getElementById('activeTags');
  const all = [
    ...activeF.cats.map(v => ({ k: 'cats', v })),
    ...activeF.types.map(v => ({ k: 'types', v })),
    ...activeF.ratings.map(v => ({ k: 'ratings', v, label: v + '★ & up' })),
    ...activeF.brands.map(v => ({ k: 'brands', v })),
  ];
  c.innerHTML = all.map(f =>
    `<span class="aft">${f.label || f.v}
      <button onclick="removeTag('${f.k}','${f.v}')">×</button>
    </span>`).join('');
}

function removeTag(k, v) {
  activeF[k] = activeF[k].filter(x => String(x) !== String(v));
  document.querySelectorAll(k === 'cats' ? '.fc' : k === 'types' ? '.ft' : k === 'ratings' ? '.fr' : '.fb')
    .forEach(c => { if (String(c.value) === String(v)) c.checked = false; });
  filtered = products.filter(p => {
    const cm = !activeF.cats.length || activeF.cats.includes(p.category);
    const tm = !activeF.types.length || activeF.types.includes(p.type);
    const rm = !activeF.ratings.length || activeF.ratings.some(r => p.rating >= r);
    const bm = !activeF.brands.length || activeF.brands.includes(p.brand);
    return cm && tm && rm && bm;
  });
  sort(); render(); renderTags();
}

document.addEventListener('DOMContentLoaded', () => {
  sort(); render();
  document.getElementById('filterToggle').addEventListener('click', () =>
    document.getElementById('filterPanel').classList.toggle('open'));
  document.getElementById('applyBtn').addEventListener('click', applyFilters);
  document.getElementById('resetBtn').addEventListener('click', resetFilters);
  document.getElementById('sortSel').addEventListener('change', () => { sort(); render(); });
  document.getElementById('gridBtn').addEventListener('click', () => {
    isGrid = true;
    document.getElementById('gridBtn').classList.add('active');
    document.getElementById('listBtn').classList.remove('active');
    render();
  });
  document.getElementById('listBtn').addEventListener('click', () => {
    isGrid = false;
    document.getElementById('listBtn').classList.add('active');
    document.getElementById('gridBtn').classList.remove('active');
    render();
  });
});
