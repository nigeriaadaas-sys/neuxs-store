// ============================================================
// NEXUS Store — js/state.js
// Starea globală a aplicației.
// Datele sunt persistate în localStorage pentru a supraviețui
// reîncărcărilor paginii. Într-un proiect real, starea ar fi
// gestionată de Redux, Zustand, Pinia etc.
// ============================================================

const STATE = {
  route:           'home',
  routeParam:      null,
  cartItems:       JSON.parse(localStorage.getItem('nexus_cart')     || '[]'),
  wishlist:        JSON.parse(localStorage.getItem('nexus_wishlist') || '[]'),
  user:            JSON.parse(localStorage.getItem('nexus_user')     || 'null'),
  checkoutStep:    1,
  checkoutData:    {},
  catalogView:     'grid',
  catalogFilters:  { brand: 'all', maxPrice: 7000, sort: 'popular' },
};

/** Salvează coșul în localStorage. */
function saveCart() {
  localStorage.setItem('nexus_cart', JSON.stringify(STATE.cartItems));
}

/** Salvează wishlist-ul în localStorage. */
function saveWishlist() {
  localStorage.setItem('nexus_wishlist', JSON.stringify(STATE.wishlist));
}

/** Salvează utilizatorul curent în localStorage. */
function saveUser() {
  localStorage.setItem('nexus_user', JSON.stringify(STATE.user));
}