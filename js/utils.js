// ============================================================
// NEXUS Store — js/utils.js
// Funcții utilitare reutilizabile în toată aplicația.
// ============================================================

/** Scurtătură pentru document.getElementById. */
const $ = (id) => document.getElementById(id);

/** Formatează un număr ca preț în RON. */
const fmt = (n) => n.toLocaleString('ro-RO') + ' LEI';

/** Afișează o notificare toast temporară. */
function toast(msg, icon = '✓') {
  const container = $('toast');
  const el = document.createElement('div');
  el.className = 'toast-item';
  el.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-text">${msg}</span>`;
  container.appendChild(el);
  // Forțăm un reflow înainte de a adăuga clasa de animație
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('show')));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 400);
  }, 3000);
}

/** Returnează numărul total de produse din coș. */
function cartCount() {
  return STATE.cartItems.reduce((sum, item) => sum + item.qty, 0);
}

/** Returnează numărul de produse din wishlist. */
function wishCount() {
  return STATE.wishlist.length;
}

/** Actualizează badge-urile din header (coș + wishlist). */
function updateBadges() {
  const cc = cartCount();
  $('cart-count').textContent = cc;
  $('cart-count').style.display = cc > 0 ? 'flex' : 'none';

  const wc = wishCount();
  $('wish-count').textContent = wc;
  $('wish-count').style.display = wc > 0 ? 'flex' : 'none';

  // Animație de bounce la schimbare
  $('cart-count').classList.add('bump');
  setTimeout(() => $('cart-count').classList.remove('bump'), 250);
}

/** Marchează link-ul de navigație activ. */
function updateNavActive() {
  ['home', 'catalog', 'about'].forEach(r => {
    const el = $('nav-' + r);
    if (el) el.classList.toggle('active', STATE.route === r);
  });
}

/** Inițializează animațiile de tip reveal-on-scroll. */
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/** Deschide/închide meniul mobil. */
function toggleMobileMenu() {
  $('mobile-menu').classList.toggle('open');
}

/** Gestionează abonarea la newsletter. */
function subscribeNewsletter() {
  const emailEl = $('nl-email');
  if (!emailEl) return;
  const email = emailEl.value.trim();
  if (!email || !email.includes('@')) {
    toast('Introdu o adresă de email validă', '⚠️');
    return;
  }
  emailEl.value = '';
  toast('Te-ai abonat cu succes!', '✉️');
}