document.addEventListener('DOMContentLoaded', () => {
  const id = parseInt(localStorage.getItem('buyProduct') || localStorage.getItem('selectedProduct') || '1');
  const p = products.find(x => x.id === id) || products[0];

  document.getElementById('oppEmoji').textContent = p.emoji;
  document.getElementById('oppName').textContent = p.name;
  document.getElementById('oppPrice').textContent = formatPrice(p.price);

  const orderId = 'ORD-' + Date.now().toString(36).toUpperCase().slice(-8);
  document.getElementById('orderIdBox').textContent = 'Order ID: ' + orderId;

  // Clearing cart after order
  cart = [];
  saveCart();
  initCartDisplay();

  showToast('🎉 Order placed successfully!');

  document.getElementById('continueBtn').addEventListener('click', () => {
    window.location.href = 'listing.html';
  });
  document.getElementById('homeBtn').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
});
