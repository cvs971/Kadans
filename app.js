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
  playlist: P('<path d="M4 6h11M4 12h11M4 18h7M17 18V8l4-1v9"/><circle cx="15" cy="18" r="2"/>'),
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
// App Android : le même code sert, mais on parle du « mobile » au lieu de l'« iPhone » dans tout ce qui s'affiche.
const ON_ANDROID = (() => { try { return !!window.KadansAndroid; } catch (e) { return false; } })();
function dev(s) {
  if (!ON_ANDROID || typeof s !== 'string' || !s.includes('iPhone')) return s;
  return s.replace(/\b([Dd])e l[’']iPhone/g, '$1u mobile').replace(/\b([Ll])[’']iPhone/g, '$1e mobile')
    .replace(/\b([Cc])et iPhone/g, '$1e mobile').replace(/iPhone/g, 'mobile');
}
if (ON_ANDROID) { const c0 = window.confirm.bind(window); window.confirm = (m) => c0(dev(m)); }
function h(tag, props, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'style') el.style.cssText = v;
    else if (k === 'html') el.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
    else el.setAttribute(k, v === true ? '' : (k === 'title' || k === 'aria-label' || k === 'placeholder' ? dev(String(v)) : v));
  }
  for (const c of kids.flat(Infinity)) {
    if (c == null || c === false) continue;
    el.append(c instanceof Node ? c : document.createTextNode(dev(String(c))));
  }
  return el;
}
const ico = (name, size = 22) => h('span', { class: 'ico', html: iconHTML(name, size) });
const $ = (s, root = document) => root.querySelector(s);

function toast(msg, ms = 2600) {
  const t = $('#toast');
  t.textContent = dev(msg);
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
// App Android (APK Kadans) : pont natif (certificat Wi-Fi reconnu par l'app, écran gardé allumé)
const NATIVE = (() => { try { return window.KadansAndroid || null; } catch (e) { return null; } })();
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
        WIFI.err = 'le PC a répondu ' + r.status;
      } catch (e) {   // pas à la maison, ou certificat pas encore activé
        WIFI.err = e.name === 'AbortError' ? 'pas de réponse du PC sur ' + ip + ' (téléphone sur un autre Wi-Fi ou en 4G/5G ?)'
          : 'connexion refusée par le téléphone (certificat Kadans pas activé dans Réglages des certificats ?)';
      }
      finally { clearTimeout(t); }
    }
    const changed = found !== WIFI.base;
    WIFI.base = found;
    if (found) WIFI.err = '';
    if (changed) { updatePill(); if (S.tab === 'reglages') render(); }
  })().finally(() => { wifiProbing = null; });
  return wifiProbing;
}
// Requête au PC : par le Wi-Fi s'il répond, sinon par Internet
async function pcFetch(path, init) {
  const via = base();
  try { return await fetch(via + path, init); }
  catch (e) { if (via !== S.server) { wifiLost(); return fetch(S.server + path, init); } throw e; }
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
// niv : 1 = lecture (copie au bon niveau si elle est prête), 2 = garder sur le téléphone (on attend la copie)
const fileURL = (id, niv) => `${base()}/api/fichier/${id}?${authQ()}` + (niv ? '&niveau=' + niv : '');
// Bibliothèque au même niveau : le PC (Kadans 1.6.1 ou plus) envoie une copie au volume déjà corrigé
const verGE = (v, w) => { const a = String(v || '0').split('.').map(Number), b = w.split('.').map(Number); for (let i = 0; i < 3; i++) { if ((a[i] || 0) !== (b[i] || 0)) return (a[i] || 0) > (b[i] || 0); } return true; };
const LIBNORM = () => localStorage.getItem('kadans.niveauBiblio') !== '0' && verGE(S.pcVersion, '1.6.1');
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
    r = await pcFetch('/api/code/verifier', { method: 'POST', headers: { 'x-kadans-cle': S.key, 'content-type': 'application/json' }, body: JSON.stringify({ code }) });
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
        logoImg(64, 'lock-logo'),
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
    const r = await pcFetch('/api/code/etat', { headers: { 'x-kadans-cle': S.key } });
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
    S.online = true; S.pcName = st.nom_pc || ''; S.pcVersion = st.version || ''; S.fails = 0; S.keyRefused = false;
    refreshLockState();
    if ('wifi' in st) setWifiInfo(st.wifi);   // ancienne version de Kadans : pas de Wi-Fi direct
    // le PC a redémarré et changé d'adresse Internet : on retient la nouvelle (plus besoin de rescanner le QR)
    if (st.tunnel && st.tunnel.startsWith('https://') && st.tunnel.replace(/\/$/, '') !== S.server) setServer(st.tunnel, S.key);
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
    const keep = JSON.stringify(S.lib.slice(0, 3000));
    if (keep !== S.libSaved) { S.libSaved = keep; localStorage.setItem('kadans.lib', keep); }
    if (!S.catsAt || Date.now() - S.catsAt > 60000) { S.catsAt = Date.now(); await refreshCats(); }   // les dossiers changent rarement
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
    const quiet = WIFI.base && url.startsWith(WIFI.base) ? 8000 : 45000;   // plus rien reçu pendant ce temps : on relance
    let stall = setTimeout(() => ctrl.abort(), 60000);   // 1re réponse : le PC peut d'abord préparer la copie au bon niveau
    try {
      const to = end == null ? '' : end;
      const r = await fetch(url, { signal: ctrl.signal, headers: { Range: `bytes=${start + got}-${to}` } });
      clearTimeout(stall); stall = setTimeout(() => ctrl.abort(), quiet);
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
          clearTimeout(stall); stall = setTimeout(() => ctrl.abort(), quiet);
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
    const niv = LIBNORM();   // copie au bon niveau (le PC la prépare si besoin)
    try { blob = await fetchWithProgress(fileURL(item.id, niv ? 2 : 0), onP); }
    catch (e) {   // le Wi-Fi a décroché (sortie de la maison…) : on reprend par Internet
      if (!viaWifi || e.fatal) throw e;
      wifiLost(); last = 0;
      blob = await fetchWithProgress(fileURL(item.id, niv ? 2 : 0), onP);
    }
    const cover = await coverP;
    if (cover) coverCache.set(item.id, URL.createObjectURL(cover));
    const meta = { id: item.id, titre: item.titre, artiste: item.artiste, bpm: item.bpm, duree: item.duree, lufs: item.lufs,
      type: item.type, ext: item.ext, source: item.source, categorie: item.categorie, ajoute: item.ajoute || Date.now() / 1000,
      taille: blob.size, garde: Date.now(), niv };
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
    const img = h('img', { src, alt: '', loading: 'lazy', decoding: 'async', style: 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover' });
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
  const views = { ajouter: viewAdd, biblio: viewLibrary, playlist: viewPlaylist, mix: () => MIX.view(), reglages: viewSettings };
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
// le logo Kadans (couple qui danse) en image, à la taille voulue
const logoImg = (px, cls = '') => h('img', { class: 'logo-img ' + cls, src: 'icon-192.png', width: px, height: px, alt: '' });
const LOGO_SVG = (s, c = '#0E0F12') => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M4 10v4M8 6v12M12 9v6M16 4v16M20 10v4"/></svg>`;

function viewAdd() {
  const wrap = h('div', { class: 'pg' });
  wrap.append(h('header', { class: 'pg-top' },
    h('div', { class: 'brand' }, logoImg(30), h('b', null, 'Kadans')),
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

// ------------------------------------------------------------------ vue : Playlist
const PL = { ids: safeList('kadans.playlist').filter((x) => typeof x === 'string'), open: new Set(), q: '', folder: null, beats: +(localStorage.getItem('kadans.plBeats') || 16) };
const plSave = () => { PLS.commit(); MIX.autoSync(); };
// ---- playlists nommées, partagées entre le PC et les mobiles (fichier playlists.json sur le PC)
// Chaque appareil garde sa copie ; à la synchro, la version la plus récente de chaque playlist gagne.
const PLS = {
  items: {}, active: '', busy: false, again: false, timer: 0,
  save() { try { localStorage.setItem('kadans.playlists', JSON.stringify(this.items)); localStorage.setItem('kadans.plActive', this.active); } catch (e) { /* stockage plein */ } },
  load() {
    let raw = null;
    try { raw = JSON.parse(localStorage.getItem('kadans.playlists')); } catch (e) { /* illisible */ }
    if (raw && typeof raw === 'object') this.items = raw;
    else {
      const id = PL.ids.length ? 'mobile' : 'defaut';
      this.items[id] = { id, nom: PL.ids.length ? 'Playlist mobile' : 'Ma playlist', ids: [...PL.ids], beats: PL.beats || 16, modifie: PL.ids.length ? Date.now() : 1 };   // la liste d'avant reste la première
    }
    this.active = localStorage.getItem('kadans.plActive') || '';
    this.apply(this.cur());
    this.save();
  },
  list() { return Object.values(this.items).filter((x) => !x.supprime).sort((a, b) => a.nom.localeCompare(b.nom, 'fr')); },
  stamp(x) { x.modifie = Math.max(Date.now(), (x.modifie || 0) + 1); },
  unique(nom, self) {
    const used = new Set(this.list().filter((x) => x !== self).map((x) => x.nom.toLowerCase()));
    let out = nom, n = 2;
    while (used.has(out.toLowerCase())) out = nom + ' (' + (n++) + ')';
    return out;
  },
  make(nom) {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    return (this.items[id] = { id, nom: this.unique(nom), ids: [], beats: 16, modifie: Date.now() });
  },
  cur() {
    let x = this.items[this.active];
    if (!x || x.supprime) x = this.list()[0] || this.make('Ma playlist');
    this.active = x.id;
    return x;
  },
  apply(x) { PL.ids = [...(x.ids || [])]; PL.beats = x.beats || 16; },
  activate(id) { this.active = id; this.apply(this.cur()); this.save(); },
  create(nom) { const x = this.make(nom); this.active = x.id; this.apply(x); this.save(); this.schedule(); },
  rename(nom) { const x = this.cur(); x.nom = this.unique(nom, x); this.stamp(x); this.save(); this.schedule(); },
  remove() {
    const x = this.cur();
    x.supprime = true; x.ids = []; this.stamp(x);
    this.apply(this.cur());
    this.save(); this.schedule();
  },
  // la playlist affichée a changé (ordre, morceaux, transition)
  commit() {
    const x = this.cur(), beats = PL.beats || 16;
    if (beats === x.beats && PL.ids.length === (x.ids || []).length && PL.ids.every((id, i) => id === x.ids[i])) return;
    x.ids = [...PL.ids]; x.beats = beats; this.stamp(x);
    this.save(); this.schedule();
  },
  nowLabel() { const au = MIX.auto, x = au && this.items[au.plId]; return x && !x.supprime ? x.nom : ''; },
  schedule() { clearTimeout(this.timer); this.timer = setTimeout(() => this.sync(), 800); },
  merge(list) {
    const before = JSON.stringify([this.active, this.items[this.active] && this.items[this.active].ids, this.items[this.active] && this.items[this.active].beats]);
    let changed = false;
    for (const s of list) {
      if (!s || typeof s.id !== 'string' || typeof s.nom !== 'string' || !Array.isArray(s.ids)) continue;
      const l = this.items[s.id];
      if (!l || s.modifie > l.modifie) { this.items[s.id] = s; changed = true; }
    }
    if (!changed) return;
    const x = this.cur();
    const shown = JSON.stringify([this.active, x.ids, x.beats]) !== before;
    if (shown && !PL.dragging) this.apply(x);
    this.save();
    if (shown && !PL.dragging) MIX.autoSync();
    plsRedraw();
  },
  async sync() {
    if (!(S.online === true)) return;
    if (this.busy) { this.again = true; return; }
    this.busy = true;
    try {
      const r = await api('/api/playlists/sync', { method: 'POST', json: { playlists: Object.values(this.items) }, timeout: 15000 });
      if (r && Array.isArray(r.playlists)) this.merge(r.playlists);
    } catch (e) { /* PC injoignable ou ancienne version de Kadans : la copie de cet appareil continue de servir */ }
    this.busy = false;
    if (this.again) { this.again = false; this.schedule(); }
  },
};
PLS.load();
function plsRedraw() {
  if (PL.dragging) return;
  if (S.tab === 'mix' && MIX.ui.plDraw) { MIX.ui.plDraw(); plMark(); return; }
  if (S.tab !== 'playlist') return;
  if (PL.sheetDraw) PL.sheetDraw();
  else if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
  else render();
  plRefresh(); plMark();
}
// choix de la playlist, en haut de la fenêtre « Ma playlist »
function plsBar(again) {
  const sel = h('select', { class: 'input pls-sel', 'aria-label': 'Choisir la playlist' }, PLS.list().map((x) => h('option', { value: x.id }, x.nom)));
  sel.value = PLS.active;
  sel.onchange = () => { PLS.activate(sel.value); again(); };
  const now = PLS.nowLabel();
  const named = (title, value, fn) => { const nom = (prompt(title, value) || '').trim(); if (nom) { fn(nom); again(); } };
  return h('div', { class: 'pls-bar' }, sel,
    h('div', { class: 'pl-sheet-tools' },
      h('button', { class: 'pg-btn sm', type: 'button', onclick: () => named('Nom de la nouvelle playlist', '', (n) => PLS.create(n)) }, 'Nouvelle'),
      h('button', { class: 'pg-btn sm', type: 'button', onclick: () => named('Renommer la playlist', PLS.cur().nom, (n) => PLS.rename(n)) }, 'Renommer'),
      h('button', { class: 'pg-btn sm', type: 'button', onclick: () => { if (confirm('Supprimer la playlist « ' + PLS.cur().nom + ' » ?\nLes morceaux ne sont pas touchés. Elle disparaît aussi du PC.')) { PLS.remove(); again(); } } }, 'Supprimer')),
    now ? h('div', { class: 'pls-now' }, 'En cours : ' + now) : null);
}
const plAll = () => allTracks().filter((t) => t.type !== 'video');
function plTracks() { const by = new Map(plAll().map((t) => [t.id, t])); return PL.ids.map((id) => by.get(id)).filter(Boolean); }
function plSet(id, on) { const i = PL.ids.indexOf(id); if (on && i < 0) PL.ids.push(id); if (!on && i >= 0) PL.ids.splice(i, 1); }
// rafraîchit l'onglet (état du mix, compteurs) sans le redessiner en entier
function plRefresh() {
  if (S.tab !== 'playlist') return;
  const box = $('#pl-status'); if (box) box.replaceWith(plStatus());
  const bar = $('#pl-bar'); if (bar) bar.replaceWith(plBar());
}
function plStatus() {
  const au = MIX.auto;
  if (!au) return h('div', { id: 'pl-status', hidden: true });
  const cur = MIX.decks[au.cur], now = au.list[au.i], next = au.list[au.i + 1];
  const t = cur.el ? cur.el.currentTime : 0, dur = cur.el && cur.el.duration || 0;
  const start = cur.points ? cur.points.mixStart : dur - 16;
  return h('div', { class: 'pl-status', id: 'pl-status' },
    h('div', { class: 'pl-st-line' }, h('span', null, 'En cours'), h('b', null, now ? now.titre : '—'), h('em', null, 'platine ' + au.cur)),
    next ? h('div', { class: 'pl-st-line' }, h('span', null, 'Ensuite'), h('b', null, next.titre), h('em', null, 'platine ' + (au.cur === 'A' ? 'B' : 'A'))) : null,
    h('div', { class: 'progress' }, h('div', { style: 'width:' + (dur ? Math.min(100, t / dur * 100) : 0) + '%' })),
    h('p', { class: 'ui-note', style: 'margin:0' }, au.fading ? 'Transition en cours… ' + Math.round(au.fade * 100) + ' %'
      : next ? (dur ? 'Transition dans ' + fmtTime(Math.max(0, start - t)) : 'Préparation…') : 'Dernier morceau de la playlist'),
    h('div', { class: 'pl-st-btns' },
      h('button', { class: 'pg-btn sm', type: 'button', onclick: () => setTab('mix') }, 'Voir les platines'),
      next ? h('button', { class: 'pg-btn sm', type: 'button', onclick: () => MIX.autoFade() }, 'Passer au suivant') : null,
      h('button', { class: 'pg-btn sm danger', type: 'button', onclick: () => { const d = MIX.decks[MIX.auto.cur]; MIX.autoStop(); d.el.pause(); } }, 'Arrêter')));
}
function plBar() {
  const list = plTracks(), total = list.reduce((a, t) => a + (t.duree || 0), 0);
  return h('div', { class: 'pl-bar', id: 'pl-bar' },
    h('button', { class: 'pl-bar-list', type: 'button', onclick: plSheet },
      h('b', null, PLS.cur().nom),
      h('span', null, list.length ? list.length + ' morceau' + (list.length > 1 ? 'x' : '') + ' · ' + (fmtTime(total) || '') + ' · voir l’ordre' : 'Aucun morceau · touche ici pour choisir une playlist')),
    h('button', { class: 'pg-btn primary', type: 'button', disabled: !list.length, onclick: () => MIX.autoStart(plTracks(), PL.beats) },
      MIX.auto && MIX.auto.plId === PLS.active ? 'Relancer' : 'Mixer'));
}
// fenêtre « Ma playlist » : glisser une ligne pour changer l'ordre (appui maintenu, ou tout de suite par la poignée)
function plRowDrag(row, ol, done) {
  let timer = 0, x0 = 0, y0 = 0, on = false, raf = 0, lastY = 0;
  const mid = (x) => { const r = x.getBoundingClientRect(); return r.top + r.height / 2; };
  const renumber = () => [...ol.children].forEach((li, i) => { li.querySelector('.pl-num').textContent = String(i + 1); });
  const move = () => {   // ce sont les voisines qui bougent : la ligne tenue reste en place dans la page
    let changed = false, prev, next;
    while ((prev = row.previousElementSibling) && lastY < mid(prev)) { ol.insertBefore(prev, row.nextElementSibling); changed = true; }
    while ((next = row.nextElementSibling) && lastY > mid(next)) { ol.insertBefore(next, row); changed = true; }
    if (changed) renumber();
  };
  const loop = () => {   // près du bord de la liste : elle défile toute seule
    if (!on) return;
    const r = ol.getBoundingClientRect();
    if (lastY < r.top + 36) ol.scrollTop -= 7; else if (lastY > r.bottom - 36) ol.scrollTop += 7;
    move();
    raf = requestAnimationFrame(loop);
  };
  const begin = () => { on = true; PL.dragging = true; lastY = y0; row.classList.add('pl-dragging'); raf = requestAnimationFrame(loop); };
  const end = (save) => {
    clearTimeout(timer);
    if (!on) return;
    on = false; PL.dragging = false; cancelAnimationFrame(raf); row.classList.remove('pl-dragging');
    done(save);
  };
  row.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1 || e.target.closest('button')) return;
    x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
    clearTimeout(timer);
    if (e.target.closest('.pl-grip')) { e.stopPropagation(); begin(); }
    else timer = setTimeout(begin, 250);
  }, { passive: true });
  row.addEventListener('touchmove', (e) => {
    const p = e.touches[0];
    if (!on) { if (Math.hypot(p.clientX - x0, p.clientY - y0) > 10) clearTimeout(timer); return; }   // on fait défiler la liste
    e.preventDefault(); e.stopPropagation();   // ni défilement, ni fermeture de la fenêtre
    lastY = p.clientY;
    move();
  }, { passive: false });
  row.addEventListener('touchend', () => end(true));
  row.addEventListener('touchcancel', () => end(false));
  row.addEventListener('contextmenu', (e) => { if (on || timer) e.preventDefault(); });
}
// repère le morceau en cours dans la fenêtre
function plMark() {
  const au = MIX.auto && MIX.auto.plId === PLS.active ? MIX.auto : null, cur = au && au.list[au.i];
  document.querySelectorAll('.pl-order li').forEach((li) => li.classList.toggle('pl-now', !!cur && li.dataset.id === cur.id));
}
function plOrderEl(again) {
  const list = plTracks();
  const mk = (txt, label, fn, off) => h('button', { class: 'icon-btn pl-mv', type: 'button', 'aria-label': label, disabled: !!off, onclick: () => { fn(); again(); } }, txt);
  const ol = h('ol', { class: 'pl-order' }, list.map((t, i) => h('li', { 'data-id': t.id },
    h('span', { class: 'pl-grip', 'aria-hidden': 'true' }, '≡'),
    h('span', { class: 'pl-num' }, String(i + 1)),
    h('span', { class: 'meta' }, h('span', { class: 't1' }, t.titre), h('span', { class: 't2' }, [t.artiste, t.bpm ? t.bpm + ' BPM' : null].filter(Boolean).join(' · '))),
    mk('↑', 'Monter', () => { const j = PL.ids.indexOf(t.id); if (j > 0) { PL.ids.splice(j, 1); PL.ids.splice(j - 1, 0, t.id); plSave(); } }, i === 0),
    mk('↓', 'Descendre', () => { const j = PL.ids.indexOf(t.id); if (j < PL.ids.length - 1) { PL.ids.splice(j, 1); PL.ids.splice(j + 1, 0, t.id); plSave(); } }, i === list.length - 1),
    mk('✕', 'Retirer', () => { plSet(t.id, false); plSave(); }))));
  [...ol.children].forEach((row) => plRowDrag(row, ol, (save) => {
    if (save) {
      const order = [...ol.children].map((li) => li.dataset.id), shown = new Set(order);
      let k = 0;
      PL.ids = PL.ids.map((id) => (shown.has(id) ? order[k++] : id));
      plSave();
    }
    again();
  }));
  return ol;
}
function plSheet() {
  const draw = () => {
    const list = plTracks();
    const again = () => { body.replaceWith(draw()); plRefresh(); plMark(); };
    const body = h('div', { class: 'pg', id: 'pl-sheet-body', style: 'gap:12px' },
      plsBar(again),
      h('div', null, h('h2', { style: 'margin:0;font-size:20px' }, PLS.cur().nom), h('p', { class: 'pg-muted' }, list.length + ' morceau' + (list.length > 1 ? 'x' : '') + ' · les platines A et B s’alternent, transition juste avant que chaque morceau ne baisse.')),
      h('div', { class: 'pl-sheet-tools' },
        h('button', { class: 'pg-btn sm', type: 'button', onclick: () => { const by = new Map(plAll().map((t) => [t.id, t])); PL.ids.sort((a, b) => ((by.get(a) || {}).bpm || 999) - ((by.get(b) || {}).bpm || 999)); plSave(); body.replaceWith(draw()); } }, 'Trier par BPM'),
        h('button', { class: 'pg-btn sm', type: 'button', onclick: () => { for (let i = PL.ids.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [PL.ids[i], PL.ids[j]] = [PL.ids[j], PL.ids[i]]; } plSave(); body.replaceWith(draw()); } }, 'Mélanger'),
        h('button', { class: 'pg-btn sm', type: 'button', onclick: () => { PL.ids = []; plSave(); closeSheet(); render(); } }, 'Vider')),
      h('div', { class: 'pg-seg', role: 'group', 'aria-label': 'Durée de la transition' }, [8, 16, 32].map((n) => h('button', { type: 'button', 'aria-pressed': String(PL.beats === n),
        onclick: () => { PL.beats = n; plSave(); body.replaceWith(draw()); } }, 'Transition ' + n + ' temps'))),
      MIX.auto && MIX.auto.plId === PLS.active ? h('p', { class: 'pg-muted', style: 'margin:0' }, 'Mix en cours : le nouvel ordre s’applique tout de suite aux morceaux qui suivent celui en cours.') : null,
      plOrderEl(again),
      h('button', { class: 'pg-btn primary', type: 'button', disabled: !list.length, onclick: () => { closeSheet(); MIX.autoStart(plTracks(), PL.beats); } }, MIX.auto && MIX.auto.plId === PLS.active ? 'Relancer depuis le début' : 'Mixer ' + list.length + ' morceau' + (list.length > 1 ? 'x' : '')));
    return body;
  };
  PL.sheetDraw = () => { const b = document.getElementById('pl-sheet-body'); if (b) b.replaceWith(draw()); };
  openSheet(draw, () => { PL.sheetDraw = null; if (S.tab === 'playlist') render(); });
  plMark();
}
function viewPlaylist() {
  const all = plAll();
  const wrap = h('div', { class: 'pl-page' });
  const count = h('p', { class: 'sub' });
  const setCount = () => { const k = plTracks().length; count.textContent = all.length + ' morceaux' + (k ? ' · ' + k + ' coché' + (k > 1 ? 's' : '') : ''); };
  setCount();
  wrap.append(h('div', { class: 'top', style: 'align-items:flex-end' }, h('div', null, h('h1', null, 'Playlist'), count), statusPill()));
  wrap.append(plStatus());
  const q = h('input', { class: 'input', type: 'search', placeholder: 'Titre, artiste ou BPM…', 'aria-label': 'Rechercher', value: PL.q });
  wrap.append(h('div', { class: 'search' }, h('span', { html: iconHTML('search', 18), style: 'color:#A3A3AD' }), q));
  const folders = h('div'), list = h('div');
  wrap.append(folders, list, plBar());
  const shown = () => {
    const query = PL.q.trim().toLowerCase();
    return all.filter((t) => (PL.folder == null || inFolder(t, PL.folder)) && (!query
      || (/^\d{2,3}$/.test(query) ? t.bpm && Math.abs(t.bpm - +query) <= 3 : ((t.titre || '') + ' ' + (t.artiste || '') + ' ' + (t.categorie || '')).toLowerCase().includes(query))));
  };
  const draw = () => {
    // fil d'Ariane + dossiers en tuiles, comme dans la Bibliothèque
    const F = PL.folder, fl = allFolders(all);
    const crumb = (f, label) => h('button', { type: 'button', 'aria-current': F === f ? 'page' : null, onclick: () => { PL.folder = f; draw(); $('#view').scrollTop = 0; } }, label);
    const crumbs = h('div', { class: 'crumbs' }, crumb(null, 'Tous les dossiers'));
    if (F === '') crumbs.append(h('span', { class: 'sep' }, '›'), crumb('', 'Sans catégorie'));
    else if (F) F.split('/').forEach((seg, i, arr) => crumbs.append(h('span', { class: 'sep' }, '›'), crumb(arr.slice(0, i + 1).join('/'), seg)));
    const subs = F === '' ? [] : fl.filter((c) => parentOf(c) === (F || null));
    const tile = (f, label) => {
      const inside = all.filter((t) => inFolder(t, f)), k = inside.filter((t) => PL.ids.includes(t.id)).length;
      return h('button', { class: 'ftile' + (k ? ' pl-has' : ''), type: 'button', onclick: () => { PL.folder = f; draw(); $('#view').scrollTop = 0; } },
        h('span', { class: 'ico', html: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>' }),
        h('span', { class: 'm' }, h('span', { class: 't1' }, label), h('span', { class: 't2' }, inside.length + ' morceau' + (inside.length > 1 ? 'x' : '') + (k ? ' · ' + k + ' coché' + (k > 1 ? 's' : '') : ''))));
    };
    const tiles = subs.map((c) => tile(c, c.split('/').pop()));
    if (F == null && all.some((t) => t.categorie === '')) tiles.push(tile('', 'Sans catégorie'));
    const rows = shown();
    const playable_ = rows.filter((t) => playable(t));
    const allOn = playable_.length && playable_.every((t) => PL.ids.includes(t.id));
    const acts = h('div', { class: 'factions' }, h('button', { class: 'btn small', type: 'button', disabled: !playable_.length, onclick: () => {
      playable_.forEach((t) => plSet(t.id, !allOn)); plSave(); draw(); setCount(); plRefresh();
    } }, ico('check', 18), allOn ? 'Tout décocher (' + rows.length + ')' : 'Tout cocher (' + playable_.length + ')'));
    // tout désélectionner : vide la playlist entière, quel que soit le dossier ouvert
    if (PL.ids.length) acts.append(h('button', { class: 'btn small ghost', type: 'button', onclick: () => {
      if (!confirm(`Désélectionner les ${PL.ids.length} morceau(x) de la playlist ?`)) return;
      PL.ids = []; plSave(); draw(); setCount(); plRefresh();
    } }, ico('trash', 18), 'Tout désélectionner (' + PL.ids.length + ')'));
    folders.replaceChildren(crumbs, ...(tiles.length ? [h('div', { class: 'ftiles' }, tiles)] : []), acts);
    // lignes de morceaux, comme dans la Bibliothèque, avec une case à cocher
    list.replaceChildren(...(rows.length ? rows.slice(0, 400).map((t) => {
      const ok = playable(t), on = PL.ids.includes(t.id);
      const c = h('input', { type: 'checkbox', 'aria-label': 'Dans la playlist : ' + t.titre }); c.checked = on; c.disabled = !ok;
      const pos = h('span', { class: 'pl-pos' }, on ? String(PL.ids.indexOf(t.id) + 1) : '');
      const row = h('label', { class: 'track pl-track' + (on ? ' on' : '') + (ok ? '' : ' off') }, c, coverEl(t),
        h('span', { class: 'meta' }, h('span', { class: 't1' }, t.titre),
          h('span', { class: 't2' }, [t.artiste, t.duree ? fmtTime(t.duree) : null].filter(Boolean).join(' · ') || (ok ? '' : 'PC injoignable'))),
        pos, h('span', { class: 'bpm' + (t.bpm ? '' : ' wait') }, t.bpm ? t.bpm : '…'));
      c.onchange = () => { plSet(t.id, c.checked); plSave(); draw(); setCount(); plRefresh(); };
      return row;
    }) : [h('div', { class: 'empty' }, PL.q ? 'Aucun morceau ne correspond.' : 'Aucun morceau dans ce dossier.')]));
  };
  q.oninput = () => { PL.q = q.value; draw(); };
  if (PL.folder !== undefined && PL.folder !== null && !allFolders(all).includes(PL.folder) && PL.folder !== '') PL.folder = null;
  draw();
  return wrap;
}
setInterval(() => { if ((S.tab === 'playlist' || S.tab === 'mix') && MIX.auto) { const b = $('#pl-status'); if (b) b.replaceWith(plStatus()); plMark(); } }, 1000);

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
  chips.append(mk('tout', 'Tout'), mk('iphone', ON_ANDROID ? 'Mobile' : 'Sur l’iPhone'), mk('clips', 'Clips'));
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
        h('span', { class: 't2' }, kept + ' morceau' + (kept > 1 ? 'x' : '') + ' sur l’iPhone')));   // seulement ceux gardés ici, pas le total du PC
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
  S.rowsSig = rowsSig(list);
  list.slice(0, max).forEach((t) => box.append(trackRow(t, list)));
  if (list.length > max) box.append(h('div', { class: 'empty' }, `+ ${list.length - max} autres : affine ta recherche.`));
}
// empreinte de ce que montre la liste : si rien n'a changé, on ne la reconstruit pas (moins de travail, pas de pochettes redemandées)
function rowsSig(list) {
  return [S.offline.size, [...S.saving.keys()].join(), S.current && S.current.id, S.online, S.folder,
    Object.values(MIX.decks).map((d) => d.track && d.track.id).join(),
    list.length, list.slice(0, 400).map((t) => [t.id, t.titre, t.artiste, t.bpm, t.duree, t.categorie].join('\u0001')).join('\u0002')].join('|');
}
function refreshTrackRows(periodic) {
  if (DRAG.on) return;   // pas de redessin pendant qu'un morceau est en train d'être glissé
  if (periodic && S.tab === 'biblio' && $('#list') && S.rowsSig === rowsSig(filteredTracks())) {
    const c = $('#count'); if (c) c.textContent = dev(`${allTracks().length} morceaux · ${S.offline.size} sur l’iPhone`);
    return;
  }
  try { refreshRows(); } catch (e) { render(); }   // render() affiche l'erreur au lieu d'un écran vide
}
function refreshRows() {
  if (S.tab === 'biblio') { renderList(); const c = $('#count'); if (c) c.textContent = dev(`${allTracks().length} morceaux · ${S.offline.size} sur l’iPhone`); }
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
  if (S.online) return fileURL(t.id, LIBNORM() ? 1 : 0);
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
['play', 'pause', 'ended', 'emptied'].forEach((ev) => player.addEventListener(ev, () => updateAwake()));   // emptied : bouton ✕ (lecteur vidé)
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
          window.dispatchEvent(new Event('kadans-relie'));   // l'écran d'accueil laisse place à la page du code
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
    if (e.target.closest('input[type=range], input, textarea, select, video, canvas, .pl-order')) return;   // curseurs, saisie, liste à réordonner : pas de glisser
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

// ---- anneau de LED autour d'une platine : vertes qui tournent au tempo quand elle joue, rouges à l'arrêt
function ledSize(r) { return Math.max(1.6, r * 0.022); }
function drawLeds(g, r, state, beatHz) {
  const n = r > 110 ? 48 : 36, s = ledSize(r), rr = r - s - 1.5, now = performance.now() / 1000;
  const on = state === 'play' ? '#7FD6A0' : '#EC6464';   // vert et rouge doux mais présents
  for (let i = 0; i < n; i++) {
    const a = i / n * 2 * Math.PI - Math.PI / 2;
    let k;
    if (state === 'play') {   // 2 traînées lumineuses qui tournent (1 tour = 8 temps)
      const x = (((i / n - now * beatHz / 8) * 2) % 1 + 1) % 1;
      k = 0.12 + 0.43 * Math.pow(1 - x, 2.4);   // vert léger : 55 % au plus fort
    } else k = state === 'stop' ? 0.75 : 0.22;   // morceau chargé à l'arrêt : rouge ; platine vide : rouge éteint
    g.globalAlpha = k;
    g.shadowColor = on; g.shadowBlur = 0;   // pas de halo sur le téléphone : le flou coûte cher à chaque image
    g.fillStyle = on;
    g.beginPath(); g.arc(r + Math.cos(a) * rr, r + Math.sin(a) * rr, s, 0, 7); g.fill();
  }
  g.globalAlpha = 1; g.shadowBlur = 0;
}

// ---- écran toujours allumé pendant la musique : sinon l'iPhone se met en veille et coupe les platines
const AWAKE = { lock: null, asking: false };
async function updateAwake() {
  const playing = !player.paused || Object.values(MIX.decks).some((d) => d.el && !d.el.paused);
  if (NATIVE) { try { NATIVE.keepAwake(!!(playing || SYNC.running)); } catch (e) { /* ancienne app */ } return; }   // app Android : écran gardé allumé
  if (playing && !AWAKE.lock && !AWAKE.asking && navigator.wakeLock && document.visibilityState === 'visible') {
    AWAKE.asking = true;
    try {
      AWAKE.lock = await navigator.wakeLock.request('screen');
      AWAKE.lock.addEventListener('release', () => { AWAKE.lock = null; });
    } catch (e) { /* refusé (économie d'énergie…) : on réessaiera au prochain lancement */ }
    AWAKE.asking = false;
  } else if (!playing && AWAKE.lock && !SYNC.running) {
    const l = AWAKE.lock; AWAKE.lock = null;
    l.release().catch(() => {});
  }
}

// ---- iPhone : iOS coupe la table de mixage dès que l'app est cachée, mais laisse jouer un lecteur simple
// déjà en route (il refuse d'en démarrer un à ce moment-là). Un lecteur simple suit donc en muet la platine
// audible ; en arrière-plan on lui rend le son (sans crossfade ni effets, morceaux enchaînés à la fin),
// et les platines reprennent au même endroit au retour dans l'app.
const IOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
// tablette : grand écran (mesuré sur le petit côté, pour ne pas changer en tournant l'appareil)
const TABLET = Math.min(screen.width, screen.height) >= 600;
document.body.classList.toggle('tablet', TABLET);
const SILENCE = 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQIAAAAAAA==';
const RELAY = {
  el: null, active: false, failed: false, deck: null, armed: null, track: null, ownUrl: null, armTrack: null, armUrl: null, retried: false, why: '', manual: false, t0: 0, wantPos: null, tries: 0, returning: false, tapFn: null, log: [],
  // à appeler pendant un geste de l'utilisateur : iOS n'autorise le lecteur qu'à cette condition
  setup() {
    if (!IOS || this.el) return;
    try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) { /* ancien iOS */ }
    const el = this.el = new Audio();
    el.playsInline = true; el.preservesPitch = true; el.webkitPreservesPitch = true;
    el.addEventListener('ended', () => this.onEnded());
    el.addEventListener('pause', () => { if (this.active && !this.manual && !el.ended) this.note('lecteur interrompu'); });
    el.addEventListener('error', () => { if (this.active) this.note('erreur ' + (el.error ? el.error.code : '?')); });
    for (const ev of ['loadedmetadata', 'canplay', 'playing', 'seeked', 'timeupdate']) el.addEventListener(ev, () => this.applyWant(ev));
    for (const ev of ['playing', 'seeked', 'pause', 'waiting', 'ended', 'error']) el.addEventListener(ev, () => { if (this.active) this.trace(ev + ' à ' + el.currentTime.toFixed(1)); });
    el.src = SILENCE;
    el.play().catch(() => {});
    setInterval(() => this.tick(), 1500);
  },
  // iOS ignore parfois un déplacement, même morceau déjà annoncé comme chargé : on recommence jusqu'à le voir jouer au bon endroit
  seekTo(pos) { this.wantPos = pos; this.tries = 0; this.applyWant(); },
  applyWant(ev) {
    const el = this.el;
    if (this.wantPos == null || el.readyState < 1 || el.seeking) return;
    const t = !this.active && this.armed ? this.armed.el.currentTime : this.wantPos;
    if (Math.abs(el.currentTime - t) < 1) { if (ev === 'timeupdate' && !el.paused) this.wantPos = null; return; }
    if (this.tries++ >= 12) { this.trace('déplacement abandonné, reste à ' + el.currentTime.toFixed(1)); this.wantPos = null; return; }
    try { el.currentTime = t; } catch (e) { /* pas encore possible */ }
  },
  trace(msg) {   // lignes identiques à la suite regroupées (« ×9 ») pour que le journal tienne à l'écran
    const last = this.log[this.log.length - 1] || '', m = last.match(/^[\d.]+ s : (.*?)(?: ×(\d+))?$/);
    if (m && m[1] === msg) { this.log[this.log.length - 1] = last.replace(/(?: ×\d+)?$/, ' ×' + ((+m[2] || 1) + 1)); return; }
    if (this.log.length < 40) this.log.push(((Date.now() - this.t0) / 1000).toFixed(1) + ' s : ' + msg);
  },
  // journal affiché au retour dans l'app, pour comprendre ce que fait iOS
  showLog() {
    const old = document.getElementById('relay-log'); if (old) old.remove();
    document.body.append(h('div', { id: 'relay-log', style: 'position:fixed;left:8px;right:8px;top:calc(env(safe-area-inset-top) + 8px);z-index:200;max-height:45vh;overflow:auto;padding:10px;border-radius:12px;background:#000;color:#fff;font:12px/1.35 monospace;white-space:pre-wrap;-webkit-user-select:text;user-select:text;border:1px solid #666', onclick: (e) => { if (e.target.tagName === 'BUTTON') e.currentTarget.remove(); } },
      'Arrière-plan v68\n' + this.log.join('\n') + '\n', h('button', { type: 'button', style: 'margin-top:6px;padding:6px 12px' }, 'Fermer')));
  },
  // lecteur muet : réessaie s'il a été refusé, et reste calé sur la platine
  tick() {
    if (!this.el || this.active) return;
    this.follow();
    const d = this.armed, el = this.el;
    if (!d || el.paused || el.readyState < 1) return;
    if (Math.abs(el.currentTime - d.el.currentTime) > 0.25) this.seekTo(d.el.currentTime);
    if (el.playbackRate !== d.el.playbackRate) el.playbackRate = d.el.playbackRate;
  },
  // pour comprendre une coupure : affiché au retour dans l'app
  note(msg) { if (!this.why) this.why = msg + ' après ' + ((Date.now() - this.t0) / 1000).toFixed(1) + ' s'; },
  // le lecteur muet accompagne la platine audible (ou celle qui arrive pendant une transition)
  follow() {
    if (!this.el || this.active) return;
    const d = MIX.fadeTarget || MIX.audible();
    if (!d || d.el.paused || !d.el.currentSrc) {
      this.armed = null;
      if (!this.el.paused) this.el.pause();
      return;
    }
    if (d !== this.armed || this.el.paused || this.armTrack !== d.track || this.el.src !== this.armUrl) this.arm(d);
  },
  // Le secours a SA copie du morceau : partager le lien de la platine lui donnait un fichier vide sur iPhone
  // (journal v63 : chargé, mais « ended à 0.0 » et aucun déplacement possible).
  async ownSrc(t) {
    if (this.armTrack === t && this.armUrl) { if (this.el.src !== this.armUrl) this.el.src = this.armUrl; return this.armUrl; }
    let url = await sourceFor(t);
    try { url = new URL(url, location.href).href; } catch (e) { /* déjà complet */ }   // même écriture que el.src, pour comparer
    if (this.armUrl && this.armUrl.startsWith('blob:')) URL.revokeObjectURL(this.armUrl);
    this.armTrack = t; this.armUrl = url;
    if (this.el.src !== url) this.el.src = url;
    return url;
  },
  async arm(d) {
    const el = this.el;
    this.armed = d;
    if (this.armTrack !== d.track || el.src !== this.armUrl) {
      if (this.arming === d.track) return;   // copie déjà en préparation
      this.arming = d.track;
      try { await this.ownSrc(d.track); } catch (e) { return; } finally { this.arming = null; }
      if (this.active || this.armed !== d) return;
    }
    el.muted = true;
    if (Math.abs(el.currentTime - d.el.currentTime) > 0.3) this.seekTo(d.el.currentTime);
    el.playbackRate = d.el.playbackRate;
    if (el.paused) el.play().catch(() => {});
  },
  session() {
    if (!('mediaSession' in navigator)) return;
    const t = this.track, au = MIX.auto;
    navigator.mediaSession.metadata = new MediaMetadata({ title: t.titre, artist: t.artiste || 'Kadans', album: 'Kadans' });
    navigator.mediaSession.setActionHandler('play', () => this.el.play());
    navigator.mediaSession.setActionHandler('pause', () => { this.manual = true; this.el.pause(); });
    navigator.mediaSession.setActionHandler('previoustrack', null);
    navigator.mediaSession.setActionHandler('nexttrack', au ? () => this.onEnded() : null);
  },
  start() {
    if (this.active && this.returning) { this.cancelTap(); this.returning = false; return; }   // reparti sans avoir repris les platines : le secours continue
    if (!this.el || this.active || !player.paused) return;
    if (MIX.fadeFinish) MIX.fadeFinish();   // transition en cours : on la termine d'un coup
    const d = MIX.audible();
    if (!d || !d.el.currentSrc) return;
    const el = this.el;
    const ready = this.armTrack === d.track && el.src === this.armUrl;
    if (!ready) el.src = this.armTrack === d.track && this.armUrl ? this.armUrl : d.el.currentSrc;   // copie pas encore prête : lien de la platine en dernier recours
    if (Math.abs(el.currentTime - d.el.currentTime) > 0.4) this.seekTo(d.el.currentTime);
    el.playbackRate = d.el.playbackRate;
    this.t0 = Date.now();
    const kind = (u) => (u || '').startsWith('blob:') ? 'iPhone' : 'PC';
    this.log = ['secours avant : ' + (el.paused ? 'arrêté' : 'joue') + ', chargé ' + el.readyState + ', à ' + el.currentTime.toFixed(1) + ' / ' + (el.duration || 0).toFixed(1) + ', muet ' + el.muted + ', copie ' + (ready ? 'à lui (' + kind(el.src) + ')' : 'partagée') + ' ; platine à ' + d.el.currentTime.toFixed(1) + ' / ' + (d.el.duration || 0).toFixed(1) + ' (' + kind(d.el.currentSrc) + ') ; moteur ' + MIX.ctx.state];
    this.active = true; this.failed = false; this.manual = false; this.why = ''; this.retried = false; this.deck = d; this.track = d.track;
    el.muted = false;
    if (el.paused || el.ended) el.play().catch((e) => { if (!this.retried) { this.failed = true; this.note('démarrage refusé (' + (e.name || '?') + ')'); } });
    // copie vue vide (iOS ne la charge pas tant que l'app est au premier plan) : nouvelle copie tout de suite
    if (!(el.duration > 1)) {
      this.retried = true;
      const pos = d.el.currentTime, t = d.track;
      this.trace('copie vide (durée ' + (el.duration || 0).toFixed(1) + ') : nouvelle copie');
      this.armTrack = null;
      this.ownSrc(t).then(() => { if (!this.active) return; this.seekTo(pos); return el.play(); })
        .then(() => this.trace('nouvelle copie : joue'))
        .catch((e) => { this.failed = true; this.note('nouvelle copie refusée (' + (e.name || '?') + ')'); });
    }
    MIX.pauseAll();
    this.session();
  },
  async onEnded() {
    if (!this.active) return;
    // fini bien avant la fin du morceau (fichier vide pour ce lecteur) : nouvelle copie, au même endroit, une fois
    const dur = this.track && this.track.duree, at = Math.max(this.el.currentTime, this.deck ? this.deck.el.currentTime : 0);
    if (dur && this.el.currentTime < dur - 3 && !this.retried) {
      this.retried = true;
      this.trace('fin trop tôt (' + this.el.currentTime.toFixed(1) + ' / ' + dur.toFixed(0) + ') : nouvelle copie');
      this.armTrack = null;
      try { await this.ownSrc(this.track); this.seekTo(at); await this.el.play(); } catch (e) { this.note('nouvelle copie refusée (' + (e.name || '?') + ')'); }
      return;
    }
    const au = MIX.auto, next = au && au.list[au.i + 1];
    if (!next) { this.el.pause(); if (au) MIX.autoStop(); return; }
    au.i++; this.track = next; this.retried = false;
    try {
      const url = await sourceFor(next);
      if (!this.active) { if (url.startsWith('blob:')) URL.revokeObjectURL(url); return; }
      if (this.ownUrl) URL.revokeObjectURL(this.ownUrl);
      this.ownUrl = url.startsWith('blob:') ? url : null;
      this.wantPos = null;
      this.el.src = url; this.el.playbackRate = 1;
      await this.el.play();
      this.session();
    } catch (e) { /* morceau illisible : la musique s'arrête, l'app reste dans un état propre */ }
  },
  // Au retour, le secours continue de jouer tant que les platines n'ont pas vraiment repris :
  // iOS peut exiger un toucher de l'écran pour relancer la table de mixage.
  async back() {
    if (!this.active || this.returning) return;
    this.returning = true;
    MIX.ensure();
    this.trace('retour : secours ' + (this.el.paused ? 'arrêté' : 'joue') + ' à ' + this.el.currentTime.toFixed(1) + ' ; moteur ' + MIX.ctx.state);
    if (await this.handBack() || !this.returning) return;
    this.waitTap();
  },
  waitTap() {
    this.trace('platines refusées : attente d’un toucher');
    this.showLog();
    toast('Touche l’écran pour reprendre les platines', 4000);
    this.tapFn = () => {
      this.tapFn = null;
      MIX.ensure();
      if (this.deck.track === this.track) this.deck.el.play().catch(() => {});
      const stop = (e) => { e.stopPropagation(); e.preventDefault(); };   // ce toucher ne doit pas aussi actionner un bouton
      document.addEventListener('click', stop, { capture: true, once: true });
      setTimeout(() => document.removeEventListener('click', stop, { capture: true }), 500);
      this.handBack().then((ok) => { if (!ok && this.returning) this.waitTap(); });
    };
    document.addEventListener('pointerdown', this.tapFn, { capture: true, once: true });
  },
  cancelTap() { if (this.tapFn) document.removeEventListener('pointerdown', this.tapFn, { capture: true }); this.tapFn = null; },
  async handBack() {
    const el = this.el, d = this.deck, t = this.track;
    const resume = this.failed || !!this.why || !(el.paused || el.ended);
    if (d.track !== t) {   // le mix a avancé pendant l'absence : les platines se recalent
      await MIX.load(d.letter, t);
      if (!this.returning) return false;
      const au = MIX.auto;
      if (au && au.list[au.i + 1]) MIX.load(d.letter === 'A' ? 'B' : 'A', au.list[au.i + 1]);
    }
    // jamais de retour en arrière par rapport à l'endroit où la platine s'était arrêtée
    const pos = this.failed ? d.el.currentTime : Math.max(el.currentTime, d.el.currentTime);
    try { d.el.currentTime = pos; } catch (e) { /* début */ }
    if (!resume) { this.finish(); return true; }
    await Promise.race([MIX.ctx.resume().catch(() => {}), new Promise((r) => setTimeout(r, 700))]);
    if (!this.returning) return false;
    if (MIX.ctx.state !== 'running') { this.trace('moteur toujours ' + MIX.ctx.state); return false; }
    try { await d.el.play(); } catch (e) { this.trace('platine refusée : ' + (e.name || '?')); return false; }
    if (!this.returning) { d.el.pause(); return false; }
    if (!this.failed && !el.paused && el.currentTime - d.el.currentTime > 0.3) { try { d.el.currentTime = el.currentTime; } catch (e) { /* tant pis */ } }
    this.trace('platine reprise à ' + d.el.currentTime.toFixed(1));
    this.finish();
    return true;
  },
  finish() {
    const el = this.el;
    this.cancelTap();
    this.active = false; this.returning = false;
    el.pause(); el.muted = true; this.failed = false; this.armed = null; this.wantPos = null;
    if ('mediaSession' in navigator) {
      for (const a of ['play', 'pause', 'previoustrack', 'nexttrack']) navigator.mediaSession.setActionHandler(a, null);
      navigator.mediaSession.metadata = null;
      if (S.current) mediaSession(S.current);
    }
    this.showLog();
    this.follow();
  },
};
document.addEventListener('visibilitychange', () => { if (document.hidden) RELAY.start(); else RELAY.back(); });

// ---- niveau sonore égal : tous les morceaux joués à la même sonie (fichiers jamais modifiés)
// Le PC mesure chaque morceau (EBU R128, en LUFS). Sinon, estimation sur l'audio déjà décodé.
const LEVEL_TARGET = -14;   // LUFS, comme les plateformes de streaming
function estimateLufs(buf) {   // blocs de 400 ms, porte absolue -70 et relative -10 (sans filtre K : approximation)
  try {
    const chs = []; for (let c = 0; c < Math.min(2, buf.numberOfChannels); c++) chs.push(buf.getChannelData(c));
    const n = Math.floor(buf.sampleRate * 0.4), blocks = [];
    for (let s = 0; s + n <= chs[0].length; s += n) {
      let sum = 0;
      for (const ch of chs) for (let i = s; i < s + n; i += 4) sum += ch[i] * ch[i];
      blocks.push(sum / (n / 4));   // somme des canaux (comme la norme)
    }
    const lu = (ms) => -0.691 + 10 * Math.log10(ms || 1e-12);
    let kept = blocks.filter((ms) => lu(ms) > -70);
    if (!kept.length) return null;
    const rel = lu(kept.reduce((a, b) => a + b, 0) / kept.length) - 10;
    kept = kept.filter((ms) => lu(ms) > rel);
    return lu(kept.reduce((a, b) => a + b, 0) / kept.length);
  } catch (e) { return null; }
}
// ---- où mixer : début réel (après le silence) et moment où le morceau commence à baisser pour de bon
function mixPoints(buf, bpm) {
  try {
    const sr = buf.sampleRate, a = buf.getChannelData(0), b = buf.numberOfChannels > 1 ? buf.getChannelData(1) : null;
    const W = 0.5, w = Math.floor(sr * W), n = Math.floor(a.length / w);
    if (n < 30) return null;
    const e = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      let s = 0, c = 0;
      for (let j = i * w; j < (i + 1) * w; j += 16) { const v = b ? (a[j] + b[j]) / 2 : a[j]; s += v * v; c++; }
      e[i] = Math.sqrt(s / c);
    }
    const sm = new Float32Array(n);
    for (let i = 0; i < n; i++) { let s = 0, c = 0; for (let k = i - 2; k <= i + 1; k++) if (k >= 0 && k < n) { s += e[k]; c++; } sm[i] = s / c; }
    const ref = Float32Array.from(sm).sort()[Math.floor(n * 0.7)];
    let iIn = 0; while (iIn < n * 0.3 && sm[iIn] < ref * 0.25) iIn++;
    let iOut = n - 1; while (iOut > n * 0.5 && sm[iOut] < ref * 0.6) iOut--;
    const beat = bpm ? 60 / bpm : 0.5, dur = buf.duration, outro = (iOut + 1) * W;
    return { intro: Math.max(0, iIn * W - 0.25), outro, mixStart: Math.max(dur * 0.45, Math.min(outro - 8 * beat, dur - 6)) };
  } catch (e) { return null; }
}
// correction en dB pour atteindre la cible (limitée à -12 / +8 dB)
function levelGainDb(t, buf) {
  let l = t && typeof t.lufs === 'number' ? t.lufs : null;
  if (l == null && buf) l = estimateLufs(buf);
  return l == null ? 0 : Math.max(-12, Math.min(8, Math.round((LEVEL_TARGET - l) * 10) / 10));
}
const LEVEL = { get auto() { return localStorage.getItem('kadans.niveauAuto') !== '0'; } };

// ------------------------------------------------------------------ Mix : 2 platines
const MIX = {
  ctx: null, master: null, recDest: null, xf: 0.5, recorder: null, recChunks: [], autoTimer: null,
  decks: {
    A: { letter: 'A', color: 'var(--deckA)', hex: '#EE8457', el: null, node: null, gain: null, track: null, peaks: null, tempo: 0, cue: 0, url: null, angle: 0, bend: 0, held: false, coverImg: null },
    B: { letter: 'B', color: 'var(--deckb)', hex: '#8199EE', el: null, node: null, gain: null, track: null, peaks: null, tempo: 0, cue: 0, url: null, angle: 0, bend: 0, held: false, coverImg: null },
  },
  ui: {},
  ensure() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      // Casque seul (Bluetooth ou jack) : quand une platine est en pré-écoute 🎧, la sortie mélange
      // la pré-écoute et le mix (réglage « Pré-écoute ↔ Mix »). L'enregistrement garde le mix seul.
      this.outMst = this.ctx.createGain(); this.cueBus = this.ctx.createGain(); this.outCue = this.ctx.createGain();
      this.master.connect(this.outMst).connect(this.ctx.destination);
      this.cueBus.connect(this.outCue).connect(this.ctx.destination);
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
        d.lvlG = this.ctx.createGain();   // niveau sonore égal (réglé au chargement)
        d.node.connect(d.lvlG);
        let tail = d.lvlG;
        if (TABLET) {   // égaliseur 3 bandes et filtre, avant le crossfader
          const ctx = this.ctx;
          d.lo = ctx.createBiquadFilter(); d.lo.type = 'lowshelf'; d.lo.frequency.value = 220;
          d.mid = ctx.createBiquadFilter(); d.mid.type = 'peaking'; d.mid.frequency.value = 1000; d.mid.Q.value = 0.7;
          d.hi = ctx.createBiquadFilter(); d.hi.type = 'highshelf'; d.hi.frequency.value = 3500;
          d.filtN = ctx.createBiquadFilter(); d.filtN.type = 'lowpass'; d.filtN.frequency.value = 22000;
          d.eq = { lo: 0, mid: 0, hi: 0 }; d.filt = 0; d.keylock = true;
          d.lp = { on: false, a: 0, b: 0, beats: 0 };
          d.lvlG.connect(d.lo).connect(d.mid).connect(d.hi).connect(d.filtN);
          tail = d.filtN;
        }
        tail.connect(d.gain).connect(this.master);
        if (TABLET) { d.vuAn = this.ctx.createAnalyser(); d.vuAn.fftSize = 1024; d.gain.connect(d.vuAn); }
        d.node.connect(d.an);
        d.pflG = this.ctx.createGain(); tail.connect(d.pflG).connect(this.cueBus);
        d.el.addEventListener('playing', () => { this.checkStream(d); RELAY.follow(); });
        d.el.addEventListener('error', () => this.onError(d));
        d.el.addEventListener('play', () => this.updateButtons());
        ['play', 'pause', 'ended'].forEach((ev) => d.el.addEventListener(ev, () => updateAwake()));
        d.el.addEventListener('pause', () => { this.updateButtons(); RELAY.follow(); });
      }
      this.applyXf(); this.applyCue();
      RELAY.setup();
      if (TABLET) setInterval(() => this.loopCheck(), 25);
    }
    if (this.ctx.state === 'suspended' || this.ctx.state === 'interrupted') this.ctx.resume();   // interrupted : iPhone, retour d'arrière-plan
  },
  // la platine qu'on entend vraiment (la plus forte au crossfader si les deux jouent)
  audible() {
    const on = Object.values(this.decks).filter((d) => d.el && !d.el.paused && this.vol(d.letter) > 0);
    return on.sort((a, b) => this.vol(b.letter) - this.vol(a.letter))[0] || null;
  },
  hpMix: 0.3,   // 0 = pré-écoute seule, 1 = mix seul
  applyCue() {
    if (!this.ctx) return;
    const any = Object.values(this.decks).some((d) => d.pfl);
    for (const d of Object.values(this.decks)) if (d.pflG) d.pflG.gain.value = d.pfl ? 1 : 0;
    this.outMst.gain.value = any ? this.hpMix : 1;
    this.outCue.gain.value = any ? 1 - this.hpMix : 0;
  },
  togglePfl(letter) {
    this.ensure();
    const d = this.decks[letter];
    d.pfl = !d.pfl; this.applyCue();
    const b = this.ui['pfl' + letter]; if (b) b.classList.toggle('on', d.pfl);
    if (this.ui.hpRow) this.ui.hpRow.classList.toggle('on', Object.values(this.decks).some((x) => x.pfl));
    toast(d.pfl ? 'Platine ' + letter + ' en pré-écoute 🎧 (règle « Pré-écoute ↔ Mix » sous le crossfader)' : 'Pré-écoute ' + letter + ' coupée', 2200);
  },
  // ---- 3 hot cues par platine (gardés pour chaque morceau sur ce téléphone)
  HC_COLORS: ['#EC6E70', '#E8C25A', '#62C98C'],
  savedCues(id) {
    try { const c = JSON.parse(localStorage.getItem('kadans.hotcues') || '{}')[id]; return Array.isArray(c) && c.length === 3 ? c : [null, null, null]; }
    catch (e) { return [null, null, null]; }
  },
  saveCues(d) {
    if (!d.track) return;
    try {
      const all = JSON.parse(localStorage.getItem('kadans.hotcues') || '{}');
      if (d.cues.some((c) => c != null)) all[d.track.id] = d.cues; else delete all[d.track.id];
      localStorage.setItem('kadans.hotcues', JSON.stringify(all));
    } catch (e) { /* stockage plein : gardés pour cette séance */ }
  },
  hotcue(letter, i, erase) {
    const d = this.decks[letter];
    if (!d.track || !d.el) { toast('Charge d’abord un morceau sur la platine ' + letter + '.'); return; }
    if (!d.cues) d.cues = [null, null, null];
    if (erase) { if (d.cues[i] == null) return; d.cues[i] = null; toast('Hot cue ' + (i + 1) + ' effacé', 1200); }
    else if (d.cues[i] == null) d.cues[i] = Math.round(d.el.currentTime * 1000) / 1000;
    else { this.ensure(); d.el.currentTime = d.cues[i]; }
    this.saveCues(d); this.drawHc(d);
  },
  drawHc(d) {
    (this.ui['hc' + d.letter] || []).forEach((b, i) => b.classList.toggle('set', !!(d.cues && d.cues[i] != null)));
  },
  applyXf() {
    const x = this.xf;
    if (this.decks.A.gain) {
      this.decks.A.gain.gain.value = Math.cos(x * Math.PI / 2);
      this.decks.B.gain.gain.value = Math.sin(x * Math.PI / 2);
    }
    this.showVol();
    RELAY.follow();
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
  // iPhone : chaque changement de vitesse (avec tonalité gardée) coupe le son un instant.
  // On regroupe donc les changements : au plus ~3 par seconde, et la valeur finale au relâchement.
  applyRate(d, now) {
    if (!d.el) return;
    clearTimeout(d.rateT);
    const t = performance.now(), wait = 320 - (t - (d.rateAt || 0));
    if (now || wait <= 0) {
      d.rateAt = t;
      const want = this.rate(d) * (1 + d.bend);
      if (Math.abs(d.el.playbackRate - want) > 1e-4) d.el.playbackRate = want;
    } else d.rateT = setTimeout(() => this.applyRate(d, true), wait);
  },
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
      d.track = t; d.cue = 0; d.peaks = null; d.bend = 0; d.points = null;
      if (d.lp) d.lp = { on: false, a: 0, b: 0, beats: 0 };
      d.cues = this.savedCues(t.id);
      d.leveled = !!(local && (S.offline.get(t.id) || {}).niv);   // copie déjà au bon niveau : pas de 2e correction
      this.setLevel(d, t);   // niveau mesuré par le PC (sinon estimé une fois l'audio décodé)
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
      d.blobP = local ? Promise.resolve(local) : this.fetchFor(d, t);
      const blob = await d.blobP;
      if (d.track !== t) return;
      const buf = await this.ctx.decodeAudioData(await blob.arrayBuffer());
      if (d.track !== t) return;
      d.peaks = this.computePeaks(buf, 600);
      d.points = mixPoints(buf, t.bpm);   // pour le mix auto de la Playlist
      if (typeof t.lufs !== 'number') this.setLevel(d, t, buf);
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
      this.toMemory(d, 'pas de son dans la table de mixage', !d.el.paused);
    }, 200);
  },
  // ---- tablette : égaliseur, filtre, boucles, tonalité
  applyEq(d) {
    if (!d.lo) return;
    const t = this.ctx.currentTime;
    for (const b of ['lo', 'mid', 'hi']) d[b].gain.setTargetAtTime(d.eq[b], t, 0.01);
    const f = d.filt, n = d.filtN;
    if (Math.abs(f) < 0.03) { n.type = 'lowpass'; n.frequency.setTargetAtTime(22000, t, 0.01); n.Q.value = 0.7; }
    else if (f < 0) { n.type = 'lowpass'; n.frequency.setTargetAtTime(20000 * Math.pow(120 / 20000, -f), t, 0.01); n.Q.value = 1.4; }
    else { n.type = 'highpass'; n.frequency.setTargetAtTime(20 * Math.pow(6000 / 20, f), t, 0.01); n.Q.value = 1.4; }
  },
  loopCheck() {
    for (const d of Object.values(this.decks)) {
      const lp = d.lp;
      if (!lp || !lp.on || !d.el || d.el.paused || lp.b <= lp.a) continue;
      if (d.el.currentTime >= lp.b - 0.004) d.el.currentTime = lp.a + Math.max(0, d.el.currentTime - lp.b);
    }
  },
  autoLoop(letter, beats) {
    const d = this.decks[letter];
    if (!d.track || !d.el || !d.el.duration) return;
    if (d.lp.on && d.lp.beats === beats) d.lp.on = false;   // même bouton : on sort de la boucle
    else {
      const a = d.lp.on ? d.lp.a : d.el.currentTime, len = beats * (d.track.bpm ? 60 / d.track.bpm : 0.5);
      d.lp = { on: true, a, b: Math.min(d.el.duration, a + len), beats };
    }
    this.drawLoop(d);
  },
  loopScale(letter, k) {   // ½ ou ×2
    const d = this.decks[letter];
    if (!d.lp.on || !d.el.duration) return;
    const len = (d.lp.b - d.lp.a) * k;
    if (len < 0.03) return;
    d.lp.b = Math.min(d.el.duration, d.lp.a + len); d.lp.beats *= k;
    if (d.el.currentTime > d.lp.b) d.el.currentTime = d.lp.a;
    this.drawLoop(d);
  },
  drawLoop(d) { (this.ui['loop' + d.letter] || []).forEach((b) => b.classList.toggle('on', !!d.lp.on && +b.dataset.beats === d.lp.beats)); },
  setKeylock(d, on) { d.keylock = on; d.el.preservesPitch = on; d.el.webkitPreservesPitch = on; },
  deckTools(d) {
    if (!d.el) this.ensure();
    const knob = (label, value, min, max, step, set) => {
      const r = h('input', { type: 'range', min, max, step, value, 'aria-label': label + ' platine ' + d.letter, style: 'accent-color:' + d.hex });
      r.oninput = () => { set(+r.value); this.applyEq(d); };
      r.ondblclick = () => { r.value = 0; r.oninput(); };   // double-tape : retour à 0
      return h('label', { class: 'eq' }, h('span', null, label), r);
    };
    const key = h('button', { class: 'btn small ghost' + (d.keylock ? ' on' : ''), type: 'button', title: 'Garder la tonalité quand le tempo change',
      onclick: () => { this.setKeylock(d, !d.keylock); key.classList.toggle('on', d.keylock); } }, 'KEY');
    const beatBtn = (n) => { const b = h('button', { class: 'btn small ghost', type: 'button', 'data-beats': n, 'aria-label': 'Boucle de ' + n + ' temps', onclick: () => this.autoLoop(d.letter, n) }, String(n)); return b; };
    this.ui['loop' + d.letter] = [1, 2, 4, 8, 16].map(beatBtn);
    d.vuC = h('canvas', { class: 'vu', width: 240, height: 8, 'aria-hidden': 'true' });
    this.drawLoop(d);
    return h('div', { class: 'deck-tools' },
      h('div', { class: 'eq-row' },
        knob('Graves', d.eq.lo, -26, 6, 0.5, (v) => { d.eq.lo = v; }),
        knob('Médiums', d.eq.mid, -26, 6, 0.5, (v) => { d.eq.mid = v; }),
        knob('Aigus', d.eq.hi, -26, 6, 0.5, (v) => { d.eq.hi = v; }),
        knob('Filtre', d.filt, -1, 1, 0.02, (v) => { d.filt = v; })),
      h('div', { class: 'loop-row' }, h('span', { class: 'lbl' }, 'Boucle'), ...this.ui['loop' + d.letter],
        h('button', { class: 'btn small ghost', type: 'button', 'aria-label': 'Boucle deux fois plus courte', onclick: () => this.loopScale(d.letter, 0.5) }, '½'),
        h('button', { class: 'btn small ghost', type: 'button', 'aria-label': 'Boucle deux fois plus longue', onclick: () => this.loopScale(d.letter, 2) }, '×2'),
        key),
      d.vuC);
  },
  // tablette : la bibliothèque et Ma playlist sous les platines, comme sur le PC
  tabletLib() {
    const q = h('input', { class: 'input', type: 'search', placeholder: 'Chercher un morceau…', 'aria-label': 'Chercher un morceau', value: this.libQ || '' });
    const list = h('div', { class: 'tab-list' });
    const row = (t, on) => {
      const add = h('button', { class: 'btn small ghost pl-add' + (on ? ' in' : ''), type: 'button', 'aria-label': on ? 'Retirer de la playlist' : 'Ajouter à la playlist',
        onclick: () => { plSet(t.id, !PL.ids.includes(t.id)); plSave(); this.ui.plDraw(); fill(); } }, on ? '✓' : '＋');
      const ok = playable(t);
      const pickBtn = (l) => h('button', { class: 'btn small ghost', type: 'button', disabled: !ok, style: 'color:' + this.decks[l].hex, 'aria-label': 'Charger sur la platine ' + l, onclick: () => this.load(l, t) }, l);
      return h('div', { class: 'tab-row' + (ok ? '' : ' off') },
        h('span', { class: 'meta' }, h('span', { class: 't1' }, t.titre), h('span', { class: 't2' }, t.artiste || '')),
        h('span', { class: 'bpm' }, t.bpm ? String(t.bpm) : '…'), pickBtn('A'), pickBtn('B'), add);
    };
    const fill = () => {
      const s = (this.libQ || '').trim().toLowerCase(), inPl = new Set(PL.ids);
      const found = allTracks().filter((t) => t.type !== 'video' && (!s || [t.titre, t.artiste, t.bpm].filter(Boolean).join(' ').toLowerCase().includes(s)));
      const top = list.scrollTop;
      list.replaceChildren(...(found.length ? found.slice(0, 300).map((t) => row(t, inPl.has(t.id))) : [h('p', { class: 'sub', style: 'text-align:center' }, 'Aucun morceau.')]));
      list.scrollTop = top;
    };
    q.oninput = () => { this.libQ = q.value; fill(); };
    fill();
    const side = h('div', { class: 'tab-pl' });
    this.ui.plDraw = () => {
      const again = () => { this.ui.plDraw(); fill(); plRefresh(); plMark(); };
      const n = plTracks();
      side.replaceChildren(
        plsBar(again),
        plOrderEl(again),
        n.length ? null : h('p', { class: 'sub', style: 'margin:0' }, 'Touche ＋ dans la liste pour ajouter un morceau, puis glisse les lignes pour changer l’ordre.'),
        h('button', { class: 'pg-btn primary', type: 'button', disabled: !n.length, onclick: () => this.autoStart(plTracks(), PL.beats) },
          this.auto && this.auto.plId === PLS.active ? 'Relancer depuis le début' : 'Lancer le mix (' + n.length + ')'));
    };
    this.ui.plDraw();
    return h('div', { class: 'tab-lib' }, h('div', { class: 'tab-left' }, h('div', { class: 'search' }, q), list), side);
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
        h('span', { class: 'badge', style: '--dk:' + this.decks[letter].hex }, letter),
        h('h2', { style: 'margin:0;font-size:18px' }, 'Charger sur la platine ' + letter)),
      h('div', { class: 'search' }, h('span', { html: iconHTML('search', 18), style: 'color:#A3A3AD' }), q),
      list));
  },
  setLevel(d, t, buf) {
    if (!d.lvlG) return;
    const db = LEVEL.auto && !d.leveled ? levelGainDb(t, buf) : 0;
    d.lvlG.gain.value = Math.pow(10, db / 20);
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
    if (d.el.paused) {
      player.pause();
      const wasStream = d.stream, src = d.el.src;
      const p = d.el.play();
      if (p && p.catch) p.catch((e) => {
        if (e && e.name === 'AbortError') return;   // remplacé par un autre morceau
        if (d.el.src !== src) return;               // déjà passé en mémoire entre-temps : cette erreur est périmée
        if (wasStream) this.toMemory(d, 'lecture refusée : ' + ((e && (e.message || e.name)) || '?'), true);
        else toast('Platine ' + d.letter + ' : lecture impossible (' + ((e && (e.message || e.name)) || '?') + ')', 5000);
      });
    } else d.el.pause();
  },
  // explication lisible d'une erreur de lecture
  mediaErr(el) {
    const e = el && el.error;
    if (!e) return 'erreur inconnue';
    const txt = { 1: 'interrompue', 2: 'problème de réseau', 3: 'fichier illisible', 4: 'format ou accès refusé' }[e.code] || 'code ' + e.code;
    return txt + (e.message ? ' — ' + e.message : '');
  },
  onError(d) {
    if (!d.track || !d.el.getAttribute('src')) return;
    if (d.stream) this.toMemory(d, this.mediaErr(d.el), !d.el.paused || d.wantPlay);
    else toast('Platine ' + d.letter + ' : ' + this.mediaErr(d.el), 6000);
  },
  // la lecture en direct ne marche pas sur ce téléphone : on charge le morceau en mémoire (rien n'est gardé)
  async toMemory(d, why, play) {
    if (!d.stream || d.toMem) return;
    d.toMem = true;
    const t = d.track, pos = d.el.currentTime || 0;
    toast('Platine ' + d.letter + ' : lecture directe impossible (' + why + '). Chargement du morceau…', 4500);
    try {
      const blob = await (d.blobP || (d.blobP = this.fetchFor(d, t)));
      if (d.track !== t) return;
      d.stream = false; d.url = URL.createObjectURL(blob); d.el.src = d.url;
      try { d.el.currentTime = pos; } catch (e) { /* début */ }
      d.el.playbackRate = this.rate(d) * (1 + d.bend);
      this.showLoad(d, null);
      toast('Platine ' + d.letter + ' prête ✓', 1800);
      if (play) d.el.play().catch((e) => toast('Platine ' + d.letter + ' : touche ▶ pour lancer (' + (e.message || e.name) + ')', 4000));
    } catch (e) {
      this.showLoad(d, null);
      toast('Platine ' + d.letter + ' : impossible de charger le morceau (' + e.message + ')', 7000);
    } finally { d.toMem = false; }
  },
  // téléchargement en mémoire, avec la progression sous le titre de la platine
  fetchFor(d, t) {
    return fetchWithProgress(fileURL(t.id), (p) => { if (d.track === t) this.showLoad(d, p); });
  },
  showLoad(d, p) {
    const el = document.getElementById('time' + d.letter);
    if (!el) return;
    if (p == null || p >= 100) { if (el.dataset.loading) { delete el.dataset.loading; el.textContent = d.track ? (d.track.artiste || '') : ''; } return; }
    el.dataset.loading = '1'; el.textContent = 'Chargement ' + p + ' %';
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
  // ---- mix automatique d'une playlist : les platines A et B s'alternent
  auto: null,
  async autoStart(list, beats) {
    this.autoStop(true);
    list = list.filter((t) => t && t.type !== 'video' && playable(t));
    if (!list.length) { toast('Aucun morceau jouable (PC injoignable ?).'); return; }
    this.ensure();
    for (const d of Object.values(this.decks)) { d.el.pause(); d.tempo = 0; this.applyRate(d, true); if (d.setTempoUI) d.setTempoUI(); }
    player.pause();
    this.auto = { list, i: 0, cur: 'A', beats: beats || 16, fading: false, fade: 0, plId: PLS.active };
    plRefresh();
    toast('Mix auto : chargement du 1er morceau…', 1800);
    await this.load('A', list[0]);
    if (!this.auto) return;
    const a = this.decks.A;
    this.xf = 0; this.applyXf(); if (this.ui.xf && this.ui.xf.isConnected) this.ui.xf.value = 0;
    try { a.el.currentTime = a.points ? a.points.intro : 0; } catch (e) { /* début */ }
    a.el.play().catch(() => {});
    if (list[1]) this.load('B', list[1]);
    this.auto.timer = setInterval(() => this.autoTick(), 250);
    plRefresh();
  },
  // la playlist a changé pendant le mix : ce qui suit le morceau en cours prend le nouvel ordre
  autoSync() {
    const au = this.auto; if (!au || au.plId !== PLS.active) return;   // on prépare une autre playlist : le mix en cours ne bouge pas
    const lock = au.i + (au.fading ? 1 : 0), kept = au.list.slice(0, lock + 1), running = new Set(au.list.slice(au.i, lock + 1).map((t) => t.id));
    const order = plTracks().filter((t) => t.type !== 'video' && playable(t)), at = order.findIndex((t) => t.id === kept[kept.length - 1].id);
    au.list = kept.concat(order.slice(at + 1).filter((t) => !running.has(t.id)));
    const next = au.list[au.i + 1], other = this.decks[au.cur === 'A' ? 'B' : 'A'];
    if (!au.fading && !RELAY.active && next && (!other.track || other.track.id !== next.id)) this.load(other.letter, next);
    plRefresh(); plMark();
  },
  autoTick() {
    const au = this.auto; if (!au || au.fading || RELAY.active) return;
    const cur = this.decks[au.cur], next = au.list[au.i + 1];
    const dur = cur.el.duration || 0, t = cur.el.currentTime;
    if (!next) { if (cur.el.ended || (dur && t >= dur - 0.3)) { this.autoStop(); toast('Fin de la playlist', 2500); } return; }
    const start = cur.points ? cur.points.mixStart : (dur ? dur - 16 : Infinity);
    if (cur.el.ended || (dur && t >= start)) this.autoFade();
  },
  // Transition sans à-coups : sur iPhone chaque changement de vitesse coupe le son un instant. Le morceau
  // qui entre reste donc à sa vitesse normale, calé AVANT de démarrer ; ailleurs, le morceau qui sort s'adapte
  // une seule fois, et sur iPhone aucun morceau ne change de vitesse. Tempos trop éloignés : simple fondu court.
  MATCH_MAX: 6,   // % de vitesse au-delà duquel on ne cale plus
  MATCH_MAX_IOS: 2,   // iPhone, sans changement de vitesse : au-delà, les temps se décalent trop pour un fondu long
  fadeMatch(from, to) {
    if (to.el.paused && to.tempo) { to.tempo = 0; this.applyRate(to, true); if (to.setTempoUI) to.setTempoUI(); }
    if (from.el.paused || !from.track || !to.track || !from.track.bpm || !to.track.bpm) return false;
    let target = (to.track.bpm * this.rate(to)) / from.track.bpm;
    if (target > 1.5) target /= 2; else if (target < 0.67) target *= 2;
    const pct = (target - 1) * 100;
    if (Math.abs(pct) > this.MATCH_MAX) return false;
    if (to.el.paused) {
      const bo = 60 / from.track.bpm, bd = 60 / to.track.bpm;
      let diff = (from.el.currentTime % bo) / bo - (to.el.currentTime % bd) / bd;
      if (diff > 0.5) diff -= 1; if (diff < -0.5) diff += 1;
      try { to.el.currentTime = Math.max(0, to.el.currentTime + diff * bd); } catch (e) { /* début */ }
    }
    if (IOS) return Math.abs(pct) <= this.MATCH_MAX_IOS;
    from.tempo = Math.round(pct * 10) / 10;
    this.applyRate(from, true); if (from.setTempoUI) from.setTempoUI();
    return true;
  },
  async autoFade() {
    const au = this.auto; if (!au || au.fading || !au.list[au.i + 1]) return;
    au.fading = true;
    const cur = this.decks[au.cur], nl = au.cur === 'A' ? 'B' : 'A', nxt = this.decks[nl], want = au.list[au.i + 1];
    if (!nxt.track || nxt.track.id !== want.id) await this.load(nl, want);
    if (this.auto !== au) return;
    try { nxt.el.currentTime = nxt.points ? nxt.points.intro : 0; } catch (e) { /* début */ }
    const curTempo = cur.tempo, matched = this.fadeMatch(cur, nxt);
    await nxt.el.play().catch(() => {});
    if (RELAY.active) {   // app cachée entre-temps : la transition se refera au retour
      nxt.el.pause(); au.fading = false;
      cur.tempo = curTempo; this.applyRate(cur, true); if (cur.setTempoUI) cur.setTempoUI();
      return;
    }
    this.fadeTarget = nxt; RELAY.follow();
    const beat = cur.track && cur.track.bpm ? 60 / (cur.track.bpm * this.rate(cur)) : 0.5;
    const left = Math.max(1, (cur.el.duration || 0) - cur.el.currentTime - 0.3);
    const dur = Math.max(3, Math.min(au.beats * beat, left, matched ? 30 : 6)) * 1000;
    const from = this.xf, to = nl === 'B' ? 1 : 0, t0 = performance.now();
    clearInterval(this.autoTimer);
    const step = (k) => {
      au.fade = k;
      this.xf = from + (to - from) * k; this.applyXf();
      if (this.ui.xf && this.ui.xf.isConnected) this.ui.xf.value = Math.round(this.xf * 100);
    };
    this.fadeFinish = () => {
      this.fadeFinish = null; this.fadeTarget = null;
      clearInterval(this.autoTimer);
      step(1);
      cur.el.pause();
      au.i++; au.cur = nl; au.fading = false; au.fade = 0;
      cur.tempo = 0; this.applyRate(cur, true); if (cur.setTempoUI) cur.setTempoUI();
      const after = au.list[au.i + 1];
      if (after) this.load(cur.letter, after);
      plRefresh();
    };
    this.autoTimer = setInterval(() => {
      if (this.auto !== au) { clearInterval(this.autoTimer); return; }
      const k = Math.min(1, (performance.now() - t0) / dur);
      if (k < 1) step(k); else this.fadeFinish();
    }, 50);
    plRefresh();
  },
  autoStop(quiet) {
    const was = this.auto;
    if (was) clearInterval(was.timer);
    clearInterval(this.autoTimer);
    this.fadeFinish = null; this.fadeTarget = null;
    this.auto = null;
    if (was && !quiet) plRefresh();
  },
  automix() {
    const A = this.decks.A, B = this.decks.B;
    const from = this.xf < 0.5 ? A : B, to = from === A ? B : A;
    if (!from.track || !to.track) { toast('Charge un morceau sur chaque platine.'); return; }
    this.ensure();
    if (from.el.paused) { from.el.play(); }
    const fromTempo = from.tempo, matched = this.fadeMatch(from, to);
    to.el.play();
    const start = this.xf, end = to === B ? 1 : 0, t0 = performance.now(), dur = matched ? 12000 : 6000;
    clearInterval(this.autoTimer);
    const step = (k) => {
      this.xf = start + (end - start) * k; this.applyXf();
      if (this.ui.xf) this.ui.xf.value = Math.round(this.xf * 100);
    };
    this.fadeTarget = to; RELAY.follow();
    this.fadeFinish = () => {
      this.fadeFinish = null; this.fadeTarget = null;
      clearInterval(this.autoTimer);
      step(1); from.el.pause();
      from.tempo = fromTempo; this.applyRate(from, true); if (from.setTempoUI) from.setTempoUI();
    };
    this.autoTimer = setInterval(() => {
      const k = Math.min(1, (performance.now() - t0) / dur);
      if (k < 1) step(k); else this.fadeFinish();
    }, 50);
    toast(matched ? 'Auto-mix : transition sur 12 secondes' : 'Auto-mix : tempos trop éloignés, simple fondu de 6 secondes', 2200);
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
    const play = h('button', { class: 'deck-play', type: 'button', style: '--dk:' + d.hex, 'aria-label': 'Lecture platine ' + d.letter,
      html: iconHTML(d.el && !d.el.paused ? 'pause' : 'play', 20), onclick: () => this.togglePlay(d.letter) });
    this.ui['play' + d.letter] = play;
    const id = 'tempo' + d.letter;
    const lbl = h('label', { for: id }, 'Tempo ' + (d.tempo >= 0 ? '+' : '') + d.tempo.toFixed(1).replace('.', ',') + ' %');
    const slider = h('input', { id, type: 'range', min: -16, max: 16, step: 0.1, value: d.tempo, style: 'accent-color:' + d.hex });
    const bpmEl = h('b', null, this.effBpm(d));
    d.setTempoUI = () => {
      if (!slider.isConnected) return;
      slider.value = d.tempo;
      lbl.textContent = 'Tempo ' + (d.tempo >= 0 ? '+' : '') + d.tempo.toFixed(1).replace('.', ',') + ' %';
      bpmEl.textContent = this.effBpm(d);
    };
    slider.oninput = () => {
      d.tempo = +slider.value;
      this.applyRate(d);
      d.setTempoUI();
    };
    slider.onchange = () => this.applyRate(d, true);   // relâché : la valeur finale tout de suite
    slider.ondblclick = () => { slider.value = 0; slider.oninput(); };
    // le vinyle : tourne pendant la lecture, se manipule au doigt
    const disc = h('canvas', { 'aria-hidden': 'true' });
    const platter = h('div', { class: 'platter', 'aria-label': 'Disque de la platine ' + d.letter }, disc);
    d.disc = disc;
    this.platterEvents(d, platter);
    const rew = h('button', { class: 'btn small ico-btn', type: 'button', 'aria-label': 'Reculer (maintenir)', html: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11 6v12L3 12zM21 6v12l-8-6z"/></svg>' });
    const ff = h('button', { class: 'btn small ico-btn', type: 'button', 'aria-label': 'Avancer vite (maintenir)', html: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 6v12l8-6zM13 6v12l8-6z"/></svg>' });
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
        h('span', { class: 'badge', style: '--dk:' + d.hex }, d.letter),
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
        this.ui['pfl' + d.letter] = h('button', { class: 'btn ghost hp' + (d.pfl ? ' on' : ''), type: 'button', 'aria-label': 'Pré-écoute de la platine ' + d.letter + ' au casque',
          html: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="7" rx="1.5"/><rect x="17" y="14" width="4" height="7" rx="1.5"/></svg>',
          onclick: () => this.togglePfl(d.letter) }),
        h('div', { class: 'tempo' }, lbl, slider)),
      TABLET ? this.deckTools(d) : null,
      h('div', { class: 'hc-row' }, ...(this.ui['hc' + d.letter] = this.HC_COLORS.map((c, i) => {
        const b = h('button', { class: 'hc' + (d.cues && d.cues[i] != null ? ' set' : ''), type: 'button', style: '--c:' + c,
          'aria-label': 'Hot cue ' + (i + 1) + ' (toucher : placer / y aller ; appui long : effacer)' }, String(i + 1));
        let t = 0, long = false;
        b.addEventListener('pointerdown', () => { long = false; clearTimeout(t); t = setTimeout(() => { long = true; this.hotcue(d.letter, i, true); }, 600); });
        ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => b.addEventListener(ev, () => clearTimeout(t)));
        b.addEventListener('click', () => { if (!long) this.hotcue(d.letter, i, false); });
        b.addEventListener('contextmenu', (e) => e.preventDefault());
        return b;
      }))),
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
    const r = w / 2, P = r - 2 * ledSize(r) - 3, R = Math.min(r * 0.9, P - 2);   // P : plateau (les LED tout autour)
    if (d.el && !d.el.paused && !d.held) d.angle += dt * (2 * Math.PI * 33.333 / 60) * d.el.playbackRate;
    // LED : vertes en lecture, rouges à l'arrêt
    drawLeds(g, r, d.el && !d.el.paused ? 'play' : d.track ? 'stop' : 'vide', d.track && d.track.bpm ? d.track.bpm * this.rate(d) / 60 : 2);
    g.fillStyle = '#1C1E23'; g.beginPath(); g.arc(r, r, P, 0, 7); g.fill();
    for (let i = 0; i < 60; i++) {   // points stroboscopiques
      const a = i / 60 * 2 * Math.PI + d.angle;
      g.fillStyle = i % 2 ? '#3A3E47' : '#5A5E68';
      g.fillRect(r + Math.cos(a) * (P - 4) - 1, r + Math.sin(a) * (P - 4) - 1, 2, 2);
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
    xf.oninput = () => {
      if (this.auto) { this.autoStop(); toast('Mix auto arrêté : tu as pris la main.', 2200); }
      clearInterval(this.autoTimer); this.xf = xf.value / 100; this.applyXf();
    };
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
        (() => {
          const r = h('input', { type: 'range', min: 0, max: 100, value: Math.round(this.hpMix * 100), 'aria-label': 'Casque : pré-écoute ou mix' });
          r.oninput = () => { this.hpMix = r.value / 100; this.applyCue(); };
          return this.ui.hpRow = h('div', { class: 'hp-row' + (Object.values(this.decks).some((x) => x.pfl) ? ' on' : '') },
            h('span', null, '🎧 Pré-écoute'), r, h('span', null, 'Mix'));
        })(),
        h('div', { class: 'xf-btns' },
          h('button', { class: 'btn small', type: 'button', onclick: () => this.automix() }, 'Auto-mix'),
          h('button', { class: 'btn small', type: 'button', onclick: () => { this.xf = 0.5; xf.value = 50; this.applyXf(); } }, 'Centre'),
          this.ui.recLand = h('button', { class: 'btn small rec-land' + (this.recorder ? ' rec-on' : ''), type: 'button', onclick: () => this.toggleRec() }, h('span', { class: 'rec-dot' }), this.recorder ? 'Arrêter' : 'Enreg.'))),
      TABLET ? this.tabletLib() : null,
      h('p', { class: 'sub mixhelp', style: 'text-align:center;margin-top:14px' }, 'Tourne le disque au doigt pour avancer / reculer. En lecture, le bord du disque freine ou pousse. Double-tape un curseur Tempo pour le remettre à 0.'));
  },
  mount() {
    const v = $('#view');
    if (S.tab !== 'mix' || PL.dragging) return;   // une ligne est tenue : on ne redessine pas sous le doigt
    const top = v.scrollTop, list = v.querySelector('.tab-list'), listTop = list ? list.scrollTop : 0;
    v.replaceChildren(this.view());
    v.scrollTop = top;
    const after = v.querySelector('.tab-list'); if (after) after.scrollTop = listTop;
    plMark();
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
        if (d.vuC && d.vuC.isConnected && d.vuAn) {   // niveau de la platine
          const buf = this._vub || (this._vub = new Float32Array(1024));
          d.vuAn.getFloatTimeDomainData(buf);
          let p = 0; for (let i = 0; i < buf.length; i++) { const a = Math.abs(buf[i]); if (a > p) p = a; }
          const lvl = Math.max(0, Math.min(1, (20 * Math.log10(p || 1e-6) + 48) / 48));
          d.lvl = Math.max(lvl, (d.lvl || 0) - dt * 1.2);
          const g = d.vuC.getContext('2d'), W = d.vuC.width, H = d.vuC.height, n = 32;
          g.clearRect(0, 0, W, H);
          for (let i = 0; i < n; i++) {
            const k = i / n, lit = k < d.lvl;
            g.fillStyle = k > 0.92 ? (lit ? '#E8615F' : '#3A2020') : k > 0.75 ? (lit ? '#E6C55A' : '#38301C') : (lit ? '#5FCB8A' : '#1D3628');
            g.fillRect(i * W / n, 0, W / n - 1, H);
          }
        }
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
        if (d.track && dur && d.cues) d.cues.forEach((c, i) => {
          if (c == null) return;
          g.fillStyle = this.HC_COLORS[i]; g.fillRect((c / dur) * w - 1, 0, 2, hh);
        });
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
// ---- certificat Wi-Fi (Android) : on ne propose d'installer QUE le vrai certificat Kadans, c'est-à-dire
// une autorité dont la limite (extension « critique ») ne couvre que les adresses des réseaux privés ET le seul
// nom kadans.invalid. Une limite sur les adresses seules laisserait libres les noms de sites (google.com…) :
// un tel certificat, comme un certificat sans limite, pourrait servir à espionner la navigation. Refusé.
// Lecture stricte du DER (longueurs exactes, pas d'octets en trop) en suivant la vraie structure du certificat.
function derAt(b, i, limit) {
  if (i + 2 > limit) throw new Error('court');
  let len = b[i + 1], o = i + 2;
  if (len & 0x80) {
    const n = len & 0x7f; if (n < 1 || n > 3 || o + n > limit) throw new Error('longueur');
    len = 0; for (let k = 0; k < n; k++) len = len * 256 + b[o + k]; o += n;
  }
  if (o + len > limit) throw new Error('déborde');
  return { tag: b[i], start: o, end: o + len };
}
function derKids(b, node) {
  const out = [];
  for (let i = node.start; i < node.end;) { const k = derAt(b, i, node.end); out.push(k); i = k.end; }
  return out;
}
function isKadansCA(b) {
  try {
    if (!(b instanceof Uint8Array) || b[0] !== 0x30) return false;
    const cert = derAt(b, 0, b.length); if (cert.end !== b.length) return false;   // rien après le certificat
    const top = derKids(b, cert); if (top.length !== 3 || top[0].tag !== 0x30) return false;
    const tbs = derKids(b, top[0]).filter((x) => x.tag === 0xa3);
    if (tbs.length !== 1) return false;
    const extSeq = derKids(b, tbs[0]); if (extSeq.length !== 1 || extSeq[0].tag !== 0x30) return false;
    const exts = {};
    for (const e of derKids(b, extSeq[0])) {
      if (e.tag !== 0x30) return false;
      const k = derKids(b, e); if (k.length < 2 || k.length > 3 || k[0].tag !== 0x06) return false;
      const id = [...b.slice(k[0].start, k[0].end)].join('.');
      if (exts[id]) return false;   // extension en double : refus
      let crit = false;
      if (k.length === 3) { if (k[1].tag !== 0x01 || k[1].end - k[1].start !== 1) return false; crit = b[k[1].start] === 0xff; }
      const val = k[k.length - 1]; if (val.tag !== 0x04) return false;
      exts[id] = { crit, val };
    }
    // autorité (BasicConstraints ca=true)
    const bc = exts['85.29.19']; if (!bc) return false;
    const bcs = derAt(b, bc.val.start, bc.val.end); if (bcs.tag !== 0x30 || bcs.end !== bc.val.end) return false;
    const bck = derKids(b, bcs); if (!bck.length || bck[0].tag !== 0x01 || b[bck[0].start] !== 0xff) return false;
    // limite (NameConstraints), obligatoirement critique
    const nc = exts['85.29.30']; if (!nc || !nc.crit) return false;
    const ncs = derAt(b, nc.val.start, nc.val.end); if (ncs.tag !== 0x30 || ncs.end !== nc.val.end) return false;
    const permitted = derKids(b, ncs).filter((x) => x.tag === 0xa0);
    if (permitted.length !== 1) return false;
    let ip = 0, dns = 0;
    for (const sub of derKids(b, permitted[0])) {
      if (sub.tag !== 0x30) return false;
      const base = derKids(b, sub)[0]; if (!base) return false;
      const v = b.slice(base.start, base.end);
      if (base.tag === 0x87 && v.length === 8) {   // IPv4 + masque : 10/8, 172.16/12, 192.168/16 (ou plus étroit)
        const ok = (v[0] === 10 && v[4] === 255) || (v[0] === 172 && (v[1] & 0xf0) === 16 && v[4] === 255 && v[5] >= 0xf0)
          || (v[0] === 192 && v[1] === 168 && v[4] === 255 && v[5] === 255);
        if (!ok) return false; ip++;
      } else if (base.tag === 0x87 && v.length === 32) { if (v[0] !== 0xfd || v[16] !== 0xff) return false; ip++; }   // fd00::/8
      else if (base.tag === 0x82) { if (new TextDecoder().decode(v) !== 'kadans.invalid') return false; dns++; }
      else return false;   // toute autre forme de nom : refus
    }
    return ip > 0 && dns > 0;   // les adresses ET les noms doivent être limités
  } catch (e) { return false; }
}
async function certFingerprint(bytes) {
  const d = new Uint8Array(await crypto.subtle.digest('SHA-256', bytes));
  return [...d.slice(0, 8)].map((x) => x.toString(16).padStart(2, '0').toUpperCase()).join(':');
}
// App Android (APK) : le certificat est reconnu par l'app Kadans seulement (rien à installer dans les Paramètres,
// aucun effet sur le reste de la tablette). Mêmes contrôles qu'au téléchargement : structure + empreinte à comparer.
async function trustWifiCA() {
  try {
    const r = await fetch(S.server + '/api/wifi/certificat?format=crt', { cache: 'no-store' });
    if (!r.ok) throw new Error('le PC a répondu ' + r.status);
    const bytes = new Uint8Array(await r.arrayBuffer());
    if (!isKadansCA(bytes)) { toast('Ce certificat ne vient pas de Kadans : refusé. Relie à nouveau ton PC avec le QR affiché sur son écran.', 7000); return false; }
    const fp = await certFingerprint(bytes);
    if (!confirm('Empreinte du certificat :\n\n' + fp + '\n\nEst-elle identique à celle affichée sur ton PC (Kadans → onglet Mobile → Wi-Fi) ?\n\nSi elle est différente, touche Annuler.')) { toast('Activation annulée.'); return false; }
    let b64 = ''; for (let i = 0; i < bytes.length; i += 0x8000) b64 += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    if (!NATIVE.trustCA(btoa(b64))) throw new Error('refusé par l’app');
    await new Promise((res) => setTimeout(res, 300));
    await probeWifi(true);
    toast(WIFI.base ? 'Wi-Fi direct actif ✓' : 'Certificat reconnu ✓ Le Wi-Fi direct marchera quand tu seras sur le Wi-Fi de la maison.', 6000);
    return true;
  } catch (e) { toast('Activation impossible : ' + e.message, 5000); return false; }
}
async function downloadWifiCert() {
  try {
    const r = await fetch(S.server + '/api/wifi/certificat?format=crt', { cache: 'no-store' });
    if (!r.ok) throw new Error('le PC a répondu ' + r.status);
    const bytes = new Uint8Array(await r.arrayBuffer());
    if (!isKadansCA(bytes)) { toast('Ce certificat ne vient pas de Kadans : installation refusée. Relie à nouveau ton PC avec le QR affiché sur son écran.', 7000); return; }
    const fp = await certFingerprint(bytes);
    // l'empreinte comparée avec l'écran du PC est la vraie preuve que le certificat vient de TON PC
    if (!confirm('Empreinte du certificat :\n\n' + fp + '\n\nEst-elle identique à celle affichée sur ton PC (Kadans → onglet Mobile → Wi-Fi) ?\n\nSi elle est différente, touche Annuler et n’installe rien.')) { toast('Téléchargement annulé.'); return; }
    const url = URL.createObjectURL(new Blob([bytes], { type: 'application/x-x509-ca-cert' }));
    const a = h('a', { href: url, download: 'Kadans-WiFi.crt' }); document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
    toast('Certificat téléchargé ✓ Installe-le maintenant depuis les Paramètres (« certificat CA »).', 8000);
  } catch (e) { toast('Téléchargement impossible : ' + e.message, 5000); }
}

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
    NATIVE
      // App Android : une seule touche, rien à installer dans les Paramètres
      ? h('ol', { class: 'pg-steps small' },
        step(1, ['Touche ', h('b', null, '« Activer le Wi-Fi direct »'), ' ci-dessous.']),
        step(2, ['Compare l’empreinte affichée avec celle du PC (Kadans → onglet ', h('b', null, 'Mobile'), ' → Wi-Fi), puis ', h('b', null, 'OK'), '.']),
        step(3, ['C’est tout : à la maison, la musique passera directement par le Wi-Fi.']))
      : /Android/i.test(navigator.userAgent)
      // Android (Chrome) : le certificat se télécharge ici, puis s'installe depuis les Paramètres
      ? h('ol', { class: 'pg-steps small' },
        step(1, ['Touche ', h('b', null, '« Télécharger le certificat »'), ' ci-dessous : le fichier ', h('b', null, 'Kadans-WiFi.crt'), ' va dans tes Téléchargements.']),
        step(2, ['Ouvre ', h('b', null, 'Paramètres'), ' et cherche ', h('b', null, '« certificat CA »'), ' (en général ', h('b', null, 'Sécurité → Chiffrement et identifiants → Installer un certificat → Certificat CA'),
          ' ; sur Samsung : ', h('b', null, 'Sécurité et confidentialité → Autres paramètres de sécurité → Installer depuis la mémoire'), ').']),
        step(3, ['Touche ', h('b', null, 'Installer quand même'), ', déverrouille le téléphone, puis choisis ', h('b', null, 'Kadans-WiFi.crt'), '.']),
        step(4, ['Reviens dans Kadans (ouvert avec ', h('b', null, 'Chrome'), '), sur le Wi-Fi de la maison, puis « Vérifier maintenant ».']))
      : h('ol', { class: 'pg-steps small' },
        step(1, ['Sur le PC, onglet ', h('b', null, 'Mobile'), ' : scanne le QR ', h('b', null, '« Certificat Wi-Fi »'), ' avec l’appareil photo (ouverture dans ', h('b', null, 'Safari'), '), puis ', h('b', null, 'Autoriser'), '.']),
        step(2, ['Dans les 8 minutes : ', h('b', null, 'Réglages → Général → VPN et gestion de l’appareil → Profil téléchargé'), ' → « Kadans - Wi-Fi de la maison » → ', h('b', null, 'Installer'), ' (« Non vérifié » est normal).']),
        step(3, ['Puis ', h('b', null, 'Réglages → Général → Informations → Réglages des certificats'), ' : active ', h('b', null, '« Kadans - Wi-Fi de la maison »'), '.']),
        step(4, ['Reviens dans Kadans, sur le Wi-Fi de la maison.'])),
    NATIVE && S.server
      ? h('button', { class: 'pg-btn primary', type: 'button', onclick: async (e) => { e.currentTarget.disabled = true; if (await trustWifiCA() && WIFI.base) { closeSheet(); render(); } else wifiHelp(); } }, ico('wifi', 18), 'Activer le Wi-Fi direct')
      : /Android/i.test(navigator.userAgent) && S.server
      ? h('button', { class: 'pg-btn primary', type: 'button', onclick: downloadWifiCert }, ico('download', 18), 'Télécharger le certificat')
      : null,
    h('p', { class: 'ui-note', style: 'margin:0' }, NATIVE
      ? 'Le certificat n’est reconnu que par l’app Kadans, et seulement pour les adresses du réseau de la maison : il ne change rien pour le reste de la tablette.' + (NATIVE.caFingerprint() ? ' Certificat reconnu : ' + NATIVE.caFingerprint() + '.' : '')
      : 'Ce certificat est fait pour les adresses du réseau de la maison. N’installe que celui de ton PC : son empreinte doit être identique à celle affichée sur le PC.'),
    // diagnostic : ce que le téléphone a constaté au dernier essai
    !WIFI.base ? h('div', { class: 'pg-alert', style: 'background:rgba(255,255,255,.04);border-color:rgba(255,255,255,.1)' },
      h('div', null, h('b', null, 'Diagnostic'),
        h('span', null, !WIFI.info ? 'Le PC n’a pas encore indiqué son adresse Wi-Fi (Kadans 1.5 ou plus sur le PC, connexion mobile ouverte).'
          : 'Adresse du PC : ' + WIFI.info.ips.join(', ') + ' (port ' + WIFI.info.port + '). Dernier essai : ' + (WIFI.err || 'pas encore essayé') + '.'))) : null,
    WIFI.info && !WIFI.base ? h('p', { class: 'ui-note', style: 'margin:0' }, 'Test dans le navigateur (Safari ou Chrome) : ouvre ',
      h('a', { href: 'https://' + WIFI.info.ips[0] + ':' + WIFI.info.port + '/api/etat', target: '_blank', rel: 'noopener', style: 'color:#FF8A57' }, 'https://' + WIFI.info.ips[0] + ':' + WIFI.info.port + '/api/etat'),
      '. « Clé d’accès manquante » = tout va bien ; « connexion non privée » = certificat à activer ; rien ne charge = pas sur le Wi-Fi de la maison.') : null,
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
        sub: WIFI.base ? 'Direct avec le PC : transferts rapides' : WIFI.info ? (NATIVE && !NATIVE.caFingerprint() ? 'Inactif : touche ici pour l’activer' : 'Inactif : certificat à installer, ou pas à la maison') : 'Disponible avec la nouvelle version de Kadans',
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
    uiGroup('Mix', [
      uiRow({ icon: 'music', tint: '#86C29C', title: 'Niveau sonore égal', sub: 'Les platines jouent tous les morceaux au même volume',
        right: uiToggle(LEVEL.auto, (v) => { localStorage.setItem('kadans.niveauAuto', v ? '1' : '0'); for (const d of Object.values(MIX.decks)) if (d.track) MIX.setLevel(d, d.track); }, 'Niveau sonore égal sur les platines') }),
      uiRow({ icon: 'music', tint: '#86C29C', title: 'Bibliothèque au même niveau', sub: verGE(S.pcVersion, '1.6.1') ? 'Lecture et morceaux gardés : copies au bon volume préparées par le PC' : 'Demande Kadans 1.6.1 ou plus sur le PC',
        right: uiToggle(localStorage.getItem('kadans.niveauBiblio') !== '0', (v) => localStorage.setItem('kadans.niveauBiblio', v ? '1' : '0'), 'Bibliothèque au même niveau sonore') }),
    ], 'Les fichiers ne sont jamais modifiés : seul le volume de lecture est corrigé. Les morceaux déjà gardés sur l’iPhone restent comme avant (retire-les puis garde-les à nouveau pour les mettre au même niveau).'),
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
    h('p', { class: 'pg-foot' }, logoImg(20), 'Kadans 1.6 · usage personnel'));
}

// ------------------------------------------------------------------ démarrage
document.querySelectorAll('.tabs [data-ico]').forEach((s) => { s.innerHTML = iconHTML(s.dataset.ico, 22); });
document.querySelectorAll('.tabs button').forEach((b) => b.addEventListener('click', () => setTab(b.dataset.tab)));
document.addEventListener('visibilitychange', () => { if (!document.hidden) { probeWifi(true); tick(true); updateAwake(); } });
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
    // PC injoignable (loin de chez toi) : on réessaie toutes les 10 s, puis toutes les 30 s au bout d'une minute
    const offEvery = S.online === false ? ((S.fails || 0) > 6 ? 12 : 4) : 1;
    if (force || (S.online === false ? ticks % offEvery === 0 : ticks % 6 === 0 || S.online !== true)) {
      await checkServer();
      // pendant la synchro, on ne recharge pas toute la bibliothèque : la connexion sert aux morceaux
      if (S.online) { if (!SYNC.running || force) await refreshLibrary(); await refreshSync(); }
      if (force || ticks % 12 === 0) PLS.sync();
      if (S.tab === 'biblio') refreshTrackRows(true);
    }
    if (S.online !== false && (active || force || ticks % 6 === 0)) await refreshJobs();
  } finally { ticking = false; }
}

// ------------------------------------------------------------------ écran d'accueil
// À chaque ouverture : d'abord scanner le QR du PC, puis la page du code.
// Loin du PC : un petit lien permet de taper son code directement (musique gardée sur le téléphone).
function scanGate() {
  return new Promise((done) => {
    let finished = false;
    const finish = (how) => {
      if (finished) return; finished = true;
      window.removeEventListener('kadans-relie', onLinked);
      document.body.classList.remove('sheet-over-lock');
      box.remove(); done(how);
    };
    const onLinked = () => finish('scan');
    window.addEventListener('kadans-relie', onLinked);
    const scan = h('button', { class: 'btn primary', type: 'button', onclick: () => {
      document.body.classList.add('sheet-over-lock');   // la fenêtre du scan passe au-dessus de l'accueil
      scanQR();
      const back = setInterval(() => {
        if (!$('#sheet').hidden && !finished) return;
        clearInterval(back);
        if (!finished) document.body.classList.remove('sheet-over-lock');   // scan annulé : on reste sur l'accueil
      }, 300);
    } }, h('span', { class: 'ico', html: iconHTML('qr', 20) }), 'Scanner le QR code');
    const box = h('div', { class: 'lock gate' },
      h('div', { class: 'lock-card' },
        logoImg(64, 'lock-logo'),
        h('h1', null, 'Kadans'),
        h('p', { class: 'sub' }, 'Scanne le QR code affiché sur ton PC (onglet Mobile)'),
        scan),
      h('button', { class: 'lock-rescan', type: 'button', onclick: () => finish('code') },
        S.server ? 'Pas près du PC ? Taper mon code' : 'Continuer sans relier de PC'));
    document.body.append(box);
  });
}

(async function start() {
  const linked = readHashConfig();
  if (S.server && !linked) setServer(S.server, S.key);
  await loadOffline();
  await detectSameOrigin();
  // Code d'accès : redemandé à CHAQUE ouverture (un jeton gardé par iOS d'une ouverture précédente ne compte pas),
  // et vérifié AVANT d'afficher quoi que ce soit.
  LOCK.jeton = ''; sessionStorage.removeItem('kadans.jeton');
  // écran d'accueil (sauf si l'app vient d'être ouverte par le lien du QR, ou tourne sur le PC lui-même)
  const how = linked || S.server === location.origin ? 'lien' : await scanGate();
  if (how !== 'scan') {   // après un scan, la page du code est déjà affichée par le scan lui-même
    if (WIFI.info && S.server) await probeWifi(true);   // à la maison : le PC est joignable par le Wi-Fi, même s'il a changé d'adresse Internet
    await guard();
  }
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
