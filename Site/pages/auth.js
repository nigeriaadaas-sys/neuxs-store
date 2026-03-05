// ============================================================
// NEXUS Store — pages/auth.js
// Login / Register + logica de autentificare.
// CONT ADMIN predefinit: admin@nexus.ro / admin1234
// ============================================================

// ── CONT ADMIN HARDCODAT ──────────────────────────────────
// Într-un proiect real, verificarea se face pe server (JWT etc.)
const ADMIN_CREDENTIALS = {
  email:    'admin@nexus.ro',
  password: 'admin1234',
};

function renderAuth(mode) {
  const isLogin = mode === 'login';
  return `
    <div class="auth-wrap">
      <div class="auth-card">
        <div class="auth-logo">NEXUS<span style="color:var(--accent)">.</span></div>
        <p class="auth-sub">
          ${isLogin ? 'Bine ai revenit! Autentifică-te pentru a continua.' : 'Creează un cont gratuit în câteva secunde.'}
        </p>

        ${isLogin ? `
          <div class="form-group" style="margin-bottom:16px">
            <label class="form-label">Adresă email</label>
            <input type="email" class="form-input" id="auth-email" placeholder="tu@exemplu.ro">
          </div>
          <div class="form-group" style="margin-bottom:24px">
            <label class="form-label">Parolă</label>
            <input type="password" class="form-input" id="auth-pass" placeholder="••••••••"
              onkeydown="if(event.key==='Enter') handleLogin()">
          </div>
          <button class="btn btn-primary btn-full btn-lg" onclick="handleLogin()">Autentificare</button>
          <div class="auth-divider"><span>sau</span></div>
          <button class="btn btn-ghost btn-full" onclick="handleLogin(true)">
            <span style="font-size:1rem;font-weight:900">G</span> Continuă cu Google
          </button>

          <!-- HINT ADMIN (poți șterge în producție) -->
          <div style="margin-top:20px;padding:12px 16px;background:rgba(59,130,246,.08);border:1px solid rgba(59,130,246,.2);border-radius:8px;font-size:.78rem;color:var(--text-muted);text-align:center">
            🔐 Admin demo: <strong style="color:var(--accent)">admin@nexus.ro</strong> / <strong style="color:var(--accent)">admin1234</strong>
          </div>

          <p class="auth-toggle">Nu ai cont? <a onclick="router('register')">Înregistrează-te</a></p>
        ` : `
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Prenume</label>
              <input type="text" class="form-input" id="auth-fname" placeholder="Ion">
            </div>
            <div class="form-group">
              <label class="form-label">Nume</label>
              <input type="text" class="form-input" id="auth-lname" placeholder="Popescu">
            </div>
            <div class="form-group full">
              <label class="form-label">Email</label>
              <input type="email" class="form-input" id="auth-email" placeholder="tu@exemplu.ro">
            </div>
            <div class="form-group full">
              <label class="form-label">Parolă</label>
              <input type="password" class="form-input" id="auth-pass" placeholder="Minimum 8 caractere">
            </div>
          </div>
          <button class="btn btn-primary btn-full btn-lg" style="margin-top:8px" onclick="handleRegister()">Creează cont</button>
          <p class="auth-toggle">Ai deja cont? <a onclick="router('login')">Autentifică-te</a></p>
        `}
      </div>
    </div>`;
}

// ── LOGIN ─────────────────────────────────────────────────
function handleLogin(google = false) {
  if (google) {
    STATE.user = { name: 'Utilizator Google', email: 'user@gmail.com', role: 'user' };
  } else {
    const email = $('auth-email')?.value.trim();
    const pass  = $('auth-pass')?.value;

    if (!email || !pass) { toast('Completează email și parola', '⚠️'); return; }

    // Verificăm dacă sunt credențialele de admin
    if (email === ADMIN_CREDENTIALS.email && pass === ADMIN_CREDENTIALS.password) {
      STATE.user = {
        name:  'Administrator',
        email: ADMIN_CREDENTIALS.email,
        role:  'admin',           // ← cheia care deblochează panoul admin
      };
      saveUser();
      updateAuthBtn();
      toast('Bine ai venit, Administrator! 👑', '🔐');
      router('admin');            // redirect direct la admin panel
      return;
    }

    // Cont normal
    STATE.user = { name: email.split('@')[0], email, role: 'user' };
  }

  saveUser();
  updateAuthBtn();
  toast(`Bine ai venit, ${STATE.user.name}!`, '👋');
  STATE.cartItems.length > 0 ? router('cart') : router('dashboard');
}

// ── REGISTER ──────────────────────────────────────────────
function handleRegister() {
  const fname = $('auth-fname')?.value.trim();
  const lname = $('auth-lname')?.value.trim();
  const email = $('auth-email')?.value.trim();
  const pass  = $('auth-pass')?.value;

  if (!fname || !email || !pass) { toast('Completează toate câmpurile obligatorii', '⚠️'); return; }
  if (pass.length < 8)           { toast('Parola trebuie să aibă cel puțin 8 caractere', '⚠️'); return; }

  STATE.user = { name: `${fname} ${lname}`.trim(), email, role: 'user' };
  saveUser();
  updateAuthBtn();
  toast(`Cont creat! Bine ai venit, ${fname}!`, '🎉');
  router('dashboard');
}

// ── LOGOUT ────────────────────────────────────────────────
function handleLogout() {
  STATE.user = null;
  localStorage.removeItem('nexus_user');
  updateAuthBtn();
  router('home');
  toast('Te-ai deconectat cu succes', '👋');
}

// ── BUTON HEADER ──────────────────────────────────────────
function updateAuthBtn() {
  const btn = $('auth-btn');
  if (!btn) return;

  if (STATE.user) {
    const isAdmin = STATE.user.role === 'admin';
    btn.innerHTML = `
      <span style="
        width:28px; height:28px; border-radius:50%;
        background:${isAdmin ? 'rgba(212,168,83,.15)' : 'var(--accent-dim)'};
        border:1.5px solid ${isAdmin ? 'var(--gold)' : 'var(--accent)'};
        display:flex; align-items:center; justify-content:center;
        font-family:var(--font-display); font-size:.8rem; font-weight:800;
        color:${isAdmin ? 'var(--gold)' : 'var(--accent)'}
      ">
        ${isAdmin ? '👑' : STATE.user.name.charAt(0).toUpperCase()}
      </span>`;
    btn.onclick = () => isAdmin ? router('admin') : router('dashboard');
    btn.title   = isAdmin ? 'Panou Admin' : 'Contul meu';
  } else {
    btn.innerHTML = `
      <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>`;
    btn.onclick = () => router('login');
    btn.title   = 'Autentifică-te';
  }
}