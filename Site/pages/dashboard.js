// ============================================================
// NEXUS Store — pages/dashboard.js
// ============================================================

function renderDashboard() {
  const u = STATE.user;
  if (!u) return renderAuth('login');

  const isAdmin = u.role === 'admin';

  return `
    <div class="container dashboard">

      <!-- HEADER UTILIZATOR -->
      <div class="dashboard-header reveal">
        <div class="user-avatar" style="
          background:${isAdmin ? 'rgba(212,168,83,.15)' : 'var(--accent-dim)'};
          border-color:${isAdmin ? 'var(--gold)' : 'var(--accent)'};
          color:${isAdmin ? 'var(--gold)' : 'var(--accent)'};
        ">
          ${isAdmin ? '👑' : u.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 style="font-family:var(--font-display);font-size:1.8rem;font-weight:800">
            Salut, ${u.name}! ${isAdmin ? '👑' : '👋'}
          </h1>
          <p style="color:var(--text-muted);margin-top:4px">
            ${u.email}
            ${isAdmin
              ? '<span style="margin-left:8px;background:rgba(212,168,83,.15);border:1px solid rgba(212,168,83,.4);color:var(--gold);font-size:.72rem;font-weight:700;padding:3px 8px;border-radius:5px;letter-spacing:.06em;text-transform:uppercase">Administrator</span>'
              : `· Client din ${new Date().getFullYear()}`
            }
          </p>
        </div>
        <button class="btn btn-ghost btn-sm" style="margin-left:auto" onclick="handleLogout()">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Deconectare
        </button>
      </div>

      <!-- BUTON ADMIN PANEL (vizibil doar pentru admin) -->
      ${isAdmin ? `
        <div class="reveal" style="
          background:linear-gradient(135deg,rgba(212,168,83,.1),rgba(212,168,83,.05));
          border:1px solid rgba(212,168,83,.3);
          border-radius:var(--radius); padding:24px;
          display:flex; align-items:center; justify-content:space-between;
          margin-bottom:28px; flex-wrap:wrap; gap:16px;
        ">
          <div>
            <div style="font-family:var(--font-display);font-weight:800;font-size:1.1rem;color:var(--gold)">
              👑 Panou de Administrare
            </div>
            <div style="font-size:.85rem;color:var(--text-muted);margin-top:4px">
              Gestionează produse, stoc, comenzi și setările magazinului.
            </div>
          </div>
          <button class="btn btn-lg" onclick="router('admin')" style="
            background:rgba(212,168,83,.15);
            border:1px solid rgba(212,168,83,.4);
            color:var(--gold);
            font-weight:700;
          ">
            Deschide Admin Panel →
          </button>
        </div>
      ` : ''}

      <!-- STATISTICI -->
      <div class="dashboard-grid reveal">
        <div class="stat-card">
          <div class="stat-card-icon">📦</div>
          <div class="stat-card-num">0</div>
          <div class="stat-card-label">Comenzi plasate</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-icon">🤍</div>
          <div class="stat-card-num">${STATE.wishlist.length}</div>
          <div class="stat-card-label">Produse salvate</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-icon">🛒</div>
          <div class="stat-card-num">${cartCount()}</div>
          <div class="stat-card-label">Produse în coș</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-icon">⭐</div>
          <div class="stat-card-num">0</div>
          <div class="stat-card-label">Recenzii scrise</div>
        </div>
      </div>

      <!-- ACȚIUNI RAPIDE -->
      <div style="margin-top:32px;display:flex;gap:12px;flex-wrap:wrap">
        <button class="btn btn-ghost" onclick="router('catalog')">Continuă cumpărăturile</button>
        <button class="btn btn-ghost" onclick="router('wishlist')">Wishlist-ul meu</button>
        <button class="btn btn-ghost" onclick="router('cart')">Coșul meu</button>
        ${isAdmin ? `<button class="btn btn-ghost" onclick="router('admin')" style="color:var(--gold);border-color:rgba(212,168,83,.3)">👑 Admin Panel</button>` : ''}
      </div>

    </div>`;
}