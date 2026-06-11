(function () {
  var btn = document.getElementById("hamburger");
  var menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;
  btn.addEventListener("click", function () {
    btn.classList.toggle("open");
    menu.classList.toggle("open");
    document.body.style.overflow = menu.classList.contains("open") ? "hidden" : "";
  });
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      btn.classList.remove("open");
      menu.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
})(); document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('bestSellers');
  products.slice(0, 4).forEach(p => {
    grid.appendChild(productCard(p, (id) => {
      localStorage.setItem('selectedProduct', id);
      window.location.href = 'detail.html';
    }));
  });
});
function handleSubscribe() {
  const input = document.getElementById('newsletterEmail');
  const msg = document.getElementById('newsletterMsg');
  const email = input.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    msg.textContent = '⚠️ Please enter your email address.';
    msg.style.color = '#e74c3c';
    msg.style.display = 'block';
    return;
  }

  if (!emailRegex.test(email)) {
    msg.textContent = '⚠️ Please enter a valid email address.';
    msg.style.color = '#e74c3c';
    msg.style.display = 'block';
    return;
  }

  input.value = '';
  msg.textContent = '🎉 You have successfully subscribed to our newsletter!';
  msg.style.color = '#27ae60';
  msg.style.display = 'block';

  setTimeout(() => { msg.style.display = 'none'; }, 2000);
}