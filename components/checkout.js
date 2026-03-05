// ============================================================
// NEXUS Store — components/checkout.js
// Modal de checkout în 3 pași: Livrare → Plată → Confirmare.
// ============================================================

/** Deschide modalul de checkout. Necesită autentificare. */
function openCheckout() {
  if (!STATE.user) {
    toast('Autentifică-te pentru a continua', '🔐');
    router('login');
    return;
  }
  STATE.checkoutStep = 1;
  STATE.checkoutData = {};
  $('checkout-modal').classList.add('active');
  renderCheckoutStep();
}

/** Închide modalul de checkout. */
function closeCheckout() {
  $('checkout-modal').classList.remove('active');
}

/** Randează pasul curent al checkout-ului în modal. */
function renderCheckoutStep() {
  const s = STATE.checkoutStep;

  const stepsHtml = `
    <div class="checkout-steps">
      <div class="step">
        <div class="step-num ${s >= 1 ? 'active' : ''}">1</div>
        <span class="step-label ${s >= 1 ? 'active' : ''}">Livrare</span>
      </div>
      <div class="step-sep"></div>
      <div class="step">
        <div class="step-num ${s >= 2 ? 'active' : ''}">2</div>
        <span class="step-label ${s >= 2 ? 'active' : ''}">Plată</span>
      </div>
      <div class="step-sep"></div>
      <div class="step">
        <div class="step-num ${s >= 3 ? 'done' : ''}">✓</div>
        <span class="step-label ${s >= 3 ? 'active' : ''}">Confirmare</span>
      </div>
    </div>`;

  if (s === 1) {
    $('checkout-content').innerHTML = stepsHtml + `
      <div class="checkout-title">Adresă de livrare</div>
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Prenume</label>
          <input class="form-input" id="co-fname" placeholder="Ion" value="${STATE.user?.name?.split(' ')[0] || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">Nume</label>
          <input class="form-input" id="co-lname" placeholder="Popescu">
        </div>
        <div class="form-group full">
          <label class="form-label">Adresă</label>
          <input class="form-input" id="co-addr" placeholder="Str. Exemplu nr. 1, Ap. 2">
        </div>
        <div class="form-group">
          <label class="form-label">Oraș</label>
          <input class="form-input" id="co-city" placeholder="București">
        </div>
        <div class="form-group">
          <label class="form-label">Cod poștal</label>
          <input class="form-input" id="co-zip" placeholder="010101">
        </div>
        <div class="form-group full">
          <label class="form-label">Telefon</label>
          <input class="form-input" id="co-phone" placeholder="+40 7XX XXX XXX">
        </div>
      </div>
      <div class="form-actions">
        <button class="btn btn-ghost" onclick="closeCheckout()">Anulează</button>
        <button class="btn btn-primary" style="flex:1" onclick="checkoutNext(1)">Continuă spre plată →</button>
      </div>`;

  } else if (s === 2) {
    $('checkout-content').innerHTML = stepsHtml + `
      <div class="checkout-title">Metodă de plată</div>
      <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:24px">
        ${[['💳','Card bancar (Visa / Mastercard)'],['🏦','Transfer bancar'],['💵','Ramburs la livrare']].map(([ico, lbl], i) => `
          <label style="display:flex;align-items:center;gap:14px;padding:14px 18px;background:var(--bg3);border:1px solid ${i === 0 ? 'var(--accent)' : 'var(--border)'};border-radius:10px;cursor:pointer">
            <input type="radio" name="pay" ${i === 0 ? 'checked' : ''} style="accent-color:var(--accent)">
            <span style="font-size:1.2rem">${ico}</span>
            <span style="font-weight:600;font-size:.92rem">${lbl}</span>
          </label>`).join('')}
      </div>
      <div class="form-grid">
        <div class="form-group full">
          <label class="form-label">Număr card</label>
          <input class="form-input" placeholder="•••• •••• •••• ••••">
        </div>
        <div class="form-group">
          <label class="form-label">Expiră</label>
          <input class="form-input" placeholder="MM/AA">
        </div>
        <div class="form-group">
          <label class="form-label">CVV</label>
          <input class="form-input" placeholder="•••">
        </div>
      </div>
      <div class="form-actions">
        <button class="btn btn-ghost" onclick="STATE.checkoutStep=1; renderCheckoutStep()">← Înapoi</button>
        <button class="btn btn-primary" style="flex:1" onclick="checkoutNext(2)">Plasează comanda →</button>
      </div>`;

  } else {
    // Pasul 3: Confirmare — goliim coșul
    const orderNum = 'NX-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    STATE.cartItems = [];
    saveCart();
    updateBadges();

    $('checkout-content').innerHTML = stepsHtml + `
      <div class="checkout-success">
        <div class="success-icon">🎉</div>
        <div class="success-title">Comandă plasată!</div>
        <p class="success-sub">Mulțumim, <strong>${STATE.user.name}</strong>! Vei primi un email de confirmare în câteva minute.</p>
        <div class="order-number">${orderNum}</div>
        <p class="success-sub" style="font-size:.85rem">Numărul comenzii tale — păstrează-l pentru urmărire.</p>
        <div class="form-actions" style="justify-content:center;margin-top:24px">
          <button class="btn btn-primary" onclick="closeCheckout(); router('dashboard')">Mergi la cont</button>
          <button class="btn btn-ghost" onclick="closeCheckout(); router('catalog')">Continuă cumpărăturile</button>
        </div>
      </div>`;
  }
}

/**
 * Validează pasul curent și avansează la următor.
 * @param {number} step - Pasul curent (1 sau 2)
 */
function checkoutNext(step) {
  if (step === 1) {
    const fname = $('co-fname')?.value;
    const addr  = $('co-addr')?.value;
    const city  = $('co-city')?.value;
    if (!fname || !addr || !city) {
      toast('Completează toate câmpurile obligatorii', '⚠️');
      return;
    }
    STATE.checkoutData.delivery = { fname, addr, city };
  }
  STATE.checkoutStep = step + 1;
  renderCheckoutStep();
}