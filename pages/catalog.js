// ============================================================
// NEXUS Store — pages/catalog.js
// Pagina de catalog cu filtre, sortare și schimbare vizualizare.
// ============================================================

function renderCatalog() {
  const { brand, maxPrice, sort } = STATE.catalogFilters;
  const brands = [...new Set(PRODUCTS.map(p => p.brand))];

  // Aplicăm filtrele
  let filtered = PRODUCTS.filter(p => {
    if (brand !== 'all' && p.brand !== brand) return false;
    if (p.price > maxPrice) return false;
    return true;
  });

  // Aplicăm sortarea
  if (sort === 'price-asc')  filtered.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (sort === 'rating')     filtered.sort((a, b) => b.rating - a.rating);
  else                            filtered.sort((a, b) => b.reviews - a.reviews); // popular

  const gridClass = STATE.catalogView === 'list' ? 'products-grid list-view' : 'products-grid';

  return `
    <div class="container" style="padding-top:40px;padding-bottom:80px">
      <div class="breadcrumb">
        <span class="breadcrumb-item" onclick="router('home')">Acasă</span>
        <span class="breadcrumb-sep">›</span>
        <span class="breadcrumb-item current">Produse</span>
      </div>

      <div class="catalog-layout">

        <!-- PANOU FILTRE -->
        <aside class="filters-panel">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
            <span style="font-family:var(--font-display);font-weight:700;font-size:1rem">Filtre</span>
            <button class="btn btn-ghost btn-sm" onclick="resetFilters()">Resetează</button>
          </div>

          <div class="filter-group">
            <div class="filter-title">Brand</div>
            <button class="filter-chip ${brand === 'all' ? 'active' : ''}" onclick="setFilter('brand','all')">Toate</button>
            ${brands.map(b => `
              <button class="filter-chip ${brand === b ? 'active' : ''}" onclick="setFilter('brand','${b}')">${b}</button>
            `).join('')}
          </div>

          <div class="filter-group">
            <div class="filter-title">Preț maxim</div>
            <div class="price-range">
              <input
                type="range" class="range-input"
                min="1000" max="7000" step="100" value="${maxPrice}"
                oninput="setFilter('maxPrice', parseInt(this.value)); $('price-label').textContent = fmt(parseInt(this.value))"
              >
              <div class="range-labels">
                <span>1.000 LEI</span>
                <span id="price-label">${fmt(maxPrice)}</span>
              </div>
            </div>
          </div>

          <div class="filter-group">
            <div class="filter-title">Disponibilitate</div>
            <button class="filter-chip active">În stoc</button>
          </div>
        </aside>

        <!-- GRID PRODUSE -->
        <div>
          <div class="catalog-header">
            <p class="results-count"><strong>${filtered.length}</strong> produse găsite</p>
            <div class="catalog-toolbar">
              <select class="sort-select" onchange="setFilter('sort', this.value)" style="width:auto">
                <option value="popular"    ${sort === 'popular'    ? 'selected' : ''}>Popularitate</option>
                <option value="price-asc"  ${sort === 'price-asc'  ? 'selected' : ''}>Preț crescător</option>
                <option value="price-desc" ${sort === 'price-desc' ? 'selected' : ''}>Preț descrescător</option>
                <option value="rating"     ${sort === 'rating'     ? 'selected' : ''}>Rating</option>
              </select>

              <!-- Toggle grilă / listă -->
              <div class="view-toggle">
                <button class="view-btn ${STATE.catalogView === 'grid' ? 'active' : ''}" onclick="setView('grid')" title="Grilă">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="0" y="0" width="6" height="6" rx="1"/><rect x="8" y="0" width="6" height="6" rx="1"/><rect x="0" y="8" width="6" height="6" rx="1"/><rect x="8" y="8" width="6" height="6" rx="1"/></svg>
                </button>
                <button class="view-btn ${STATE.catalogView === 'list' ? 'active' : ''}" onclick="setView('list')" title="Listă">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="0" y="0" width="14" height="3" rx="1"/><rect x="0" y="5.5" width="14" height="3" rx="1"/><rect x="0" y="11" width="14" height="3" rx="1"/></svg>
                </button>
              </div>
            </div>
          </div>

          ${filtered.length === 0
            ? `<div class="no-results">
                 <div class="no-results-icon">🔍</div>
                 <p style="font-size:1.1rem;font-weight:600;color:var(--text);margin-bottom:8px">Niciun produs găsit</p>
                 <p>Încearcă să modifici filtrele selectate.</p>
                 <button class="btn btn-ghost" style="margin-top:16px" onclick="resetFilters()">Resetează filtrele</button>
               </div>`
            : `<div class="${gridClass}">
                 ${filtered.map(p => renderCard(p)).join('')}
               </div>`
          }
        </div>
      </div>
    </div>`;
}

/** Setează o valoare de filtru și re-randează catalogul. */
function setFilter(key, val) {
  STATE.catalogFilters[key] = val;
  router('catalog');
}

/** Resetează toate filtrele la valorile implicite. */
function resetFilters() {
  STATE.catalogFilters = { brand: 'all', maxPrice: 7000, sort: 'popular' };
  router('catalog');
}

/** Schimbă vizualizarea între grilă și listă. */
function setView(v) {
  STATE.catalogView = v;
  router('catalog');
}