// ============================================================
// NEXUS Store — js/router.js
// Adăugat: ruta 'admin' → renderAdmin()
// ============================================================

function router(route, param = null) {
  STATE.route      = route;
  STATE.routeParam = param;

  window.scrollTo({ top: 0, behavior: 'smooth' });

  const app = $('app');

  switch (route) {
    case 'home':      app.innerHTML = renderHome();           break;
    case 'catalog':   app.innerHTML = renderCatalog();        break;
    case 'product':   app.innerHTML = renderProduct(param);   break;
    case 'cart':      app.innerHTML = renderCart();           break;
    case 'wishlist':  app.innerHTML = renderWishlist();       break;
    case 'login':     app.innerHTML = STATE.user ? renderDashboard() : renderAuth('login'); break;
    case 'register':  app.innerHTML = renderAuth('register'); break;
    case 'dashboard': app.innerHTML = renderDashboard();      break;
    case 'admin':     app.innerHTML = renderAdmin();          break;  // ← NOU
    case 'about':     app.innerHTML = renderAbout();          break;
    case 'terms':     app.innerHTML = renderTerms();          break;
    case 'privacy':   app.innerHTML = renderPrivacy();        break;
    default:          app.innerHTML = renderHome();
  }

  updateNavActive();
  setTimeout(initReveal, 50);
}