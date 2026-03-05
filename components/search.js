// ============================================================
// NEXUS Store — components/search.js
// Overlay de căutare cu filtrare live (fără debounce — date locale).
// Într-un proiect real, searchul ar apela un endpoint API cu debounce.
// ============================================================

/** Deschide overlay-ul de căutare și focusează inputul. */
function openSearch() {
  $('search-overlay').classList.add('active');
  setTimeout(() => $('search-input')?.focus(), 100);
}

/** Închide overlay-ul și resetează rezultatele. */
function closeSearch() {
  $('search-overlay').classList.remove('active');
  const inp = $('search-input');
  if (inp) inp.value = '';
  $('search-results').innerHTML =
    '<p style="text-align:center;color:var(--text-muted);font-size:.9rem">Începe să tastezi pentru a căuta</p>';
}

/**
 * Filtrează produsele live pe baza textului introdus.
 * @param {string} q - Termenul de căutare
 */
function liveSearch(q) {
  const res = $('search-results');
  if (!q.trim()) {
    res.innerHTML = '<p style="text-align:center;color:var(--text-muted);font-size:.9rem">Începe să tastezi pentru a căuta</p>';
    return;
  }

  const ql = q.toLowerCase();
  const found = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(ql) ||
    p.brand.toLowerCase().includes(ql) ||
    p.desc.toLowerCase().includes(ql)
  );

  if (found.length === 0) {
    res.innerHTML = `<p style="text-align:center;color:var(--text-muted)">Niciun rezultat pentru "<strong style="color:var(--text)">${q}</strong>"</p>`;
    return;
  }

  res.innerHTML = `
    <p style="color:var(--text-muted);font-size:.85rem;margin-bottom:16px">
      ${found.length} rezultate pentru „${q}"
    </p>
    <div class="search-results-grid">
      ${found.map(p => renderCard(p)).join('')}
    </div>`;

  // Închide overlay-ul când utilizatorul dă click pe un produs
  res.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => closeSearch(), { once: true });
  });
}