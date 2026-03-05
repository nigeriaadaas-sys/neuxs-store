// ============================================================
// NEXUS Store — js/app.js
// FIX: Scripturile sunt la finalul <body>, deci DOM-ul e deja
// gata când se execută acest fișier. Nu mai avem nevoie de
// DOMContentLoaded — apelăm funcțiile direct.
// ============================================================

// Inițializare UI
updateBadges();
updateAuthBtn();

// Pornire router
router('home');

// Shortcut ESC — închide overlay-urile
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeSearch();
    closeCheckout();
    const menu = $('mobile-menu');
    if (menu && menu.classList.contains('open')) toggleMobileMenu();
  }
});