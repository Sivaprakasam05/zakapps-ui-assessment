function renderCart() {
  const container = document.getElementById('cartContent');
  if (!cart.length) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added any cars yet.</p>
        <a href="listing.html">Browse Cars</a>
      </div>`;
    return;
  }

  const subtotal = cart.reduce((sum, item) => {
    const p = products.find(x => x.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);

  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  const itemsHTML = cart.map(item => {
    const p = products.find(x => x.id === item.id);
    if (!p) return '';
    const itemTotal = p.price * item.qty;
    return `
      <div class="cart-item" data-id="${p.id}">
        <div class="cart-item-info">
          <div class="cart-item-emoji">
               <img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;border-radius:6px;"/>
          </div>
          <div>
            <div class="cart-item-name">${p.name}</div>
            <div class="cart-item-brand">${p.brand} · ${p.category}</div>
          </div>
        </div>
        <div class="cart-item-price">${formatPrice(p.price)}</div>
        <div>
          <div class="cart-qty-control">
            <button class="qty-dec" data-id="${p.id}">−</button>
            <span>${item.qty}</span>
            <button class="qty-inc" data-id="${p.id}">+</button>
          </div>
        </div>
        <div class="cart-item-total">${formatPrice(itemTotal)}</div>
        <button class="cart-remove-btn" data-id="${p.id}" title="Remove">×</button>
      </div>`;
  }).join('');

  container.innerHTML = `
    <div class="cart-layout">
      <div>
        <div class="cart-items-header">
          <span>Product</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Total</span>
          <span></span>
        </div>
        ${itemsHTML}
      </div>
      <aside class="cart-summary">
        <h3>Order Summary</h3>
        <div class="summary-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
        <div class="summary-row"><span>GST (18%)</span><span>${formatPrice(tax)}</span></div>
        <div class="summary-row"><span>Delivery</span><span>Free</span></div>
        <div class="summary-row total"><span>Total</span><span>${formatPrice(total)}</span></div>
        <button class="cart-checkout-btn" id="checkoutBtn">Buy Now</button>
        <a href="listing.html" class="cart-continue-link">← Continue Shopping</a>
      </aside>
    </div>`;

  // Bind events
  container.querySelectorAll('.qty-dec').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const item = cart.find(x => x.id === id);
      if (item) { updateQty(id, item.qty - 1); renderCart(); }
    });
  });

  container.querySelectorAll('.qty-inc').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const item = cart.find(x => x.id === id);
      if (item) { updateQty(id, item.qty + 1); renderCart(); }
    });
  });

  container.querySelectorAll('.cart-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const p = products.find(x => x.id === id);
      removeFromCart(id);
      showToast('🗑️ ' + (p ? p.short : 'Item') + ' removed from cart');
      renderCart();
    });
  });

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length > 0) {
        localStorage.setItem('buyProduct', cart[0].id);
        window.location.href = 'order.html';
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
});
