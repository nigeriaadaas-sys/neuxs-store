// ============================================================
// NEXUS Store — components/card.js
// ============================================================

// Helper: renders either an <img> tag or a fallback placeholder
function renderImage(p, size = 'card') {
  const styles = size === 'card'
    ? 'width:100%; height:100%; object-fit:contain; padding:24px;'
    : 'max-height:380px; object-fit:contain;';

  return `
    <img
      src="${p.image}"
      alt="${p.name}"
      style="${styles}"
      onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
    >
    <span style="display:none; font-size:4rem; align-items:center; justify-content:center; width:100%; height:100%;">📱</span>
  `;
  // onerror = if the image file is missing, shows 📱 as fallback automatically
}

function renderCard(p) {
  const isWished  = STATE.wishlist.includes(p.id);
  const discount  = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  const isUnavail = p.stock === 'out-of-stock';

  const tagHtml = p.oldPrice
    ? `<span class="product-tag tag-promo">-${discount}%</span>`
    : p.stock === 'limited'
      ? `<span class="product-tag tag-limited">Stoc limitat</span>`
      : isUnavail
        ? `<span class="product-tag tag-unavail">Indisponibil</span>`
        : '';

  return `
    <div class="product-card" onclick="router('product', ${p.id})">
      ${tagHtml}

      <div class="card-image">
        <div class="card-image-bg"></div>
        ${renderImage(p, 'card')}

        <div class="card-actions" onclick="event.stopPropagation()">
          <button
            class="card-action-btn ${isWished ? 'wishlisted' : ''}"
            onclick="toggleWishlist(${p.id})"
            id="wish-btn-${p.id}"
            title="Salvează în wishlist"
          >
            <svg width="15" height="15" fill="${isWished ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <button
            class="card-action-btn"
            onclick="addToCart(${p.id})"
            title="Adaugă în coș"
            ${isUnavail ? 'disabled style="opacity:.4;cursor:not-allowed"' : ''}
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="card-body">
        <div class="card-brand">${p.brand}</div>
        <div class="card-name">${p.name}</div>
        <div class="card-desc">${p.desc.substring(0, 80)}…</div>
        <div class="card-footer">
          <div>
            ${p.oldPrice ? `<div class="price-old">${fmt(p.oldPrice)}</div>` : ''}
            <div class="price-new">${fmt(p.price)}</div>
          </div>
          <div class="card-rating">
            <span class="stars">★</span>
            <span class="rating-val">${p.rating} (${p.reviews.toLocaleString()})</span>
          </div>
        </div>
      </div>
    </div>`;
}