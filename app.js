/* Kadans — app iPhone (web app installable). Aucun framework, aucune dépendance. */
'use strict';

// ------------------------------------------------------------------ icônes
const P = (d, extra = '') => `<svg width="SZ" height="SZ" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${d}</svg>`;
const ICONS = {
  download: P('<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>'),
  music: P('<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>'),
  mix: P('<circle cx="7" cy="12" r="4"/><circle cx="17" cy="12" r="4"/><circle cx="7" cy="12" r="1"/><circle cx="17" cy="12" r="1"/>'),
  settings: P('<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>'),
  play: '<svg width="SZ" height="SZ" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5v14l12-7z"/></svg>',
  pause: '<svg width="SZ" height="SZ" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>',
  next: '<svg width="SZ" height="SZ" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 5l9 7-9 7zM16 5h2v14h-2z"/></svg>',
  prev: '<svg width="SZ" height="SZ" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 5l-9 7 9 7zM6 5h2v14H6z"/></svg>',
  check: P('<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9.5"/>'),
  more: '<svg width="SZ" height="SZ" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>',
  search: P('<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>'),
  trash: P('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),
  refresh: P('<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/>'),
  phone: P('<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>'),
  video: P('<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3"/>'),
  a: P('<path d="M12 4v16M4 12h16"/>'),
  chev: P('<path d="M9 6l6 6-6 6"/>'),
  wifi: P('<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>'),
  qr: P('<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h2v2h-2zM18 18h2v2h-2zM14 18h2M18 14h2"/>'),
  pc: P('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>'),
  off: P('<path d="M3 3l18 18M8.5 16.5a5 5 0 0 1 7 0M5 13a10 10 0 0 1 5-2.7M14 10.3A10 10 0 0 1 19 13M2 9.5a15 15 0 0 1 4.5-2.8M10.5 5.1A15 15 0 0 1 22 9.5"/><circle cx="12" cy="20" r="1"/>'),
  clip: P('<rect x="8" y="3" width="8" height="4" rx="1"/><path d="M16 5h2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h2"/>'),
  folder: P('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),
  up: P('<path d="M12 20V9M7 14l5-5 5 5M5 4h14"/>'),
  clock: P('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  disk: P('<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>'),
  sun: P('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>'),
  palette: P('<path d="M12 3a9 9 0 1 0 0 18c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.4A4.6 4.6 0 0 0 21 9.8C21 6 17 3 12 3z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7" r="1"/>'),
  image: P('<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>'),
  close: P('<path d="M6 6l12 12M18 6L6 18"/>'),
  down: P('<path d="M6 9l6 6 6-6"/>'),
  stop: '<svg width="SZ" height="SZ" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>',
  link: P('<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'),
};
function iconHTML(name, size = 22) { return (ICONS[name] || '').replaceAll('SZ', size); }

// ------------------------------------------------------------------ petit helper DOM
function h(tag, props, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'style') el.style.cssText = v;
    else if (k === 'html') el.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const c of kids.flat(Infinity)) {
    if (c == null || c === false) continue;
    el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return el;
}
const ico = (name, size = 22) => h('span', { class: 'ico', html: iconHTML(name, size) });
const $ = (s, root = document) => root.querySelector(s);

function toast(msg, ms = 2600) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove('show'), ms);
}
function fmtTime(s) {
  if (!isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60), r = Math.floor(s % 60);
  return m + ':' + String(r).padStart(2, '0');
}
function fmtSize(b) {
  if (!b) return '0 Mo';
  if (b > 1e9) return (b / 1e9).toFixed(1).replace('.', ',') + ' Go';
  return Math.round(b / 1e6) + ' Mo';
}
const COLORS = ['#4A2E3A', '#2E4A42', '#3A3A52', '#4A3F2E', '#2E3A4A', '#43304A', '#2F4436', '#4A3530'];
function colorFor(id) { let n = 0; for (const c of String(id)) n = (n * 31 + c.charCodeAt(0)) >>> 0; return COLORS[n % COLORS.length]; }

// Liste gardée dans le téléphone : jamais de plantage si elle est abîmée.
function safeList(key) {
  try { const v = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; }
}
// Morceau reçu du PC ou gardé sur l'iPhone : on complète ce qui manque pour que l'affichage ne casse pas.
function cleanTrack(t) {
  if (!t || typeof t !== 'object' || t.id == null) return null;
  return { ...t, id: String(t.id), titre: t.titre == null || t.titre === '' ? 'Sans titre' : String(t.titre),
    artiste: t.artiste == null ? '' : String(t.artiste), categorie: t.categorie == null ? t.categorie : String(t.categorie) };
}

// ------------------------------------------------------------------ état
const S = {
  server: localStorage.getItem('kadans.serveur') || '',
  key: localStorage.getItem('kadans.cle') || '',
  online: null,          // null = inconnu, true/false
  pcName: '',
  lib: safeList('kadans.lib'),
  offline: new Map(),    // id -> métadonnées des morceaux gardés sur l'iPhone
  saving: new Map(),     // id -> pourcentage d'enregistrement hors ligne
  jobs: [],
  handled: new Set(),
  tab: 'ajouter',
  format: localStorage.getItem('kadans.format') || 'mp3',
  cats: safeList('kadans.cats').filter((c) => typeof c === 'string'),   // catégories = sous-dossiers du dossier de téléchargement du PC
  cat: localStorage.getItem('kadans.cat') || '',                   // catégorie choisie pour les prochains téléchargements
  folder: localStorage.getItem('kadans.dossier'),                  // dossier ouvert dans la Bibliothèque (null = tous, '' = sans catégorie)
  excl: JSON.parse(localStorage.getItem('kadans.excl') || '{}'),   // id -> true (retiré de l'iPhone : le PC ne le renvoie plus) / false (de nouveau voulu)
  autoOffline: localStorage.getItem('kadans.auto') !== '0',
  syncAuto: localStorage.getItem('kadans.syncAuto') !== '0',
  sendAuto: localStorage.getItem('kadans.sendAuto') !== '0',
  filter: 'tout',
  bpmOn: false, bpmMin: 95, bpmMax: 128,
  query: '',
  queue: [], index: -1, current: null,
};

function readHashConfig() {
  // Lien du QR : #s=…&k=…  — icône de l'écran d'accueil : ?s=…#k=…  (ancienne icône : ?s=…&k=…)
  // La clé reste dans la partie après « # » : elle n'est jamais envoyée au site qui héberge l'app (GitHub).
  const hash = new URLSearchParams(location.hash.slice(1));
  const query = new URLSearchParams(location.search);
  const standalone = navigator.standalone || matchMedia('(display-mode: standalone)').matches;
  const keep = () => location.pathname + (standalone ? '' : '?' + new URLSearchParams({ s: S.server }) + '#' + new URLSearchParams({ k: S.key }));
  const s = hash.get('s') || query.get('s');
  if (!s) return false;
  const k = hash.get('k') || query.get('k') || '';
  // L'icône rouvre toujours l'adresse du jour où elle a été ajoutée : on ne s'en sert qu'à sa 1re ouverture,
  // sinon, après un redémarrage du PC (nouvelle adresse), elle écraserait le QR rescanné.
  if (!hash.get('s') && S.server) { history.replaceState(null, '', keep()); return false; }
  const changed = s.replace(/\/$/, '') !== S.server;
  setServer(s, k);
  // Dans Safari, on garde le lien dans l'adresse : « Sur l'écran d'accueil » le reprend pour l'icône.
  history.replaceState(null, '', keep());
  return changed;
}
function setServer(s, k) {
  S.server = s.replace(/\/$/, ''); S.key = k;
  localStorage.setItem('kadans.serveur', S.server);
  localStorage.setItem('kadans.cle', S.key);
  // L'icône ajoutée à l'écran d'accueil mémorise le PC (manifeste personnalisé).
  if (S.server === location.origin) {
    const l = document.querySelector('link[rel=manifest]');
    if (l) l.href = 'manifest.webmanifest?k=' + encodeURIComponent(S.key);
  }
}
function parseLink(text) {
  try {
    const u = new URL(text.trim());
    const p = new URLSearchParams(u.hash.slice(1));
    if (p.get('s')) return { s: p.get('s').replace(/\/$/, ''), k: p.get('k') || '' };
  } catch (e) { /* lien invalide */ }
  return null;
}

// ------------------------------------------------------------------ serveur
// ------------------------------------------------------------------ Wi-Fi de la maison
// À la maison, on parle au PC directement par le Wi-Fi (bien plus rapide) ; ailleurs, par le tunnel Internet.
// Le Wi-Fi demande d'avoir installé une fois le certificat Kadans sur le téléphone (onglet Mobile du PC).
const WIFI = { base: null, tried: 0, info: (() => { try { return JSON.parse(localStorage.getItem('kadans.wifi') || 'null'); } catch (e) { return null; } })() };
const base = () => WIFI.base || S.server;
function setWifiInfo(info) {
  const k = JSON.stringify(info || null);
  if (k === JSON.stringify(WIFI.info)) return;
  WIFI.info = info || null; localStorage.setItem('kadans.wifi', k);
  if (!info) WIFI.base = null;
  WIFI.tried = 0; probeWifi();
}
let wifiProbing = null;
function probeWifi(force) {
  if (wifiProbing) return wifiProbing;
  const info = WIFI.info;
  if (!info || !info.ips || !info.ips.length || !S.key) { WIFI.base = null; return Promise.resolve(); }
  if (!force && Date.now() - WIFI.tried < (WIFI.base ? 60000 : 20000)) return Promise.resolve();
  WIFI.tried = Date.now();
  wifiProbing = (async () => {
    let found = null;
    for (const ip of info.ips) {
      const url = `https://${ip}:${info.port}`;
      const ctrl = new AbortController(), t = setTimeout(() => ctrl.abort(), 2500);
      try {
        const r = await fetch(url + '/api/etat', { headers: { 'x-kadans-cle': S.key, ...(LOCK.jeton ? { 'x-kadans-jeton': LOCK.jeton } : {}) }, signal: ctrl.signal, cache: 'no-store' });
        if (r.ok && (r.headers.get('content-type') || '').includes('json')) { found = url; break; }
      } catch (e) { /* pas à la maison, ou certificat pas encore installé */ }
      finally { clearTimeout(t); }
    }
    const changed = found !== WIFI.base;
    WIFI.base = found;
    if (changed) { updatePill(); if (S.tab === 'reglages') render(); }
  })().finally(() => { wifiProbing = null; });
  return wifiProbing;
}
function wifiLost() { if (WIFI.base) { WIFI.base = null; WIFI.tried = Date.now(); updatePill(); } }

async function api(path, opts = {}, retried = false) {
  if (!S.server) throw new Error('PC non relié');
  const headers = { 'x-kadans-cle': S.key, ...(LOCK.jeton ? { 'x-kadans-jeton': LOCK.jeton } : {}), ...(opts.headers || {}) };
  if (opts.json) { headers['content-type'] = 'application/json'; opts.body = JSON.stringify(opts.json); }
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), opts.timeout || 12000);
  let r;
  const via = base();
  try {
    r = await fetch(via + path, { method: opts.method || 'GET', headers, body: opts.body, signal: ctrl.signal });
  } catch (e) {
    if (via !== S.server) { wifiLost(); clearTimeout(timer); return api(path, opts, retried); }   // plus de Wi-Fi : par Internet
    throw e;
  } finally { clearTimeout(timer); }
  const data = await r.json().catch(() => ({}));
  if (r.status === 423 && !retried) {   // le PC demande le code d'accès : on le demande, puis on recommence
    await unlock();
    return api(path, opts, true);
  }
  if (!r.ok) { const err = new Error(data.erreur || ('Erreur ' + r.status)); err.status = r.status; err.data = data; throw err; }
  return data;
}
const authQ = () => `k=${encodeURIComponent(S.key)}` + (LOCK.jeton ? `&j=${encodeURIComponent(LOCK.jeton)}` : '');
const fileURL = (id) => `${base()}/api/fichier/${id}?${authQ()}`;
const coverURL = (id) => `${base()}/api/pochette/${id}?${authQ()}`;

// ------------------------------------------------------------------ code d'accès à 6 chiffres
// Choisi sur le PC (onglet iPhone). Demandé à chaque ouverture de l'app ; vérifié par le PC.
// Sans le PC (hors ligne), il est vérifié sur l'iPhone pour ouvrir la musique gardée.
const LOCK = { jeton: sessionStorage.getItem('kadans.jeton') || '', code: '', waiting: null };
const lockKnown = () => { try { return JSON.parse(localStorage.getItem('kadans.verrou') || 'null'); } catch (e) { return null; } };
async function sha(text) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('');
}
async function rememberLock(code) {   // pour pouvoir vérifier le code même PC éteint
  const sel = [...crypto.getRandomValues(new Uint8Array(16))].map((x) => x.toString(16).padStart(2, '0')).join('');
  localStorage.setItem('kadans.verrou', JSON.stringify({ sel, hash: await sha(sel + code) }));
}
function forgetLock() { localStorage.removeItem('kadans.verrou'); }
// Réponse venant vraiment de Kadans (toujours du JSON) ? Sinon : page d'erreur du tunnel, PC injoignable.
const fromKadans = (r) => (r.headers.get('content-type') || '').includes('application/json');
// Envoie le code au PC. Renvoie true si accepté, un message d'erreur sinon, null si le PC ne répond pas.
async function verifyWithPC(code) {
  if (!S.server) return null;
  let r;
  try {
    r = await fetch(S.server + '/api/code/verifier', { method: 'POST', headers: { 'x-kadans-cle': S.key, 'content-type': 'application/json' }, body: JSON.stringify({ code }) });
  } catch (e) { return null; }
  // Une adresse de tunnel morte renvoie une page d'erreur de Cloudflare : ce n'est PAS une réponse du PC.
  if (!fromKadans(r)) return null;
  const d = await r.json().catch(() => ({}));
  if (r.status === 404 || r.status === 405) { forgetLock(); return true; }   // PC sans code d'accès (ancienne version)
  if (r.status === 401) { LOCK.keyRefused = true; return null; }            // QR plus valable (clé changée sur le PC)
  if (!r.ok) return d.erreur || 'Code refusé';
  LOCK.jeton = d.jeton || ''; sessionStorage.setItem('kadans.jeton', LOCK.jeton);
  if (d.jeton) await rememberLock(code); else forgetLock();
  return true;
}
function unlock(pcSaysCode = false) {
  if (LOCK.waiting) return LOCK.waiting;
  LOCK.waiting = new Promise(async (done) => {
    if (LOCK.code && (await verifyWithPC(LOCK.code)) === true) { LOCK.waiting = null; done(); return; }   // déjà tapé (hors ligne) : en silence
    const st = pcSaysCode ? true : await codeStateFromPC();
    if (st === false || (st === null && !lockKnown())) {   // code retiré sur le PC, ou rien à protéger : on ouvre
      if (st === false) { forgetLock(); LOCK.jeton = ''; sessionStorage.removeItem('kadans.jeton'); }
      LOCK.waiting = null; done(); return;
    }
    const inp = h('input', { class: 'input lock-input', type: 'password', inputmode: 'numeric', autocomplete: 'off', maxlength: 6, 'aria-label': 'Code d’accès à 6 chiffres' });
    const err = h('p', { class: 'sub lock-err', role: 'alert' });
    const go = h('button', { class: 'btn primary', type: 'button' }, 'Ouvrir');
    // Le PC a changé d'adresse (redémarrage, nouvelle clé) ? On peut scanner son QR d'abord, puis taper le code.
    // L'écran du code n'est JAMAIS caché : c'est la fenêtre du scan qui passe au-dessus de lui, le temps du scan.
    // Scan réussi, annulé ou en erreur : l'écran du code reste là tant que le bon code n'est pas tapé.
    const rescan = h('button', { class: 'lock-rescan', type: 'button', onclick: () => {
      err.textContent = '';
      document.body.classList.add('sheet-over-lock');
      scanQR();
      const back = setInterval(() => {
        if (!$('#sheet').hidden) return;   // fenêtre du scan encore ouverte
        clearInterval(back);
        document.body.classList.remove('sheet-over-lock');
        LOCK.keyRefused = false;
        err.textContent = S.server ? 'Tape ton code pour ouvrir.' : ''; setTimeout(() => inp.focus(), 50);
      }, 300);
    } }, 'Scanner le QR du PC');
    // 6 points qui se remplissent ; le vrai champ est posé dessus, invisible (le clavier chiffres s'ouvre au toucher)
    const dots = h('div', { class: 'lock-dots', 'aria-hidden': 'true' }, [0, 1, 2, 3, 4, 5].map(() => h('span')));
    const showDots = () => dots.querySelectorAll('span').forEach((d, i) => d.classList.toggle('on', i < inp.value.length));
    const box = h('div', { class: 'lock' },
      h('div', { class: 'lock-card' },
        h('span', { class: 'logo lock-logo', html: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0E0F12" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M4 10v4M8 6v12M12 9v6M16 4v16M20 10v4"/></svg>' }),
        h('h1', null, 'Bon retour'),
        h('p', { class: 'sub' }, 'Entre ton code d’accès à 6 chiffres'),
        h('div', { class: 'lock-pin' }, dots, inp), err, go),
      rescan);
    const submit = async () => {
      const code = inp.value.replace(/\D/g, '');
      if (code.length !== 6) { err.textContent = '6 chiffres'; return; }
      go.disabled = true; err.textContent = '';
      let res = await verifyWithPC(code);
      if (res === null) {   // PC éteint : on vérifie sur l'iPhone
        const k = lockKnown();
        res = k ? ((await sha(k.sel + code)) === k.hash ? true : 'Code incorrect.') : 'Ton PC ne répond pas : allume-le et lance Kadans.';
      }
      if (res === true) {
        LOCK.code = code; box.remove(); LOCK.waiting = null; done(); render();
        if (LOCK.keyRefused) toast('Ce QR n’est plus valable : sur le PC, onglet iPhone, scanne le nouveau QR.', 5000);
        return;
      }
      err.textContent = res; inp.value = ''; showDots(); go.disabled = false; inp.focus();
      box.classList.remove('shake'); void box.offsetWidth; box.classList.add('shake');
    };
    inp.oninput = () => { inp.value = inp.value.replace(/\D/g, '').slice(0, 6); showDots(); if (inp.value.length === 6) submit(); };
    inp.onkeydown = (e) => { if (e.key === 'Enter') submit(); };
    go.onclick = submit;
    document.body.append(box);
    setTimeout(() => inp.focus(), 50);
  });
  return LOCK.waiting;
}
// Code redemandé si l'app est restée plus de 20 minutes en arrière-plan (téléphone posé, prêté…).
// Pendant ce temps, l'écran de l'app est flouté (aperçu des apps récentes).
document.addEventListener('visibilitychange', () => {
  const locked = !!lockKnown();
  document.body.classList.toggle('masque', document.hidden && locked);
  if (document.hidden) { LOCK.hiddenAt = Date.now(); return; }
  if (locked && LOCK.hiddenAt && Date.now() - LOCK.hiddenAt > 20 * 60 * 1000) {
    LOCK.jeton = ''; LOCK.code = ''; sessionStorage.removeItem('kadans.jeton');
    unlock();
  }
  LOCK.hiddenAt = 0;
});
// Nouveau QR scanné / lien collé : le QR seul ne suffit JAMAIS, le code est redemandé.
async function relinked() {
  LOCK.code = ''; LOCK.jeton = ''; sessionStorage.removeItem('kadans.jeton');
  await guard();
}
// Verrouille AVANT d'afficher : si l'iPhone sait qu'il y a un code, ou si le PC dit qu'il y en a un
// (1re ouverture, ouverture dans Safari, nouveau QR). L'attente de la réponse du PC est limitée à 8 s.
async function guard() {
  if (lockKnown()) { unlock(); return; }
  if (!S.server) return;
  const st = await Promise.race([codeStateFromPC(), new Promise((r) => setTimeout(() => r(null), 8000))]);
  if (st) unlock(true);
}
// Le PC a-t-il un code ? true / false / null (PC injoignable)
async function codeStateFromPC() {
  if (!S.server) return null;
  try {
    const r = await fetch(S.server + '/api/code/etat', { headers: { 'x-kadans-cle': S.key } });
    if (!fromKadans(r)) return null;                           // adresse morte (page d'erreur du tunnel)
    if (r.status === 404 || r.status === 405) return false;   // ancienne version de Kadans : pas de code
    if (!r.ok) return null;
    return !!(await r.json()).actif;
  } catch (e) { return null; }
}
// Si le code a été retiré sur le PC, l'iPhone ne le demande plus.
async function refreshLockState() {
  if ((await codeStateFromPC()) === false) { forgetLock(); LOCK.jeton = ''; sessionStorage.removeItem('kadans.jeton'); }
}

async function detectSameOrigin() {
  // L'app est-elle servie directement par le PC (ex. ouverte sur le PC) ?
  if (S.server || location.protocol === 'file:') return;
  try {
    const r = await fetch('api/etat', { cache: 'no-store' });
    if (r.ok) { S.server = location.origin; localStorage.setItem('kadans.serveur', S.server); }
  } catch (e) { /* non */ }
}

async function checkServer() {
  if (!S.server) { S.online = null; return; }
  try {
    const st = await api('/api/etat', { timeout: 15000 });   // ligne lente : on attend plus avant de conclure
    S.online = true; S.pcName = st.nom_pc || ''; S.fails = 0; S.keyRefused = false;
    refreshLockState();
    if ('wifi' in st) setWifiInfo(st.wifi);   // ancienne version de Kadans : pas de Wi-Fi direct
    probeWifi();
  } catch (e) {
    // une seule réponse lente ne veut pas dire « PC éteint » : hors ligne après 2 échecs de suite
    S.fails = (S.fails || 0) + 1;
    if (e.status === 401) { S.keyRefused = true; S.online = false; }   // clé changée sur le PC : il faut rescanner le QR
    if (S.fails >= 2 || S.online == null) S.online = false;
  }
  updatePill();
}
async function refreshLibrary() {
  if (!S.server) return;
  try {
    const lib = await api('/api/bibliotheque', { timeout: 15000 });
    if (!Array.isArray(lib)) throw new Error('réponse inattendue du PC');   // ex. page d'erreur du tunnel
    S.lib = lib.map(cleanTrack).filter(Boolean);
    S.online = true;
    localStorage.setItem('kadans.lib', JSON.stringify(S.lib.slice(0, 3000)));
    await refreshCats();
  } catch (e) { /* liste pas reçue cette fois : on garde la précédente (checkServer décide si le PC est joignable) */ }
  updatePill();
}
async function refreshCats() {
  try { setCats((await api('/api/categories')).categories.map((c) => c.nom)); } catch (e) { /* ancien PC sans catégories */ }
}
function setCats(list) {
  S.cats = list;
  localStorage.setItem('kadans.cats', JSON.stringify(list));
  if (S.cat && !list.includes(S.cat)) { S.cat = ''; localStorage.setItem('kadans.cat', ''); }
}
// Feuille « Nouvelle catégorie » : crée le dossier sur le PC, puis rappelle done(nom).
function askCategory(done) {
  openSheet(() => {
    const inp = h('input', { class: 'input', type: 'text', maxlength: 60, placeholder: 'Ex. Zouk, Kompa, Dancehall…', 'aria-label': 'Nom de la catégorie' });
    const ok = h('button', { class: 'btn primary', type: 'button', onclick: async () => {
      const nom = inp.value.trim();
      if (!nom) { inp.focus(); return; }
      ok.disabled = true;
      try {
        const d = await api('/api/categories', { method: 'POST', json: { nom } });
        setCats(d.categories.map((c) => c.nom));
        closeSheet(); toast('Catégorie « ' + d.nom + ' » créée ✓');
        done(d.nom);
      } catch (e) { toast(e.message); ok.disabled = false; }
    } }, 'Créer');
    setTimeout(() => inp.focus(), 50);
    return h('div', { class: 'card', style: 'background:none;border:0;padding:0' },
      h('b', null, 'Nouvelle catégorie'),
      h('p', { class: 'sub', style: 'margin:0' }, 'Un dossier de ce nom est créé sur ton PC, dans le dossier de téléchargement.'),
      inp, ok);
  });
}
// Feuille « Renommer » : renomme le fichier sur le PC (« Artiste - Titre » met aussi à jour l'artiste).
function renameMenu(t) {
  openSheet(() => {
    const inp = h('input', { class: 'input', type: 'text', maxlength: 150, 'aria-label': 'Nouveau nom',
      value: (t.artiste ? t.artiste + ' - ' : '') + (t.titre || '') });
    const ok = h('button', { class: 'btn primary', type: 'button', onclick: async () => {
      const nom = inp.value.trim();
      if (!nom) { inp.focus(); return; }
      ok.disabled = true;
      try {
        const d = await api('/api/renommer', { method: 'POST', json: { id: t.id, nom: nom } });
        const m = S.offline.get(t.id);
        if (m) {   // la copie gardée sur l'iPhone prend aussi le nouveau nom
          const parts = d.nom.split(' - ');
          if (parts.length > 1) { m.artiste = parts.shift().trim(); m.titre = parts.join(' - ').trim(); } else m.titre = d.nom;
          DB.putMeta(m);
        }
        closeSheet();
        await refreshLibrary(); refreshTrackRows();
        toast('Renommé en « ' + d.nom + ' » ✓');
      } catch (e) { toast(e.message); ok.disabled = false; }
    } }, 'Renommer');
    setTimeout(() => { inp.focus(); inp.select(); }, 50);
    return h('div', { class: 'card', style: 'background:none;border:0;padding:0' },
      h('b', null, 'Renommer le morceau'),
      h('p', { class: 'sub', style: 'margin:0' }, 'Le fichier est renommé sur ton PC. Astuce : « Artiste - Titre » remplit aussi l’artiste.'),
      inp, ok);
  });
}
// Feuille « Ranger dans… » : déplace le fichier sur le PC.
function moveMenu(t) {
  const go = async (cat) => {
    closeSheet();
    try {
      await api('/api/ranger', { method: 'POST', json: { ids: [t.id], categorie: cat } });
      const m = S.offline.get(t.id);
      if (m) { m.categorie = cat; DB.putMeta(m); }
      await refreshLibrary(); refreshTrackRows();
      toast('Rangé dans « ' + (cat || 'Sans catégorie') + ' » ✓');
    } catch (e) { toast(e.message); }
  };
  openSheet(() => h('div', null,
    h('b', { style: 'display:block;margin-bottom:6px' }, 'Ranger « ' + t.titre + ' »'),
    [['', 'Sans catégorie'], ...S.cats.map((c) => [c, c])].map(([val, label]) =>
      h('button', { class: 'menu-item', type: 'button', onclick: () => go(val) },
        ico(t.categorie === val ? 'check' : 'music', 20), label)),
    h('button', { class: 'menu-item', type: 'button', style: 'color:var(--accent)', onclick: () => askCategory(go) }, ico('a', 20), 'Nouvelle catégorie…')));
}
async function refreshJobs() {
  if (!S.server || !S.online) return;
  try { S.jobs = await api('/api/telechargements'); } catch (e) { return; }
  let needLib = false;
  for (const j of S.jobs) {
    if (j.etat === 'termine' && !S.handled.has(j.id)) {
      S.handled.add(j.id);
      needLib = true;
      if (S.autoOffline && j.fichier_id) S._autoSave = (S._autoSave || []).concat(j.fichier_id);
    }
  }
  if (needLib) {
    await refreshLibrary();
    for (const id of S._autoSave || []) {
      const it = allTracks().find((t) => t.id === id);
      if (it && !S.offline.has(id)) saveOffline(it);
    }
    S._autoSave = [];
  }
  if (S.tab === 'ajouter') renderJobs();
}

// ------------------------------------------------------------------ stockage hors ligne (IndexedDB)
const DB = {
  db: null,
  open() {
    if (this.db) return Promise.resolve(this.db);
    return new Promise((res, rej) => {
      const r = indexedDB.open('kadans', 1);
      r.onupgradeneeded = () => {
        const db = r.result;
        db.createObjectStore('meta', { keyPath: 'id' });
        db.createObjectStore('fichiers');
        db.createObjectStore('pochettes');
      };
      r.onsuccess = () => { this.db = r.result; res(this.db); };
      r.onerror = () => rej(r.error);
    });
  },
  async tx(store, mode, fn) {
    const db = await this.open();
    return new Promise((res, rej) => {
      const t = db.transaction(store, mode);
      const out = fn(t.objectStore(store));
      t.oncomplete = () => res(out && out.result !== undefined ? out.result : out);
      t.onerror = () => rej(t.error);
      t.onabort = () => rej(t.error);
    });
  },
  allMeta() { return this.tx('meta', 'readonly', (s) => s.getAll()); },
  putMeta(meta) { return this.tx('meta', 'readwrite', (s) => s.put(meta)); },
  getFile(id) { return this.tx('fichiers', 'readonly', (s) => s.get(id)); },
  getCover(id) { return this.tx('pochettes', 'readonly', (s) => s.get(id)); },
  async put(meta, blob, cover) {
    await this.tx('fichiers', 'readwrite', (s) => s.put(blob, meta.id));
    if (cover) await this.tx('pochettes', 'readwrite', (s) => s.put(cover, meta.id));
    await this.tx('meta', 'readwrite', (s) => s.put(meta));
  },
  async remove(id) {
    await this.tx('meta', 'readwrite', (s) => s.delete(id));
    await this.tx('fichiers', 'readwrite', (s) => s.delete(id));
    await this.tx('pochettes', 'readwrite', (s) => s.delete(id));
  },
};
const coverCache = new Map();

async function loadOffline() {
  try {
    const metas = await DB.allMeta();
    S.offline = new Map((metas || []).filter((m) => m && m.id != null).map((m) => {
      if (m.titre == null || m.titre === '') m.titre = 'Sans titre'; else m.titre = String(m.titre);
      return [m.id, m];
    }));
  } catch (e) { console.warn(e); }
}

// Transfert rapide et robuste : le fichier est découpé en tranches de 2 Mo téléchargées 4 à la fois
// (à travers le tunnel internet, plusieurs flux en parallèle vont bien plus vite qu'un seul).
// Chaque tranche reprend là où elle s'est arrêtée si la connexion bloque ou coupe (jusqu'à 8 essais).
const CHUNK = 2 * 1024 * 1024, PARTS = 4;
async function fetchRange(url, start, end, onBytes, info) {
  const parts = []; let got = 0;
  const tries = WIFI.base && url.startsWith(WIFI.base) ? 2 : 8;   // par le Wi-Fi : on bascule vite sur Internet s'il décroche
  for (let attempt = 0; attempt < tries; attempt++) {
    if (attempt) await new Promise((r) => setTimeout(r, Math.min(15000, 1500 * attempt)));
    const ctrl = new AbortController();
    let stall = setTimeout(() => ctrl.abort(), WIFI.base && url.startsWith(WIFI.base) ? 8000 : 45000);   // rien reçu : on relance
    try {
      const to = end == null ? '' : end;
      const r = await fetch(url, { signal: ctrl.signal, headers: { Range: `bytes=${start + got}-${to}` } });
      if (r.status >= 400 && r.status < 500 && r.status !== 408 && r.status !== 429) throw Object.assign(new Error('Téléchargement impossible (' + r.status + ')'), { fatal: true });
      if (!r.ok) throw new Error('Erreur ' + r.status);
      if (r.status !== 206) {   // le PC renvoie tout le fichier d'un coup
        if (start > 0) throw Object.assign(new Error('reprise impossible'), { fatal: true });   // une tranche ne reçoit jamais tout le fichier
        if (got) { parts.length = 0; onBytes(-got); got = 0; }   // on repart de zéro, en entier
        info.whole = true;
      }
      info.type = info.type || r.headers.get('content-type') || '';
      // Taille totale : dans « Content-Range » (bytes 0-2097151/12513283). Un ancien Kadans ne laisse pas l'app
      // la lire (règle des navigateurs entre deux adresses) : on se fie alors à la longueur de CETTE réponse.
      const cl = +r.headers.get('content-length') || 0, before = got;
      const m = (r.headers.get('content-range') || '').match(/\/(\d+)$/);
      if (m) info.total = +m[1];
      else if (info.whole) info.total = cl;
      else if (end == null && cl) info.total = start + before + cl;
      let want;
      if (info.whole) want = info.total;
      else if (info.total) want = Math.min(end == null ? info.total - 1 : end, info.total - 1) - start + 1;   // fichier plus petit que la tranche
      else want = cl ? before + cl : (end == null ? 0 : end - start + 1);
      if (!r.body) { const b = new Uint8Array(await r.arrayBuffer()); parts.push(b); got += b.length; onBytes(b.length); }
      else {
        const reader = r.body.getReader();
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          clearTimeout(stall); stall = setTimeout(() => ctrl.abort(), 45000);
          parts.push(value); got += value.length; onBytes(value.length);
        }
      }
      clearTimeout(stall);
      if (!want || got >= want) return parts;
      // coupé avant la fin : on reprend au tour suivant
    } catch (e) {
      clearTimeout(stall);
      if (e.fatal) throw e;
    }
  }
  throw new Error('connexion trop lente ou coupée');
}
async function fetchWithProgress(url, onProgress) {
  const info = { total: 0, type: '', whole: false };
  let got = 0;
  const bytes = (n) => { got += n; if (info.total) onProgress(Math.max(0, Math.min(99, Math.round(got * 100 / info.total)))); };
  // 1re tranche : donne aussi la taille totale du fichier
  const first = await fetchRange(url, 0, CHUNK - 1, bytes, info);
  const firstLen = first.reduce((n, p) => n + p.length, 0);
  if (info.whole || firstLen < CHUNK || (info.total && info.total <= CHUNK)) { onProgress(100); return new Blob(first, { type: info.type }); }
  if (!info.total) {   // taille totale cachée (ancien Kadans) : la suite en un seul flux, longueur contrôlée
    const rest = await fetchRange(url, CHUNK, null, bytes, info);
    onProgress(100);
    return new Blob([...first, ...rest], { type: info.type });
  }
  // les tranches suivantes, 4 à la fois
  const ranges = [];
  for (let s = CHUNK; s < info.total; s += CHUNK) ranges.push([s, Math.min(info.total, s + CHUNK) - 1]);
  const out = new Array(ranges.length);
  let next = 0;
  const worker = async () => {
    while (next < ranges.length) {
      const i = next++;
      out[i] = await fetchRange(url, ranges[i][0], ranges[i][1], bytes, { ...info, whole: false });
    }
  };
  await Promise.all(Array.from({ length: Math.min(PARTS, ranges.length) }, worker));
  onProgress(100);
  return new Blob([...first, ...out.flat()], { type: info.type });
}

async function saveOffline(item, quiet = false) {
  if (S.offline.has(item.id) || S.saving.has(item.id)) return true;
  if (S.online === false && !quiet) { toast('Ton PC doit être allumé pour garder ce morceau.'); return false; }
  S.saving.set(item.id, 0);
  laterRefresh();
  try {
    if (navigator.storage && navigator.storage.persist) navigator.storage.persist();
    let last = 0;
    const coverP = noCover.has(item.id) ? Promise.resolve(null)
      : fetch(coverURL(item.id)).then((c) => { if (c.ok) return c.blob(); noCover.add(item.id); return null; }).catch(() => null);
    const onP = (p) => {
      S.saving.set(item.id, p);
      if (p - last >= 2) { last = p; showProgress(item.id, p); }   // juste le pourcentage, pas toute la liste
    };
    let blob;
    const viaWifi = !!WIFI.base;   // retenu ici : une autre requête peut remarquer avant nous que le Wi-Fi a décroché
    try { blob = await fetchWithProgress(fileURL(item.id), onP); }
    catch (e) {   // le Wi-Fi a décroché (sortie de la maison…) : on reprend par Internet
      if (!viaWifi || e.fatal) throw e;
      wifiLost(); last = 0;
      blob = await fetchWithProgress(fileURL(item.id), onP);
    }
    const cover = await coverP;
    if (cover) coverCache.set(item.id, URL.createObjectURL(cover));
    const meta = { id: item.id, titre: item.titre, artiste: item.artiste, bpm: item.bpm, duree: item.duree,
      type: item.type, ext: item.ext, source: item.source, categorie: item.categorie, ajoute: item.ajoute || Date.now() / 1000,
      taille: blob.size, garde: Date.now() };
    await DB.put(meta, blob, cover);
    S.offline.set(item.id, meta);
    if (S.excl[item.id]) markExcl([item.id], false);
    if (!quiet) toast('« ' + item.titre + ' » est sur ton iPhone ✓');
    return true;
  } catch (e) {
    if (!quiet) toast('Échec : ' + e.message);
    else SYNC.errors++;
    return false;
  } finally {
    S.saving.delete(item.id);
    laterRefresh();
  }
}
// Pendant les transferts : on regroupe les mises à jour de la liste (au plus ~1 par seconde).
let refreshTimer = 0;
function laterRefresh() {
  if (refreshTimer) return;
  refreshTimer = setTimeout(() => { refreshTimer = 0; refreshTrackRows(); }, 900);
}
function showProgress(id, p) {
  document.querySelectorAll(`[data-pct="${CSS.escape(id)}"]`).forEach((e) => { e.textContent = p + '%'; });
}
// Transfère plusieurs morceaux en parallèle (3 à la fois, chacun découpé en tranches : bien plus rapide).
// Un contrôle de connexion raté n'arrête plus tout : on n'abandonne que si un transfert échoue ET que le PC
// ne répond vraiment plus.
async function saveMany(list, onEach, keepGoing = () => true) {
  const queue = [...list];
  const worker = async () => {
    while (queue.length && keepGoing()) {
      const t = queue.shift();
      const ok = await saveOffline(t, true);
      if (onEach) onEach(t);
      if (!ok && S.online === false) break;
    }
  };
  await Promise.all([worker(), worker(), worker()]);
}
// Retire des morceaux de l'iPhone SEULEMENT : les fichiers du PC ne sont jamais touchés,
// et le PC ne les renverra plus à la synchronisation (sauf si tu les recoches sur le PC).
async function removeOffline(items, ask = true) {
  items = (Array.isArray(items) ? items : [items]).filter((t) => S.offline.has(t.id));
  if (!items.length) return;
  const only = items.filter((t) => { const m = S.offline.get(t.id); return phoneOnly().includes(m); });
  if (ask && only.length && !confirm(only.length === 1
    ? '« ' + only[0].titre + ' » n’existe que sur cet iPhone (pas encore envoyé sur le PC). Le supprimer définitivement ?'
    : only.length + ' morceau(x) n’existent que sur cet iPhone. Les supprimer définitivement ?')) return;
  const ids = [];
  for (const t of items) {
    const m = S.offline.get(t.id);
    await DB.remove(t.id);
    S.offline.delete(t.id);
    coverCache.delete(t.id);
    ids.push(t.id);
    if (m && m.pcId) ids.push(m.pcId);
  }
  markExcl(ids, true);
  refreshTrackRows();
  toast(items.length === 1 ? 'Retiré de l’iPhone (toujours sur ton PC)' : items.length + ' morceaux retirés de l’iPhone (toujours sur ton PC)');
  reportIphone();
  renderSyncBanner();
}
function markExcl(ids, excluded) {
  for (const id of ids) S.excl[id] = excluded;
  localStorage.setItem('kadans.excl', JSON.stringify(S.excl));
  flushExcl();
}
async function flushExcl() {
  const ids = Object.keys(S.excl);
  if (!ids.length || !S.online) return;
  const sent = { ...S.excl };
  try {
    await api('/api/sync/exclure', { method: 'POST', json: { exclure: ids.filter((i) => sent[i]), inclure: ids.filter((i) => !sent[i]) } });
    for (const i of ids) if (S.excl[i] === sent[i]) delete S.excl[i];
    localStorage.setItem('kadans.excl', JSON.stringify(S.excl));
  } catch (e) { /* PC injoignable : on réessaiera */ }
}

// ------------------------------------------------------------------ synchronisation avec le PC
// Le PC dit quels morceaux doivent être sur l'iPhone ; l'iPhone rapatrie ceux qui manquent.
const SYNC = { wanted: [], running: false, done: 0, total: 0, errors: 0 };
function syncPending() { return SYNC.wanted.filter((t) => !S.offline.has(t.id)); }
async function reportIphone() {
  if (!S.online) return;
  const ids = [...S.offline.keys()];
  for (const m of S.offline.values()) if (m.pcId) ids.push(m.pcId);
  try { await api('/api/sync/iphone', { method: 'POST', json: { ids } }); } catch (e) { /* plus tard */ }
}
async function refreshSync() {
  if (!S.online) { renderSyncBanner(); return; }
  try {
    await flushExcl();
    const d = await api('/api/sync');
    const ids = new Set(d.ids);
    SYNC.wanted = allTracks().filter((t) => ids.has(t.id) && S.excl[t.id] !== true);
    const lastAsk = +localStorage.getItem('kadans.syncDemande') || 0;
    const asked = d.demande > lastAsk;
    if (asked) localStorage.setItem('kadans.syncDemande', String(d.demande));
    reportIphone();
    if (!SYNC.running && syncPending().length && (S.syncAuto || asked)) runSync();
    if (S.sendAuto && !UP.running && phoneOnly().length) runUpload();
  } catch (e) { /* PC injoignable */ }
  renderSyncBanner();
}
async function runSync() {
  if (SYNC.running) return;
  const todo = syncPending();
  if (!todo.length) return;
  SYNC.running = true; SYNC.done = 0; SYNC.errors = 0; SYNC.total = todo.length;
  renderSyncBanner();
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist();
  // l'écran reste allumé pendant la synchro (sinon l'iPhone met l'app en pause et tout s'arrête)
  let wake = null;
  try { if (navigator.wakeLock) wake = await navigator.wakeLock.request('screen'); } catch (e) { /* pas disponible */ }
  await saveMany(todo, () => { SYNC.done++; renderSyncBanner(); }, () => SYNC.running);
  try { if (wake) await wake.release(); } catch (e) { /* déjà libéré */ }
  const ok = SYNC.done - SYNC.errors;
  SYNC.running = false;
  await reportIphone();
  renderSyncBanner();
  toast(SYNC.errors ? `${ok} morceau(x) rapatrié(s), ${SYNC.errors} en échec` : `Synchronisation terminée : ${ok} morceau(x) ✓`, 3500);
}
// ------------------------------------------------------------------ envoi vers le PC (ce qui n'existe que sur l'iPhone)
const UP = { running: false, done: 0, total: 0, errors: 0 };
const phoneOnly = () => [...S.offline.values()].filter((m) => (m.id.startsWith('mix-') || m.id.startsWith('imp-')) && !m.pcId);
async function uploadToPC(meta) {
  const blob = await DB.getFile(meta.id);
  if (!blob) throw new Error('fichier absent');
  const name = ((meta.artiste ? meta.artiste + ' - ' : '') + (meta.titre || 'morceau')).replace(/[\\/:*?"<>|]/g, '_') + '.' + (meta.ext || 'm4a');
  const q = new URLSearchParams({ id: meta.id, nom: name, titre: meta.titre || '' });
  const r = await fetch(`${base()}/api/envoyer?${q}`, { method: 'POST', headers: { 'x-kadans-cle': S.key, ...(LOCK.jeton ? { 'x-kadans-jeton': LOCK.jeton } : {}) }, body: blob });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d.erreur || 'erreur ' + r.status);
  meta.pcId = d.fichier_id;
  await DB.putMeta(meta);
}
async function runUpload() {
  if (UP.running || !S.online) return;
  const todo = phoneOnly();
  if (!todo.length) return;
  UP.running = true; UP.done = 0; UP.errors = 0; UP.total = todo.length;
  renderSyncBanner();
  for (const m of todo) {
    if (!S.online || !UP.running) break;
    try { await uploadToPC(m); } catch (e) { UP.errors++; console.warn(e); }
    UP.done++;
    renderSyncBanner();
  }
  UP.running = false;
  const ok = UP.done - UP.errors;
  await refreshLibrary();
  await reportIphone();
  renderSyncBanner(); refreshTrackRows();
  if (ok) toast(`${ok} fichier(s) envoyé(s) sur ton PC ✓`, 3000);
  else if (UP.errors) toast('Envoi vers le PC impossible pour l’instant, nouvel essai plus tard.', 3000);
}
function importFiles() {
  const inp = h('input', { type: 'file', multiple: true, accept: 'audio/*,video/mp4,.mp3,.m4a,.wav,.flac,.aac,.mp4', style: 'display:none' });
  inp.onchange = async () => {
    const files = [...inp.files];
    let n = 0;
    for (const f of files) {
      const dot = f.name.lastIndexOf('.');
      const ext = dot > 0 ? f.name.slice(dot + 1).toLowerCase() : 'm4a';
      let titre = dot > 0 ? f.name.slice(0, dot) : f.name, artiste = '';
      if (titre.includes(' - ')) { [artiste, titre] = titre.split(' - ', 2).map((x) => x.trim()); }
      const meta = { id: 'imp-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7), titre, artiste, bpm: null, duree: 0,
        type: (f.type || '').startsWith('video') || ext === 'mp4' ? 'video' : 'audio', ext, source: 'Importés', ajoute: Date.now() / 1000, taille: f.size };
      try { await DB.put(meta, f, null); S.offline.set(meta.id, meta); n++; } catch (e) { toast('Import impossible : ' + e.message); }
    }
    inp.remove();
    if (n) {
      toast(`${n} fichier(s) importé(s) ✓` + (S.online && S.sendAuto ? ' Envoi vers le PC…' : ''), 2500);
      refreshTrackRows();
      if (S.online && S.sendAuto) runUpload();
    }
  };
  document.body.append(inp);
  inp.click();
}

function renderSyncBanner() {
  document.querySelectorAll('#syncbar').forEach((box) => {
    box.replaceChildren();
    const pend = syncPending().length;
    if (UP.running) {
      const pct = Math.round(UP.done * 100 / Math.max(1, UP.total));
      box.append(h('div', { class: 'job', style: 'margin-top:18px' },
        h('span', { class: 'cover sm', style: 'background:#2E3A4A' }, h('span', { class: 'ico', style: 'transform:rotate(180deg)', html: iconHTML('download', 18) })),
        h('div', { class: 'meta' },
          h('div', { class: 'row' }, h('span', { class: 't1' }, 'Envoi vers le PC'), h('span', { style: 'color:var(--muted)' }, `${UP.done} / ${UP.total}`)),
          h('div', { class: 'progress' }, h('div', { style: `width:${pct}%;background:var(--deckb)` })),
          h('span', { class: 't2' }, 'Garde l’app ouverte jusqu’à la fin.'))));
    }
    if (SYNC.running) {
      const pct = Math.round(SYNC.done * 100 / Math.max(1, SYNC.total));
      box.append(h('div', { class: 'job', style: 'margin-top:18px' },
        h('span', { class: 'cover sm', style: 'background:#2E4A42' }, ico('refresh', 18)),
        h('div', { class: 'meta' },
          h('div', { class: 'row' }, h('span', { class: 't1' }, 'Synchronisation avec le PC'), h('span', { style: 'color:var(--muted)' }, `${SYNC.done} / ${SYNC.total}`)),
          h('div', { class: 'progress' }, h('div', { style: `width:${pct}%` })),
          h('span', { class: 't2' }, 'Garde l’app ouverte jusqu’à la fin.')),
        h('button', { class: 'btn small ghost', type: 'button', onclick: () => { SYNC.running = false; } }, 'Arrêter')));
    } else if (pend && S.online) {
      box.append(h('div', { class: 'job', style: 'margin-top:18px' },
        h('span', { class: 'cover sm', style: 'background:#3A2A1E;color:#FFC19E' }, ico('download', 18)),
        h('div', { class: 'meta' },
          h('span', { class: 't1' }, `${pend} à rapatrier`),
          h('span', { class: 't2' }, 'Cochés sur ton PC')),
        h('button', { class: 'btn small', type: 'button', style: 'background:var(--accent);color:#0E0F12', onclick: runSync }, 'Rapatrier')));
    }
  });
}

// liste fusionnée : bibliothèque du PC + morceaux gardés sur l'iPhone
function allTracks() {
  const map = new Map();
  const sent = new Map();   // id PC -> morceau venu de l'iPhone
  for (const m of S.offline.values()) if (m.pcId) sent.set(m.pcId, m);
  for (const t of S.lib) {
    if (sent.has(t.id)) {   // fichier envoyé par l'iPhone : on garde la version iPhone, enrichie par le PC
      const m = sent.get(t.id);
      if (!m.bpm && t.bpm) m.bpm = t.bpm;
      if (!m.duree && t.duree) m.duree = t.duree;
      continue;
    }
    map.set(t.id, { ...t });
  }
  for (const [id, m] of S.offline) {
    const base = map.get(id) || { ...m };
    if (!base.bpm && m.bpm) base.bpm = m.bpm;
    map.set(id, base);
  }
  return [...map.values()].sort((a, b) => (b.ajoute || 0) - (a.ajoute || 0));
}
// morceau jouable maintenant ?
const playable = (t) => S.offline.has(t.id) || S.online;

// ------------------------------------------------------------------ pochettes
function coverEl(t, cls = '') {
  const el = h('span', { class: 'cover ' + cls, style: 'position:relative;background:' + colorFor(t.id) },
    (t.titre || '?').trim().charAt(0).toUpperCase());
  const add = (src) => {
    const img = h('img', { src, alt: '', style: 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover' });
    img.onerror = () => { img.remove(); if (!LOCK.waiting) noCover.add(t.id); };   // ne plus la redemander au PC (sauf si le code est demandé)
    el.append(img);
  };
  if (coverCache.has(t.id)) { const u = coverCache.get(t.id); if (u) add(u); }
  else if (S.offline.has(t.id)) {
    DB.getCover(t.id).then((b) => {
      const u = b ? URL.createObjectURL(b) : null;
      coverCache.set(t.id, u);
      if (u) add(u);
    }).catch(() => {});
  } else if (S.online && t.type === 'audio' && !noCover.has(t.id)) add(coverURL(t.id));
  return el;
}
const noCover = new Set();   // morceaux sans pochette sur le PC

// ------------------------------------------------------------------ navigation
function setTab(tab) {
  S.tab = tab;
  mixOrientation();
  document.querySelectorAll('.tabs button').forEach((b) => {
    if (b.dataset.tab === tab) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
  });
  render();
  $('#view').scrollTop = 0;
}
// ---- Mix : les deux platines côte à côte, en paysage comme téléphone tenu droit (version étroite)
const LAND = matchMedia('(orientation: landscape)');
function mixOrientation() {
  const mix = S.tab === 'mix';
  document.body.classList.toggle('mix-land', mix);
  // téléphone tenu droit : pas de rotation, les deux platines restent côte à côte en version étroite
  document.body.classList.toggle('mix-tall', mix && !LAND.matches);
}
LAND.addEventListener ? LAND.addEventListener('change', mixOrientation) : LAND.addListener(mixOrientation);
// position horizontale (0 à 1) d'un doigt sur un élément
function along(e, el) {
  const r = el.getBoundingClientRect();
  return (e.clientX - r.left) / r.width;
}
function render() {
  const v = $('#view');
  v.innerHTML = '';
  const views = { ajouter: viewAdd, biblio: viewLibrary, mix: () => MIX.view(), reglages: viewSettings };
  try {
    v.append((views[S.tab] || viewAdd)());
    if (S.tab === 'biblio') renderList();
    if (S.tab === 'ajouter') renderJobs();
    renderSyncBanner();
    if (S.tab === 'mix') MIX.mount();
  } catch (e) {
    // jamais d'écran noir : on montre l'erreur et un moyen de repartir
    console.error(e);
    v.replaceChildren(h('div', { class: 'card', style: 'margin-top:40px;border-color:#4A2A2E' },
      h('b', null, 'Oups, cet écran a planté'),
      h('p', { class: 'sub', style: 'margin:0;word-break:break-word' }, 'Erreur : ' + ((e && e.message) || e) + (e && e.stack ? ' — ' + String(e.stack).split('\n')[0] : '')),
      h('button', { class: 'btn primary', type: 'button', onclick: () => {
        // n'efface que l'affichage mémorisé (liste, dossier ouvert) : la musique gardée sur l'iPhone reste
        ['kadans.lib', 'kadans.dossier', 'kadans.cats'].forEach((k) => localStorage.removeItem(k));
        location.reload();
      } }, 'Réparer l’affichage')));
  }
}
window.addEventListener('error', (e) => toast('Erreur : ' + (e.message || 'inconnue'), 6000));
window.addEventListener('unhandledrejection', (e) => {
  const r = e.reason;
  if (r && ['AbortError', 'NotAllowedError'].includes(r.name)) return;   // lecture refusée, requête annulée : normal
  toast('Erreur : ' + ((r && r.message) || r || 'inconnue'), 6000);
});
function statusPill() {
  let cls = 'dot', txt = 'PC non relié';
  if (S.server) {
    if (S.online === true) { cls += ' ok'; txt = WIFI.base ? 'PC · Wi-Fi' : 'PC connecté'; }
    else if (S.online === false) { cls += ' ko'; txt = S.keyRefused ? 'Rescanne le QR du PC' : 'Hors ligne'; }
    else txt = 'Connexion…';
  }
  return h('button', { class: 'pill', id: 'pill', type: 'button', onclick: () => setTab('reglages') },
    h('span', { class: cls }), txt);
}
function updatePill() {
  const p = $('#pill');
  if (p) p.replaceWith(statusPill());
}

// ------------------------------------------------------------------ vue : Ajouter
// petits éléments communs aux pages Ajouter et Réglages (style « liste groupée »)
function uiRow({ icon, tint, title, sub, right, onclick, danger, chevron }) {
  const inner = [
    icon ? h('span', { class: 'ui-ic', style: tint ? '--tint:' + tint : '', html: iconHTML(icon, 18) }) : null,
    h('span', { class: 'ui-txt' }, h('span', { class: 'ui-t1' }, title), sub ? h('span', { class: 'ui-t2' }, sub) : null),
    right != null ? (typeof right === 'string' ? h('span', { class: 'ui-val' }, right) : right) : null,
    chevron ? h('span', { class: 'ui-chev', html: iconHTML('chev', 16) }) : null,
  ];
  return onclick
    ? h('button', { class: 'ui-row' + (danger ? ' danger' : ''), type: 'button', onclick }, ...inner)
    : h('div', { class: 'ui-row' + (danger ? ' danger' : '') }, ...inner);
}
function uiToggle(checked, onchange, label) {
  const cb = h('input', { type: 'checkbox', role: 'switch', 'aria-label': label });
  cb.checked = checked;
  cb.onchange = () => onchange(cb.checked);
  return h('label', { class: 'ui-switch' }, cb, h('span', { class: 'ui-knob' }));
}
function uiGroup(label, rows, note) {
  return h('section', { class: 'ui-sec' },
    label ? h('h2', { class: 'ui-h' }, label) : null,
    h('div', { class: 'ui-group' }, rows.filter(Boolean)),
    note ? h('p', { class: 'ui-note' }, note) : null);
}
const LOGO_SVG = (s, c = '#0E0F12') => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M4 10v4M8 6v12M12 9v6M16 4v16M20 10v4"/></svg>`;

function viewAdd() {
  const wrap = h('div', { class: 'pg' });
  wrap.append(h('header', { class: 'pg-top' },
    h('div', { class: 'brand' }, h('span', { class: 'logo', html: LOGO_SVG(16) }), h('b', null, 'Kadans')),
    statusPill()));
  wrap.append(h('div', { class: 'pg-hero' },
    h('h1', null, 'Ajouter de la musique'),
    h('p', null, 'Colle un lien YouTube : ton PC le télécharge, l’analyse et le range.')));

  if (!S.server) {
    const step = (n, t1, t2) => h('li', null, h('span', { class: 'pg-num' }, String(n)), h('span', null, h('b', null, t1), h('span', null, t2)));
    wrap.append(h('div', { class: 'pg-card pg-onboard' },
      h('span', { class: 'pg-badge', html: iconHTML('pc', 22) }),
      h('h2', null, 'Relie ton PC'),
      h('p', { class: 'pg-muted' }, 'Kadans télécharge sur ton PC puis envoie la musique sur l’iPhone.'),
      h('ol', { class: 'pg-steps' },
        step(1, 'Lance Kadans sur le PC', 'Double-clic sur « Kadans ».'),
        step(2, 'Un QR code s’affiche', 'Dans la fenêtre Kadans.'),
        step(3, 'Scanne-le avec l’iPhone', 'Avec le bouton ci-dessous.')),
      h('button', { class: 'pg-btn primary', type: 'button', onclick: scanQR }, ico('qr', 18), 'Scanner le QR du PC'),
      h('button', { class: 'pg-btn text', type: 'button', onclick: askLink }, 'J’ai plutôt un lien à coller')));
  } else {
    if (S.online === false) {
      wrap.append(h('div', { class: 'pg-alert' },
        h('span', { class: 'pg-alert-ic', html: iconHTML('off', 18) }),
        h('div', null, h('b', null, 'Ton PC ne répond pas'),
          h('span', null, 'Ta musique sur l’iPhone reste disponible. Allume le PC et lance Kadans pour télécharger.')),
        h('button', { class: 'pg-btn sm', type: 'button', onclick: scanQR }, 'Rescanner')));
    }
    const input = h('input', { id: 'lien', class: 'pg-input', type: 'url', inputmode: 'url', autocomplete: 'off',
      placeholder: 'https://youtube.com/watch?v=…', 'aria-label': 'Lien YouTube' });
    const paste = h('button', { class: 'pg-paste', type: 'button', onclick: async () => {
      try { input.value = (await navigator.clipboard.readText()).trim(); } catch (e) { input.focus(); toast('Appuie longuement dans le champ, puis « Coller ».'); }
    } }, ico('clip', 16), 'Coller');
    const seg = h('div', { class: 'pg-seg', role: 'group', 'aria-label': 'Format' });
    [['mp3', 'MP3'], ['wav', 'WAV'], ['mp4', 'Clip vidéo']].forEach(([val, label]) => {
      seg.append(h('button', { type: 'button', 'aria-pressed': String(S.format === val), onclick: (e) => {
        S.format = val; localStorage.setItem('kadans.format', val);
        seg.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', 'false'));
        e.currentTarget.setAttribute('aria-pressed', 'true');
      } }, label));
    });
    const catChips = h('div', { class: 'pg-chips', role: 'group', 'aria-label': 'Catégorie' });
    const drawCatChips = () => {
      catChips.replaceChildren(...[['', 'Sans catégorie'], ...S.cats.map((c) => [c, c])].map(([val, label]) =>
        h('button', { class: 'pg-chip', type: 'button', 'aria-pressed': String(S.cat === val), onclick: () => {
          S.cat = val; localStorage.setItem('kadans.cat', val); drawCatChips();
        } }, label)),
      h('button', { class: 'pg-chip add', type: 'button', onclick: () => askCategory((nom) => {
        S.cat = nom; localStorage.setItem('kadans.cat', nom); drawCatChips();
      }) }, '+ Nouvelle'));
    };
    drawCatChips();
    const go = h('button', { class: 'pg-btn primary', type: 'button', onclick: async () => {
      const url = input.value.trim();
      if (!/^https?:\/\//.test(url)) { toast('Colle un lien qui commence par https://'); return; }
      go.disabled = true;
      try {
        const json = { url, format: S.format, categorie: S.cat };
        try { await api('/api/telecharger', { method: 'POST', json }); }
        catch (e) {
          if (e.status !== 409) throw e;   // déjà dans la bibliothèque : on demande avant de le reprendre
          const list = (e.data.doublons || []).map((d) => '• ' + [d.artiste, d.titre].filter(Boolean).join(' - ') + (d.meme_lien ? ' (même lien)' : '')).join('\n');
          if (!confirm('Déjà dans ta bibliothèque :\n' + list + '\n\nLe télécharger quand même ?')) { toast('Pas téléchargé : il y est déjà.'); go.disabled = false; return; }
          await api('/api/telecharger', { method: 'POST', json: { ...json, forcer: true } });
        }
        input.value = '';
        toast('C’est parti ! Ton PC télécharge' + (S.cat ? ' dans « ' + S.cat + ' »…' : '…'));
        await refreshJobs();
      } catch (e) { toast(e.message); }
      go.disabled = false;
    } }, ico('download', 18), 'Télécharger');
    wrap.append(h('div', { class: 'pg-card' },
      h('label', { class: 'pg-label', for: 'lien' }, 'Lien YouTube'),
      h('div', { class: 'pg-field' }, input, paste),
      h('span', { class: 'pg-label' }, 'Format'), seg,
      h('span', { class: 'pg-label' }, 'Ranger dans'), catChips,
      h('div', { class: 'pg-inline' },
        h('span', null, h('b', null, 'Garder sur l’iPhone'), h('span', null, 'Écoute sans internet dès que c’est prêt')),
        uiToggle(S.autoOffline, (v) => { S.autoOffline = v; localStorage.setItem('kadans.auto', v ? '1' : '0'); }, 'Garder sur l’iPhone automatiquement')),
      go));
  }
  wrap.append(uiGroup(null, [
    uiRow({ icon: 'phone', tint: '#7C9CFF', title: 'Importer depuis l’iPhone', sub: 'Fichiers audio de l’app Fichiers', onclick: importFiles, chevron: true }),
  ]));
  wrap.append(h('div', { id: 'syncbar' }));
  wrap.append(h('div', { class: 'pg-jobs', id: 'jobs' }));
  const recents = allTracks().slice(0, 5);
  if (recents.length) {
    wrap.append(h('section', { class: 'ui-sec' },
      h('div', { class: 'pg-sechead' }, h('h2', { class: 'ui-h' }, 'Récents'),
        h('button', { class: 'pg-link', type: 'button', onclick: () => setTab('biblio') }, 'Tout voir')),
      h('div', { class: 'list-recents' }, recents.map((t) => trackRow(t, recents)))));
  }
  return wrap;
}
const JOB_TXT = { en_attente: 'En attente', recherche: 'Recherche du morceau…', telechargement: 'Téléchargement', conversion: 'Conversion + calcul du BPM', termine: 'Terminé', erreur: 'Erreur' };
function renderJobs() {
  const box = $('#jobs');
  if (!box) return;
  box.innerHTML = '';
  const recent = S.jobs.filter((j) => j.etat !== 'termine' || (Date.now() / 1000 - j.cree) < 120).slice(0, 4);
  if (!recent.length) return;
  box.append(h('span', { class: 'label' }, 'En cours'));
  for (const j of recent) {
    const pct = j.etat === 'termine' ? 100 : j.progression || 0;
    box.append(h('div', { class: 'job' },
      h('span', { class: 'cover sm', style: 'background:#2B3A4A' }, ico(j.format === 'mp4' ? 'video' : 'music', 18)),
      h('div', { class: 'meta' },
        h('div', { class: 'row' }, h('span', { class: 't1' }, j.titre || 'Nouveau morceau'),
          h('span', { style: 'color:var(--muted)' }, j.etat === 'erreur' ? '' : pct + ' %')),
        j.etat === 'erreur' ? null : h('div', { class: 'progress' }, h('div', { style: `width:${pct}%` })),
        h('span', { class: 't2' + (j.etat === 'erreur' ? ' err' : '') },
          j.format.toUpperCase().replace('MP4', 'Clip') + ' · ' + (j.etat === 'erreur' ? j.message : JOB_TXT[j.etat] || j.etat)))));
  }
}
function askLink() {
  openSheet(() => {
    const inp = h('input', { class: 'input', type: 'url', placeholder: 'Colle ici le lien affiché sur le PC', 'aria-label': 'Lien du PC' });
    return h('div', { class: 'card', style: 'background:none;border:0;padding:0' },
      h('b', null, 'Relier un PC'),
      h('p', { class: 'sub', style: 'margin:0' }, 'Copie le lien affiché sous le QR code sur le PC, puis colle-le ici.'),
      inp,
      h('button', { class: 'btn primary', type: 'button', onclick: async () => {
        const cfg = parseLink(inp.value);
        if (!cfg) { toast('Ce lien ne vient pas de Kadans.'); return; }
        setServer(cfg.s, cfg.k); await relinked();
        closeSheet(); toast('PC relié ✓');
        await checkServer(); await refreshLibrary(); render();
      } }, 'Relier'));
  });
}

// ------------------------------------------------------------------ vue : Bibliothèque
function viewLibrary() {
  const wrap = h('div');
  const all = allTracks();
  wrap.append(h('div', { class: 'top', style: 'align-items:flex-end' },
    h('div', null, h('h1', null, 'Bibliothèque'),
      h('p', { class: 'sub', id: 'count' }, `${all.length} morceaux · ${S.offline.size} sur l’iPhone`)),
    statusPill()));
  const q = h('input', { class: 'input', type: 'search', placeholder: 'Titre, artiste ou BPM…', 'aria-label': 'Rechercher', value: S.query });
  q.oninput = () => { S.query = q.value; renderList(); };
  wrap.append(h('div', { class: 'search' }, h('span', { html: iconHTML('search', 18), style: 'color:#A3A3AD' }), q));

  const sources = [...new Set(S.lib.map((t) => t.source).filter(Boolean))];
  const chips = h('div', { class: 'chips' });
  const mk = (val, label) => h('button', { class: 'chip', type: 'button', 'aria-pressed': String(S.filter === val), onclick: (e) => {
    S.filter = val; chips.querySelectorAll('.chip:not(.accent)').forEach((c) => c.setAttribute('aria-pressed', 'false'));
    e.currentTarget.setAttribute('aria-pressed', 'true');
    if (val === 'tout' && S.folder != null) openFolder(null);   // « Tout » = tous les morceaux du PC, quel que soit le dossier ouvert
    else renderList();
  } }, label);
  chips.append(mk('tout', 'Tout'), mk('iphone', 'Sur l’iPhone'), mk('clips', 'Clips'));
  sources.forEach((s) => chips.append(mk('src:' + s, s.replace('Téléchargements Kadans', 'Téléchargés'))));
  const bpmChip = h('button', { class: 'chip accent', type: 'button', 'aria-pressed': String(S.bpmOn), onclick: () => {
    S.bpmOn = !S.bpmOn; bpmChip.setAttribute('aria-pressed', String(S.bpmOn)); range.hidden = !S.bpmOn; renderList();
  } }, 'BPM');
  chips.append(bpmChip);
  wrap.append(h('div', { id: 'syncbar', style: 'margin-bottom:12px' }));
  wrap.append(chips);
  const mn = h('input', { class: 'input', type: 'number', inputmode: 'numeric', value: S.bpmMin, 'aria-label': 'BPM minimum' });
  const mx = h('input', { class: 'input', type: 'number', inputmode: 'numeric', value: S.bpmMax, 'aria-label': 'BPM maximum' });
  mn.oninput = () => { S.bpmMin = +mn.value || 0; renderList(); };
  mx.oninput = () => { S.bpmMax = +mx.value || 999; renderList(); };
  const range = h('div', { class: 'bpm-range' }, 'BPM entre', mn, 'et', mx);
  range.hidden = !S.bpmOn;
  wrap.append(range, h('div', { id: 'folders' }), h('div', { id: 'list' }));
  return wrap;
}

// ------------------------------------------------------------------ dossiers et sous-dossiers (comme sur le PC)
const parentOf = (c) => (c.includes('/') ? c.slice(0, c.lastIndexOf('/')) : null);
const inFolder = (t, f) => (f === '' ? t.categorie === '' : t.categorie === f || (t.categorie || '').startsWith(f + '/'));
function allFolders(tracks) {
  const set = new Set(S.cats);
  for (const t of tracks) {   // aussi ceux connus seulement par les morceaux gardés (PC éteint)
    let c = t.categorie;
    while (c) { set.add(c); c = parentOf(c); }
  }
  return [...set].sort((a, b) => a.split('/').map((s) => s.toLowerCase()).join('\u0000').localeCompare(b.split('/').map((s) => s.toLowerCase()).join('\u0000'), 'fr'));
}
function openFolder(f) {
  S.folder = f;
  if (f == null) localStorage.removeItem('kadans.dossier'); else localStorage.setItem('kadans.dossier', f);
  renderList();
  $('#view').scrollTop = 0;
}
function renderFolders() {
  const box = $('#folders');
  if (!box) return;
  const all = allTracks(), F = S.folder;
  const folders = allFolders(all);
  if (F && !folders.includes(F)) { S.folder = null; localStorage.removeItem('kadans.dossier'); return renderFolders(); }
  box.replaceChildren();
  if (!folders.length && !all.some((t) => t.categorie === '')) return;
  // fil d'Ariane : Tous › Zouk › Années 80
  const crumb = (f, label) => h('button', { type: 'button', 'aria-current': F === f ? 'page' : null, 'data-folder': f == null ? null : f, onclick: () => openFolder(f) }, label);
  const crumbs = h('div', { class: 'crumbs' }, crumb(null, 'Tous les dossiers'));
  if (F === '') crumbs.append(h('span', { class: 'sep' }, '›'), crumb('', 'Sans catégorie'));
  else if (F) F.split('/').forEach((seg, i, arr) => crumbs.append(h('span', { class: 'sep' }, '›'), crumb(arr.slice(0, i + 1).join('/'), seg)));
  box.append(crumbs);
  // sous-dossiers du dossier ouvert
  const subs = F === '' ? [] : folders.filter((c) => parentOf(c) === (F || null));
  const tile = (f, label) => {
    const inside = all.filter((t) => inFolder(t, f));
    const kept = inside.filter((t) => S.offline.has(t.id)).length;
    return h('button', { class: 'ftile', type: 'button', 'data-folder': f, onclick: () => openFolder(f) },
      h('span', { class: 'ico', html: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>' }),
      h('span', { class: 'm' }, h('span', { class: 't1' }, label),
        h('span', { class: 't2' }, inside.length + ' morceau' + (inside.length > 1 ? 'x' : '') + (kept ? ' · ' + kept + ' sur l’iPhone' : ''))));
  };
  const tiles = subs.map((c) => tile(c, c.split('/').pop()));
  if (F == null && all.some((t) => t.categorie === '')) tiles.push(tile('', 'Sans catégorie'));
  if (tiles.length) box.append(h('div', { class: 'ftiles' }, tiles));
  // actions sur le dossier ouvert : tout garder / tout retirer de l'iPhone
  if (F != null) {
    const inside = all.filter((t) => inFolder(t, F));
    const missing = inside.filter((t) => !S.offline.has(t.id)), kept = inside.filter((t) => S.offline.has(t.id));
    const acts = h('div', { class: 'factions' });
    if (missing.length && S.online) acts.append(h('button', { class: 'btn small', type: 'button', onclick: async () => {
      toast(`${missing.length} morceau(x) en cours d’enregistrement…`);
      await saveMany(missing);
      toast('Dossier gardé sur l’iPhone ✓'); reportIphone();
    } }, ico('download', 18), `Tout garder sur l’iPhone (${missing.length})`));
    if (kept.length) acts.append(h('button', { class: 'btn small ghost', type: 'button', onclick: () => {
      if (confirm(`Retirer les ${kept.length} morceau(x) de ce dossier de l’iPhone ?\nIls restent sur ton PC.`)) removeOffline(kept, true);
    } }, ico('trash', 18), `Retirer de l’iPhone (${kept.length})`));
    if (acts.children.length) box.append(acts);
  }
}
function filteredTracks() {
  const q = S.query.trim().toLowerCase();
  return allTracks().filter((t) => {
    if (S.filter === 'iphone' && !S.offline.has(t.id)) return false;
    if (S.filter === 'clips' && t.type !== 'video') return false;
    if (S.filter.startsWith('src:') && t.source !== S.filter.slice(4)) return false;
    if (S.folder != null && !inFolder(t, S.folder)) return false;
    if (S.bpmOn && !(t.bpm >= S.bpmMin && t.bpm <= S.bpmMax)) return false;
    if (q) {
      if (/^\d{2,3}$/.test(q)) return t.bpm && Math.abs(t.bpm - +q) <= 3;
      return ((t.titre || '') + ' ' + (t.artiste || '') + ' ' + (t.categorie || '')).toLowerCase().includes(q);
    }
    return true;
  });
}
function renderList() {
  const box = $('#list');
  if (!box) return;
  renderFolders();
  const list = filteredTracks();
  box.innerHTML = '';
  if (!list.length) {
    box.append(h('div', { class: 'empty' }, S.lib.length || S.offline.size
      ? (S.folder != null ? 'Aucun morceau dans ce dossier.' : 'Aucun morceau ne correspond.')
      : (S.online ? 'Ta bibliothèque est vide. Ajoute un lien ou un dossier sur le PC.' : 'Rien sur l’iPhone pour l’instant. Relie ton PC pour commencer.')));
    return;
  }
  const max = 400;
  list.slice(0, max).forEach((t) => box.append(trackRow(t, list)));
  if (list.length > max) box.append(h('div', { class: 'empty' }, `+ ${list.length - max} autres : affine ta recherche.`));
}
function refreshTrackRows() {
  if (DRAG.on) return;   // pas de redessin pendant qu'un morceau est en train d'être glissé
  try { refreshRows(); } catch (e) { render(); }   // render() affiche l'erreur au lieu d'un écran vide
}
function refreshRows() {
  if (S.tab === 'biblio') { renderList(); const c = $('#count'); if (c) c.textContent = `${allTracks().length} morceaux · ${S.offline.size} sur l’iPhone`; }
  else if (S.tab === 'ajouter') { const r = $('.list-recents'); if (r) { const rec = allTracks().slice(0, 5); r.replaceChildren(...rec.map((t) => trackRow(t, rec))); } }
}
function trackRow(t, list) {
  const isCur = S.current && S.current.id === t.id;
  let state;
  if (S.saving.has(t.id)) state = h('span', { class: 'bpm wait', style: 'min-width:46px', 'data-pct': t.id }, S.saving.get(t.id) + '%');
  else if (S.offline.has(t.id)) state = h('span', { class: 'icon-btn state-ok', title: 'Sur l’iPhone', html: iconHTML('check', 20), role: 'img', 'aria-label': 'Sur l’iPhone' });
  else state = h('button', { class: 'icon-btn state-dl', type: 'button', 'aria-label': 'Garder sur l’iPhone', html: iconHTML('download', 20),
    onclick: (e) => { e.stopPropagation(); saveOffline(t); } });
  const on = decksOf(t);
  const row = h('div', { class: 'track' + (isCur ? ' playing' : '') + on.map((l) => ' on-' + l.toLowerCase()).join('') },
    h('button', { type: 'button', style: 'display:flex;align-items:center;gap:12px;flex:1;min-width:0;background:none;border:0;padding:0;text-align:left',
      'aria-label': 'Lire ' + t.titre, onclick: () => playTrack(t, list) },
      coverEl(t),
      h('span', { class: 'meta' },
        h('span', { class: 't1' }, on.map((l) => h('span', { class: 'deckbadge ' + l.toLowerCase(), 'aria-label': 'Sur la platine ' + l }, l)), t.titre),
        h('span', { class: 't2' }, [t.type === 'video' ? 'Clip vidéo' : null, t.artiste, t.duree ? fmtTime(t.duree) : null].filter(Boolean).join(' · ') || t.source || ''))),
    h('span', { class: 'bpm' + (t.bpm ? '' : ' wait') }, t.bpm ? t.bpm : '…'),
    state,
    h('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Options', html: iconHTML('more', 20), onclick: () => trackMenu(t) }));
  if (S.online && t.categorie != null && S.lib.some((x) => x.id === t.id)) longPressDrag(row, t);
  return row;
}
// ------------------------------------------------------------------ ranger un morceau : appui long, puis glisser sur un dossier
const DRAG = { on: false };
function longPressDrag(row, t) {
  let timer = 0, x0 = 0, y0 = 0, ghost = null, over = null, raf = 0, lastY = 0;
  const view = () => $('#view');
  const setOver = (el) => {
    if (over === el) return;
    if (over) over.classList.remove('drop-over');
    over = el; if (over) over.classList.add('drop-over');
  };
  const autoScroll = () => {   // près du haut ou du bas de l'écran : la liste défile toute seule
    const v = view(); if (!v || !DRAG.on) return;
    const top = v.getBoundingClientRect().top, bottom = v.getBoundingClientRect().bottom;
    if (lastY < top + 90) v.scrollTop -= 12; else if (lastY > bottom - 70) v.scrollTop += 12;
    raf = requestAnimationFrame(autoScroll);
  };
  const begin = () => {
    DRAG.on = true;
    ghost = h('div', { class: 'drag-ghost' }, '♪ ' + (t.titre || '?'));
    document.body.append(ghost);
    row.classList.add('dragging'); document.body.classList.add('drag-on');
    place(x0, y0);
    raf = requestAnimationFrame(autoScroll);
    toast('Glisse sur un dossier, puis lâche', 1800);
  };
  const place = (x, y) => {
    lastY = y;
    ghost.style.transform = `translate(${x - 20}px, ${y - 54}px)`;
    const el = document.elementFromPoint(x, y);
    setOver(el && el.closest('[data-folder]'));
  };
  const end = async (drop) => {
    clearTimeout(timer);
    if (!DRAG.on) return;
    DRAG.on = false; cancelAnimationFrame(raf);
    const target = over; setOver(null);
    if (ghost) ghost.remove(); ghost = null;
    row.classList.remove('dragging'); document.body.classList.remove('drag-on');
    // le relâchement ne doit pas lancer la lecture du morceau
    const stop = (e) => { e.stopPropagation(); e.preventDefault(); };
    row.addEventListener('click', stop, { capture: true, once: true }); setTimeout(() => row.removeEventListener('click', stop, { capture: true }), 400);
    if (!drop || !target) { refreshTrackRows(); return; }
    const cat = target.getAttribute('data-folder');
    if (cat === t.categorie) { toast('Il est déjà dans ce dossier'); refreshTrackRows(); return; }
    try {
      await api('/api/ranger', { method: 'POST', json: { ids: [t.id], categorie: cat } });
      const m = S.offline.get(t.id); if (m) { m.categorie = cat; DB.putMeta(m); }
      await refreshLibrary(); refreshTrackRows();
      toast('Rangé dans « ' + (cat ? cat.split('/').pop() : 'Sans catégorie') + ' » ✓');
    } catch (e) { toast(e.message); refreshTrackRows(); }
  };
  row.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
    clearTimeout(timer); timer = setTimeout(begin, 450);
  }, { passive: true });
  row.addEventListener('touchmove', (e) => {
    const p = e.touches[0];
    if (!DRAG.on) { if (Math.hypot(p.clientX - x0, p.clientY - y0) > 10) clearTimeout(timer); return; }   // on fait défiler : pas de glisser
    e.preventDefault();
    place(p.clientX, p.clientY);
  }, { passive: false });
  row.addEventListener('touchend', () => end(true));
  row.addEventListener('touchcancel', () => end(false));
  row.addEventListener('contextmenu', (e) => { if (DRAG.on || timer) e.preventDefault(); });
}

// Sur quelles platines du Mix est ce morceau ? ['A'], ['B'], ['A','B'] ou []
function decksOf(t) {
  try { return ['A', 'B'].filter((l) => MIX.decks[l].track && MIX.decks[l].track.id === t.id); }
  catch (e) { return []; }   // Mix pas encore prêt (démarrage)
}
function trackMenu(t) {
  const on = decksOf(t);
  openSheet(() => h('div', null,
    h('div', { style: 'display:flex;gap:12px;align-items:center;margin-bottom:8px' }, coverEl(t),
      h('div', { class: 'meta', style: 'min-width:0' }, h('div', { class: 't1' }, t.titre), h('div', { class: 't2' }, [t.artiste, t.bpm ? t.bpm + ' BPM' : null].filter(Boolean).join(' · ')))),
    h('button', { class: 'menu-item', type: 'button', onclick: () => { closeSheet(); playTrack(t, [t]); } }, ico('play', 20), 'Lire'),
    t.type === 'audio' ? h('button', { class: 'menu-item', type: 'button', onclick: () => { closeSheet(); MIX.load('A', t); setTab('mix'); } },
      h('span', { class: 'badge', style: 'width:24px;height:24px;font-size:12px;border-radius:7px;background:var(--accent)' }, 'A'), on.includes('A') ? 'Sur la platine A ✓ (recharger)' : 'Charger sur la platine A') : null,
    t.type === 'audio' ? h('button', { class: 'menu-item', type: 'button', onclick: () => { closeSheet(); MIX.load('B', t); setTab('mix'); } },
      h('span', { class: 'badge', style: 'width:24px;height:24px;font-size:12px;border-radius:7px;background:var(--deckb)' }, 'B'), on.includes('B') ? 'Sur la platine B ✓ (recharger)' : 'Charger sur la platine B') : null,
    S.online && t.categorie != null ? h('button', { class: 'menu-item', type: 'button', onclick: () => moveMenu(t) },
      ico('music', 20), 'Ranger dans une catégorie' + (t.categorie ? ' (' + t.categorie + ')' : '')) : null,
    S.online && S.lib.some((x) => x.id === t.id) ? h('button', { class: 'menu-item', type: 'button', onclick: () => renameMenu(t) },
      h('span', { class: 'ico', html: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M14 6l4 4"/></svg>' }), 'Renommer') : null,
    S.offline.has(t.id)
      ? h('button', { class: 'menu-item red', type: 'button', onclick: () => { closeSheet(); removeOffline(t); } }, ico('trash', 20), 'Retirer de l’iPhone (reste sur le PC)')
      : h('button', { class: 'menu-item', type: 'button', onclick: () => { closeSheet(); saveOffline(t); } }, ico('phone', 20), 'Garder sur l’iPhone (hors ligne)')));
}

// ------------------------------------------------------------------ lecteur
const player = $('#player');
let playerURL = null;
async function sourceFor(t) {
  if (S.offline.has(t.id)) {
    const blob = await DB.getFile(t.id);
    if (blob) return URL.createObjectURL(blob);
  }
  if (S.online) return fileURL(t.id);
  throw new Error('Pas sur l’iPhone et PC injoignable.');
}
async function playTrack(t, list) {
  if (!playable(t)) { toast('Ce morceau n’est pas sur l’iPhone et ton PC est injoignable.'); return; }
  S.queue = (list || [t]).filter((x) => x.type === 'audio' || x.id === t.id);
  S.index = S.queue.findIndex((x) => x.id === t.id);
  if (t.type === 'video') { openVideo(t); return; }
  S.current = t;
  try {
    const src = await sourceFor(t);
    if (playerURL && playerURL.startsWith('blob:')) URL.revokeObjectURL(playerURL);
    playerURL = src;
    player.src = src;
    await player.play();
  } catch (e) { toast(e.message); }
  MIX.pauseAll();
  updateMini(); refreshTrackRows(); mediaSession(t);
}
function playNext(dir = 1) {
  if (!S.queue.length) return;
  for (let i = 1; i <= S.queue.length; i++) {
    const n = (S.index + dir * i + S.queue.length) % S.queue.length;
    const t = S.queue[n];
    if (t.type === 'audio' && playable(t)) { playTrack(t, S.queue); return; }
  }
}
player.addEventListener('ended', () => playNext(1));
player.addEventListener('play', updateMini);
player.addEventListener('pause', updateMini);
player.addEventListener('timeupdate', () => {
  const bar = $('#mini-bar');
  if (bar && player.duration) bar.style.width = (player.currentTime * 100 / player.duration) + '%';
  if (fullUI.scrub && !fullUI.dragging && player.duration) {
    fullUI.scrub.max = player.duration; fullUI.scrub.value = player.currentTime;
    fullUI.cur.textContent = fmtTime(player.currentTime); fullUI.dur.textContent = fmtTime(player.duration);
  }
});
function updateMini() {
  const mini = $('#mini');
  if (!S.current) { mini.hidden = true; return; }
  mini.hidden = false;
  $('#mini-title').textContent = S.current.titre;
  $('#mini-artist').textContent = [S.current.artiste, S.current.bpm ? S.current.bpm + ' BPM' : null].filter(Boolean).join(' · ');
  $('#mini-cover').replaceWith(Object.assign(coverEl(S.current, 'sm'), { id: 'mini-cover' }));
  $('#mini-play').innerHTML = iconHTML(player.paused ? 'play' : 'pause', 22);
  if (fullUI.play) fullUI.play.innerHTML = iconHTML(player.paused ? 'play' : 'pause', 30);
}
$('#mini-play').onclick = () => { if (player.paused) { player.play(); MIX.pauseAll(); } else player.pause(); };
$('#mini-open').onclick = () => openFull();
$('#mini-close').innerHTML = iconHTML('close', 20);
$('#mini-close').onclick = () => stopPlayer();
// arrêter la lecture et faire disparaître le lecteur de l'écran
function stopPlayer() {
  player.pause();
  player.removeAttribute('src'); player.load();
  if (playerURL && playerURL.startsWith('blob:')) URL.revokeObjectURL(playerURL);
  playerURL = null;
  S.current = null; S.queue = []; S.index = -1;
  if (fullUI.play) closeSheet();
  try { if ('mediaSession' in navigator) navigator.mediaSession.metadata = null; } catch (e) { /* rien */ }
  updateMini(); refreshTrackRows();
}
function mediaSession(t) {
  if (!('mediaSession' in navigator)) return;
  navigator.mediaSession.metadata = new MediaMetadata({ title: t.titre, artist: t.artiste || 'Kadans', album: 'Kadans' });
  navigator.mediaSession.setActionHandler('nexttrack', () => playNext(1));
  navigator.mediaSession.setActionHandler('previoustrack', () => playNext(-1));
  navigator.mediaSession.setActionHandler('play', () => player.play());
  navigator.mediaSession.setActionHandler('pause', () => player.pause());
}
const fullUI = {};
function openFull() {
  const t = S.current;
  if (!t) return;
  openSheet(() => {
    fullUI.scrub = h('input', { class: 'scrub', type: 'range', min: 0, max: player.duration || 1, step: 0.1, value: player.currentTime, 'aria-label': 'Position' });
    fullUI.scrub.oninput = () => { fullUI.dragging = true; fullUI.cur.textContent = fmtTime(+fullUI.scrub.value); };
    fullUI.scrub.onchange = () => { player.currentTime = +fullUI.scrub.value; fullUI.dragging = false; };
    fullUI.cur = h('span', null, fmtTime(player.currentTime));
    fullUI.dur = h('span', null, fmtTime(player.duration));
    fullUI.play = h('button', { class: 'play-big', type: 'button', 'aria-label': 'Lecture / pause', html: iconHTML(player.paused ? 'play' : 'pause', 30),
      onclick: () => (player.paused ? player.play() : player.pause()) });
    return h('div', { class: 'full' },
      h('div', { class: 'full-top' },
        h('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Fermer (la musique continue)', html: iconHTML('down', 26), onclick: () => closeSheet() }),
        h('button', { class: 'btn small ghost', type: 'button', onclick: () => stopPlayer() }, h('span', { class: 'ico', html: iconHTML('stop', 16) }), 'Arrêter')),
      coverEl(t, 'lg'),
      h('div', { class: 'titles' }, h('div', { style: 'min-width:0' }, h('h2', null, t.titre), h('div', { class: 't2' }, t.artiste || '')),
        t.bpm ? h('div', { class: 'big-bpm' }, h('b', null, t.bpm), h('span', null, 'BPM')) : null),
      h('div', null, fullUI.scrub, h('div', { class: 'times' }, fullUI.cur, fullUI.dur)),
      h('div', { class: 'controls' },
        h('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Précédent', html: iconHTML('prev', 28), onclick: () => playNext(-1) }),
        fullUI.play,
        h('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Suivant', html: iconHTML('next', 28), onclick: () => playNext(1) })));
  }, () => { fullUI.scrub = fullUI.play = null; });
}
async function openVideo(t) {
  player.pause(); MIX.pauseAll();
  let src;
  try { src = await sourceFor(t); } catch (e) { toast(e.message); return; }
  openSheet(() => h('div', { class: 'full' },
    h('video', { src, controls: true, playsinline: true, autoplay: true }),
    h('div', { class: 'titles' }, h('div', null, h('h2', null, t.titre), h('div', { class: 't2' }, t.artiste || '')))),
  () => { if (src.startsWith('blob:')) URL.revokeObjectURL(src); });
}


// ------------------------------------------------------------------ scanner le QR code du PC (caméra)
function loadJsQR() {
  if (window.jsQR) return Promise.resolve();
  return new Promise((res, rej) => {
    const sc = document.createElement('script');
    sc.src = 'jsqr.js'; sc.onload = res; sc.onerror = () => rej(new Error('lecteur de QR indisponible'));
    document.head.append(sc);
  });
}
async function scanQR() {
  let stream = null, raf = 0, done = false;
  const video = h('video', { playsinline: true, muted: true, autoplay: true, style: 'width:100%;border-radius:20px;background:#000;aspect-ratio:1;object-fit:cover' });
  const canvas = document.createElement('canvas');
  const info = h('p', { class: 'sub', style: 'text-align:center;margin:0' }, 'Vise le QR code affiché sur l’écran du PC.');
  const stop = () => { done = true; cancelAnimationFrame(raf); if (stream) stream.getTracks().forEach((t) => t.stop()); };
  openSheet(() => h('div', { class: 'full' }, h('h2', { style: 'margin:0;font-size:20px' }, 'Scanner le QR du PC'), video, info,
    h('button', { class: 'btn ghost', type: 'button', onclick: () => { closeSheet(); askLink(); } }, 'Je préfère coller le lien')), stop);
  try {
    await loadJsQR();
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
    video.srcObject = stream;
    await video.play().catch(() => {});
  } catch (e) {
    info.textContent = 'Caméra indisponible (' + (e.message || e.name) + '). Autorise la caméra, ou colle le lien.';
    return;
  }
  const g = canvas.getContext('2d', { willReadFrequently: true });
  const scan = async () => {
    if (done) return;
    if (video.videoWidth) {
      const w = 480, hh = Math.round(480 * video.videoHeight / video.videoWidth);
      canvas.width = w; canvas.height = hh;
      g.drawImage(video, 0, 0, w, hh);
      const code = window.jsQR(g.getImageData(0, 0, w, hh).data, w, hh, { inversionAttempts: 'dontInvert' });
      if (code && code.data) {
        const cfg = parseLink(code.data);
        if (cfg) {
          stop(); closeSheet();
          setServer(cfg.s, cfg.k);
          await relinked();
          toast('PC relié ✓');
          await checkServer(); await refreshLibrary(); render();
          return;
        }
        info.textContent = 'Ce QR code ne vient pas de Kadans.';
      }
    }
    raf = requestAnimationFrame(scan);
  };
  scan();
}

// ------------------------------------------------------------------ feuille (panneau du bas)
let sheetOnClose = null;
function openSheet(build, onClose) {
  if (sheetOnClose) sheetOnClose();
  sheetOnClose = onClose || null;
  const body = $('#sheet-body');
  body.replaceChildren(build());
  $('#sheet').hidden = false;
}
function closeSheet() {
  $('#sheet').hidden = true;
  $('#sheet-body').replaceChildren();
  if (sheetOnClose) { sheetOnClose(); sheetOnClose = null; }
}
$('#sheet').addEventListener('click', (e) => { if (e.target.hasAttribute('data-close')) closeSheet(); });
// glisser la fenêtre vers le bas pour la fermer
(() => {
  const panel = $('#sheet .sheet-panel');
  let y0 = 0, dy = 0, t0 = 0, on = false;
  panel.addEventListener('touchstart', (e) => {
    on = false;
    if (e.touches.length !== 1 || panel.scrollTop > 0) return;
    if (e.target.closest('input[type=range], input, textarea, select, video, canvas')) return;   // curseurs, saisie… : pas de glisser
    y0 = e.touches[0].clientY; dy = 0; t0 = performance.now(); on = true;
    panel.style.transition = 'none';
  }, { passive: true });
  panel.addEventListener('touchmove', (e) => {
    if (!on) return;
    dy = e.touches[0].clientY - y0;
    if (dy <= 0 || panel.scrollTop > 0) { panel.style.transform = ''; if (dy < -6) on = false; return; }
    e.preventDefault();
    panel.style.transform = `translateY(${dy}px)`;
  }, { passive: false });
  const end = () => {
    if (!on) return;
    on = false;
    const fast = dy > 40 && dy / (performance.now() - t0) > 0.6;
    panel.style.transition = 'transform .2s ease';
    if (dy > Math.min(140, panel.offsetHeight * 0.3) || fast) {
      panel.style.transform = 'translateY(100%)';
      setTimeout(() => { closeSheet(); panel.style.transition = 'none'; panel.style.transform = ''; }, 200);
    } else panel.style.transform = '';
  };
  panel.addEventListener('touchend', end);
  panel.addEventListener('touchcancel', end);
})();

// ------------------------------------------------------------------ Mix : 2 platines
const MIX = {
  ctx: null, master: null, recDest: null, xf: 0.5, recorder: null, recChunks: [], autoTimer: null,
  decks: {
    A: { letter: 'A', color: 'var(--accent)', hex: '#FF7A45', el: null, node: null, gain: null, track: null, peaks: null, tempo: 0, cue: 0, url: null, angle: 0, bend: 0, held: false, coverImg: null },
    B: { letter: 'B', color: 'var(--deckb)', hex: '#7C9CFF', el: null, node: null, gain: null, track: null, peaks: null, tempo: 0, cue: 0, url: null, angle: 0, bend: 0, held: false, coverImg: null },
  },
  ui: {},
  ensure() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.connect(this.ctx.destination);
      if (this.ctx.createMediaStreamDestination) {
        this.recDest = this.ctx.createMediaStreamDestination();
        this.master.connect(this.recDest);
      }
      for (const d of Object.values(this.decks)) {
        d.el = new Audio();
        d.el.crossOrigin = 'anonymous';   // lecture en direct depuis le PC : le son peut passer dans la table de mixage
        d.el.playsInline = true;
        d.el.preservesPitch = true; d.el.webkitPreservesPitch = true;
        d.node = this.ctx.createMediaElementSource(d.el);
        d.gain = this.ctx.createGain();
        d.an = this.ctx.createAnalyser(); d.an.fftSize = 2048;
        d.node.connect(d.gain).connect(this.master);
        d.node.connect(d.an);
        d.el.addEventListener('playing', () => this.checkStream(d));
        d.el.addEventListener('play', () => this.updateButtons());
        d.el.addEventListener('pause', () => this.updateButtons());
      }
      this.applyXf();
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  },
  applyXf() {
    const x = this.xf;
    if (this.decks.A.gain) {
      this.decks.A.gain.gain.value = Math.cos(x * Math.PI / 2);
      this.decks.B.gain.gain.value = Math.sin(x * Math.PI / 2);
    }
    this.showVol();
  },
  // volume de chaque platine en % (selon le crossfader)
  vol(letter) { return Math.round(100 * (letter === 'A' ? Math.cos(this.xf * Math.PI / 2) : Math.sin(this.xf * Math.PI / 2))); },
  showVol() {
    for (const l of ['A', 'B']) {
      const v = this.vol(l);
      if (this.ui['vol' + l] && this.ui['vol' + l].isConnected) this.ui['vol' + l].textContent = 'Vol ' + v + ' %';
      if (this.ui['xvol' + l] && this.ui['xvol' + l].isConnected) this.ui['xvol' + l].textContent = l + ' ' + v + ' %';
    }
  },
  rate(d) { return 1 + d.tempo / 100; },
  effBpm(d) { return d.track && d.track.bpm ? (d.track.bpm * this.rate(d)).toFixed(1).replace('.0', '') : '—'; },
  async load(letter, t) {
    this.ensure();
    const d = this.decks[letter];
    if (!playable(t)) { toast('Ce morceau n’est pas sur l’iPhone et ton PC est injoignable.'); return; }
    try {
      const local = S.offline.has(t.id) ? await DB.getFile(t.id) : null;
      d.el.pause();
      if (d.url) URL.revokeObjectURL(d.url);
      d.url = null; d.stream = !local; d.blobP = null; d.heard = false;
      d.track = t; d.cue = 0; d.peaks = null; d.bend = 0;
      if (local) { d.url = URL.createObjectURL(local); d.el.src = d.url; }
      else {   // morceau resté sur le PC : lu en direct, jamais gardé sur le téléphone
        d.el.src = fileURL(t.id);
        toast('Platine ' + letter + ' : lecture en direct depuis le PC' + (WIFI.base ? ' (Wi-Fi)' : ''), 1800);
      }
      d.el.playbackRate = this.rate(d);
      // la pochette sur l'étiquette du disque (gardée sur l'iPhone, sinon celle du PC)
      d.coverImg = null;
      const coverSrc = coverCache.get(t.id) || (local ? await DB.getCover(t.id).then((b) => b && URL.createObjectURL(b)).catch(() => null) : null)
        || (S.online && !noCover.has(t.id) ? coverURL(t.id) : null);
      if (coverSrc) { d.coverImg = new Image(); d.coverImg.src = coverSrc; }
      if (S.tab === 'mix') this.mount();
      // forme d'onde en arrière-plan : le fichier est lu en mémoire puis oublié (rien n'est gardé)
      d.blobP = local ? Promise.resolve(local) : fetchWithProgress(fileURL(t.id), () => {});
      const blob = await d.blobP;
      if (d.track !== t) return;
      const buf = await this.ctx.decodeAudioData(await blob.arrayBuffer());
      if (d.track !== t) return;
      d.peaks = this.computePeaks(buf, 600);
      if (!d.track.duree) d.track.duree = buf.duration;
    } catch (e) { if (d.track === t && !d.stream) toast('Impossible de charger : ' + e.message); }
    if (S.tab === 'mix') this.mount();
  },
  // Sécurité : si le téléphone joue le flux du PC sans que le son passe dans la table de mixage
  // (certaines versions d'iOS), on bascule tout seul sur le fichier en mémoire, au même endroit.
  checkStream(d) {
    if (!d.stream || d.heard || d.checking) return;
    d.checking = true;
    const t = d.track, t0 = d.el.currentTime, buf = new Float32Array(1024);
    let n = 0;
    const iv = setInterval(async () => {
      if (d.track !== t || d.el.paused) { clearInterval(iv); d.checking = false; return; }
      d.an.getFloatTimeDomainData(buf);
      if (buf.some((v) => Math.abs(v) > 1e-4)) { d.heard = true; clearInterval(iv); d.checking = false; return; }
      if (++n < 15 || d.el.currentTime - t0 < 1.5) return;
      clearInterval(iv); d.checking = false;
      try {
        const blob = await (d.blobP || fetchWithProgress(fileURL(t.id), () => {}));
        if (d.track !== t) return;
        const pos = d.el.currentTime, playing = !d.el.paused;
        d.stream = false; d.url = URL.createObjectURL(blob); d.el.src = d.url; d.el.currentTime = pos;
        d.el.playbackRate = this.rate(d) * (1 + d.bend);
        if (playing) d.el.play();
      } catch (e) { /* on garde le flux */ }
    }, 200);
  },
  // choisir un morceau directement depuis l'écran Mix
  pick(letter) {
    const tracks = allTracks().filter((t) => t.type !== 'video');
    const list = h('div');
    const fill = (q) => {
      q = (q || '').trim().toLowerCase();
      const found = tracks.filter((t) => !q || [t.titre, t.artiste, t.bpm].filter(Boolean).join(' ').toLowerCase().includes(q));
      list.replaceChildren(...found.slice(0, 150).map((t) => {
        const ok = playable(t);
        return h('button', { class: 'menu-item', type: 'button', style: ok ? '' : 'opacity:.45',
          onclick: () => { closeSheet(); this.load(letter, t); } },
          coverEl(t),
          h('span', { class: 'meta', style: 'flex:1;min-width:0' },
            h('span', { class: 't1' }, t.titre),
            h('span', { class: 't2' }, [t.artiste, t.duree ? fmtTime(t.duree) : null].filter(Boolean).join(' · '))),
          h('span', { class: 'bpm' + (t.bpm ? '' : ' wait') }, t.bpm ? t.bpm : '…'));
      }));
      if (!found.length) list.append(h('p', { class: 'sub', style: 'text-align:center' }, tracks.length ? 'Aucun morceau trouvé.' : 'Ta bibliothèque est vide.'));
    };
    const q = h('input', { class: 'input', type: 'search', placeholder: 'Titre, artiste ou BPM…', 'aria-label': 'Rechercher' });
    q.oninput = () => fill(q.value);
    fill('');
    openSheet(() => h('div', null,
      h('div', { style: 'display:flex;align-items:center;gap:10px;margin-bottom:10px' },
        h('span', { class: 'badge', style: 'background:' + this.decks[letter].color }, letter),
        h('h2', { style: 'margin:0;font-size:18px' }, 'Charger sur la platine ' + letter)),
      h('div', { class: 'search' }, h('span', { html: iconHTML('search', 18), style: 'color:#A3A3AD' }), q),
      list));
  },
  computePeaks(buf, n) {
    const ch = buf.getChannelData(0), step = Math.floor(ch.length / n) || 1, out = new Float32Array(n);
    let max = 0.0001;
    for (let i = 0; i < n; i++) {
      let m = 0; const s = i * step;
      for (let j = 0; j < step; j += 16) { const v = Math.abs(ch[s + j] || 0); if (v > m) m = v; }
      out[i] = m; if (m > max) max = m;
    }
    for (let i = 0; i < n; i++) out[i] /= max;
    return out;
  },
  togglePlay(letter) {
    this.ensure();
    const d = this.decks[letter];
    if (!d.track) { toast('Charge d’abord un morceau (bouton « … » dans la Bibliothèque).'); return; }
    if (d.el.paused) { player.pause(); d.el.play(); } else d.el.pause();
  },
  cue(letter) {
    const d = this.decks[letter];
    if (!d.track) return;
    if (!d.el.paused) { d.el.pause(); d.el.currentTime = d.cue; }
    else { d.cue = d.el.currentTime; toast('Point CUE placé à ' + fmtTime(d.cue), 1200); }
  },
  sync(letter) {
    const d = this.decks[letter], o = this.decks[letter === 'A' ? 'B' : 'A'];
    if (!d.track || !o.track || !d.track.bpm || !o.track.bpm) { toast('Les deux platines doivent avoir un BPM.'); return; }
    let target = (o.track.bpm * this.rate(o)) / d.track.bpm;
    // si l'écart est énorme, on cale sur le double ou la moitié
    if (target > 1.5) target /= 2; else if (target < 0.67) target *= 2;
    d.tempo = Math.max(-25, Math.min(25, (target - 1) * 100));
    d.el.playbackRate = this.rate(d);
    // calage de phase simple : on aligne la position sur le temps fort le plus proche
    if (!o.el.paused && !d.el.paused) {
      const phaseO = (o.el.currentTime % (60 / o.track.bpm)) / (60 / o.track.bpm);
      const phaseD = (d.el.currentTime % (60 / d.track.bpm)) / (60 / d.track.bpm);
      let diff = phaseO - phaseD; if (diff > 0.5) diff -= 1; if (diff < -0.5) diff += 1;
      d.el.currentTime += diff * (60 / d.track.bpm);
    }
    this.mount();
    toast('Platine ' + letter + ' calée sur ' + this.effBpm(o) + ' BPM', 1500);
  },
  automix() {
    const A = this.decks.A, B = this.decks.B;
    const from = this.xf < 0.5 ? A : B, to = from === A ? B : A;
    if (!from.track || !to.track) { toast('Charge un morceau sur chaque platine.'); return; }
    this.ensure();
    if (from.el.paused) { from.el.play(); }
    if (from.track.bpm && to.track.bpm) this.sync(to.letter);
    to.el.play();
    const start = this.xf, end = to === B ? 1 : 0, t0 = performance.now(), dur = 12000;
    clearInterval(this.autoTimer);
    this.autoTimer = setInterval(() => {
      const k = Math.min(1, (performance.now() - t0) / dur);
      this.xf = start + (end - start) * k; this.applyXf();
      if (this.ui.xf) this.ui.xf.value = Math.round(this.xf * 100);
      if (k >= 1) { clearInterval(this.autoTimer); from.el.pause(); }
    }, 50);
    toast('Auto-mix : transition sur 12 secondes', 1800);
  },
  toggleRec() {
    this.ensure();
    if (this.recorder) { this.recorder.stop(); return; }
    if (!this.recDest || !window.MediaRecorder) { toast('L’enregistrement n’est pas disponible sur cet appareil.'); return; }
    const type = ['audio/mp4', 'audio/webm;codecs=opus', 'audio/webm'].find((m) => MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(m)) || '';
    this.recChunks = [];
    const rec = new MediaRecorder(this.recDest.stream, type ? { mimeType: type } : undefined);
    rec.ondataavailable = (e) => { if (e.data.size) this.recChunks.push(e.data); };
    rec.onstop = async () => {
      this.recorder = null; this.updateButtons();
      const blob = new Blob(this.recChunks, { type: rec.mimeType || type });
      if (blob.size < 2000) return;
      const d = new Date();
      const meta = { id: 'mix-' + d.getTime(), titre: 'Mon mix du ' + d.toLocaleDateString('fr-FR') + ' ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        artiste: 'Kadans', bpm: this.decks.A.track && this.decks.A.track.bpm || null, type: 'audio',
        ext: (rec.mimeType || '').includes('mp4') ? 'm4a' : 'webm', source: 'Mes mix', ajoute: d.getTime() / 1000, taille: blob.size };
      await DB.put(meta, blob, null);
      S.offline.set(meta.id, meta);
      toast('Mix enregistré dans ta bibliothèque ✓');
      if (S.online && S.sendAuto) runUpload();
    };
    rec.start(1000);
    this.recorder = rec;
    this.updateButtons();
    toast('Enregistrement du mix…', 1500);
  },
  pauseAll() { for (const d of Object.values(this.decks)) if (d.el) d.el.pause(); },
  updateButtons() {
    for (const d of Object.values(this.decks)) {
      const b = this.ui['play' + d.letter];
      if (b) b.innerHTML = iconHTML(d.el && !d.el.paused ? 'pause' : 'play', 20);
    }
    if (this.ui.rec) {
      this.ui.rec.classList.toggle('rec-on', !!this.recorder);
      this.ui.recTxt.textContent = this.recorder ? 'Arrêter' : 'Enregistrer';
    }
    if (this.ui.recLand) {   // le même bouton, placé sous le crossfader en mode paysage
      this.ui.recLand.classList.toggle('rec-on', !!this.recorder);
      this.ui.recLand.lastChild.textContent = this.recorder ? 'Arrêter' : 'Enreg.';
    }
  },
  deckView(d) {
    const t = d.track;
    const canvas = h('canvas', { 'aria-hidden': 'true' });
    const wave = h('div', { class: 'wave' }, canvas, t ? null : h('span', { class: 'hint' }, 'Touche ici pour charger un morceau'));
    wave.addEventListener('pointerdown', (e) => {
      if (!t) { this.pick(d.letter); return; }
      if (!d.el.duration) return;
      d.el.currentTime = Math.max(0, Math.min(1, along(e, wave))) * d.el.duration;
    });
    this.ui['canvas' + d.letter] = canvas;
    const play = h('button', { class: 'deck-play', type: 'button', style: 'background:' + d.color, 'aria-label': 'Lecture platine ' + d.letter,
      html: iconHTML(d.el && !d.el.paused ? 'pause' : 'play', 20), onclick: () => this.togglePlay(d.letter) });
    this.ui['play' + d.letter] = play;
    const id = 'tempo' + d.letter;
    const lbl = h('label', { for: id }, 'Tempo ' + (d.tempo >= 0 ? '+' : '') + d.tempo.toFixed(1).replace('.', ',') + ' %');
    const slider = h('input', { id, type: 'range', min: -16, max: 16, step: 0.1, value: d.tempo, style: 'accent-color:' + d.hex });
    const bpmEl = h('b', null, this.effBpm(d));
    slider.oninput = () => {
      d.tempo = +slider.value;
      if (d.el) d.el.playbackRate = this.rate(d) * (1 + d.bend);
      lbl.textContent = 'Tempo ' + (d.tempo >= 0 ? '+' : '') + d.tempo.toFixed(1).replace('.', ',') + ' %';
      bpmEl.textContent = this.effBpm(d);
    };
    slider.ondblclick = () => { slider.value = 0; slider.oninput(); };
    // le vinyle : tourne pendant la lecture, se manipule au doigt
    const disc = h('canvas', { 'aria-hidden': 'true' });
    const platter = h('div', { class: 'platter', 'aria-label': 'Disque de la platine ' + d.letter }, disc);
    d.disc = disc;
    this.platterEvents(d, platter);
    const rew = h('button', { class: 'btn small', type: 'button', 'aria-label': 'Reculer (maintenir)' }, '⏪');
    const ff = h('button', { class: 'btn small', type: 'button', 'aria-label': 'Avancer vite (maintenir)' }, '⏩');
    this.holdSearch(d, rew, -1); this.holdSearch(d, ff, 1);
    // − / + : baissent ou montent le tempo de 0,1 % par appui (en continu si on garde le doigt)
    const brake = h('button', { class: 'btn small ghost', type: 'button', 'aria-label': 'Baisser le tempo' }, '−');
    const push = h('button', { class: 'btn small ghost', type: 'button', 'aria-label': 'Monter le tempo' }, '+');
    const stepTempo = (dir) => {
      const v = Math.max(-16, Math.min(16, Math.round((d.tempo + dir * 0.1) * 10) / 10));
      if (v === d.tempo) return;
      slider.value = v; slider.oninput();
    };
    this.holdStep(brake, () => stepTempo(-1)); this.holdStep(push, () => stepTempo(1));
    return h('div', { class: 'deck' },
      h('div', { class: 'deck-head' },
        h('span', { class: 'badge', style: 'background:' + d.color }, d.letter),
        this.ui['vol' + d.letter] = h('span', { class: 'deck-vol', 'aria-label': 'Volume de la platine ' + d.letter }, 'Vol ' + this.vol(d.letter) + ' %'),
        h('div', { class: 'meta', style: 'flex:1;min-width:0;display:flex;flex-direction:column;gap:2px' },
          h('span', { class: 't1' }, t ? t.titre : 'Platine vide'),
          h('span', { class: 't2', id: 'time' + d.letter }, t ? (t.artiste || '') : 'Charge un morceau')),
        h('div', { class: 'big-bpm' }, bpmEl, h('span', null, 'BPM')),
        h('button', { class: 'icon-btn deck-load', type: 'button', 'aria-label': 'Choisir un morceau pour la platine ' + d.letter,
          html: iconHTML('music', 20), onclick: () => this.pick(d.letter) })),
      platter,
      wave,
      h('div', { class: 'deck-ctrl' }, play,
        h('button', { class: 'btn', type: 'button', onclick: () => this.cue(d.letter) }, 'CUE'),
        h('button', { class: 'btn ghost', type: 'button', onclick: () => this.sync(d.letter) }, 'SYNC'),
        h('div', { class: 'tempo' }, lbl, slider)),
      h('div', { class: 'transport' }, rew, ff,
        h('button', { class: 'btn small ghost', type: 'button', 'aria-label': 'Reculer de 4 temps', onclick: () => this.jump(d, -4) }, '−4'),
        h('button', { class: 'btn small ghost', type: 'button', 'aria-label': 'Avancer de 4 temps', onclick: () => this.jump(d, 4) }, '+4'),
        h('span', { class: 'bend' }, brake, push)));
  },
  // ---- gestes sur le disque (doigt ou souris)
  platterEvents(d, platter) {
    let drag = null;
    const angleOf = (e) => {
      const r = platter.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
      return { a: Math.atan2(y, x), dist: Math.hypot(x, y) / (r.width / 2) };
    };
    platter.addEventListener('pointerdown', (e) => {
      if (!d.track || !d.el || !d.el.duration) return;
      this.ensure();
      try { platter.setPointerCapture(e.pointerId); } catch (err) { /* déjà relâché */ }
      const p = angleOf(e);
      const ring = p.dist > 0.78 && !d.el.paused;   // bord du disque en lecture : freiner / pousser
      drag = { last: p.a, t: performance.now(), ring, wasPlaying: !d.el.paused };
      if (!ring) { d.held = true; if (!d.el.paused) d.el.pause(); }
    });
    platter.addEventListener('pointermove', (e) => {
      if (!drag) return;
      const p = angleOf(e), now = performance.now();
      let da = p.a - drag.last;
      if (da > Math.PI) da -= 2 * Math.PI; if (da < -Math.PI) da += 2 * Math.PI;
      const dt = Math.max(1, now - drag.t) / 1000;
      drag.last = p.a; drag.t = now;
      if (drag.ring) {
        const w = da / dt / (2 * Math.PI * 33.333 / 60);
        d.bend = Math.max(-0.1, Math.min(0.1, w * 0.1));
        d.el.playbackRate = this.rate(d) * (1 + d.bend);
      } else {   // le doigt tient le disque : 1 tour = 1,8 s de musique
        d.angle += da;
        d.el.currentTime = Math.max(0, Math.min(d.el.duration - 0.05, d.el.currentTime + da / (2 * Math.PI) * (60 / 33.333)));
      }
    });
    const end = () => {
      if (!drag) return;
      if (drag.ring) { d.bend = 0; d.el.playbackRate = this.rate(d); }
      else { d.held = false; if (drag.wasPlaying) d.el.play(); }
      drag = null;
    };
    platter.addEventListener('pointerup', end);
    platter.addEventListener('pointercancel', end);
  },
  // un appui = une fois ; doigt gardé = se répète de plus en plus vite
  holdStep(btn, fn) {
    let t = 0;
    const stop = () => { clearTimeout(t); t = 0; };
    const loop = (delay) => { t = setTimeout(() => { fn(); loop(Math.max(40, delay * 0.85)); }, delay); };
    btn.addEventListener('pointerdown', (e) => { e.preventDefault(); stop(); fn(); loop(400); });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => btn.addEventListener(ev, stop));
    btn.addEventListener('contextmenu', (e) => e.preventDefault());
  },
  holdSearch(d, btn, dir) {   // ⏪ ⏩ : tant qu'on appuie
    let timer = 0;
    const stop = () => {
      if (!timer) return;
      clearInterval(timer); timer = 0;
      if (d.el) d.el.playbackRate = this.rate(d);
    };
    btn.addEventListener('pointerdown', () => {
      if (!d.track || !d.el || !d.el.duration) return;
      if (dir > 0 && !d.el.paused) { d.el.playbackRate = this.rate(d) * 3; timer = setInterval(() => {}, 1000); return; }
      timer = setInterval(() => {
        d.el.currentTime = Math.max(0, Math.min(d.el.duration - 0.05, d.el.currentTime + dir * 0.35));
        d.angle += dir * 0.35 / (60 / 33.333) * 2 * Math.PI;
      }, 60);
    });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => btn.addEventListener(ev, stop));
  },
  jump(d, beats) {
    if (!d.track || !d.el || !d.el.duration) return;
    const sec = beats * (d.track.bpm ? 60 / d.track.bpm : 0.5);
    d.el.currentTime = Math.max(0, Math.min(d.el.duration - 0.05, d.el.currentTime + sec));
  },
  drawPlatter(d, dt) {
    const c = d.disc, dpr = window.devicePixelRatio || 1, w = c.clientWidth;
    if (!w) return;
    if (c.width !== Math.round(w * dpr)) { c.width = c.height = Math.round(w * dpr); }
    const g = c.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, w, w);
    const r = w / 2, R = r * 0.9;
    if (d.el && !d.el.paused && !d.held) d.angle += dt * (2 * Math.PI * 33.333 / 60) * d.el.playbackRate;
    g.fillStyle = '#1C1E23'; g.beginPath(); g.arc(r, r, r - 1, 0, 7); g.fill();
    for (let i = 0; i < 60; i++) {   // points stroboscopiques
      const a = i / 60 * 2 * Math.PI + d.angle;
      g.fillStyle = i % 2 ? '#3A3E47' : '#5A5E68';
      g.fillRect(r + Math.cos(a) * (r - 5) - 1, r + Math.sin(a) * (r - 5) - 1, 2, 2);
    }
    g.save(); g.translate(r, r); g.rotate(d.angle);
    const vg = g.createRadialGradient(0, 0, R * 0.3, 0, 0, R);
    vg.addColorStop(0, '#16171A'); vg.addColorStop(1, '#0A0A0C');
    g.fillStyle = vg; g.beginPath(); g.arc(0, 0, R, 0, 7); g.fill();
    g.strokeStyle = 'rgba(255,255,255,.05)'; g.lineWidth = 1;
    for (let rr = R * 0.38; rr < R * 0.97; rr += 3) { g.beginPath(); g.arc(0, 0, rr, 0, 7); g.stroke(); }
    const L = R * 0.34;
    g.save(); g.beginPath(); g.arc(0, 0, L, 0, 7); g.clip();
    if (d.coverImg && d.coverImg.complete && d.coverImg.naturalWidth) g.drawImage(d.coverImg, -L, -L, 2 * L, 2 * L);
    else {
      g.fillStyle = d.track ? d.hex : '#2A2D33'; g.fillRect(-L, -L, 2 * L, 2 * L);
      g.fillStyle = 'rgba(14,15,18,.8)'; g.font = `800 ${L * 0.7}px -apple-system, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(d.letter, 0, 0);
    }
    g.restore();
    g.fillStyle = '#F4F2EE'; g.fillRect(L * 0.55, -1.5, L * 0.4, 3);
    g.restore();
    const sh = g.createLinearGradient(0, 0, w, w);
    sh.addColorStop(0.35, 'rgba(255,255,255,0)'); sh.addColorStop(0.5, 'rgba(255,255,255,.06)'); sh.addColorStop(0.65, 'rgba(255,255,255,0)');
    g.fillStyle = sh; g.beginPath(); g.arc(r, r, R, 0, 7); g.fill();
    g.fillStyle = '#C9C7C2'; g.beginPath(); g.arc(r, r, R * 0.035, 0, 7); g.fill();
    // bras : au bord au début du morceau, vers l'étiquette à la fin
    const dur = d.el && d.el.duration || 0, pos = dur ? d.el.currentTime / dur : 0;
    const px = r + R * 0.98, py = r - R * 0.92;
    const rr = d.track ? R * (0.93 - pos * 0.5) : R * 1.02, phi = d.track ? 0.12 * Math.PI : 0.02 * Math.PI;
    const tx = r + rr * Math.cos(phi), ty = r + rr * Math.sin(phi);
    g.strokeStyle = '#9A9AA3'; g.lineWidth = Math.max(3, w * 0.014); g.lineCap = 'round';
    g.beginPath(); g.moveTo(px, py); g.lineTo(tx, ty); g.stroke();
    g.save(); g.translate(tx, ty); g.rotate(Math.atan2(ty - py, tx - px));
    g.fillStyle = '#D6D4CF'; g.fillRect(-w * 0.035, -w * 0.02, w * 0.06, w * 0.04);
    g.restore();
    g.fillStyle = '#2C2F36'; g.beginPath(); g.arc(px, py, w * 0.05, 0, 7); g.fill();
    g.fillStyle = '#4A4E58'; g.beginPath(); g.arc(px, py, w * 0.025, 0, 7); g.fill();
  },
  view() {
    const xf = h('input', { id: 'xfade', type: 'range', min: 0, max: 100, value: Math.round(this.xf * 100) });
    xf.oninput = () => { clearInterval(this.autoTimer); this.xf = xf.value / 100; this.applyXf(); };
    this.ui.xf = xf;
    this.ui.recTxt = h('span', null, this.recorder ? 'Arrêter' : 'Enregistrer');
    this.ui.rec = h('button', { class: 'btn small' + (this.recorder ? ' rec-on' : ''), type: 'button', onclick: () => this.toggleRec() }, h('span', { class: 'rec-dot' }), this.ui.recTxt);
    return h('div', { class: 'mixwrap' },
      h('div', { class: 'top mixtop' }, h('h1', null, 'Mix'), this.ui.rec),
      h('div', { class: 'mixgrid' }, this.deckView(this.decks.A), this.deckView(this.decks.B)),
      h('div', { class: 'xfader' },
        h('div', { class: 'ends' }, h('span', null, 'A'), h('label', { for: 'xfade' }, 'Crossfader'), h('span', null, 'B')),
        h('div', { class: 'xf-row' },
          this.ui.xvolA = h('span', { class: 'xf-vol', style: 'color:' + this.decks.A.hex }, 'A ' + this.vol('A') + ' %'),
          xf,
          this.ui.xvolB = h('span', { class: 'xf-vol', style: 'color:' + this.decks.B.hex + ';text-align:right' }, 'B ' + this.vol('B') + ' %')),
        h('div', { class: 'xf-btns' },
          h('button', { class: 'btn small', type: 'button', onclick: () => this.automix() }, 'Auto-mix'),
          h('button', { class: 'btn small', type: 'button', onclick: () => { this.xf = 0.5; xf.value = 50; this.applyXf(); } }, 'Centre'),
          this.ui.recLand = h('button', { class: 'btn small rec-land' + (this.recorder ? ' rec-on' : ''), type: 'button', onclick: () => this.toggleRec() }, h('span', { class: 'rec-dot' }), this.recorder ? 'Arrêter' : 'Enreg.'))),
      h('p', { class: 'sub mixhelp', style: 'text-align:center;margin-top:14px' }, 'Tourne le disque au doigt pour avancer / reculer. En lecture, le bord du disque freine ou pousse. Double-tape un curseur Tempo pour le remettre à 0.'));
  },
  mount() {
    const v = $('#view');
    if (S.tab !== 'mix') return;
    v.replaceChildren(this.view());
    this.loop();
  },
  loop() {
    cancelAnimationFrame(this._raf);
    let prev = performance.now();
    const draw = () => {
      if (S.tab !== 'mix') return;
      const now = performance.now(), dt = Math.min(0.1, (now - prev) / 1000);
      prev = now;
      for (const d of Object.values(this.decks)) {
        if (d.disc && d.disc.isConnected) this.drawPlatter(d, dt);
        const c = this.ui['canvas' + d.letter];
        if (!c || !c.isConnected) continue;
        const dpr = window.devicePixelRatio || 1, w = c.clientWidth, hh = c.clientHeight;
        if (c.width !== w * dpr) { c.width = w * dpr; c.height = hh * dpr; }
        const g = c.getContext('2d');
        g.setTransform(dpr, 0, 0, dpr, 0, 0);
        g.clearRect(0, 0, w, hh);
        const dur = d.el && d.el.duration || 0, pos = dur ? d.el.currentTime / dur : 0;
        if (d.peaks) {
          const n = d.peaks.length, bw = w / n;
          for (let i = 0; i < n; i++) {
            const v = Math.max(0.04, d.peaks[i]) * (hh - 8);
            g.fillStyle = i / n < pos ? d.hex : '#3A3E47';
            g.fillRect(i * bw, (hh - v) / 2, Math.max(1, bw - 0.6), v);
          }
        } else if (d.track) {
          g.fillStyle = '#3A3E47'; g.fillRect(0, hh / 2 - 1, w, 2);
        }
        if (d.track) {
          g.fillStyle = '#F4F2EE'; g.fillRect(pos * w - 1, 0, 2, hh);
          if (dur) { g.fillStyle = d.hex; g.fillRect((d.cue / dur) * w - 1, 0, 2, 6); }
          const te = $('#time' + d.letter);
          if (te && dur) te.textContent = (d.track.artiste ? d.track.artiste + ' · ' : '') + fmtTime(d.el.currentTime) + ' / ' + fmtTime(dur);
        }
      }
      this._raf = requestAnimationFrame(draw);
    };
    draw();
  },
};

// ------------------------------------------------------------------ vue : Réglages
// ------------------------------------------------------------------ fond d'écran (couleur ou image, gardé sur cet iPhone)
const BG_DEFAULT = '#0E0F12';
const BG_COLORS = [['#0E0F12', 'Sombre (par défaut)'], ['#0F1626', 'Nuit bleue'], ['#1A1028', 'Violet'], ['#0F1F1A', 'Vert forêt'],
  ['#24110F', 'Bordeaux'], ['#1E1A12', 'Brun'], ['#1C1D21', 'Gris'], ['#000000', 'Noir']];
function bgLoad() {
  try { return JSON.parse(localStorage.getItem('kadans.fond') || 'null') || { type: 'couleur', valeur: BG_DEFAULT }; }
  catch (e) { return { type: 'couleur', valeur: BG_DEFAULT }; }
}
function bgApply(f) {
  const b = document.body, root = document.documentElement;
  b.classList.toggle('bg-img', f.type === 'image');
  if (f.type === 'image') {
    const d = (f.assombrir ?? 45) / 100;
    b.style.background = `linear-gradient(rgba(10,11,14,${d}),rgba(10,11,14,${d})), url("${f.valeur}") center / cover no-repeat, ${BG_DEFAULT}`;
    root.style.background = BG_DEFAULT;
  } else {
    const c = f.valeur || BG_DEFAULT;
    b.style.background = c; root.style.background = c;
    root.style.setProperty('--bg', c);
  }
}
function bgSave(f) {
  try { localStorage.setItem('kadans.fond', JSON.stringify(f)); }
  catch (e) { toast('Image trop lourde à garder : choisis-en une plus petite.'); return false; }
  bgApply(f); return true;
}
function bgCard() {
  const f = bgLoad();
  const swatches = h('div', { class: 'pg-swatches' }, BG_COLORS.map(([c, nom]) => h('button', { class: 'pg-swatch', type: 'button', style: 'background:' + c,
    'aria-label': nom, 'aria-pressed': String(f.type === 'couleur' && (f.valeur || '').toLowerCase() === c.toLowerCase()),
    onclick: () => { bgSave({ type: 'couleur', valeur: c }); render(); } })));
  const color = h('input', { type: 'color', class: 'pg-color', value: f.type === 'couleur' ? f.valeur : BG_DEFAULT, 'aria-label': 'Autre couleur' });
  color.onchange = () => { bgSave({ type: 'couleur', valeur: color.value }); render(); };
  const file = h('input', { type: 'file', accept: 'image/*', style: 'display:none' });
  file.onchange = () => {
    const fl = file.files[0];
    if (!fl) return;
    const img = new Image(), url = URL.createObjectURL(fl);
    img.onload = () => {   // réduite (1400 px max) pour rester légère
      const k = Math.min(1, 1400 / Math.max(img.width, img.height));
      const c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      if (bgSave({ type: 'image', valeur: c.toDataURL('image/jpeg', 0.82), assombrir: 45 })) { toast('Fond d’écran changé ✓'); render(); }
    };
    img.onerror = () => { URL.revokeObjectURL(url); toast('Cette image ne peut pas être lue.'); };
    img.src = url;
  };
  let dim = null;
  if (f.type === 'image') {
    const v = h('span', { class: 'ui-val' }, (f.assombrir ?? 45) + ' %');
    const r = h('input', { type: 'range', min: 0, max: 85, value: f.assombrir ?? 45, class: 'pg-range', 'aria-label': 'Assombrir l’image' });
    r.oninput = () => { const g = bgLoad(); g.assombrir = +r.value; v.textContent = g.assombrir + ' %'; bgSave(g); };
    dim = h('div', { class: 'ui-row' }, h('span', { class: 'ui-ic', style: '--tint:#A3A3AD', html: iconHTML('sun', 18) }),
      h('span', { class: 'ui-txt', style: 'flex:none' }, h('span', { class: 'ui-t1' }, 'Assombrir')), r, v);
  }
  return h('section', { class: 'ui-sec' },
    h('h2', { class: 'ui-h' }, 'Apparence'),
    h('div', { class: 'ui-group' },
      h('div', { class: 'ui-block' }, h('span', { class: 'ui-t2' }, 'Fond d’écran'), swatches),
      h('label', { class: 'ui-row' }, h('span', { class: 'ui-ic', style: '--tint:#C77DFF', html: iconHTML('palette', 18) }),
        h('span', { class: 'ui-txt' }, h('span', { class: 'ui-t1' }, 'Autre couleur')), color),
      uiRow({ icon: 'image', tint: '#5BD69A', title: 'Choisir une photo', sub: 'Depuis ta galerie', onclick: () => file.click(), chevron: true }),
      dim,
      f.type === 'image' || (f.valeur || '').toLowerCase() !== BG_DEFAULT.toLowerCase()
        ? uiRow({ icon: 'refresh', tint: '#A3A3AD', title: 'Revenir au fond par défaut', onclick: () => {
          localStorage.removeItem('kadans.fond'); document.documentElement.style.removeProperty('--bg'); bgApply(bgLoad()); render();
        } }) : null,
      file),
    h('p', { class: 'ui-note' }, 'Gardé sur cet iPhone uniquement.'));
}
bgApply(bgLoad());

// guide : installer le certificat Kadans pour le Wi-Fi direct
function wifiHelp() {
  const step = (n, t) => h('li', null, h('span', { class: 'pg-num' }, String(n)), h('span', null, ...t));
  const check = h('button', { class: 'pg-btn sm', type: 'button', onclick: async () => {
    check.disabled = true; await probeWifi(true); check.disabled = false;
    toast(WIFI.base ? 'Wi-Fi direct actif ✓' : (WIFI.info ? 'Pas encore : vérifie le certificat, et que tu es sur le Wi-Fi de la maison.' : 'Ton PC n’a pas encore la nouvelle version de Kadans.'), 4000);
    if (WIFI.base) { closeSheet(); render(); }
  } }, 'Vérifier maintenant');
  openSheet(() => h('div', { class: 'pg', style: 'gap:14px' },
    h('div', null, h('h2', { style: 'margin:0 0 4px;font-size:20px' }, 'Wi-Fi de la maison'),
      h('p', { class: 'pg-muted' }, WIFI.base ? 'Actif ✓ À la maison, la musique passe directement par le Wi-Fi.' : 'À la maison, la musique peut passer directement par le Wi-Fi : beaucoup plus rapide. À faire une seule fois :')),
    h('ol', { class: 'pg-steps small' },
      step(1, ['Sur le PC, onglet ', h('b', null, 'Mobile'), ' : scanne le QR ', h('b', null, '« Certificat Wi-Fi »'), ' avec l’appareil photo, puis ', h('b', null, 'Autoriser'), '.']),
      step(2, ['Ouvre ', h('b', null, 'Réglages'), ' → ', h('b', null, 'Profil téléchargé'), ' → ', h('b', null, 'Installer'), '.']),
      step(3, ['Puis ', h('b', null, 'Réglages → Général → Informations → Réglages des certificats'), ' : active ', h('b', null, '« Kadans - Wi-Fi de la maison »'), '.']),
      step(4, ['Reviens dans Kadans, sur le Wi-Fi de la maison.'])),
    h('p', { class: 'ui-note', style: 'margin:0' }, 'Ce certificat ne marche que pour les adresses du réseau de la maison : il ne sert pour aucun site Internet.'),
    h('div', { style: 'display:flex;gap:8px;justify-content:flex-end' }, check)));
}

function viewSettings() {
  const on = S.online === true, off = S.online === false;
  const st = on ? 'Connecté' : off ? 'Injoignable — PC éteint ?' : (S.server ? 'Connexion…' : 'Non relié');
  const usage = h('span', { class: 'ui-val' }, '…');
  if (navigator.storage && navigator.storage.estimate) navigator.storage.estimate().then((e) => { usage.textContent = fmtSize(e.usage); });
  let total = 0; for (const m of S.offline.values()) total += m.taille || 0;
  const verify = h('button', { class: 'pg-btn sm', type: 'button', onclick: async () => {
    verify.disabled = true;
    await checkServer(); await refreshLibrary(); render(); toast(S.online ? 'PC connecté ✓' : 'PC injoignable');
  } }, 'Vérifier');
  return h('div', { class: 'pg' },
    h('header', { class: 'pg-top' }, h('h1', { class: 'pg-title' }, 'Réglages')),
    // --- carte d'état du PC
    h('div', { class: 'pg-card pg-pc' },
      h('span', { class: 'pg-badge' + (on ? ' ok' : off ? ' ko' : ''), html: iconHTML('pc', 22) }),
      h('div', { class: 'pg-pc-txt' },
        h('b', null, S.pcName || (S.server ? 'Ton PC' : 'Aucun PC relié')),
        h('span', null, h('span', { class: 'dot' + (on ? ' ok' : off ? ' ko' : '') }), st)),
      S.server ? verify : h('button', { class: 'pg-btn sm accent', type: 'button', onclick: scanQR }, 'Relier')),
    uiGroup('Connexion', [
      uiRow({ icon: 'wifi', tint: WIFI.base ? '#5BD69A' : '#A3A3AD', title: 'Wi-Fi de la maison',
        sub: WIFI.base ? 'Direct avec le PC : transferts rapides' : WIFI.info ? 'Inactif : certificat à installer, ou pas à la maison' : 'Disponible avec la nouvelle version de Kadans',
        right: WIFI.base ? 'Actif' : 'Internet', onclick: wifiHelp, chevron: true }),
      uiRow({ icon: 'qr', tint: '#FF7A45', title: 'Scanner le QR du PC', sub: 'Après un redémarrage du PC', onclick: scanQR, chevron: true }),
      uiRow({ icon: 'link', tint: '#7C9CFF', title: 'Coller un lien', sub: 'Le lien affiché sous le QR', onclick: askLink, chevron: true }),
      on ? uiRow({ icon: 'folder', tint: '#F5C451', title: 'Réanalyser les dossiers', sub: 'Cherche les nouveaux morceaux sur le PC',
        onclick: async () => { await api('/api/scanner', { method: 'POST' }); toast('Analyse des dossiers lancée sur le PC'); }, chevron: true }) : null,
    ], 'Ta musique gardée sur l’iPhone est conservée quand tu relies à nouveau le PC.'),
    uiGroup('Synchronisation', [
      uiRow({ icon: 'download', tint: '#5BD69A', title: 'Rapatrier automatiquement', sub: 'Les morceaux cochés sur le PC',
        right: uiToggle(S.syncAuto, (v) => { S.syncAuto = v; localStorage.setItem('kadans.syncAuto', v ? '1' : '0'); if (v) refreshSync(); }, 'Rapatrier automatiquement les morceaux cochés sur le PC') }),
      uiRow({ icon: 'up', tint: '#7C9CFF', title: 'Envoyer automatiquement', sub: 'Mes mix et fichiers importés',
        right: uiToggle(S.sendAuto, (v) => { S.sendAuto = v; localStorage.setItem('kadans.sendAuto', v ? '1' : '0'); if (v) runUpload(); }, 'Envoyer automatiquement sur le PC mes mix et fichiers importés') }),
      uiRow({ icon: 'clock', tint: '#A3A3AD', title: 'En attente d’envoi', right: String(phoneOnly().length) }),
    ]),
    uiGroup('Stockage', [
      uiRow({ icon: 'music', tint: '#FF7A45', title: 'Morceaux sur l’iPhone', right: S.offline.size + ' · ' + fmtSize(total) }),
      uiRow({ icon: 'disk', tint: '#A3A3AD', title: 'Espace utilisé par l’app', right: usage }),
      S.offline.size ? uiRow({ icon: 'trash', title: 'Libérer l’espace', sub: 'Tout reste sur ton PC', danger: true, onclick: async () => {
        if (!confirm('Retirer TOUS les morceaux de l’iPhone ? (Ils restent sur ton PC.)')) return;
        await removeOffline([...S.offline.values()], true);
        render(); toast('Espace libéré (tout reste sur ton PC)');
      } }) : null,
    ]),
    bgCard(),
    uiGroup('Installer l’app', [
      h('div', { class: 'ui-block' }, h('ol', { class: 'pg-steps small' },
        h('li', null, h('span', { class: 'pg-num' }, '1'), h('span', null, 'Ouvre cette page dans ', h('b', null, 'Safari'))),
        h('li', null, h('span', { class: 'pg-num' }, '2'), h('span', null, 'Touche ', h('b', null, 'Partager'), ' (carré avec une flèche)')),
        h('li', null, h('span', { class: 'pg-num' }, '3'), h('span', null, h('b', null, 'Sur l’écran d’accueil'), ', puis Ajouter')))),
    ]),
    h('p', { class: 'pg-foot' }, h('span', { class: 'logo', html: LOGO_SVG(11) }), 'Kadans 1.6 · usage personnel'));
}

// ------------------------------------------------------------------ démarrage
document.querySelectorAll('.tabs [data-ico]').forEach((s) => { s.innerHTML = iconHTML(s.dataset.ico, 22); });
document.querySelectorAll('.tabs button').forEach((b) => b.addEventListener('click', () => setTab(b.dataset.tab)));
document.addEventListener('visibilitychange', () => { if (!document.hidden) { probeWifi(true); tick(true); } });
window.addEventListener('hashchange', async () => {
  if (readHashConfig()) { toast('PC relié ✓'); await checkServer(); await refreshLibrary(); render(); }
});

let ticks = 0, ticking = false;
async function tick(force) {
  if (document.hidden || !S.server) return;
  if (ticking) return;   // ligne lente : on n'empile pas les vérifications (elles encombreraient la connexion)
  ticking = true;
  try {
    ticks++;
    const active = S.jobs.some((j) => !['termine', 'erreur'].includes(j.etat));
    if (force || ticks % 6 === 0 || S.online !== true) {
      await checkServer();
      // pendant la synchro, on ne recharge pas toute la bibliothèque : la connexion sert aux morceaux
      if (S.online) { if (!SYNC.running || force) await refreshLibrary(); await refreshSync(); }
      if (S.tab === 'biblio') refreshTrackRows();
    }
    if (active || force || ticks % 6 === 0) await refreshJobs();
  } finally { ticking = false; }
}

(async function start() {
  const linked = readHashConfig();
  if (S.server && !linked) setServer(S.server, S.key);
  await loadOffline();
  await detectSameOrigin();
  // Code d'accès : redemandé à CHAQUE ouverture (un jeton gardé par iOS d'une ouverture précédente ne compte pas),
  // et vérifié AVANT d'afficher quoi que ce soit.
  LOCK.jeton = ''; sessionStorage.removeItem('kadans.jeton');
  await guard();
  probeWifi(true);   // à la maison : Wi-Fi direct dès que possible (sans retarder l'ouverture)
  setTab(S.server ? (S.offline.size || S.lib.length ? 'biblio' : 'ajouter') : 'ajouter');
  if (linked) toast('PC relié ✓ Ajoute maintenant l’app à l’écran d’accueil.', 4000);
  await tick(true);
  render();
  setInterval(tick, 2500);
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
})();
