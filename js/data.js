// =====  CAR PRODUCT DATA =====
const products = [
  {
    id: 1,
    name: "Toyota GR Supra 3.0L Turbo (2026)",
    short: "Toyota GR Supra",
    price: 6850000, oldPrice: 7200000,
    rating: 4.5, reviews: 38,
    image: "images/Toyota GR Supra 3.0L Turbo (2026).webp",
    category: "Sports Cars", type: "New", brand: "Toyota",
    desc: "The 2026 Toyota GR Supra packs a turbocharged 3.0L inline-6 producing 382 hp and 500 Nm of torque. With a 0–100 km/h sprint in 4.1 seconds and a sharp double-joint spring front suspension, it delivers pure sports car thrills. Available in Prominence Red.",
    tags: ["Turbo", "RWD", "Manual Available"]
  },
  {
    id: 2,
    name: "BMW M4 Competition xDrive (2026)",
    short: "BMW M4 Competition",
    price: 9500000, oldPrice: null,
    rating: 5, reviews: 22,
    image: "images/BMW M4 Competition xDrive (2026).png",
    category: "Sports Cars", type: "New", brand: "BMW",
    desc: "The 2026 BMW M4 Competition xDrive features a twin-turbocharged 3.0L S58 inline-6 engine producing 510 hp and 650 Nm of torque. AWD traction, adaptive M suspension, and carbon-fibre roof combine to create an uncompromising everyday sports machine.",
    tags: ["AWD", "Twin-Turbo", "M Performance"]
  },
  {
    id: 3,
    name: "Mercedes-AMG C 63 S E Performance (2026)",
    short: "AMG C 63 S E Performance",
    price: 11200000, oldPrice: 12000000,
    rating: 4.5, reviews: 17,
    image: "images/Mercedes-AMG C 63 S E Performance (2026).avif",
    category: "Sports Cars", type: "New", brand: "Mercedes-AMG",
    desc: "The AMG C 63 S E Performance pairs a turbocharged 2.0L four-cylinder with a high-performance electric rear axle for a combined 671 hp system output. The world's most powerful four-cylinder production car. 0–100 km/h in 3.4 seconds.",
    tags: ["Hybrid", "PHEV", "AMG"]
  },
  {
    id: 4,
    name: "Porsche 911 Carrera S (2026)",
    short: "Porsche 911 Carrera S",
    price: 15800000, oldPrice: null,
    rating: 5, reviews: 45,
    image: "images/Porsche 911 Carrera S (2026).png",
    category: "Sports Cars", type: "New", brand: "Porsche",
    desc: "Iconic flat-six engine, 450 hp, rear-wheel drive. The 2026 Porsche 911 Carrera S stays true to its 60-year heritage while pushing forward with new active suspension management and lightweight construction. Pure, connected, unmistakable.",
    tags: ["Flat-Six", "RWD", "Iconic"]
  },
  {
    id: 5,
    name: "Ford Mustang GT (2026)",
    short: "Ford Mustang GT",
    price: 5500000, oldPrice: 5900000,
    rating: 4, reviews: 61,
    image: "images/Ford Mustang GT (2026).webp",
    category: "Muscle Cars", type: "New", brand: "Ford",
    desc: "The 2026 Mustang GT roars to life with a 5.0L Coyote V8 producing 486 hp and 568 Nm. Available as a fastback or convertible, it carries iconic pony car heritage with modern tech including a 12.4-inch digital instrument cluster.",
    tags: ["V8", "Muscle", "Iconic"]
  },
  {
    id: 6,
    name: "Audi RS6 Avant (2026)",
    short: "Audi RS6 Avant",
    price: 13400000, oldPrice: 14200000,
    rating: 5, reviews: 29,
    image: "images/Audi RS6 Avant (2026).avif",
    category: "Performance Wagons", type: "New", brand: "Audi",
    desc: "The RS6 Avant combines 630 hp from a twin-turbocharged 4.0L V8 TFSI with the practicality of a shooting brake. Quattro AWD, adaptive air suspension, and a 305 km/h top speed make this the ultimate performance estate.",
    tags: ["Quattro", "V8", "Estate"]
  },
  {
    id: 7,
    name: "Honda Civic Type R (2026)",
    short: "Honda Civic Type R",
    price: 4800000, oldPrice: 5100000,
    rating: 4.5, reviews: 53,
    image: "images/Honda Civic Type R (2026).jpg",
    category: "Hot Hatches", type: "New", brand: "Honda",
    desc: "The FK8 successor delivers a turbocharged 2.0L VTEC producing 330 hp via a 6-speed manual. Adaptive dampers, Brembo brakes, and a limited-slip differential make this the most driver-focused front-wheel drive hot hatch ever built.",
    tags: ["Manual", "FWD", "VTEC"]
  },
  {
    id: 8,
    name: "Hyundai Ioniq 6 RWD Standard Range (2026)",
    short: "Hyundai Ioniq 6",
    price: 3900000, oldPrice: null,
    rating: 3.5, reviews: 19,
    image: "images/Hyundai Ioniq 6 RWD Standard Range (2026).webp",
    category: "Electric Cars", type: "New", brand: "Hyundai",
    desc: "The Ioniq 6 Standard Range offers up to 429 km WLTP range from a 53 kWh battery. Streamlined aero design with a 0.21 Cd drag coefficient and 18-minute DC fast charging from 10–80%. Perfect for city commuters and highway cruisers alike.",
    tags: ["EV", "Fast Charge", "Aero"]
  }
];

// ===== CART STATE =====
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function initCartDisplay() {
  const badge = document.getElementById('cartBadge');
  if (!badge) return;
  const count = getCartCount();
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}

function addToCart(id) {
  const existing = cart.find(x => x.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, qty: 1 });
  }
  saveCart();
  initCartDisplay();
  const p = products.find(x => x.id === id);
  showToast('🛒 ' + (p ? p.short : 'Item') + ' added to cart!');
}

function removeFromCart(id) {
  cart = cart.filter(x => x.id !== id);
  saveCart();
  initCartDisplay();
}

function updateQty(id, qty) {
  if (qty <= 0) {
    removeFromCart(id);
    return;
  }
  const item = cart.find(x => x.id === id);
  if (item) {
    item.qty = qty;
    saveCart();
    initCartDisplay();
  }
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function renderStars(r) {
  let s = '';
  for (let i = 1; i <= 5; i++) {
    s += r >= i ? '★' : (r >= i - 0.5 ? '✦' : '☆');
  }
  return s;
}

function formatPrice(p) {
  return '₹' + p.toLocaleString('en-IN', { minimumFractionDigits: 0 });
}

function productCard(p, onClick) {
  const div = document.createElement('div');
  div.className = 'product-card';
  div.innerHTML = `
    <div class="product-thumb">
      <img src="${p.image}" alt="${p.name}"/>
    </div>
    <div class="product-name">${p.name}</div>
    <div class="product-price">
      ${formatPrice(p.price)}
      ${p.oldPrice ? `<span class="old">${formatPrice(p.oldPrice)}</span>` : ''}
    </div>
    <div class="stars">
      <span class="s">${renderStars(p.rating)}</span>
      <span class="rc">${p.reviews} Reviews</span>
    </div>`;
  div.addEventListener('click', () => onClick(p.id));
  return div;
}

document.addEventListener('DOMContentLoaded', () => {
  initCartDisplay();
  const cb = document.getElementById('cartBtn');
  if (cb) {
    cb.addEventListener('click', () => {
      window.location.href = 'cart.html';
    });
  }
});
