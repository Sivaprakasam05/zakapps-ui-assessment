document.addEventListener('DOMContentLoaded', () => {
  const id = parseInt(localStorage.getItem('selectedProduct') || '1');
  const p = products.find(x => x.id === id) || products[0];

  document.getElementById('bcProduct').textContent = p.short;
  document.getElementById('mainImg').innerHTML = `<img src="${p.image}" alt="p.image">`;
  document.getElementById('detailName').textContent = p.name;
  document.getElementById('dPrice').textContent = formatPrice(p.price);
  document.getElementById('dOld').textContent = p.oldPrice ? formatPrice(p.oldPrice) : '';
  document.getElementById('dDesc').textContent = p.desc;
  document.getElementById('dStars').innerHTML =
    `<span class="s">${renderStars(p.rating)}</span><span class="drc">${p.reviews} Reviews</span>`;
  document.getElementById('tabDescText').textContent = p.desc;
  document.getElementById('tabCat').textContent = p.category;
  document.getElementById('tabBrand').textContent = p.brand;
  document.getElementById('tabType').textContent = p.type;

  // Tags
  document.getElementById('tagsList').innerHTML = p.tags
    .map(t => `<span class="detail-tag">${t}</span>`)
    .join('');

  // Cart
  document.getElementById('btnCart').addEventListener('click', () => addToCart(p.id));

  // Buy now → order page
  document.getElementById('btnBuy').addEventListener('click', () => {
    localStorage.setItem('buyProduct', p.id);
    window.location.href = 'order.html';
  });

  // Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });
});
