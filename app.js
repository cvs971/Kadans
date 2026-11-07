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

// ------------------------------------------------------------------ état
const S = {
  server: localStorage.getItem('kadans.serveur') || '',
  key: localStorage.getItem('kadans.cle') || '',
  online: null,          // null = inconnu, true/false
  pcName: '',
  lib: JSON.parse(localStorage.getItem('kadans.lib') || '[]'),
  offline: new Map(),    // id -> métadonnées des morceaux gardés sur l'iPhone
  saving: new Map(),     // id -> pourcentage d'enregistrement hors ligne
  jobs: [],
  handled: new Set(),
  tab: 'ajouter',
  format: localStorage.getItem('kadans.format') || 'mp3',
  autoOffline: localStorage.getItem('kadans.auto') !== '0',
  syncAuto: localStorage.getItem('kadans.syncAuto') !== '0',
  sendAuto: localStorage.getItem('kadans.sendAuto') !== '0',
  filter: 'tout',
  bpmOn: false, bpmMin: 95, bpmMax: 128,
  query: '',
  queue: [], index: -1, current: null,
};

function readHashConfig() {
  const hash = new URLSearchParams(location.hash.slice(1));
  const query = new URLSearchParams(location.search);
  const src = hash.get('s') ? hash : (query.get('s') ? query : null);
  if (src) {
    const changed = src.get('s').replace(/\/$/, '') !== S.server;
    setServer(src.get('s'), src.get('k') || '');
    // Dans Safari, on laisse le lien du PC dans l'adresse : « Sur l'écran d'accueil » le reprend,
    // et l'app installée est reliée au PC dès sa première ouverture.
    const standalone = navigator.standalone || matchMedia('(display-mode: standalone)').matches;
    history.replaceState(null, '', location.pathname + (standalone ? '' : '?' + new URLSearchParams({ s: S.server, k: S.key })));
    return changed;
  }
  return false;
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
async function api(path, opts = {}) {
  if (!S.server) throw new Error('PC non relié');
  const headers = { 'x-kadans-cle': S.key, ...(opts.headers || {}) };
  if (opts.json) { headers['content-type'] = 'application/json'; opts.body = JSON.stringify(opts.json); }
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), opts.timeout || 12000);
  try {
    const r = await fetch(S.server + path, { method: opts.method || 'GET', headers, body: opts.body, signal: ctrl.signal });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(data.erreur || ('Erreur ' + r.status));
    return data;
  } finally { clearTimeout(timer); }
}
const fileURL = (id) => `${S.server}/api/fichier/${id}?k=${encodeURIComponent(S.key)}`;
const coverURL = (id) => `${S.server}/api/pochette/${id}?k=${encodeURIComponent(S.key)}`;

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
    const st = await api('/api/etat', { timeout: 6000 });
    S.online = true; S.pcName = st.nom_pc || '';
  } catch (e) { S.online = false; }
  updatePill();
}
async function refreshLibrary() {
  if (!S.server) return;
  try {
    S.lib = await api('/api/bibliotheque', { timeout: 15000 });
    S.online = true;
    localStorage.setItem('kadans.lib', JSON.stringify(S.lib.slice(0, 3000)));
  } catch (e) { S.online = false; }
  updatePill();
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
    S.offline = new Map(metas.map((m) => [m.id, m]));
  } catch (e) { console.warn(e); }
}

async function fetchWithProgress(url, onProgress) {
  const r = await fetch(url);
  if (!r.ok) throw new Error('Téléchargement impossible (' + r.status + ')');
  const total = +r.headers.get('content-length') || 0;
  if (!r.body || !total) return r.blob();
  const reader = r.body.getReader();
  const chunks = []; let got = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value); got += value.length;
    onProgress(Math.round(got * 100 / total));
  }
  return new Blob(chunks, { type: r.headers.get('content-type') || '' });
}

async function saveOffline(item, quiet = false) {
  if (S.offline.has(item.id) || S.saving.has(item.id)) return;
  if (!S.online) { toast('Ton PC doit être allumé pour garder ce morceau.'); return; }
  S.saving.set(item.id, 0);
  refreshTrackRows();
  try {
    if (navigator.storage && navigator.storage.persist) navigator.storage.persist();
    let last = 0;
    const blob = await fetchWithProgress(fileURL(item.id), (p) => {
      S.saving.set(item.id, p);
      if (p - last >= 5) { last = p; refreshTrackRows(); }
    });
    let cover = null;
    try { const c = await fetch(coverURL(item.id)); if (c.ok) cover = await c.blob(); } catch (e) { /* pas de pochette */ }
    const meta = { id: item.id, titre: item.titre, artiste: item.artiste, bpm: item.bpm, duree: item.duree,
      type: item.type, ext: item.ext, source: item.source, ajoute: item.ajoute || Date.now() / 1000,
      taille: blob.size, garde: Date.now() };
    await DB.put(meta, blob, cover);
    S.offline.set(item.id, meta);
    if (!quiet) toast('« ' + item.titre + ' » est sur ton iPhone ✓');
  } catch (e) {
    if (!quiet) toast('Échec : ' + e.message);
    else SYNC.errors++;
  } finally {
    S.saving.delete(item.id);
    refreshTrackRows();
  }
}
async function removeOffline(item) {
  await DB.remove(item.id);
  S.offline.delete(item.id);
  coverCache.delete(item.id);
  refreshTrackRows();
  toast('Retiré du téléphone');
  reportIphone();
  refreshSync();
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
    const d = await api('/api/sync');
    const ids = new Set(d.ids);
    SYNC.wanted = allTracks().filter((t) => ids.has(t.id));
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
  for (const t of todo) {
    if (!S.online || !SYNC.running) break;
    await saveOffline(t, true);
    SYNC.done++;
    renderSyncBanner();
  }
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
  const r = await fetch(`${S.server}/api/envoyer?${q}`, { method: 'POST', headers: { 'x-kadans-cle': S.key }, body: blob });
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
    img.onerror = () => img.remove();
    el.append(img);
  };
  if (coverCache.has(t.id)) { const u = coverCache.get(t.id); if (u) add(u); }
  else if (S.offline.has(t.id)) {
    DB.getCover(t.id).then((b) => {
      const u = b ? URL.createObjectURL(b) : null;
      coverCache.set(t.id, u);
      if (u) add(u);
    }).catch(() => {});
  } else if (S.online && t.type === 'audio') add(coverURL(t.id));
  return el;
}

// ------------------------------------------------------------------ navigation
function setTab(tab) {
  S.tab = tab;
  document.querySelectorAll('.tabs button').forEach((b) => {
    if (b.dataset.tab === tab) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
  });
  render();
  $('#view').scrollTop = 0;
}
function render() {
  const v = $('#view');
  v.innerHTML = '';
  const views = { ajouter: viewAdd, biblio: viewLibrary, mix: () => MIX.view(), reglages: viewSettings };
  v.append(views[S.tab]());
  if (S.tab === 'biblio') renderList();
  if (S.tab === 'ajouter') renderJobs();
  renderSyncBanner();
  if (S.tab === 'mix') MIX.mount();
}
function statusPill() {
  let cls = 'dot', txt = 'PC non relié';
  if (S.server) {
    if (S.online === true) { cls += ' ok'; txt = 'PC connecté'; }
    else if (S.online === false) { cls += ' ko'; txt = 'Hors ligne'; }
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
function viewAdd() {
  const wrap = h('div');
  wrap.append(h('div', { class: 'top' },
    h('div', { class: 'brand' },
      h('span', { class: 'logo', html: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0E0F12" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M4 10v4M8 6v12M12 9v6M16 4v16M20 10v4"/></svg>' }),
      h('b', null, 'Kadans')),
    statusPill()));
  wrap.append(h('h1', null, 'Colle un lien,', h('br'), 'on s’occupe du reste.'),
    h('p', { class: 'sub' }, 'YouTube → ta bibliothèque, dispo sans internet.'));

  if (!S.server) {
    wrap.append(h('div', { class: 'card', style: 'margin-top:22px' },
      h('b', null, 'Relie d’abord ton PC'),
      h('ol', { class: 'steps' },
        h('li', null, 'Sur le PC, lance Kadans (double-clic sur « Kadans »).'),
        h('li', null, 'Une page s’ouvre avec un QR code.'),
        h('li', null, 'Touche le bouton ci-dessous et vise le QR code.')),
      h('button', { class: 'btn primary', type: 'button', onclick: scanQR }, 'Scanner le QR du PC'),
      h('button', { class: 'btn ghost', type: 'button', onclick: askLink }, ico('link', 18), 'J’ai un lien à coller')));
  } else {
    if (S.online === false) {
      wrap.append(h('div', { class: 'card', style: 'margin-top:22px;border-color:#4A2A2E' },
        h('b', null, 'Ton PC ne répond pas'),
        h('p', { class: 'sub', style: 'margin:0' }, 'Ta musique gardée sur l’iPhone reste disponible. Pour télécharger : allume le PC, lance Kadans, puis rescanne son QR code.'),
        h('button', { class: 'btn', type: 'button', onclick: scanQR }, 'Scanner le QR du PC')));
    }
    const input = h('input', { id: 'lien', class: 'input', type: 'url', inputmode: 'url', autocomplete: 'off',
      placeholder: 'https://youtube.com/watch?v=…', 'aria-label': 'Lien YouTube' });
    const paste = h('button', { class: 'btn', type: 'button', onclick: async () => {
      try { input.value = (await navigator.clipboard.readText()).trim(); } catch (e) { input.focus(); toast('Appuie longuement dans le champ, puis « Coller ».'); }
    } }, 'Coller');
    const seg = h('div', { class: 'seg', role: 'group', 'aria-label': 'Format' });
    [['mp3', 'MP3'], ['wav', 'WAV'], ['mp4', 'Clip vidéo']].forEach(([val, label]) => {
      seg.append(h('button', { type: 'button', 'aria-pressed': String(S.format === val), onclick: (e) => {
        S.format = val; localStorage.setItem('kadans.format', val);
        seg.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', 'false'));
        e.currentTarget.setAttribute('aria-pressed', 'true');
      } }, label));
    });
    const auto = h('input', { type: 'checkbox', id: 'auto' });
    auto.checked = S.autoOffline;
    auto.onchange = () => { S.autoOffline = auto.checked; localStorage.setItem('kadans.auto', auto.checked ? '1' : '0'); };
    const go = h('button', { class: 'btn primary', type: 'button', onclick: async () => {
      const url = input.value.trim();
      if (!/^https?:\/\//.test(url)) { toast('Colle un lien qui commence par https://'); return; }
      go.disabled = true;
      try {
        await api('/api/telecharger', { method: 'POST', json: { url, format: S.format } });
        input.value = '';
        toast('C’est parti ! Ton PC télécharge…');
        await refreshJobs();
      } catch (e) { toast(e.message); }
      go.disabled = false;
    } }, ico('download', 20), 'Télécharger');
    wrap.append(h('div', { class: 'card', style: 'margin-top:22px' },
      h('label', { class: 'label', for: 'lien' }, 'Lien YouTube'),
      h('div', { class: 'field' }, input, paste), seg,
      h('label', { class: 'check', for: 'auto' }, auto, 'Garder sur l’iPhone automatiquement'),
      go));
  }
  wrap.append(h('button', { class: 'btn ghost', type: 'button', style: 'width:100%;margin-top:12px', onclick: importFiles }, ico('phone', 18), 'Importer depuis l’iPhone (Fichiers)'));
  wrap.append(h('div', { id: 'syncbar' }));
  wrap.append(h('div', { class: 'section', id: 'jobs' }));
  const recents = allTracks().slice(0, 5);
  if (recents.length) {
    wrap.append(h('div', { class: 'section' },
      h('div', { class: 'section-head' }, h('span', { class: 'label' }, 'Récents'),
        h('button', { class: 'link', type: 'button', onclick: () => setTab('biblio') }, 'Tout voir')),
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
        setServer(cfg.s, cfg.k);
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
    e.currentTarget.setAttribute('aria-pressed', 'true'); renderList();
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
  wrap.append(range, h('div', { id: 'list' }));
  return wrap;
}
function filteredTracks() {
  const q = S.query.trim().toLowerCase();
  return allTracks().filter((t) => {
    if (S.filter === 'iphone' && !S.offline.has(t.id)) return false;
    if (S.filter === 'clips' && t.type !== 'video') return false;
    if (S.filter.startsWith('src:') && t.source !== S.filter.slice(4)) return false;
    if (S.bpmOn && !(t.bpm >= S.bpmMin && t.bpm <= S.bpmMax)) return false;
    if (q) {
      if (/^\d{2,3}$/.test(q)) return t.bpm && Math.abs(t.bpm - +q) <= 3;
      return ((t.titre || '') + ' ' + (t.artiste || '')).toLowerCase().includes(q);
    }
    return true;
  });
}
function renderList() {
  const box = $('#list');
  if (!box) return;
  const list = filteredTracks();
  box.innerHTML = '';
  if (!list.length) {
    box.append(h('div', { class: 'empty' }, S.lib.length || S.offline.size
      ? 'Aucun morceau ne correspond.'
      : (S.online ? 'Ta bibliothèque est vide. Ajoute un lien ou un dossier sur le PC.' : 'Rien sur l’iPhone pour l’instant. Relie ton PC pour commencer.')));
    return;
  }
  const max = 400;
  list.slice(0, max).forEach((t) => box.append(trackRow(t, list)));
  if (list.length > max) box.append(h('div', { class: 'empty' }, `+ ${list.length - max} autres : affine ta recherche.`));
}
function refreshTrackRows() {
  if (S.tab === 'biblio') { renderList(); const c = $('#count'); if (c) c.textContent = `${allTracks().length} morceaux · ${S.offline.size} sur l’iPhone`; }
  else if (S.tab === 'ajouter') { const r = $('.list-recents'); if (r) { const rec = allTracks().slice(0, 5); r.replaceChildren(...rec.map((t) => trackRow(t, rec))); } }
}
function trackRow(t, list) {
  const isCur = S.current && S.current.id === t.id;
  let state;
  if (S.saving.has(t.id)) state = h('span', { class: 'bpm wait', style: 'min-width:46px' }, S.saving.get(t.id) + '%');
  else if (S.offline.has(t.id)) state = h('span', { class: 'icon-btn state-ok', title: 'Sur l’iPhone', html: iconHTML('check', 20), role: 'img', 'aria-label': 'Sur l’iPhone' });
  else state = h('button', { class: 'icon-btn state-dl', type: 'button', 'aria-label': 'Garder sur l’iPhone', html: iconHTML('download', 20),
    onclick: (e) => { e.stopPropagation(); saveOffline(t); } });
  const row = h('div', { class: 'track' + (isCur ? ' playing' : '') },
    h('button', { type: 'button', style: 'display:flex;align-items:center;gap:12px;flex:1;min-width:0;background:none;border:0;padding:0;text-align:left',
      'aria-label': 'Lire ' + t.titre, onclick: () => playTrack(t, list) },
      coverEl(t),
      h('span', { class: 'meta' },
        h('span', { class: 't1' }, t.titre),
        h('span', { class: 't2' }, [t.type === 'video' ? 'Clip vidéo' : null, t.artiste, t.duree ? fmtTime(t.duree) : null].filter(Boolean).join(' · ') || t.source || ''))),
    h('span', { class: 'bpm' + (t.bpm ? '' : ' wait') }, t.bpm ? t.bpm : '…'),
    state,
    h('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Options', html: iconHTML('more', 20), onclick: () => trackMenu(t) }));
  return row;
}
function trackMenu(t) {
  openSheet(() => h('div', null,
    h('div', { style: 'display:flex;gap:12px;align-items:center;margin-bottom:8px' }, coverEl(t),
      h('div', { class: 'meta', style: 'min-width:0' }, h('div', { class: 't1' }, t.titre), h('div', { class: 't2' }, [t.artiste, t.bpm ? t.bpm + ' BPM' : null].filter(Boolean).join(' · ')))),
    h('button', { class: 'menu-item', type: 'button', onclick: () => { closeSheet(); playTrack(t, [t]); } }, ico('play', 20), 'Lire'),
    t.type === 'audio' ? h('button', { class: 'menu-item', type: 'button', onclick: () => { closeSheet(); MIX.load('A', t); setTab('mix'); } },
      h('span', { class: 'badge', style: 'width:24px;height:24px;font-size:12px;border-radius:7px;background:var(--accent)' }, 'A'), 'Charger sur la platine A') : null,
    t.type === 'audio' ? h('button', { class: 'menu-item', type: 'button', onclick: () => { closeSheet(); MIX.load('B', t); setTab('mix'); } },
      h('span', { class: 'badge', style: 'width:24px;height:24px;font-size:12px;border-radius:7px;background:var(--deckb)' }, 'B'), 'Charger sur la platine B') : null,
    S.offline.has(t.id)
      ? h('button', { class: 'menu-item red', type: 'button', onclick: () => { closeSheet(); removeOffline(t); } }, ico('trash', 20), 'Retirer du téléphone')
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

// ------------------------------------------------------------------ Mix : 2 platines
const MIX = {
  ctx: null, master: null, recDest: null, xf: 0.5, recorder: null, recChunks: [], autoTimer: null,
  decks: {
    A: { letter: 'A', color: 'var(--accent)', hex: '#FF7A45', el: null, node: null, gain: null, track: null, peaks: null, tempo: 0, cue: 0, url: null },
    B: { letter: 'B', color: 'var(--deckb)', hex: '#7C9CFF', el: null, node: null, gain: null, track: null, peaks: null, tempo: 0, cue: 0, url: null },
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
        d.el.playsInline = true;
        d.el.preservesPitch = true; d.el.webkitPreservesPitch = true;
        d.node = this.ctx.createMediaElementSource(d.el);
        d.gain = this.ctx.createGain();
        d.node.connect(d.gain).connect(this.master);
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
  },
  rate(d) { return 1 + d.tempo / 100; },
  effBpm(d) { return d.track && d.track.bpm ? (d.track.bpm * this.rate(d)).toFixed(1).replace('.0', '') : '—'; },
  async load(letter, t) {
    this.ensure();
    const d = this.decks[letter];
    if (!playable(t)) { toast('Ce morceau n’est pas sur l’iPhone et ton PC est injoignable.'); return; }
    toast('Chargement sur la platine ' + letter + '…', 1500);
    try {
      let blob = S.offline.has(t.id) ? await DB.getFile(t.id) : null;
      if (!blob) { const r = await fetch(fileURL(t.id)); if (!r.ok) throw new Error('fichier indisponible'); blob = await r.blob(); }
      d.el.pause();
      if (d.url) URL.revokeObjectURL(d.url);
      d.url = URL.createObjectURL(blob);
      d.el.src = d.url;
      d.el.playbackRate = this.rate(d);
      d.track = t; d.cue = 0; d.peaks = null;
      if (S.tab === 'mix') this.mount();
      const buf = await this.ctx.decodeAudioData(await blob.arrayBuffer());
      d.peaks = this.computePeaks(buf, 600);
      if (!d.track.duree) d.track.duree = buf.duration;
    } catch (e) { toast('Impossible de charger : ' + e.message); }
    if (S.tab === 'mix') this.mount();
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
  },
  deckView(d) {
    const t = d.track;
    const canvas = h('canvas', { 'aria-hidden': 'true' });
    const wave = h('div', { class: 'wave' }, canvas, t ? null : h('span', { class: 'hint' }, 'Bibliothèque → « … » → Platine ' + d.letter));
    wave.addEventListener('pointerdown', (e) => {
      if (!t || !d.el.duration) return;
      const r = wave.getBoundingClientRect();
      d.el.currentTime = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * d.el.duration;
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
      if (d.el) d.el.playbackRate = this.rate(d);
      lbl.textContent = 'Tempo ' + (d.tempo >= 0 ? '+' : '') + d.tempo.toFixed(1).replace('.', ',') + ' %';
      bpmEl.textContent = this.effBpm(d);
    };
    slider.ondblclick = () => { slider.value = 0; slider.oninput(); };
    return h('div', { class: 'deck' },
      h('div', { class: 'deck-head' },
        h('span', { class: 'badge', style: 'background:' + d.color }, d.letter),
        h('div', { class: 'meta', style: 'flex:1;min-width:0;display:flex;flex-direction:column;gap:2px' },
          h('span', { class: 't1' }, t ? t.titre : 'Platine vide'),
          h('span', { class: 't2', id: 'time' + d.letter }, t ? (t.artiste || '') : 'Charge un morceau')),
        h('div', { class: 'big-bpm' }, bpmEl, h('span', null, 'BPM'))),
      wave,
      h('div', { class: 'deck-ctrl' }, play,
        h('button', { class: 'btn', type: 'button', onclick: () => this.cue(d.letter) }, 'CUE'),
        h('button', { class: 'btn ghost', type: 'button', onclick: () => this.sync(d.letter) }, 'SYNC'),
        h('div', { class: 'tempo' }, lbl, slider)));
  },
  view() {
    const xf = h('input', { id: 'xfade', type: 'range', min: 0, max: 100, value: Math.round(this.xf * 100) });
    xf.oninput = () => { clearInterval(this.autoTimer); this.xf = xf.value / 100; this.applyXf(); };
    this.ui.xf = xf;
    this.ui.recTxt = h('span', null, this.recorder ? 'Arrêter' : 'Enregistrer');
    this.ui.rec = h('button', { class: 'btn small' + (this.recorder ? ' rec-on' : ''), type: 'button', onclick: () => this.toggleRec() }, h('span', { class: 'rec-dot' }), this.ui.recTxt);
    return h('div', null,
      h('div', { class: 'top' }, h('h1', null, 'Mix'), this.ui.rec),
      this.deckView(this.decks.A),
      this.deckView(this.decks.B),
      h('div', { class: 'xfader' },
        h('div', { class: 'ends' }, h('span', null, 'A'), h('label', { for: 'xfade' }, 'Crossfader'), h('span', null, 'B')),
        xf,
        h('div', { style: 'display:flex;gap:8px;justify-content:center' },
          h('button', { class: 'btn small', type: 'button', onclick: () => this.automix() }, 'Auto-mix'),
          h('button', { class: 'btn small', type: 'button', onclick: () => { this.xf = 0.5; xf.value = 50; this.applyXf(); } }, 'Centre'))),
      h('p', { class: 'sub', style: 'text-align:center;margin-top:14px' }, 'Astuce : double-tape un curseur Tempo pour le remettre à 0.'));
  },
  mount() {
    const v = $('#view');
    if (S.tab !== 'mix') return;
    v.replaceChildren(this.view());
    this.loop();
  },
  loop() {
    cancelAnimationFrame(this._raf);
    const draw = () => {
      if (S.tab !== 'mix') return;
      for (const d of Object.values(this.decks)) {
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
function viewSettings() {
  const st = S.online === true ? 'Connecté' : S.online === false ? 'Injoignable (PC éteint ?)' : (S.server ? 'Connexion…' : 'Non relié');
  const usage = h('span', null, '…');
  if (navigator.storage && navigator.storage.estimate) navigator.storage.estimate().then((e) => { usage.textContent = fmtSize(e.usage) + ' utilisés'; });
  let total = 0; for (const m of S.offline.values()) total += m.taille || 0;
  return h('div', null,
    h('div', { class: 'top' }, h('h1', null, 'Réglages')),
    h('div', { class: 'card' },
      h('span', { class: 'label' }, 'Ton PC'),
      h('div', { class: 'kv' }, h('span', null, 'État'), h('span', null, st)),
      S.pcName ? h('div', { class: 'kv' }, h('span', null, 'Nom'), h('span', null, S.pcName)) : null,
      h('div', { style: 'display:flex;gap:8px;flex-wrap:wrap' },
        h('button', { class: 'btn small', type: 'button', onclick: async () => { await checkServer(); await refreshLibrary(); render(); toast(S.online ? 'PC connecté ✓' : 'PC injoignable'); } }, ico('refresh', 18), 'Vérifier'),
        S.online ? h('button', { class: 'btn small', type: 'button', onclick: async () => { await api('/api/scanner', { method: 'POST' }); toast('Analyse des dossiers lancée sur le PC'); } }, ico('music', 18), 'Réanalyser les dossiers') : null,
        h('button', { class: 'btn small', type: 'button', onclick: scanQR }, 'Scanner le QR du PC'),
        h('button', { class: 'btn small ghost', type: 'button', onclick: askLink }, ico('link', 18), 'Coller un lien')),
      h('p', { class: 'sub', style: 'margin:0' }, 'Après un redémarrage du PC, son adresse change : ouvre Kadans sur l’iPhone, puis « Scanner le QR du PC ». Ta musique déjà gardée sur l’iPhone est conservée.')),
    h('div', { class: 'card', style: 'margin-top:14px' },
      h('span', { class: 'label' }, 'Sur cet iPhone'),
      (() => {
        const cb = h('input', { type: 'checkbox', id: 'syncauto' });
        cb.checked = S.syncAuto;
        cb.onchange = () => { S.syncAuto = cb.checked; localStorage.setItem('kadans.syncAuto', cb.checked ? '1' : '0'); if (cb.checked) refreshSync(); };
        return h('label', { class: 'check', for: 'syncauto' }, cb, 'Rapatrier automatiquement les morceaux cochés sur le PC');
      })(),
      (() => {
        const cb = h('input', { type: 'checkbox', id: 'sendauto' });
        cb.checked = S.sendAuto;
        cb.onchange = () => { S.sendAuto = cb.checked; localStorage.setItem('kadans.sendAuto', cb.checked ? '1' : '0'); if (cb.checked) runUpload(); };
        return h('label', { class: 'check', for: 'sendauto' }, cb, 'Envoyer automatiquement sur le PC mes mix et fichiers importés');
      })(),
      h('div', { class: 'kv' }, h('span', null, 'En attente d’envoi vers le PC'), h('span', null, String(phoneOnly().length))),
      h('div', { class: 'kv' }, h('span', null, 'Morceaux gardés'), h('span', null, S.offline.size + ' (' + fmtSize(total) + ')')),
      h('div', { class: 'kv' }, h('span', null, 'Espace'), usage),
      h('button', { class: 'btn small danger', type: 'button', onclick: async () => {
        if (!confirm('Retirer TOUS les morceaux de l’iPhone ? (Ils restent sur ton PC.)')) return;
        for (const id of [...S.offline.keys()]) await DB.remove(id);
        S.offline.clear(); coverCache.clear(); render(); toast('Espace libéré');
      } }, ico('trash', 18), 'Libérer l’espace')),
    h('div', { class: 'card', style: 'margin-top:14px' },
      h('span', { class: 'label' }, 'Installer l’app'),
      h('ol', { class: 'steps' },
        h('li', null, 'Ouvre cette page dans Safari.'),
        h('li', null, 'Touche Partager (carré avec une flèche).'),
        h('li', null, 'Touche « Sur l’écran d’accueil », puis « Ajouter ».'))),
    h('p', { class: 'sub', style: 'text-align:center;margin:20px 0 4px' }, 'Kadans 1.3 · usage personnel'));
}

// ------------------------------------------------------------------ démarrage
document.querySelectorAll('.tabs [data-ico]').forEach((s) => { s.innerHTML = iconHTML(s.dataset.ico, 22); });
document.querySelectorAll('.tabs button').forEach((b) => b.addEventListener('click', () => setTab(b.dataset.tab)));
document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(true); });
window.addEventListener('hashchange', async () => {
  if (readHashConfig()) { toast('PC relié ✓'); await checkServer(); await refreshLibrary(); render(); }
});

let ticks = 0;
async function tick(force) {
  if (document.hidden || !S.server) return;
  ticks++;
  const active = S.jobs.some((j) => !['termine', 'erreur'].includes(j.etat));
  if (force || ticks % 6 === 0 || S.online !== true) {
    await checkServer();
    if (S.online) { await refreshLibrary(); await refreshSync(); }
    if (S.tab === 'biblio') refreshTrackRows();
  }
  if (active || force || ticks % 6 === 0) await refreshJobs();
}

(async function start() {
  const linked = readHashConfig();
  if (S.server && !linked) setServer(S.server, S.key);
  await loadOffline();
  await detectSameOrigin();
  setTab(S.server ? (S.offline.size || S.lib.length ? 'biblio' : 'ajouter') : 'ajouter');
  if (linked) toast('PC relié ✓ Ajoute maintenant l’app à l’écran d’accueil.', 4000);
  await tick(true);
  render();
  setInterval(tick, 2500);
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
})();
