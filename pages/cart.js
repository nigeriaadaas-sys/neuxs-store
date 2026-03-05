// ============================================================
// NEXUS Store — pages/cart.js
// Pagina coșului de cumpărături + toate acțiunile aferente.
// ============================================================

/** Randează pagina coșului. */
function renderCart() {
  if (STATE.cartItems.length === 0) {
    return `
      <div class="container" style="padding:100px 0;text-align:center">
        <div style="font-size:4rem;opacity:.2;margin-bottom:20px">🛒</div>
        <h2 style="font-family:var(--font-display);font-size:2rem;font-weight:800;margin-bottom:12px">Coșul tău este gol</h2>
        <p style="color:var(--text-muted);margin-bottom:28px">Adaugă produse din catalogul nostru pentru a continua.</p>
        <button class="btn btn-primary btn-lg" onclick="router('catalog')">Descoperă produsele</button>
      </div>`;
  }

  let subtotal = 0;
  const itemsHtml = STATE.cartItems.map(item => {
    const p = PRODUCTS.find(p => p.id === item.id);
    if (!p) return '';
    const lineTotal = p.price * item.qty;
    subtotal += lineTotal;

    return `
      <div class="cart-item">
        <div class="cart-item-img">
          <img
            src="${p.image}"
            alt="${p.name}"
            style="width:100%; height:100%; object-fit:contain; padding:8px;"
            onerror="this.style.display='none'; this.parentElement.innerHTML='📱';"
          >
        </div>
        <div class="cart-item-info">
          <div class="cart-item-brand">${p.brand}</div>
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-variant">${p.variants ? p.variants[0] : ''}</div>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="updateQty(${p.id}, -1)">−</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="updateQty(${p.id}, 1)">+</button>
            <button class="btn btn-danger btn-sm" style="margin-left:8px" onclick="removeFromCart(${p.id})">Șterge</button>
          </div>
        </div>
        <div class="cart-item-price">${fmt(lineTotal)}</div>
      </div>`;
  }).join('');

  const shipping = subtotal > 500 ? 0 : 29;
  const total    = subtotal + shipping;

  return `
    <div class="container">
      <div style="display:flex;align-items:baseline;gap:12px;margin-bottom:28px;padding-top:40px">
        <h1 class="cart-title">Coșul meu</h1>
        <span class="cart-count-label">${cartCount()} produse</span>
      </div>

      <div class="cart-layout">

        <!-- LISTA DE PRODUSE -->
        <div>
          <div class="cart-items">${itemsHtml}</div>
          <button class="btn btn-ghost btn-sm" style="margin-top:20px" onclick="router('catalog')">
            ← Continuă cumpărăturile
          </button>
        </div>

        <!-- SUMAR COMANDĂ -->
        <div class="cart-summary">
          <div class="summary-title">Sumar comandă</div>

          <div class="summary-row"><span class="label">Subtotal</span><span>${fmt(subtotal)}</span></div>
          <div class="summary-row">
            <span class="label">Transport</span>
            <span style="color:${shipping === 0 ? 'var(--success)' : 'var(--text)'}">
              ${shipping === 0 ? 'GRATUIT' : fmt(shipping)}
            </span>
          </div>
          ${shipping > 0
            ? `<p style="font-size:.78rem;color:var(--text-muted);margin-bottom:12px">
                Adaugă produse de ${fmt(500 - subtotal)} pentru transport gratuit.
               </p>`
            : ''}

          <div class="summary-total">
            <span class="label">Total</span>
            <span class="amount">${fmt(total)}</span>
          </div>

          <!-- COD PROMOȚIONAL -->
          <div class="promo-input-wrap">
            <input class="promo-input" type="text" placeholder="Cod promoțional" id="promo-code">
            <button class="btn btn-ghost btn-sm" onclick="applyPromo()">Aplică</button>
          </div>

          <button class="btn btn-primary btn-full btn-lg" onclick="openCheckout()">
            Finalizează comanda
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>`;
}

// ── ACȚIUNI COȘ ──────────────────────────────────────

/** Adaugă un produs în coș sau incrementează cantitatea. */
function addToCart(productId) {
  const p = PRODUCTS.find(p => p.id === productId);
  if (!p || p.stock === 'out-of-stock') return;

  const existing = STATE.cartItems.find(i => i.id === productId);
  if (existing) existing.qty++;
  else STATE.cartItems.push({ id: productId, qty: 1 });

  saveCart();
  updateBadges();
  toast(`${p.name} adăugat în coș`, '🛒');
}

/**
 * Modifică cantitatea unui produs. Dacă ajunge la 0, îl elimină.
 * @param {number} productId
 * @param {number} delta - +1 sau -1
 */
function updateQty(productId, delta) {
  const idx = STATE.cartItems.findIndex(i => i.id === productId);
  if (idx === -1) return;
  STATE.cartItems[idx].qty += delta;
  if (STATE.cartItems[idx].qty <= 0) STATE.cartItems.splice(idx, 1);
  saveCart();
  updateBadges();
  if (STATE.route === 'cart') router('cart');
}

/** Elimină complet un produs din coș. */
function removeFromCart(productId) {
  STATE.cartItems = STATE.cartItems.filter(i => i.id !== productId);
  saveCart();
  updateBadges();
  toast('Produs eliminat din coș', '🗑️');
  if (STATE.route === 'cart') router('cart');
}

/** Verifică și aplică un cod promoțional. */
function applyPromo() {
  const code = $('promo-code')?.value.trim().toUpperCase();
  if (code === 'NEXUS10')   toast('Cod aplicat! -10% reducere', '🎉');
  else if (code === 'FREE') toast('Transport gratuit aplicat!', '🚚');
  else if (code)            toast('Cod promoțional invalid', '❌');
}