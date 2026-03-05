// ============================================================
// NEXUS Store — pages/product.js
// Imaginea se schimbă automat când dai click pe un variant de culoare.
// ============================================================

function renderProduct(id) {
  const p = PRODUCTS.find(p => p.id === parseInt(id));
  if (!p) return renderCatalog();

  const isWished  = STATE.wishlist.includes(p.id);
  const isUnavail = p.stock === 'out-of-stock';
  const savings   = p.oldPrice ? p.oldPrice - p.price : 0;
  const discount  = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;

  const stockHtml = p.stock === 'in-stock'
    ? `<div class="stock-indicator"><span class="stock-dot in-stock"></span><span style="color:var(--success);font-weight:600">În stoc</span> — livrat în 24–48h</div>`
    : p.stock === 'limited'
      ? `<div class="stock-indicator"><span class="stock-dot limited"></span><span style="color:var(--warn);font-weight:600">Stoc limitat</span></div>`
      : `<div class="stock-indicator"><span class="stock-dot out"></span><span style="color:var(--danger);font-weight:600">Indisponibil</span></div>`;

  const specLabels = {
    display:'Display', cpu:'Procesor', ram:'Memorie RAM',
    storage:'Stocare', cam:'Cameră', battery:'Baterie',
    os:'Sistem de operare', weight:'Greutate'
  };

  const related = PRODUCTS.filter(r => r.id !== p.id && r.brand === p.brand).slice(0, 3);

  return `
    <div class="container" style="padding-top:32px;padding-bottom:80px">

      <div class="breadcrumb">
        <span class="breadcrumb-item" onclick="router('home')">Acasă</span>
        <span class="breadcrumb-sep">›</span>
        <span class="breadcrumb-item" onclick="router('catalog')">Produse</span>
        <span class="breadcrumb-sep">›</span>
        <span class="breadcrumb-item current">${p.name}</span>
      </div>

      <div class="product-detail">

        <!-- GALERIE -->
        <div class="product-gallery">
          <div class="gallery-main">
            <div class="gallery-bg"></div>
            <!-- id="main-product-img" — schimbat din JS când selectezi culoarea -->
            <img
              id="main-product-img"
              src="${p.image}"
              alt="${p.name}"
              style="max-height:380px; object-fit:contain; position:relative; z-index:1; transition: opacity .25s ease;"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
            >
            <span style="display:none; font-size:8rem;">📱</span>
          </div>

          <!-- Thumbnails — unul per variantă -->
          <div class="gallery-thumbs">
            ${p.variants.map((v, i) => `
              <div
                class="gallery-thumb ${i === 0 ? 'active' : ''}"
                onclick="selectVariant('${v.image}', '${v.name}', this)"
                title="${v.name}"
              >
                <img
                  src="${v.image}"
                  alt="${v.name}"
                  style="width:100%;height:100%;object-fit:contain;padding:6px;"
                  onerror="this.style.display='none'; this.parentElement.innerHTML='📱';"
                >
              </div>
            `).join('')}
          </div>
        </div>

        <!-- DETALII -->
        <div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
            <span class="product-brand-tag">${p.brand}</span>
            ${!isUnavail ? '<span style="font-size:.78rem;color:var(--success);font-weight:600">✓ Produs autentic</span>' : ''}
          </div>

          <h1 class="product-title">${p.name}</h1>

          <div class="product-rating-row">
            <span class="stars">★★★★★</span>
            <span style="font-weight:700">${p.rating}</span>
            <span style="color:var(--text-muted);font-size:.85rem">(${p.reviews.toLocaleString()} recenzii)</span>
          </div>

          ${stockHtml}

          <div class="product-price-row">
            <span class="product-price">${fmt(p.price)}</span>
            ${p.oldPrice ? `<span class="product-price-old">${fmt(p.oldPrice)}</span>` : ''}
            ${p.oldPrice ? `<span class="product-savings">Economisești ${fmt(savings)} (${discount}%)</span>` : ''}
          </div>

          <p class="product-desc">${p.desc}</p>

          <!-- VARIANTE DE CULOARE — click schimbă imaginea principală -->
          <div class="product-variants">
            <div class="variants-label">
              Culoare —
              <span style="color:var(--text);font-weight:600" id="sel-variant">${p.variants[0].name}</span>
            </div>
            <div class="variant-chips">
              ${p.variants.map((v, i) => `
                <button
                  class="variant-chip ${i === 0 ? 'active' : ''}"
                  onclick="selectVariant('${v.image}', '${v.name}', null)"
                >${v.name}</button>
              `).join('')}
            </div>
          </div>

          <div class="product-actions">
            <button class="btn btn-primary btn-lg" ${isUnavail ? 'disabled' : `onclick="addToCart(${p.id})"`}>
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              ${isUnavail ? 'Indisponibil' : 'Adaugă în coș'}
            </button>
            <button class="btn btn-ghost btn-icon" onclick="toggleWishlist(${p.id})" id="wish-detail-${p.id}" title="Wishlist">
              <svg width="18" height="18" fill="${isWished ? 'var(--danger)' : 'none'}" stroke="${isWished ? 'var(--danger)' : 'currentColor'}" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
          </div>

          <div class="specs-card">
            <div class="specs-header"><div class="specs-title">Specificații tehnice</div></div>
            ${Object.entries(p.specs).map(([k, v]) => `
              <div class="spec-row">
                <span class="spec-key">${specLabels[k] || k}</span>
                <span class="spec-val">${v}</span>
              </div>
            `).join('')}
          </div>

          <div class="trust-badges">
            ${['Garanție oficială 2 ani','Livrare gratuită','Retur 30 zile','Rate fără dobândă'].map(label => `
              <div class="trust-badge">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                ${label}
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      ${related.length > 0 ? `
        <div style="margin-top:60px">
          <div class="section-header">
            <div class="section-eyebrow">De la același brand</div>
            <div class="section-title">S-ar putea să-ți placă</div>
          </div>
          <div class="products-grid">${related.map(p => renderCard(p)).join('')}</div>
        </div>
      ` : ''}

    </div>`;
}

// ── FUNCȚIE GLOBALĂ — apelată la click pe thumbnail sau chip ─────────────────
/**
 * Schimbă imaginea principală și actualizează labelul + starea activă.
 * @param {string} imgSrc   - calea spre noua imagine
 * @param {string} varName  - numele variantei (ex: "Titan Negru")
 * @param {Element|null} thumbEl - elementul thumbnail dacă e apelat din galerie
 */
function selectVariant(imgSrc, varName, thumbEl) {
  // 1. Schimbă imaginea principală cu un mic fade
  const mainImg = $('main-product-img');
  if (mainImg) {
    mainImg.style.opacity = '0';
    setTimeout(() => {
      mainImg.src = imgSrc;
      mainImg.style.opacity = '1';
    }, 150);
  }

  // 2. Actualizează labelul de culoare selectată
  const label = $('sel-variant');
  if (label) label.textContent = varName;

  // 3. Marchează thumbnail-ul activ
  if (thumbEl) {
    document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
    thumbEl.classList.add('active');
  }

  // 4. Marchează chip-ul activ
  document.querySelectorAll('.variant-chip').forEach(c => {
    c.classList.toggle('active', c.textContent.trim() === varName);
  });
}