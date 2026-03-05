// ============================================================
// NEXUS Store — pages/home.js
// Telefon animat în hero făcut complet în CSS
// ============================================================

function renderHome() {
  const featured = PRODUCTS.filter(p => p.stock !== 'out-of-stock').slice(0, 4);

  return `
    <!-- HERO -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-grid"></div>
      <div class="container">
        <div class="hero-inner">
          <div>
            <div class="hero-eyebrow">
              <span class="eyebrow-dot"></span>
              Flagship 2024 disponibil acum
            </div>
            <h1>Tehnologie <em>premium</em><br>la un click distanță.</h1>
            <p class="hero-sub">
              Descoperă cea mai nouă generație de flagship-uri. Livrare gratuită,
              garanție extinsă și suport dedicat pentru fiecare comandă.
            </p>
            <div class="hero-cta">
              <button class="btn btn-primary btn-lg" onclick="router('catalog')">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                Explorează produsele
              </button>
              <button class="btn btn-ghost btn-lg" onclick="router('about')">Despre noi</button>
            </div>
            <div class="hero-stats">
              <div class="stat"><div class="stat-num">8+</div><div class="stat-label">Branduri premium</div></div>
              <div class="stat"><div class="stat-num">4.8★</div><div class="stat-label">Rating mediu</div></div>
              <div class="stat"><div class="stat-num">24h</div><div class="stat-label">Livrare rapidă</div></div>
            </div>
          </div>

          <!-- TELEFON ANIMAT CSS -->
          <div class="hero-phone-wrap">
            <div class="phone-glow-ring"></div>
            <div class="phone-glow-ring phone-glow-ring-2"></div>
            <div class="css-phone">
              <!-- Marginea / cadru -->
              <div class="phone-frame">
                <!-- Notch / Dynamic Island -->
                <div class="phone-island"></div>
                <!-- Ecran -->
                <div class="phone-screen">
                  <!-- Wallpaper gradient animat -->
                  <div class="phone-wallpaper"></div>
                  <!-- Ora -->
                  <div class="phone-time" id="phone-clock">12:00</div>
                  <div class="phone-date">Joi, 5 Martie</div>
                  <!-- Iconițe aplicații -->
                  <div class="phone-icons">
                    <div class="app-icon" style="background:linear-gradient(135deg,#007aff,#0055ff)">
                      <svg width="18" height="18" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.23h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.93-.93a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 16z"/></svg>
                    </div>
                    <div class="app-icon" style="background:linear-gradient(135deg,#ff9500,#ff5f00)">
                      <svg width="18" height="18" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                    </div>
                    <div class="app-icon" style="background:linear-gradient(135deg,#34c759,#248a3d)">
                      <svg width="18" height="18" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <div class="app-icon" style="background:linear-gradient(135deg,#ff2d55,#ff0040)">
                      <svg width="18" height="18" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </div>
                    <div class="app-icon" style="background:linear-gradient(135deg,#5856d6,#3634a3)">
                      <svg width="18" height="18" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    </div>
                    <div class="app-icon" style="background:linear-gradient(135deg,#ff9f0a,#ff6b00)">
                      <svg width="18" height="18" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    </div>
                    <div class="app-icon" style="background:linear-gradient(135deg,#30b0c7,#007aff)">
                      <svg width="18" height="18" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    </div>
                    <div class="app-icon" style="background:linear-gradient(135deg,#636366,#3a3a3c)">
                      <svg width="18" height="18" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M16.24 7.76a6 6 0 0 1 0 8.49M6.34 17.66a10 10 0 0 1 0-14.14M9.17 14.83a4 4 0 0 1 0-5.66"/></svg>
                    </div>
                  </div>
                  <!-- Bara de jos -->
                  <div class="phone-dock">
                    <div class="app-icon" style="background:linear-gradient(135deg,#007aff,#0040dd)">
                      <svg width="18" height="18" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                    </div>
                    <div class="app-icon" style="background:linear-gradient(135deg,#30d158,#248a3d)">
                      <svg width="18" height="18" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12"/></svg>
                    </div>
                    <div class="app-icon" style="background:linear-gradient(135deg,#ff9500,#ff5e00)">
                      <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                    </div>
                    <div class="app-icon" style="background:linear-gradient(135deg,#5856d6,#3634a3)">
                      <svg width="18" height="18" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                    </div>
                  </div>
                </div>
                <!-- Butoane laterale -->
                <div class="phone-btn-vol-up"></div>
                <div class="phone-btn-vol-down"></div>
                <div class="phone-btn-power"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <style>
      /* ── TELEFON CSS ── */
      .hero-phone-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
      }

      /* Inele glow în spate */
      .phone-glow-ring {
        position: absolute;
        width: 340px; height: 340px;
        border-radius: 50%;
        border: 1px solid rgba(59,130,246,0.15);
        animation: ring-pulse 3s ease-in-out infinite;
      }
      .phone-glow-ring-2 {
        width: 440px; height: 440px;
        border-color: rgba(59,130,246,0.07);
        animation-delay: 1.5s;
      }
      @keyframes ring-pulse {
        0%,100% { transform: scale(1); opacity: 1; }
        50%      { transform: scale(1.06); opacity: 0.5; }
      }

      /* Corpul telefonului */
      .css-phone {
        animation: phone-float 5s ease-in-out infinite;
        position: relative; z-index: 1;
        filter: drop-shadow(0 40px 60px rgba(0,0,0,0.7)) drop-shadow(0 0 40px rgba(59,130,246,0.15));
      }
      @keyframes phone-float {
        0%,100% { transform: translateY(0px) rotate(-1deg); }
        50%      { transform: translateY(-16px) rotate(1deg); }
      }

      .phone-frame {
        width: 230px; height: 470px;
        background: linear-gradient(160deg, #2a2a35 0%, #111118 100%);
        border-radius: 46px;
        border: 1.5px solid rgba(255,255,255,0.12);
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,0.1),
          inset 0 -1px 0 rgba(0,0,0,0.5),
          0 0 0 1px rgba(0,0,0,0.5);
        padding: 10px;
        position: relative;
        overflow: visible;
      }

      /* Ecranul */
      .phone-screen {
        width: 100%; height: 100%;
        border-radius: 38px;
        overflow: hidden;
        position: relative;
        background: #000;
      }

      /* Wallpaper animat */
      .phone-wallpaper {
        position: absolute; inset: 0;
        background: linear-gradient(135deg, #0d0d1a 0%, #0a1628 40%, #0d0d1a 100%);
        animation: wallpaper-shift 8s ease-in-out infinite;
      }
      @keyframes wallpaper-shift {
        0%,100% { background: linear-gradient(135deg,#0d0d1a 0%,#0a1628 50%,#0d0d1a 100%); }
        33%      { background: linear-gradient(135deg,#0a0a1f 0%,#13102a 50%,#0a1420 100%); }
        66%      { background: linear-gradient(135deg,#0d1520 0%,#0a1a2a 50%,#100d20 100%); }
      }
      /* Glow albastru subtil pe ecran */
      .phone-screen::before {
        content: '';
        position: absolute; inset: 0; z-index: 1;
        background: radial-gradient(ellipse 70% 40% at 50% 60%, rgba(59,130,246,0.12) 0%, transparent 70%);
        pointer-events: none;
      }

      /* Dynamic Island */
      .phone-island {
        position: absolute; top: 14px; left: 50%; transform: translateX(-50%);
        width: 88px; height: 26px;
        background: #000;
        border-radius: 20px;
        z-index: 10;
        box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
        animation: island-breathe 4s ease-in-out infinite;
      }
      @keyframes island-breathe {
        0%,100% { width: 88px; }
        50%      { width: 96px; }
      }

      /* Ora și data */
      .phone-time {
        position: absolute; top: 52px; left: 0; right: 0;
        text-align: center; z-index: 5;
        font-family: var(--font-display);
        font-size: 2.6rem; font-weight: 300;
        color: rgba(255,255,255,0.95);
        letter-spacing: -0.03em;
        text-shadow: 0 2px 12px rgba(0,0,0,0.5);
      }
      .phone-date {
        position: absolute; top: 102px; left: 0; right: 0;
        text-align: center; z-index: 5;
        font-family: var(--font-body);
        font-size: .72rem; font-weight: 500;
        color: rgba(255,255,255,0.55);
        letter-spacing: .03em;
      }

      /* Grid iconițe */
      .phone-icons {
        position: absolute; top: 130px; left: 14px; right: 14px;
        z-index: 5;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
      }
      .app-icon {
        width: 42px; height: 42px;
        border-radius: 12px;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        animation: icon-pop 6s ease-in-out infinite;
      }
      .app-icon:nth-child(2)  { animation-delay: .3s; }
      .app-icon:nth-child(3)  { animation-delay: .6s; }
      .app-icon:nth-child(4)  { animation-delay: .9s; }
      .app-icon:nth-child(5)  { animation-delay: 1.2s; }
      .app-icon:nth-child(6)  { animation-delay: 1.5s; }
      .app-icon:nth-child(7)  { animation-delay: 1.8s; }
      .app-icon:nth-child(8)  { animation-delay: 2.1s; }
      @keyframes icon-pop {
        0%,90%,100% { transform: scale(1); }
        95%          { transform: scale(1.08); }
      }

      /* Dock jos */
      .phone-dock {
        position: absolute; bottom: 10px; left: 10px; right: 10px;
        z-index: 5;
        background: rgba(255,255,255,0.07);
        backdrop-filter: blur(20px);
        border-radius: 22px;
        border: 1px solid rgba(255,255,255,0.08);
        padding: 10px;
        display: flex; justify-content: space-around; align-items: center;
      }
      .phone-dock .app-icon { animation: none; }

      /* Butoane fizice */
      .phone-btn-vol-up, .phone-btn-vol-down, .phone-btn-power {
        position: absolute;
        background: linear-gradient(180deg, #2a2a35, #1a1a22);
        border-radius: 3px;
      }
      .phone-btn-vol-up {
        left: -4px; top: 100px;
        width: 4px; height: 28px;
        box-shadow: -1px 0 0 rgba(255,255,255,0.06);
      }
      .phone-btn-vol-down {
        left: -4px; top: 140px;
        width: 4px; height: 28px;
        box-shadow: -1px 0 0 rgba(255,255,255,0.06);
      }
      .phone-btn-power {
        right: -4px; top: 110px;
        width: 4px; height: 50px;
        box-shadow: 1px 0 0 rgba(255,255,255,0.06);
      }
    </style>

    <!-- Script ceas live -->
    <script>
      (function tickClock() {
        const el = document.getElementById('phone-clock');
        if (el) {
          const now = new Date();
          const h = String(now.getHours()).padStart(2,'0');
          const m = String(now.getMinutes()).padStart(2,'0');
          el.textContent = h + ':' + m;
        }
        setTimeout(tickClock, 10000);
      })();
    </script>

    <!-- MARQUEE BRANDURI -->
    <div class="marquee-section">
      <div class="marquee-track">
        ${Array(2).fill(
          ['Apple','Samsung','Google','Xiaomi','OnePlus','Motorola','Garantie 2 ani','Livrare gratuita','Rate fara dobanda']
            .map(t => `<span class="marquee-item">${t}</span>`)
            .join('')
        ).join('')}
      </div>
    </div>

    <!-- AVANTAJE -->
    <section class="section">
      <div class="container">
        <div class="features-grid reveal">
          <div class="feature-card">
            <div class="feature-icon">🚚</div>
            <div class="feature-title">Livrare gratuită</div>
            <div class="feature-desc">La orice comandă peste 500 LEI. Estimare 24–48h prin curier rapid.</div>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🛡️</div>
            <div class="feature-title">Garanție 2 ani</div>
            <div class="feature-desc">Toate produsele beneficiază de garanție legală de 2 ani + suport tehnic gratuit.</div>
          </div>
          <div class="feature-card">
            <div class="feature-icon">↩️</div>
            <div class="feature-title">Retur 30 de zile</div>
            <div class="feature-desc">Nu ești mulțumit? Returnezi gratuit în 30 de zile, fără întrebări.</div>
          </div>
          <div class="feature-card">
            <div class="feature-icon">💳</div>
            <div class="feature-title">Rate fără dobândă</div>
            <div class="feature-desc">Plătești în 12 rate 0% cu cardurile BRD, BCR, Raiffeisen și ING.</div>
          </div>
        </div>
      </div>
    </section>

    <!-- PRODUSE POPULARE -->
    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="section-header reveal" style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px">
          <div>
            <div class="section-eyebrow">Selecție curatoriată</div>
            <div class="section-title">Cele mai populare</div>
          </div>
          <button class="btn btn-ghost" onclick="router('catalog')">Vezi toate →</button>
        </div>
        <div class="products-grid reveal">
          ${featured.map(p => renderCard(p)).join('')}
        </div>
      </div>
    </section>

    <!-- BANNER PROMOȚIE -->
    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="reveal" style="background:linear-gradient(135deg,rgba(59,130,246,.12),rgba(139,92,246,.08));border:1px solid rgba(59,130,246,.2);border-radius:20px;padding:60px 40px;text-align:center;">
          <div class="section-eyebrow" style="justify-content:center">Promoție limitată</div>
          <h2 style="font-family:var(--font-display);font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;letter-spacing:-.04em;margin:12px 0 16px">
            Până la -15% la flagship-uri<br>selectate
          </h2>
          <p style="color:var(--text-muted);margin-bottom:28px">Oferta expiră în curând. Stocuri limitate.</p>
          <button class="btn btn-primary btn-lg" onclick="router('catalog')">Profită de ofertă</button>
        </div>
      </div>
    </section>`;
}