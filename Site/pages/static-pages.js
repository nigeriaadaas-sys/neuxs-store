// ============================================================
// NEXUS Store — pages/static-pages.js
// Pagini statice: Despre noi, Termeni și condiții, Confidențialitate.
// Într-un proiect real, acestea ar fi fișiere Markdown sau CMS.
// ============================================================

function renderAbout() {
  return `
    <div class="container">
      <div class="prose-wrap">
        <h1>Despre NEXUS</h1>
        <p>Suntem destinația ta numărul unu pentru tehnologie mobilă premium în România. La NEXUS, credem că inovația trebuie să fie accesibilă — rapid, sigur și fără compromisuri.</p>
        <h2>Misiunea noastră</h2>
        <p>Fondat în 2019 în București, magazinul nostru a fost creat cu o singură misiune: să oferim pasionaților de tehnologie o experiență de cumpărături modernă, autentică și orientată spre client.</p>
        <h2>Ce ne diferențiază</h2>
        <ul>
          <li>Produse 100% originale, achiziționate direct de la distribuitori autorizați</li>
          <li>Garanție oficială de 2 ani pe toate produsele</li>
          <li>Suport tehnic gratuit post-vânzare prin email, telefon și chat</li>
          <li>Rate fără dobândă disponibile la principalele bănci din România</li>
          <li>Retur gratuit în 30 de zile, fără condiții</li>
        </ul>
        <h2>Echipa</h2>
        <p>O echipă de 25 de pasionați de tehnologie, angajați să-ți ofere cea mai bună experiență — de la consultanță pre-vânzare până la asistență post-livrare.</p>
        <h2>Contact</h2>
        <p>📧 contact@nexus-store.ro &nbsp;|&nbsp; 📞 +40 700 123 456 &nbsp;|&nbsp; 📍 Str. Victoriei 100, București</p>
      </div>
    </div>`;
}

function renderTerms() {
  return `
    <div class="container">
      <div class="prose-wrap">
        <h1>Termeni și Condiții</h1>
        <p>Accesarea și utilizarea acestui site implică acceptarea necondiționată a termenilor de mai jos.</p>
        <h2>Utilizarea site-ului</h2>
        <p>Site-ul nexus-store.ro este destinat persoanelor cu vârsta de minimum 18 ani. Utilizarea sa în scopuri ilegale este strict interzisă.</p>
        <h2>Politica de prețuri</h2>
        <p>Toate prețurile afișate includ TVA (19%). Ne rezervăm dreptul de a modifica prețurile fără o notificare prealabilă. Prețul valid este cel de la momentul plasării comenzii.</p>
        <h2>Livrare și transport</h2>
        <p>Livrarea se realizează prin curier rapid în 24–48 de ore lucrătoare. Transportul este gratuit pentru comenzi de peste 500 LEI.</p>
        <h2>Dreptul de retur</h2>
        <p>Conform legislației europene, aveți dreptul să returnați produsul în termen de 30 de zile calendaristice de la primire, fără a preciza un motiv.</p>
        <h2>Garanție</h2>
        <p>Toate produsele beneficiază de garanție legală de 24 de luni.</p>
      </div>
    </div>`;
}

function renderPrivacy() {
  return `
    <div class="container">
      <div class="prose-wrap">
        <h1>Politica de Confidențialitate</h1>
        <p>Respectăm intimitatea dumneavoastră și ne angajăm să protejăm datele personale, conform GDPR (UE 2016/679).</p>
        <h2>Datele colectate</h2>
        <p>Colectăm date de identificare (nume, email, adresă), date de plată procesate securizat prin furnizori certificați PCI-DSS și date de navigare anonimizate.</p>
        <h2>Scopul prelucrării</h2>
        <ul>
          <li>Procesarea și livrarea comenzilor dumneavoastră</li>
          <li>Comunicare privind starea comenzii</li>
          <li>Newsletter (doar cu consimțământ explicit)</li>
          <li>Îmbunătățirea serviciilor prin analiză statistică anonimă</li>
        </ul>
        <h2>Drepturile dumneavoastră</h2>
        <p>Aveți dreptul la acces, rectificare, ștergere și portabilitate a datelor. Scrieți-ne la: <strong>privacy@nexus-store.ro</strong></p>
      </div>
    </div>`;
}