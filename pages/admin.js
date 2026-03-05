// NEXUS Store — pages/admin.js
// FIX: esc() pe toate value="" din formular

function esc(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

let adminTab = 'products';
let editingProductId = null;

function renderAdmin() {
  if (!STATE.user || STATE.user.role !== 'admin') {
    return `<div class="container" style="padding:100px 0;text-align:center">
      <div style="font-size:3rem;margin-bottom:20px">🔒</div>
      <h2 style="font-family:var(--font-display);font-size:2rem;font-weight:800;margin-bottom:12px">Acces restricționat</h2>
      <p style="color:var(--text-muted);margin-bottom:28px">Trebuie să fii autentificat ca administrator.</p>
      <button class="btn btn-primary" onclick="router('login')">Autentifică-te</button>
    </div>`;
  }
  return `
    <div style="display:grid;grid-template-columns:240px 1fr;min-height:calc(100vh - 70px)">
      <aside style="background:var(--bg2);border-right:1px solid var(--border);padding:28px 0;">
        <div style="padding:0 20px 24px;border-bottom:1px solid var(--border);margin-bottom:16px">
          <div style="font-family:var(--font-display);font-weight:800;font-size:1rem">Admin Panel</div>
          <div style="font-size:.78rem;color:var(--text-muted);margin-top:4px">${esc(STATE.user.email)}</div>
        </div>
        ${[
          {id:'products',icon:'📦',label:'Produse'},
          {id:'stock',   icon:'📊',label:'Stoc & Prețuri'},
          {id:'orders',  icon:'🧾',label:'Comenzi'},
          {id:'stats',   icon:'📈',label:'Statistici'},
          {id:'settings',icon:'⚙️',label:'Setări site'},
        ].map(t=>`
          <button onclick="setAdminTab('${t.id}')" id="atab-${t.id}" style="width:100%;text-align:left;padding:12px 20px;background:${adminTab===t.id?'var(--accent-dim)':'transparent'};border:none;border-left:3px solid ${adminTab===t.id?'var(--accent)':'transparent'};color:${adminTab===t.id?'var(--accent)':'var(--text-muted)'};font-family:var(--font-body);font-size:.9rem;font-weight:500;cursor:pointer;display:flex;align-items:center;gap:10px;transition:all .2s;">${t.icon} ${t.label}</button>
        `).join('')}
        <div style="padding:20px 20px 0;border-top:1px solid var(--border);margin-top:24px">
          <button class="btn btn-ghost btn-sm btn-full" onclick="router('home')" style="justify-content:flex-start">← Înapoi la site</button>
        </div>
      </aside>
      <div id="admin-content" style="padding:36px;overflow-y:auto;background:var(--bg)">
        ${renderAdminTab()}
      </div>
    </div>`;
}

function setAdminTab(tab) {
  adminTab = tab;
  document.querySelectorAll('[id^="atab-"]').forEach(btn => {
    const a = btn.id==='atab-'+tab;
    btn.style.background = a?'var(--accent-dim)':'transparent';
    btn.style.borderLeft = a?'3px solid var(--accent)':'3px solid transparent';
    btn.style.color      = a?'var(--accent)':'var(--text-muted)';
  });
  $('admin-content').innerHTML = renderAdminTab();
}

function renderAdminTab() {
  if(adminTab==='products') return renderAdminProducts();
  if(adminTab==='stock')    return renderAdminStock();
  if(adminTab==='orders')   return renderAdminOrders();
  if(adminTab==='stats')    return renderAdminStats();
  if(adminTab==='settings') return renderAdminSettings();
  return renderAdminProducts();
}

function renderAdminProducts() {
  return `
    <div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:28px;flex-wrap:wrap;gap:12px">
        <div>
          <h1 style="font-family:var(--font-display);font-size:1.8rem;font-weight:800">Produse</h1>
          <p style="color:var(--text-muted);font-size:.88rem;margin-top:4px">${PRODUCTS.length} produse în catalog</p>
        </div>
        <button class="btn btn-primary" onclick="openProductForm(null)">+ Adaugă produs</button>
      </div>
      <div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden">
        <div style="display:grid;grid-template-columns:60px 1fr 100px 120px 110px 160px;padding:12px 20px;border-bottom:1px solid var(--border);font-size:.75rem;font-weight:700;color:var(--text-muted);letter-spacing:.06em;text-transform:uppercase">
          <span></span><span>Produs</span><span>Preț</span><span>Stoc</span><span>Rating</span><span>Acțiuni</span>
        </div>
        ${PRODUCTS.map(p=>`
          <div style="display:grid;grid-template-columns:60px 1fr 100px 120px 110px 160px;padding:16px 20px;border-bottom:1px solid var(--border);align-items:center;transition:background .15s" onmouseover="this.style.background='var(--bg3)'" onmouseout="this.style.background='transparent'">
            <div style="width:44px;height:44px;background:var(--bg3);border-radius:8px;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:1.4rem;overflow:hidden">
              ${p.image&&p.image.includes('.')?`<img src="${esc(p.image)}" style="width:100%;height:100%;object-fit:contain;padding:4px" onerror="this.parentElement.innerHTML='📱'">`:p.image}
            </div>
            <div>
              <div style="font-family:var(--font-display);font-weight:700;font-size:.95rem">${esc(p.name)}</div>
              <div style="font-size:.75rem;color:var(--text-muted);margin-top:2px">${esc(p.brand)} · ${esc(p.category)}</div>
            </div>
            <div>
              <div style="font-weight:700;font-size:.9rem">${fmt(p.price)}</div>
              ${p.oldPrice?`<div style="font-size:.75rem;color:var(--text-muted);text-decoration:line-through">${fmt(p.oldPrice)}</div>`:''}
            </div>
            <div><span style="padding:4px 10px;border-radius:999px;font-size:.75rem;font-weight:700;background:${p.stock==='in-stock'?'rgba(34,197,94,.1)':p.stock==='limited'?'rgba(245,158,11,.1)':'rgba(239,68,68,.1)'};color:${p.stock==='in-stock'?'var(--success)':p.stock==='limited'?'var(--warn)':'var(--danger)'};border:1px solid ${p.stock==='in-stock'?'rgba(34,197,94,.3)':p.stock==='limited'?'rgba(245,158,11,.3)':'rgba(239,68,68,.3)'}">${p.stock==='in-stock'?'În stoc':p.stock==='limited'?'Limitat':'Indisponibil'}</span></div>
            <div style="font-size:.88rem"><span style="color:var(--gold)">★</span> <span style="font-weight:600">${p.rating}</span> <span style="color:var(--text-muted);font-size:.78rem">(${p.reviews})</span></div>
            <div style="display:flex;gap:8px">
              <button class="btn btn-ghost btn-sm" onclick="openProductForm(${p.id})">✏️ Editează</button>
              <button style="padding:7px 10px;border-radius:6px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.25);color:var(--danger);cursor:pointer;font-size:.82rem;font-weight:600" onclick="deleteProduct(${p.id})">🗑</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    <div id="product-form-modal" style="display:none;position:fixed;inset:0;z-index:600;background:rgba(9,9,11,.95);backdrop-filter:blur(20px);overflow-y:auto;padding:40px 20px;justify-content:center">
      <div style="background:var(--bg2);border:1px solid var(--border);border-radius:20px;padding:40px;width:100%;max-width:700px;position:relative" id="product-form-card"></div>
    </div>`;
}

function openProductForm(productId) {
  editingProductId = productId;
  const p = productId ? PRODUCTS.find(p=>p.id===productId) : null;
  const modal = $('product-form-modal');
  const card  = $('product-form-card');
  if(!modal||!card) return;

  const variantStr = p?.variants
    ? p.variants.map(v=>typeof v==='object'?v.name:v).join(', ')
    : '';

  card.innerHTML = `
    <button onclick="closeProductForm()" style="position:absolute;top:16px;right:16px;background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:1.4rem">✕</button>
    <h2 style="font-family:var(--font-display);font-size:1.5rem;font-weight:800;margin-bottom:28px">${p?'✏️ Editează produs':'➕ Produs nou'}</h2>
    <div class="form-grid">
      <div class="form-group full">
        <label class="form-label">Nume produs *</label>
        <input class="form-input" id="pf-name" placeholder="ex: iPhone 16 Pro" value="${esc(p?.name)}">
      </div>
      <div class="form-group">
        <label class="form-label">Brand *</label>
        <input class="form-input" id="pf-brand" placeholder="ex: Apple" value="${esc(p?.brand)}">
      </div>
      <div class="form-group">
        <label class="form-label">Categorie</label>
        <select class="form-input" id="pf-category">
          ${['flagship','mid-high','mainstream','mid-range'].map(c=>`<option value="${c}" ${p?.category===c?'selected':''}>${c}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Preț (LEI) *</label>
        <input class="form-input" id="pf-price" type="number" placeholder="4999" value="${esc(p?.price)}">
      </div>
      <div class="form-group">
        <label class="form-label">Preț vechi (LEI)</label>
        <input class="form-input" id="pf-oldprice" type="number" placeholder="5499" value="${esc(p?.oldPrice)}">
      </div>
      <div class="form-group full">
        <label class="form-label">Imagine (cale sau URL)</label>
        <input class="form-input" id="pf-image" placeholder="images/produs.jpg" value="${esc(p?.image)}">
      </div>
      <div class="form-group full">
        <label class="form-label">Descriere *</label>
        <textarea class="form-input" id="pf-desc" rows="3" placeholder="Descriere scurtă...">${esc(p?.desc)}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Stoc *</label>
        <select class="form-input" id="pf-stock">
          <option value="in-stock"     ${p?.stock==='in-stock'    ?'selected':''}>În stoc</option>
          <option value="limited"      ${p?.stock==='limited'     ?'selected':''}>Stoc limitat</option>
          <option value="out-of-stock" ${p?.stock==='out-of-stock'?'selected':''}>Indisponibil</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Rating (1–5)</label>
        <input class="form-input" id="pf-rating" type="number" min="1" max="5" step="0.1" placeholder="4.8" value="${esc(p?.rating)}">
      </div>
      <div class="form-group full">
        <label class="form-label">Variante culoare (separate prin virgulă)</label>
        <input class="form-input" id="pf-variants" placeholder="Black, White, Blue" value="${esc(variantStr)}">
      </div>
    </div>
    <div style="margin-top:24px;padding-top:24px;border-top:1px solid var(--border)">
      <div style="font-family:var(--font-display);font-weight:700;font-size:.95rem;margin-bottom:16px">Specificații tehnice</div>
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Display</label>
          <input class="form-input" id="pf-display" placeholder="6.1 inch OLED" value="${esc(p?.specs?.display)}">
        </div>
        <div class="form-group">
          <label class="form-label">Procesor</label>
          <input class="form-input" id="pf-cpu" placeholder="A17 Pro" value="${esc(p?.specs?.cpu)}">
        </div>
        <div class="form-group">
          <label class="form-label">RAM</label>
          <input class="form-input" id="pf-ram" placeholder="8 GB" value="${esc(p?.specs?.ram)}">
        </div>
        <div class="form-group">
          <label class="form-label">Stocare</label>
          <input class="form-input" id="pf-storage" placeholder="128GB / 256GB" value="${esc(p?.specs?.storage)}">
        </div>
        <div class="form-group">
          <label class="form-label">Cameră</label>
          <input class="form-input" id="pf-cam" placeholder="48MP Main" value="${esc(p?.specs?.cam)}">
        </div>
        <div class="form-group">
          <label class="form-label">Baterie</label>
          <input class="form-input" id="pf-battery" placeholder="4000 mAh, 45W" value="${esc(p?.specs?.battery)}">
        </div>
        <div class="form-group">
          <label class="form-label">Sistem de operare</label>
          <input class="form-input" id="pf-os" placeholder="Android 14" value="${esc(p?.specs?.os)}">
        </div>
        <div class="form-group">
          <label class="form-label">Greutate</label>
          <input class="form-input" id="pf-weight" placeholder="200g" value="${esc(p?.specs?.weight)}">
        </div>
      </div>
    </div>
    <div class="form-actions" style="margin-top:28px">
      <button class="btn btn-ghost" onclick="closeProductForm()">Anulează</button>
      <button class="btn btn-primary" style="flex:1" onclick="saveProduct()">${p?'💾 Salvează modificările':'➕ Adaugă produsul'}</button>
    </div>`;
  modal.style.display='flex';
}

function closeProductForm() {
  const m=$('product-form-modal'); if(m) m.style.display='none';
  editingProductId=null;
}

function saveProduct() {
  const name=  $('pf-name')?.value.trim();
  const brand= $('pf-brand')?.value.trim();
  const price= parseFloat($('pf-price')?.value);
  const desc=  $('pf-desc')?.value.trim();
  if(!name||!brand||!price||!desc){toast('Completează câmpurile obligatorii *','⚠️');return;}
  const oldPrice=parseFloat($('pf-oldprice')?.value)||null;
  const image=  $('pf-image')?.value.trim()||'📱';
  const stock=  $('pf-stock')?.value;
  const rating= parseFloat($('pf-rating')?.value)||4.5;
  const category=$('pf-category')?.value;
  const varStr= $('pf-variants')?.value||'';
  const variants=varStr.split(',').map(v=>({name:v.trim(),image})).filter(v=>v.name);
  const specs={
    display:$('pf-display')?.value||'', cpu:$('pf-cpu')?.value||'',
    ram:    $('pf-ram')?.value||'',     storage:$('pf-storage')?.value||'',
    cam:    $('pf-cam')?.value||'',     battery:$('pf-battery')?.value||'',
    os:     $('pf-os')?.value||'',      weight:$('pf-weight')?.value||'',
  };
  if(editingProductId){
    const idx=PRODUCTS.findIndex(p=>p.id===editingProductId);
    if(idx>-1){PRODUCTS[idx]={...PRODUCTS[idx],name,brand,price,oldPrice,image,stock,rating,category,desc,variants,specs};toast(`"${name}" actualizat!`,'✅');}
  } else {
    const newId=Math.max(...PRODUCTS.map(p=>p.id))+1;
    PRODUCTS.push({id:newId,name,brand,price,oldPrice,image,stock,rating,category,desc,variants,specs,reviews:0});
    toast(`"${name}" adăugat!`,'🎉');
  }
  closeProductForm(); setAdminTab('products');
}

function deleteProduct(productId){
  const p=PRODUCTS.find(p=>p.id===productId);
  if(!confirm(`Ești sigur că vrei să ștergi "${p?.name}"?`)) return;
  PRODUCTS.splice(PRODUCTS.findIndex(p=>p.id===productId),1);
  toast(`"${p.name}" șters`,'🗑️'); setAdminTab('products');
}

function renderAdminStock(){
  return `
    <div>
      <div style="margin-bottom:28px">
        <h1 style="font-family:var(--font-display);font-size:1.8rem;font-weight:800">Stoc & Prețuri</h1>
        <p style="color:var(--text-muted);font-size:.88rem;margin-top:4px">Modifică rapid fără editorul complet.</p>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px">
        ${PRODUCTS.map(p=>`
          <div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius);padding:20px;display:grid;grid-template-columns:50px 1fr auto auto auto;align-items:center;gap:16px">
            <div style="width:44px;height:44px;background:var(--bg3);border-radius:8px;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:1.3rem;overflow:hidden">
              ${p.image&&p.image.includes('.')?`<img src="${esc(p.image)}" style="width:100%;height:100%;object-fit:contain;padding:3px" onerror="this.parentElement.innerHTML='📱'">`:p.image}
            </div>
            <div>
              <div style="font-family:var(--font-display);font-weight:700">${esc(p.name)}</div>
              <div style="font-size:.78rem;color:var(--text-muted)">${esc(p.brand)}</div>
            </div>
            <div style="display:flex;flex-direction:column;gap:4px">
              <label style="font-size:.72rem;color:var(--text-muted);font-weight:600;text-transform:uppercase;letter-spacing:.06em">Preț (LEI)</label>
              <input type="number" value="${p.price}" style="width:110px;background:var(--bg3);border:1px solid var(--border);border-radius:6px;color:var(--text);font-family:var(--font-body);font-size:.92rem;font-weight:700;padding:8px 10px;outline:none" onfocus="this.style.borderColor='var(--accent)'" onblur="this.style.borderColor='var(--border)';updatePrice(${p.id},this.value)">
            </div>
            <div style="display:flex;flex-direction:column;gap:4px">
              <label style="font-size:.72rem;color:var(--text-muted);font-weight:600;text-transform:uppercase;letter-spacing:.06em">Preț vechi</label>
              <input type="number" value="${p.oldPrice||''}" placeholder="—" style="width:110px;background:var(--bg3);border:1px solid var(--border);border-radius:6px;color:var(--text);font-family:var(--font-body);font-size:.92rem;padding:8px 10px;outline:none" onfocus="this.style.borderColor='var(--accent)'" onblur="this.style.borderColor='var(--border)';updateOldPrice(${p.id},this.value)">
            </div>
            <div style="display:flex;flex-direction:column;gap:4px">
              <label style="font-size:.72rem;color:var(--text-muted);font-weight:600;text-transform:uppercase;letter-spacing:.06em">Stoc</label>
              <select id="stock-${p.id}" onchange="updateStock(${p.id},this.value)" style="background:var(--bg3);border:1px solid var(--border);border-radius:6px;color:${p.stock==='in-stock'?'var(--success)':p.stock==='limited'?'var(--warn)':'var(--danger)'};font-family:var(--font-body);font-size:.88rem;font-weight:700;padding:8px 10px;outline:none;cursor:pointer">
                <option value="in-stock"     ${p.stock==='in-stock'    ?'selected':''}>✓ În stoc</option>
                <option value="limited"      ${p.stock==='limited'     ?'selected':''}>⚠ Limitat</option>
                <option value="out-of-stock" ${p.stock==='out-of-stock'?'selected':''}>✕ Indisponibil</option>
              </select>
            </div>
          </div>
        `).join('')}
      </div>
      <div style="margin-top:24px;background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius);padding:24px">
        <div style="font-family:var(--font-display);font-weight:700;margin-bottom:16px">Acțiuni rapide</div>
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <button class="btn btn-ghost btn-sm" onclick="setAllStock('in-stock')">✓ Toate în stoc</button>
          <button class="btn btn-ghost btn-sm" style="color:var(--danger);border-color:rgba(239,68,68,.3)" onclick="setAllStock('out-of-stock')">✕ Toate indisponibile</button>
          <button class="btn btn-ghost btn-sm" onclick="clearAllOldPrices()">🏷 Scoate prețurile vechi</button>
        </div>
      </div>
    </div>`;
}

function updateStock(id,val){const p=PRODUCTS.find(p=>p.id===id);if(!p)return;p.stock=val;const l=val==='in-stock'?'În stoc':val==='limited'?'Limitat':'Indisponibil';toast(`${p.name} → ${l}`,'📊');const s=$('stock-'+id);if(s)s.style.color=val==='in-stock'?'var(--success)':val==='limited'?'var(--warn)':'var(--danger)';}
function updatePrice(id,val){const p=PRODUCTS.find(p=>p.id===id);if(!p||!val)return;const n=parseFloat(val);if(isNaN(n)||n<=0)return;p.price=n;toast(`Preț "${p.name}": ${fmt(n)}`,'💰');}
function updateOldPrice(id,val){const p=PRODUCTS.find(p=>p.id===id);if(!p)return;p.oldPrice=val?parseFloat(val):null;toast(`Preț vechi "${p.name}" actualizat`,'🏷');}
function setAllStock(v){PRODUCTS.forEach(p=>p.stock=v);toast('Stoc actualizat','📊');setAdminTab('stock');}
function clearAllOldPrices(){PRODUCTS.forEach(p=>p.oldPrice=null);toast('Prețuri vechi eliminate','🏷');setAdminTab('stock');}

function renderAdminOrders(){
  const orders=[
    {id:'NX-A3F2D1',customer:'Ion Popescu',    email:'ion@gmail.com',   total:5499,status:'delivered',date:'2026-02-28',items:['iPhone 15 Pro']},
    {id:'NX-B7C9E2',customer:'Maria Ionescu',  email:'maria@yahoo.com', total:8198,status:'shipped',  date:'2026-03-01',items:['Samsung S24 Ultra','iPhone 15']},
    {id:'NX-D4A8F3',customer:'Andrei Popa',    email:'andrei@gmail.com',total:4299,status:'pending',  date:'2026-03-03',items:['Google Pixel 8 Pro']},
    {id:'NX-E1B5G4',customer:'Elena Constantin',email:'elena@outlook.com',total:2299,status:'cancelled',date:'2026-03-04',items:['Samsung Galaxy A55']},
  ];
  const ss={delivered:{bg:'rgba(34,197,94,.1)',color:'var(--success)',border:'rgba(34,197,94,.3)',label:'Livrat'},shipped:{bg:'rgba(59,130,246,.1)',color:'var(--accent)',border:'rgba(59,130,246,.3)',label:'În livrare'},pending:{bg:'rgba(245,158,11,.1)',color:'var(--warn)',border:'rgba(245,158,11,.3)',label:'În procesare'},cancelled:{bg:'rgba(239,68,68,.1)',color:'var(--danger)',border:'rgba(239,68,68,.3)',label:'Anulat'}};
  return `<div>
    <div style="margin-bottom:28px"><h1 style="font-family:var(--font-display);font-size:1.8rem;font-weight:800">Comenzi</h1><p style="color:var(--text-muted);font-size:.88rem;margin-top:4px">Vizualizare și gestionare comenzi clienți.</p></div>
    <div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden">
      <div style="display:grid;grid-template-columns:130px 1fr 120px 140px 130px;padding:12px 20px;border-bottom:1px solid var(--border);font-size:.72rem;font-weight:700;color:var(--text-muted);letter-spacing:.06em;text-transform:uppercase"><span>Nr. comandă</span><span>Client</span><span>Total</span><span>Status</span><span>Dată</span></div>
      ${orders.map(o=>{const s=ss[o.status];return`<div style="display:grid;grid-template-columns:130px 1fr 120px 140px 130px;padding:16px 20px;border-bottom:1px solid var(--border);align-items:center;transition:background .15s" onmouseover="this.style.background='var(--bg3)'" onmouseout="this.style.background='transparent'"><div style="font-family:monospace;font-size:.82rem;color:var(--accent)">${o.id}</div><div><div style="font-weight:600;font-size:.9rem">${esc(o.customer)}</div><div style="font-size:.75rem;color:var(--text-muted)">${esc(o.email)}</div><div style="font-size:.75rem;color:var(--text-muted);margin-top:2px">${o.items.join(', ')}</div></div><div style="font-family:var(--font-display);font-weight:800">${fmt(o.total)}</div><div><span style="padding:4px 10px;border-radius:999px;font-size:.75rem;font-weight:700;background:${s.bg};color:${s.color};border:1px solid ${s.border}">${s.label}</span></div><div style="font-size:.82rem;color:var(--text-muted)">${o.date}</div></div>`;}).join('')}
    </div>
    <p style="color:var(--text-muted);font-size:.8rem;margin-top:16px;text-align:center">⚠️ Date simulate.</p>
  </div>`;
}

function renderAdminStats(){
  const total=PRODUCTS.length;
  const brands=[...new Set(PRODUCTS.map(p=>p.brand))];
  return `<div>
    <div style="margin-bottom:28px"><h1 style="font-family:var(--font-display);font-size:1.8rem;font-weight:800">Statistici</h1></div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;margin-bottom:32px">
      ${[
        {icon:'📦',val:total,label:'Produse total',color:'var(--accent)'},
        {icon:'✅',val:PRODUCTS.filter(p=>p.stock==='in-stock').length,label:'În stoc',color:'var(--success)'},
        {icon:'❌',val:PRODUCTS.filter(p=>p.stock==='out-of-stock').length,label:'Indisponibile',color:'var(--danger)'},
        {icon:'🏷',val:PRODUCTS.filter(p=>p.oldPrice).length,label:'Cu reducere',color:'var(--warn)'},
        {icon:'💰',val:fmt(Math.round(PRODUCTS.reduce((s,p)=>s+p.price,0)/total)),label:'Preț mediu',color:'var(--text)'},
        {icon:'⭐',val:(PRODUCTS.reduce((s,p)=>s+p.rating,0)/total).toFixed(1),label:'Rating mediu',color:'var(--gold)'},
        {icon:'🏢',val:brands.length,label:'Branduri',color:'var(--accent)'},
      ].map(s=>`<div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius);padding:24px"><div style="font-size:1.8rem;margin-bottom:10px">${s.icon}</div><div style="font-family:var(--font-display);font-size:1.8rem;font-weight:800;color:${s.color}">${s.val}</div><div style="font-size:.82rem;color:var(--text-muted);margin-top:4px">${s.label}</div></div>`).join('')}
    </div>
    <div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius);padding:28px">
      <div style="font-family:var(--font-display);font-weight:700;margin-bottom:20px">Produse per brand</div>
      ${brands.map(brand=>{const count=PRODUCTS.filter(p=>p.brand===brand).length;const pct=Math.round((count/total)*100);return`<div style="margin-bottom:14px"><div style="display:flex;justify-content:space-between;margin-bottom:6px;font-size:.88rem"><span style="font-weight:600">${esc(brand)}</span><span style="color:var(--text-muted)">${count} produse (${pct}%)</span></div><div style="height:6px;background:var(--bg3);border-radius:999px;overflow:hidden"><div style="height:100%;width:${pct}%;background:var(--accent);border-radius:999px"></div></div></div>`;}).join('')}
    </div>
  </div>`;
}

function renderAdminSettings(){
  return `<div>
    <div style="margin-bottom:28px"><h1 style="font-family:var(--font-display);font-size:1.8rem;font-weight:800">Setări site</h1></div>
    <div style="display:flex;flex-direction:column;gap:16px;max-width:620px">
      ${[['Nume magazin','NEXUS Store'],['Email contact','contact@nexus-store.ro'],['Telefon','+40 700 123 456'],['Adresă','Str. Victoriei 100, București'],['Transport gratuit de la (LEI)','500'],['Cost transport standard (LEI)','29']].map(([l,v])=>`<div class="form-group"><label class="form-label">${l}</label><input class="form-input" value="${esc(v)}" onfocus="this.style.borderColor='var(--accent)'" onblur="this.style.borderColor='var(--border)'"></div>`).join('')}
      <div style="margin-top:8px;padding-top:24px;border-top:1px solid var(--border)">
        <div style="font-family:var(--font-display);font-weight:700;margin-bottom:16px">Funcționalități</div>
        <div style="display:flex;flex-direction:column;gap:12px">
          ${[['Banner hero activ',true],['Countdown promoție',false],['Newsletter popup',true]].map(([l,c])=>`<label style="display:flex;align-items:center;justify-content:space-between;padding:14px 18px;background:var(--bg3);border:1px solid var(--border);border-radius:10px;cursor:pointer"><span style="font-size:.9rem;font-weight:500">${l}</span><input type="checkbox" ${c?'checked':''} style="width:18px;height:18px;accent-color:var(--accent);cursor:pointer"></label>`).join('')}
        </div>
      </div>
      <button class="btn btn-primary" style="margin-top:8px" onclick="toast('Setări salvate!','💾')">💾 Salvează setările</button>
    </div>
  </div>`;
}