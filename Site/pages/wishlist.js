// ============================================================
// NEXUS Store — pages/wishlist.js
// Pagina wishlist-ului + funcția de toggle.
// ============================================================

/** Randează pagina cu produsele salvate în wishlist. */
function renderWishlist() {
  const wished = PRODUCTS.filter(p => STATE.wishlist.includes(p.id));

  return `
    <div class="container" style="padding:40px 0 80px">
      <div class="section-header">
        <div class="section-eyebrow">Colecție personală</div>
        <div class="section-title">Lista mea de dorințe</div>
        ${STATE.wishlist.length > 0
          ? `<div class="section-sub">${STATE.wishlist.length} produse salvate</div>`
          : ''}
      </div>

      ${wished.length === 0
        ? `<div class="no-results">
             <div class="no-results-icon">🤍</div>
             <p style="font-size:1.1rem;font-weight:600;color:var(--text);margin-bottom:8px">Niciun produs salvat</p>
             <p>Apasă pe ❤ de pe orice produs pentru a-l salva aici.</p>
             <button class="btn btn-ghost" style="margin-top:16px" onclick="router('catalog')">Explorează produse</button>
           </div>`
        : `<div class="products-grid">${wished.map(p => renderCard(p)).join('')}</div>`
      }
    </div>`;
}

/**
 * Adaugă sau elimină un produs din wishlist.
 * Actualizează UI-ul fără re-randarea întregii pagini.
 * @param {number} productId
 */
function toggleWishlist(productId) {
  const p = PRODUCTS.find(p => p.id === productId);
  const inList = STATE.wishlist.includes(productId);

  if (inList) {
    STATE.wishlist = STATE.wishlist.filter(i => i !== productId);
    toast(`${p.name} eliminat din wishlist`, '🤍');
  } else {
    STATE.wishlist.push(productId);
    toast(`${p.name} salvat în wishlist`, '❤️');
  }

  saveWishlist();
  updateBadges();

  // Actualizăm butonul din card fără re-randarea paginii
  const btn = document.getElementById('wish-btn-' + productId);
  if (btn) {
    const nowIn = STATE.wishlist.includes(productId);
    btn.classList.toggle('wishlisted', nowIn);
    btn.querySelector('svg').setAttribute('fill', nowIn ? 'currentColor' : 'none');
  }

  // Actualizăm butonul de pe pagina de detalii
  const detailBtn = document.getElementById('wish-detail-' + productId);
  if (detailBtn) {
    const nowIn = STATE.wishlist.includes(productId);
    const svg = detailBtn.querySelector('svg');
    svg.setAttribute('fill',   nowIn ? 'var(--danger)' : 'none');
    svg.setAttribute('stroke', nowIn ? 'var(--danger)' : 'currentColor');
  }
}