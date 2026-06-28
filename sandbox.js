let SUBJECT_NAME = 'Matière';
let SUBJECT_DESC = 'Utilise cette page pour réviser avec un bac à sable dédié.';
let BANK = [];
let QC_BANK = [];

let currentSession = [];
let currentQC = [];
let answers = [];
let shuffledOpts = [];
let shuffledCorrects = [];
let currentQ = 0;
let examFinished = false;
let startTime = null;
let timerInterval = null;
let remainingSeconds = 0;
let correctPoints = 0.25;
let wrongPoints = 0.083;
let currentUser = null;
let lastSessionSignature = '';
let lastDrawQuestionKeys = [];
let activeModule = 'sandbox';
let selectedChapterQuick = [];
const RECENT_QUESTIONS_STORAGE_PREFIX = 'qcm_recent_questions_v1::';
const IS_ANAT_SUBJECT = () => String(SUBJECT_NAME || '').toLowerCase() === 'anat';

const ACCOUNTS_STORAGE_KEY = 'qcm_local_accounts_v1';
const LEADERBOARD_STORAGE_KEY = 'qcm_leaderboard_v1';
const FEEDBACK_STORAGE_KEY = 'qcm_feedback_reports_v1';
const memoryStorageFallback = {};
const windowNameStoragePrefix = 'QCM_STATE::';

function readWindowNameStorage() {
  if (typeof window.name !== 'string' || !window.name.startsWith(windowNameStoragePrefix)) return {};
  try {
    const parsed = JSON.parse(window.name.slice(windowNameStoragePrefix.length));
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (e) { return {}; }
}

function writeWindowNameStorage(store) {
  try { window.name = windowNameStoragePrefix + JSON.stringify(store); } catch (e) { return; }
}

function safeGetItem(key) {
  try { return localStorage.getItem(key); } catch (e) {
    const persisted = readWindowNameStorage();
    if (Object.prototype.hasOwnProperty.call(persisted, key)) return persisted[key];
    return Object.prototype.hasOwnProperty.call(memoryStorageFallback, key) ? memoryStorageFallback[key] : null;
  }
}

function safeSetItem(key, value) {
  try { localStorage.setItem(key, value); } catch (e) {
    memoryStorageFallback[key] = String(value);
    const persisted = readWindowNameStorage();
    persisted[key] = String(value);
    writeWindowNameStorage(persisted);
  }
}

function safeRemoveItem(key) {
  try { localStorage.removeItem(key); } catch (e) {
    delete memoryStorageFallback[key];
    const persisted = readWindowNameStorage();
    delete persisted[key];
    writeWindowNameStorage(persisted);
  }
}

function safeCssEscape(value) {
  if (window.CSS && typeof window.CSS.escape === 'function') return window.CSS.escape(value);
  return String(value).replace(/(["'\\.#:\[\](),>+~*^$|=\s])/g, '\\$1');
}

function setMessageZone(text) {
  const zone = document.getElementById('message-zone');
  if (zone) zone.textContent = text || '';
}

function showFatalInitError(error) {
  const message = (error && error.message) ? error.message : String(error || 'Erreur inconnue');
  const stack = error && error.stack ? `<pre style="white-space:pre-wrap;margin-top:10px;color:#ffd2d2">${error.stack}</pre>` : '';
  document.body.innerHTML = `
    <div style="max-width:820px;margin:40px auto;padding:20px;border-radius:12px;background:#2b1a1a;border:1px solid #a94442;color:#ffdede;font-family:Segoe UI,system-ui,sans-serif">
      <h2 style="margin-bottom:10px;color:#ff8a8a">Erreur de chargement de la page</h2>
      <p style="margin-bottom:8px">La page a rencontré une erreur JavaScript pendant l'initialisation.</p>
      <p style="margin-bottom:8px"><strong>Détail :</strong> ${message}</p>
      <p style="margin-bottom:0">Recharge la page (Ctrl+F5). Si l'erreur persiste, envoie ce message.</p>
      ${stack}
    </div>
  `;
}

function loadAccounts() {
  try {
    const raw = safeGetItem(ACCOUNTS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') return parsed;
  } catch (e) { console.warn('Impossible de charger les comptes locaux', e); }
  return {};
}

function saveAccounts(accounts) { safeSetItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts)); }

function loadLeaderboard() {
  try {
    const raw = safeGetItem(LEADERBOARD_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) { console.warn('Impossible de charger le classement local', e); }
  return [];
}

function saveLeaderboard(entries) { safeSetItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(entries)); }

function recordLeaderboardResult(result) {
  const normalized = normalizeStoredResult(result);
  const entries = loadLeaderboard();
  entries.unshift(normalized);
  saveLeaderboard(entries.slice(0, 100));
  if (window.QCM_REMOTE && typeof window.QCM_REMOTE.pushResult === 'function') window.QCM_REMOTE.pushResult(normalized);
}

function getSignedUser() { return (safeGetItem('qcm_signed_user') || '').trim(); }

function setSignedUser(name) {
  if (!name) { safeRemoveItem('qcm_signed_user'); currentUser = null; return; }
  safeSetItem('qcm_signed_user', name);
  currentUser = name;
}

function normalizeUsername(value) { return (value || '').trim().toLowerCase().slice(0, 30); }
function validatePin(pin) { return /^\d{4,8}$/.test(pin || ''); }

function parseStoredDate(value) {
  if (!value) return null;
  const direct = new Date(value);
  if (!Number.isNaN(direct.getTime())) return direct;
  const match = String(value).match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})(?:\s+(\d{1,2}):(\d{2}))?$/);
  if (!match) return null;
  const day = Number(match[1]), month = Number(match[2]) - 1;
  const year = Number(match[3].length === 2 ? `20${match[3]}` : match[3]);
  const hour = Number(match[4] || 0), minute = Number(match[5] || 0);
  const parsed = new Date(year, month, day, hour, minute);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function buildResultTimestamp() { return new Date().toISOString(); }

function formatStoredDateForDisplay(value) {
  const parsed = parseStoredDate(value);
  return parsed ? parsed.toLocaleString('fr-FR') : String(value || '');
}

function normalizeStoredResult(result) {
  const raw = result || {};
  const parsedDate = parseStoredDate(raw.date);
  return {
    date: parsedDate ? parsedDate.toISOString() : buildResultTimestamp(),
    subject: String(raw.subject || SUBJECT_NAME || 'Inconnu'),
    user: String(raw.user || 'Invité'),
    score: Number(raw.score), max: Number(raw.max), pct: Number(raw.pct)
  };
}

function getSelectedQuickChapter() { return Array.isArray(selectedChapterQuick) ? [...selectedChapterQuick] : []; }
function normalizeQuestionText(value) { return String(value || '').replace(/\s+/g, ' ').trim(); }
function normalizeOptionKey(value) { return normalizeQuestionText(value).toLowerCase(); }

function sanitizeQuestionEntry(entry) {
  const source = entry || {};
  const originalOptions = Array.isArray(source.opts) ? source.opts : [];
  const parsedAnswerIndex = Number.isInteger(source.a) ? source.a : parseInt(source.a, 10);
  const safeAnswerIndex = Number.isFinite(parsedAnswerIndex) ? parsedAnswerIndex : 0;
  const correctText = originalOptions[safeAnswerIndex];
  const uniqueOptions = [], seenOptions = new Set();
  let removedOptionCount = 0;
  originalOptions.forEach((option) => {
    const raw = String(option == null ? '' : option);
    const key = normalizeOptionKey(raw);
    if (!key) { removedOptionCount += 1; return; }
    if (seenOptions.has(key)) { removedOptionCount += 1; return; }
    seenOptions.add(key); uniqueOptions.push(raw);
  });
  let nextAnswerIndex = uniqueOptions.findIndex((option) => normalizeOptionKey(option) === normalizeOptionKey(correctText));
  if (nextAnswerIndex < 0) {
    if (correctText != null && normalizeOptionKey(correctText)) { uniqueOptions.unshift(String(correctText)); nextAnswerIndex = 0; }
    else nextAnswerIndex = 0;
  }
  if (!uniqueOptions.length) { uniqueOptions.push('Option indisponible'); nextAnswerIndex = 0; }
  return { entry: { ...source, q: String(source.q || ''), opts: uniqueOptions, a: nextAnswerIndex }, removedOptionCount };
}

function prepareQuestionPool(pool) {
  const uniqueQuestions = [], seenQuestions = new Set();
  let duplicateQuestionCount = 0, duplicateOptionCount = 0;
  (Array.isArray(pool) ? pool : []).forEach((entry) => {
    const sanitized = sanitizeQuestionEntry(entry);
    const key = questionKey(sanitized.entry);
    if (!key) return;
    if (seenQuestions.has(key)) { duplicateQuestionCount += 1; duplicateOptionCount += sanitized.removedOptionCount; return; }
    seenQuestions.add(key); duplicateOptionCount += sanitized.removedOptionCount;
    uniqueQuestions.push(sanitized.entry);
  });
  return { questions: uniqueQuestions, duplicateQuestionCount, duplicateOptionCount };
}

function syncChapterFilterSelection(chapters) {
  const filter = document.getElementById('chapter-filter');
  if (!filter) return;
  const wanted = new Set(chapters || []);
  Array.from(filter.options).forEach(option => {
    option.selected = option.value === 'all' ? wanted.size === 0 : wanted.has(option.value);
  });
}

function getCurrentGradingConfig() {
  const gradingMode = document.getElementById('partiel-grading')?.value || 'bac';
  if (gradingMode === 'simple') return { good: 1, bad: 0, label: 'Simple (+1 / 0)' };
  if (gradingMode === 'custom') {
    const parseCustomValue = (value, fallback) => {
      const normalized = String(value ?? '').replace(',', '.').trim();
      const parsed = parseFloat(normalized);
      return Number.isFinite(parsed) ? parsed : fallback;
    };
    const good = parseCustomValue(document.getElementById('custom-good')?.value, 0.25);
    const bad = parseCustomValue(document.getElementById('custom-bad')?.value, 0.083);
    return { good, bad, label: 'Personnalisé' };
  }
  return { good: 0.25, bad: 0.083, label: 'Bac (+0,25 / -0,083)' };
}

function styleOptionsPanel() {
  if (document.getElementById('sandbox-enhanced-style')) return;
  const style = document.createElement('style');
  style.id = 'sandbox-enhanced-style';
  style.textContent = `
    .options-shell{background:linear-gradient(180deg,#0f2f52,#0c2747);border:1px solid #29507a;border-radius:14px;padding:14px 14px 12px;box-shadow:0 10px 24px rgba(0,0,0,.18)}
    .options-shell .option-heading{font-size:.82rem;font-weight:800;letter-spacing:.08em;color:#c8dcf7;text-transform:uppercase;margin-bottom:10px}
    .options-shell label{display:block;color:#d8e5f8;font-size:.86rem;margin-bottom:8px}
    .options-shell select,.options-shell input[type='number'],.options-shell input[type='text'],.options-shell input[type='password']{width:100%;margin-top:5px;padding:9px 10px;border-radius:10px;border:1px solid #3f5f84;background:#0a1e38;color:#ecf4ff}
    .options-row{display:grid;grid-template-columns:1fr;gap:10px}
    .option-chip{display:inline-flex;align-items:center;gap:8px;padding:7px 10px;border:1px solid #355a87;background:#0b223d;border-radius:999px;color:#d6e6ff;font-size:.82rem;margin-right:7px;margin-bottom:8px}
    .option-chip input{width:auto;margin:0}
    .account-shell{margin-top:14px;background:linear-gradient(180deg,#152d24,#11251e);border:1px solid #2f5c4d;border-radius:14px;padding:14px}
    .account-shell h3{font-size:.95rem;color:#73d5a7;margin-bottom:8px}
    .account-shell p{color:#b2c8c0;font-size:.82rem;line-height:1.45;margin-bottom:10px}
    .account-actions{display:flex;gap:8px;flex-wrap:wrap}
    .account-btn{padding:8px 12px;border-radius:9px;border:1px solid #3f6b5c;background:#17342a;color:#d2f5e7;cursor:pointer;font-weight:700;font-size:.82rem}
    .account-btn:hover{filter:brightness(1.08)}
    .account-badge{display:inline-block;padding:5px 9px;border-radius:999px;background:#1d4435;color:#8ef0be;font-size:.78rem;font-weight:700;margin-bottom:10px}
    .history-list{margin-top:10px;max-height:180px;overflow:auto;border-top:1px solid #2b5144;padding-top:8px}
    .history-item{font-size:.78rem;color:#cde2da;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.06)}
    .chapter-chip.active{border-color:#e74c3c;background:rgba(231,76,60,.18);color:#fff}
  `;
  document.head.appendChild(style);
  const sandboxOptions = document.getElementById('sandbox-options') || document.getElementById('module-sandbox');
  const commonOptions = document.getElementById('common-options') || document.getElementById('module-partiel');
  if (sandboxOptions) {
    sandboxOptions.classList.add('options-shell');
    if (!sandboxOptions.querySelector('.option-heading')) {
      const heading = document.createElement('div'); heading.className = 'option-heading'; heading.textContent = 'Filtres de questions'; sandboxOptions.prepend(heading);
    }
  }
  if (commonOptions) {
    commonOptions.classList.add('options-shell');
    if (!commonOptions.querySelector('.option-heading')) {
      const heading = document.createElement('div'); heading.className = 'option-heading'; heading.textContent = 'Paramètres de session'; commonOptions.prepend(heading);
    }
    commonOptions.querySelectorAll('label').forEach((label, idx) => {
      if (idx <= 2 && label.querySelector('input[type="checkbox"],input[type="number"],select')) label.classList.add('option-chip');
    });
  }
}

function ensureHeaderControls() {
  const header = document.getElementById('header');
  if (!header) return;
  let controls = document.getElementById('header-controls');
  if (!controls) {
    controls = document.createElement('div'); controls.id = 'header-controls';
    controls.style.display = 'flex'; controls.style.alignItems = 'center'; controls.style.gap = '8px';
    header.appendChild(controls);
  }
  if (!document.getElementById('header-back-btn')) {
    const backBtn = document.createElement('button');
    backBtn.id = 'header-back-btn'; backBtn.type = 'button'; backBtn.className = 'home-btn';
    backBtn.textContent = 'Retour'; backBtn.onclick = goBack; controls.appendChild(backBtn);
  }
  if (!document.getElementById('header-home-btn')) {
    const homeBtn = document.createElement('button');
    homeBtn.id = 'header-home-btn'; homeBtn.type = 'button'; homeBtn.className = 'home-btn';
    homeBtn.textContent = 'Accueil'; homeBtn.onclick = goHome; controls.appendChild(homeBtn);
  }function goBack() {
  if (window.history.length > 1) {
    history.back();
  } else {
    window.location.href = 'index.html';
  }
}
}

function injectAccountPanel() {
  if (document.getElementById('account-zone')) return;
  const homeCard = document.querySelector('.home-card');
  if (!homeCard) return;
  const statGrid = homeCard.querySelector('.stat-grid');
  const panel = document.createElement('div');
  panel.id = 'account-zone'; panel.className = 'account-shell';
  panel.innerHTML = `<h3>Compte local</h3><p>Crée un compte local pour sauvegarder ton historique de résultats sur cet appareil.</p><div id="account-content"></div>`;
  if (statGrid && statGrid.nextSibling) homeCard.insertBefore(panel, statGrid.nextSibling);
  else homeCard.appendChild(panel);
}

function renderAccountPanel() {
  const content = document.getElementById('account-content');
  if (!content) return;
  const accounts = loadAccounts();
  const signed = getSignedUser();
  if (signed && accounts[signed]) currentUser = signed;
  if (!currentUser || !accounts[currentUser]) {
    content.innerHTML = `
      <div class="options-row">
        <label>Nom d'utilisateur<input id="account-username" type="text" placeholder="ex: sara" maxlength="30"></label>
        <label>Code PIN (4 à 8 chiffres)<input id="account-pin" type="password" placeholder="ex: 1234" maxlength="8"></label>
      </div>
      <div class="account-actions" style="margin-top:8px">
        <button class="account-btn" id="create-account-btn" type="button">Créer le compte</button>
        <button class="account-btn" id="login-account-btn" type="button">Se connecter</button>
      </div>`;
    const createBtn = document.getElementById('create-account-btn');
    const loginBtn = document.getElementById('login-account-btn');
    if (createBtn) createBtn.addEventListener('click', createLocalAccount);
    if (loginBtn) loginBtn.addEventListener('click', loginLocalAccount);
    return;
  }
  const history = accounts[currentUser].history || [];
  content.innerHTML = `
    <div class="account-badge">Connecté: ${currentUser}</div>
    <div class="account-actions"><button class="account-btn" id="logout-account-btn" type="button">Se déconnecter</button></div>
    <div class="history-list" id="account-history">
      ${history.length ? history.map(item => `<div class="history-item">${formatStoredDateForDisplay(item.date)} • ${item.subject} • ${item.score}/${item.max} (${item.pct}%)</div>`).join('') : '<div class="history-item">Aucun résultat enregistré pour le moment.</div>'}
    </div>`;
  const logoutBtn = document.getElementById('logout-account-btn');
  if (logoutBtn) logoutBtn.addEventListener('click', logoutLocalAccount);
}

function createLocalAccount() {
  const usernameInput = document.getElementById('account-username');
  const pinInput = document.getElementById('account-pin');
  const username = normalizeUsername(usernameInput ? usernameInput.value : '');
  const pin = pinInput ? pinInput.value.trim() : '';
  if (!username) { alert('Choisis un nom d\'utilisateur.'); return; }
  if (!validatePin(pin)) { alert('Le code PIN doit contenir 4 à 8 chiffres.'); return; }
  const accounts = loadAccounts();
  if (accounts[username]) { alert('Ce compte existe déjà. Utilise "Se connecter".'); return; }
  accounts[username] = { pin, history: [] };
  saveAccounts(accounts); setSignedUser(username); renderAccountPanel();
}

function loginLocalAccount() {
  const usernameInput = document.getElementById('account-username');
  const pinInput = document.getElementById('account-pin');
  const username = normalizeUsername(usernameInput ? usernameInput.value : '');
  const pin = pinInput ? pinInput.value.trim() : '';
  const accounts = loadAccounts();
  if (!accounts[username]) { alert('Compte introuvable.'); return; }
  if (accounts[username].pin !== pin) { alert('PIN incorrect.'); return; }
  setSignedUser(username); renderAccountPanel();
}

function logoutLocalAccount() { setSignedUser(''); renderAccountPanel(); }

function saveResultForCurrentUser(result) {
  if (!currentUser) return;
  const accounts = loadAccounts();
  if (!accounts[currentUser]) return;
  const history = Array.isArray(accounts[currentUser].history) ? accounts[currentUser].history : [];
  history.unshift(result);
  accounts[currentUser].history = history.slice(0, 30);
  saveAccounts(accounts); renderAccountPanel();
}

function loadFeedbackReports() {
  try {
    const raw = safeGetItem(FEEDBACK_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) { console.warn('Impossible de charger les signalements', e); }
  return [];
}

function saveFeedbackReports(reports) { safeSetItem(FEEDBACK_STORAGE_KEY, JSON.stringify(reports)); }

function reportQuestion(questionIndex, description) {
  const q = currentSession[questionIndex];
  if (!q) return;
  const report = {
    date: buildResultTimestamp(), subject: SUBJECT_NAME, user: currentUser || 'Invité',
    question: q.q.substring(0, 100), chapter: q.ch, description: description || '',
    type: 'report', questionIndex, fullQuestion: q
  };
  const reports = loadFeedbackReports();
  reports.unshift(report); saveFeedbackReports(reports.slice(0, 200));
  if (window.QCM_REMOTE && typeof window.QCM_REMOTE.pushFeedback === 'function') window.QCM_REMOTE.pushFeedback(report).catch(() => {});
}

function openReportModal(questionIndex) {
  const modal = document.getElementById('report-modal');
  if (!modal) { console.error('Modal de signalement non trouvé'); return; }
  document.getElementById('report-question-idx').value = questionIndex;
  document.getElementById('report-description').value = '';
  modal.style.display = 'flex';
}

function closeReportModal() {
  const modal = document.getElementById('report-modal');
  if (modal) modal.style.display = 'none';
}

function submitReport() {
  const idx = parseInt(document.getElementById('report-question-idx').value);
  const desc = document.getElementById('report-description').value.trim();
  if (!desc) { alert('Merci de décrire le problème.'); return; }
  reportQuestion(idx, desc); closeReportModal(); alert('Signalement enregistré. Merci !');
}

function renderFeedbackPanel() {
  const panel = document.getElementById('module-feedback');
  if (!panel) return;
  const reports = loadFeedbackReports();
  let html = `<div class="feedback-section"><h3>📋 Signalements de questions</h3><p style="font-size:.82rem;color:#aab;margin-bottom:12px">Questions signalées comme potentiellement erronées</p>`;
  if (reports.length === 0) {
    html += '<div style="color:#888;font-size:.85rem">Aucun signalement pour le moment.</div>';
  } else {
    reports.slice(0, 20).forEach((r) => {
      html += `<div style="background:#0f3460;border-radius:8px;padding:10px;margin-bottom:8px;border-left:3px solid #e74c3c">
        <div style="font-size:.78rem;color:#999">${r.date ? new Date(r.date).toLocaleString('fr-FR') : 'N/A'} • ${r.chapter} • ${r.subject}</div>
        <div style="font-size:.82rem;color:#dde;margin:6px 0">${r.question}</div>
        <div style="font-size:.78rem;color:#aab;font-style:italic">"${r.description}"</div>
        <div style="font-size:.76rem;color:#777;margin-top:4px">Par: ${r.user}</div>
      </div>`;
    });
  }
  html += `</div>
    <div class="feedback-section" style="margin-top:20px;border-top:1px solid #2d2d50;padding-top:16px">
      <h3>💬 Formulaire de contact</h3>
      <p style="font-size:.82rem;color:#aab;margin-bottom:12px">Envoie un message direct</p>
      <div style="display:flex;flex-direction:column;gap:8px">
        <textarea id="contact-message" placeholder="Écris ton message..." style="background:#0f3460;border:1px solid #2d2d50;border-radius:8px;padding:10px;color:#fff;min-height:80px;font-family:inherit;font-size:.85rem;resize:vertical"></textarea>
        <button onclick="sendContactMessage()" style="background:#27ae60;color:#fff;border:none;padding:10px 16px;border-radius:8px;font-weight:700;cursor:pointer;font-size:.85rem">Envoyer</button>
      </div>
      <div id="contact-status" style="margin-top:8px;font-size:.78rem;color:#aab"></div>
    </div>`;
  panel.innerHTML = html;
}

function renderChatPanel() {
  const panel = document.getElementById('module-chat');
  if (!panel) return;
  panel.innerHTML = `
    <div class="chat-section" style="display:flex;flex-direction:column;height:400px">
      <h3>💬 Chat public</h3>
      <p style="font-size:.82rem;color:#aab;margin-bottom:12px">Discute avec d'autres utilisateurs</p>
      <div id="quiz-chat-messages" style="flex:1;overflow-y:auto;background:#0f2847;border:1px solid #2d2d50;border-radius:8px;padding:10px;margin-bottom:10px;font-size:.8rem;display:flex;flex-direction:column;gap:8px">
        <div style="color:#666;text-align:center;padding:20px">⏳ Chargement...</div>
      </div>
      <div style="display:flex;gap:8px;align-items:flex-end">
        <textarea id="quiz-chat-input" placeholder="Message rapide..." style="flex:1;background:#0f3460;border:1px solid #2d2d50;border-radius:8px;padding:8px;color:#fff;min-height:40px;max-height:80px;font-family:inherit;font-size:.82rem;resize:vertical" maxlength="2000"></textarea>
        <button onclick="sendQuizChatMessage()" style="background:#27ae60;color:#fff;border:none;padding:8px 12px;border-radius:8px;font-weight:700;cursor:pointer;font-size:.8rem;white-space:nowrap">Envoyer</button>
      </div>
      <div id="quiz-chat-status" style="margin-top:6px;font-size:.76rem;color:#777"></div>
    </div>`;
  loadQuizChatMessages();
  if (window.__qcmQuizChatInterval) clearInterval(window.__qcmQuizChatInterval);
  window.__qcmQuizChatInterval = setInterval(loadQuizChatMessages, 5000);
}

async function loadQuizChatMessages() {
  const container = document.getElementById('quiz-chat-messages');
  if (!container) return;
  try {
    const subject = SUBJECT_NAME || 'General';
    const status = document.getElementById('quiz-chat-status');
    if (!window.QCM_REMOTE || typeof window.QCM_REMOTE.fetchChatMessages !== 'function') {
      if (status) status.textContent = 'Supabase non configure'; return;
    }
    const messages = await window.QCM_REMOTE.fetchChatMessages(subject, 50);
    if (status) status.textContent = '';
    if (!Array.isArray(messages)) { container.innerHTML = '<div style="color:#666">Erreur chargement messages</div>'; return; }
    if (messages.length === 0) { container.innerHTML = '<div style="color:#888;text-align:center;padding:20px">Aucun message. Sois le premier !</div>'; return; }
    container.innerHTML = messages.map(msg => {
      const time = msg.created_at ? new Date(msg.created_at).toLocaleTimeString('fr-FR', {hour:'2-digit', minute:'2-digit'}) : 'N/A';
      const isOwn = msg.user === (currentUser || 'Invité');
      return `<div style="background:${isOwn ? 'rgba(52,152,219,0.15)' : 'rgba(255,255,255,0.06)'};border-radius:6px;padding:8px;border-left:2px solid ${isOwn ? '#3498db' : '#27ae60'}">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px">
          <span style="font-weight:700;color:#a8d8ff">${escapeHtml(msg.user)}</span>
          <span style="color:#666;font-size:.75rem">${time}</span>
        </div>
        <div style="color:#d4e4f7">${escapeHtml(msg.message)}</div>
      </div>`;
    }).join('');
    container.scrollTop = container.scrollHeight;
  } catch (error) {
    console.error('Erreur chat:', error);
    const status = document.getElementById('quiz-chat-status');
    if (status) status.textContent = 'Erreur chat: ' + (error && error.message ? error.message : 'reseau');
  }
}

async function sendQuizChatMessage() {
  const input = document.getElementById('quiz-chat-input');
  const text = input.value.trim();
  if (!text) return;
  if (!window.QCM_REMOTE || typeof window.QCM_REMOTE.pushChatMessage !== 'function') { alert('Supabase non configuré'); return; }
  try {
    const status = document.getElementById('quiz-chat-status');
    status.textContent = 'Envoi...';
    await window.QCM_REMOTE.pushChatMessage({ user: currentUser || 'Invité', subject: SUBJECT_NAME || 'General', message: text });
    input.value = ''; status.textContent = '✓ Envoyé';
    setTimeout(() => { status.textContent = ''; }, 2000);
    await loadQuizChatMessages();
  } catch (error) {
    console.error('Erreur envoi:', error);
    document.getElementById('quiz-chat-status').textContent = '✗ ' + (error && error.message ? error.message : 'Erreur');
  }
}

function sendContactMessage() {
  const msg = document.getElementById('contact-message')?.value.trim();
  if (!msg) { alert('Veuillez entrer un message.'); return; }
  const contact = { date: buildResultTimestamp(), subject: SUBJECT_NAME, user: currentUser || 'Invité', message: msg, type: 'contact' };
  const reports = loadFeedbackReports();
  reports.unshift({ ...contact }); saveFeedbackReports(reports.slice(0, 200));
  if (window.QCM_REMOTE && typeof window.QCM_REMOTE.pushFeedback === 'function') window.QCM_REMOTE.pushFeedback(contact).catch(() => {});
  document.getElementById('contact-message').value = '';
  document.getElementById('contact-status').textContent = '✓ Message enregistré';
  setTimeout(() => { document.getElementById('contact-status').textContent = ''; }, 2000);
}

function removeDuplicateIds(scope, id) {
  const nodes = scope.querySelectorAll(`#${safeCssEscape(id)}`);
  if (nodes.length <= 1) return;
  nodes.forEach((node, idx) => { if (idx < nodes.length - 1) node.remove(); });
}

function cleanupDuplicateHomeUI() {
  const home = document.getElementById('home');
  if (!home) return;
  ['tab-sandbox','tab-partiel','tab-chapitres','module-sandbox','module-partiel','module-chapitres',
   'chapter-filter','exam-size','partiel-size','partiel-timer','partiel-grading','custom-good','custom-bad',
   'chapter-quick-list','question-count','sc1'].forEach((id) => removeDuplicateIds(home, id));
  const duplicateRows = home.querySelectorAll('.module-tabs');
  if (duplicateRows.length > 1) duplicateRows.forEach((row, idx) => { if (idx < duplicateRows.length - 1) row.remove(); });
}

function initSandboxPage() {
  cleanupDuplicateHomeUI();
  SUBJECT_NAME = window.SUBJECT_NAME || SUBJECT_NAME;
  SUBJECT_DESC = window.SUBJECT_DESC || SUBJECT_DESC;
  BANK = window.BANK || BANK;
  QC_BANK = window.QC_BANK || QC_BANK;

  const homeTitle = document.getElementById('home-title');
  const homeDesc = document.getElementById('home-desc');
  const chapterCount = document.getElementById('sc1');
  const questionCount = document.getElementById('question-count');
  const examSize = document.getElementById('exam-size');
  let messageZone = document.getElementById('message-zone');

  if (!messageZone) {
    const homeCard = document.querySelector('.home-card');
    const accountZone = document.getElementById('account-zone');
    messageZone = document.createElement('div');
    messageZone.id = 'message-zone'; messageZone.style.color = '#9fb0c8';
    messageZone.style.fontSize = '.86rem'; messageZone.style.lineHeight = '1.45'; messageZone.style.margin = '0 0 10px';
    if (homeCard) homeCard.insertBefore(messageZone, accountZone || homeCard.querySelector('.btn-start') || null);
  }

  if (!homeTitle || !homeDesc || !chapterCount || !questionCount || !messageZone || !examSize) {
    throw new Error('Structure HTML incomplète: un ou plusieurs éléments requis sont absents.');
  }

  const prepared = prepareQuestionPool(BANK);
  const questionBank = prepared.questions;
  const customHomeTitle = window.HOME_TITLE || '';
  homeTitle.textContent = customHomeTitle || `Bac à sable ${SUBJECT_NAME}`;
  homeDesc.innerHTML = `${SUBJECT_DESC}<br>Banque de <strong id="total-q-count">${questionBank.length}</strong> questions disponibles.`;
  chapterCount.textContent = Array.from(new Set(questionBank.map(q => q.ch))).length;
  questionCount.textContent = IS_ANAT_SUBJECT() ? 50 : 25;
  const statGrid = document.querySelector('.stat-grid');
  if (statGrid && !document.getElementById('bank-total-count')) {
    const stat = document.createElement('div'); stat.className = 'stat';
    stat.innerHTML = `<span id="bank-total-count">${questionBank.length}</span>QCM dans la banque`;
    statGrid.appendChild(stat);
  }
  messageZone.textContent = questionBank.length ? '' : 'Aucune question disponible pour cette matière.';

  populateChapterOptions(); styleOptionsPanel(); ensureShuffleLaunchButton();
  injectAccountPanel(); renderAccountPanel(); renderChapterList(); refreshExamSizeFromFilters();
  if (IS_ANAT_SUBJECT()) {
    const partielSizeSelect = document.getElementById('partiel-size');
    if (partielSizeSelect) { partielSizeSelect.innerHTML = '<option value="50">50 QCM</option>'; partielSizeSelect.value = '50'; }
  }
  examSize.addEventListener('change', function() { questionCount.textContent = this.value; });
  const chapterFilter = document.getElementById('chapter-filter');
  if (chapterFilter) {
    chapterFilter.addEventListener('change', () => {
      selectedChapterQuick = []; refreshExamSizeFromFilters();
      const quickList = document.getElementById('chapter-quick-list');
      if (quickList) quickList.querySelectorAll('.chapter-chip').forEach(el => el.classList.remove('active'));
    });
  }
  ensurePartielCustomQuestionInput();
  const gradingSelect = document.getElementById('partiel-grading');
  const gradingCustom = document.getElementById('partiel-custom-box');
  if (gradingSelect && gradingCustom) {
    const refreshGradingVisibility = () => { gradingCustom.style.display = gradingSelect.value === 'custom' ? 'block' : 'none'; };
    gradingSelect.addEventListener('change', refreshGradingVisibility); refreshGradingVisibility();
  }
  defaultChapterFilter();
  const globalTimer = document.getElementById('global-timer');
  const partielTimer = document.getElementById('partiel-timer');
  if (globalTimer && partielTimer) {
    globalTimer.addEventListener('change', (e) => { partielTimer.value = e.target.value; });
    partielTimer.addEventListener('change', (e) => { globalTimer.value = e.target.value; });
  }
  renderFeedbackPanel(); renderChatPanel(); switchModule('sandbox');
}

function populateChapterOptions() {
  const filter = document.getElementById('chapter-filter');
  const prepared = prepareQuestionPool(BANK);
  const questionBank = prepared.questions;
  filter.innerHTML = '';
  const defaultOption = document.createElement('option'); defaultOption.value = 'all'; defaultOption.textContent = 'Tous les chapitres';
  filter.appendChild(defaultOption);
  Array.from(new Set(questionBank.map(q => q.ch))).sort((a, b) => a.localeCompare(b, 'fr')).forEach(ch => {
    const option = document.createElement('option'); option.value = ch; option.textContent = ch; filter.appendChild(option);
  });
}

function renderChapterList() {
  const modulePanel = document.getElementById('module-chapitres');
  const quickList = document.getElementById('chapter-quick-list');
  if (!modulePanel || !quickList) return;
  const prepared = prepareQuestionPool(BANK);
  const questionBank = prepared.questions;
  quickList.innerHTML = '';
  let preview = document.getElementById('chapter-preview-list');
  if (!preview) {
    preview = document.createElement('div'); preview.id = 'chapter-preview-list'; preview.style.marginTop = '12px';
    modulePanel.insertBefore(preview, modulePanel.querySelector('.module-hint'));
  }
  preview.innerHTML = '';
  const chapters = Array.from(new Set(questionBank.map(q => q.ch))).sort((a, b) => a.localeCompare(b, 'fr'));
  if (chapters.length === 0) { preview.innerHTML = '<div style="color:#aaa;font-size:.9rem">Pas de chapitres disponibles.</div>'; return; }
  chapters.forEach(ch => {
    const chip = document.createElement('button'); chip.className = 'chapter-chip'; chip.type = 'button'; chip.textContent = ch;
    chip.onclick = () => {
      const current = new Set(getSelectedQuickChapter());
      if (current.has(ch)) current.delete(ch); else current.add(ch);
      selectedChapterQuick = Array.from(current);
      syncChapterFilterSelection(getSelectedQuickChapter()); refreshExamSizeFromFilters();
      quickList.querySelectorAll('.chapter-chip').forEach(el => el.classList.toggle('active', getSelectedQuickChapter().includes(el.textContent)));
      preview.querySelectorAll('[data-preview-chapter]').forEach(block => {
        const selected = getSelectedQuickChapter(); const chapter = block.getAttribute('data-preview-chapter');
        block.style.display = selected.length === 0 || selected.includes(chapter) ? 'block' : 'none';
      });
    };
    quickList.appendChild(chip);
    const list = document.createElement('div');
    list.setAttribute('data-preview-chapter', ch); list.style.display = 'block';
    list.style.marginTop = '8px'; list.style.marginBottom = '12px';
    list.style.borderTop = '1px solid #2d2d50'; list.style.paddingTop = '8px';
    list.innerHTML = `<div style="color:#e6eefc;font-weight:700;margin-bottom:8px">${escapeHtml(ch)}</div>`;
    questionBank.filter(q => q.ch === ch).slice(0, 6).forEach(q => {
      const qi = document.createElement('div');
      qi.style.padding = '8px'; qi.style.border = '1px solid #2d2d50'; qi.style.borderRadius = '8px';
      qi.style.marginBottom = '6px'; qi.style.background = 'rgba(0,0,0,0.02)';
      qi.innerHTML = `<strong>Q</strong> ${q.q.length>140?q.q.slice(0,140)+'…':q.q}`;
      list.appendChild(qi);
    });
    preview.appendChild(list);
  });
}

function ensurePartielCustomQuestionInput() {
  const partielPanel = document.getElementById('module-partiel');
  const sizeSelect = document.getElementById('partiel-size');
  if (!partielPanel || !sizeSelect || document.getElementById('partiel-size-custom')) return;
  const block = document.createElement('div'); block.style.marginTop = '10px';
  block.innerHTML = `<label for="partiel-size-custom">Nombre de QCM personnalisé (min 5)</label><input id="partiel-size-custom" type="number" min="5" step="1" value="${parseInt(sizeSelect.value || '25', 10) || 25}">`;
  const hint = partielPanel.querySelector('.module-hint');
  if (hint) partielPanel.insertBefore(block, hint); else partielPanel.appendChild(block);
  sizeSelect.addEventListener('change', () => {
    const customInput = document.getElementById('partiel-size-custom');
    if (customInput) { const value = parseInt(sizeSelect.value || '25', 10); if (Number.isFinite(value) && value > 0) customInput.value = String(value); }
  });
}

function injectExamOptions() { return; }
function createSubjectTabs() { return; }
function switchTab(id) { switchModule(id === 'tab-chap' ? 'chapitres' : id.replace('tab-', '')); }

function switchModule(moduleId) {
  activeModule = moduleId;
  ['sandbox', 'partiel', 'chapitres', 'feedback', 'chat'].forEach(id => {
    const panel = document.getElementById(`module-${id}`); const tab = document.getElementById(`tab-${id}`);
    if (panel) panel.classList.toggle('active', id === moduleId);
    if (tab) tab.classList.toggle('active', id === moduleId);
  });
  if (moduleId === 'feedback') renderFeedbackPanel();
  if (moduleId === 'chat') renderChatPanel();
  if (moduleId !== 'chapitres' && getSelectedQuickChapter().length) syncChapterFilterSelection(getSelectedQuickChapter());
}

function defaultChapterFilter() {
  const filter = document.getElementById('chapter-filter');
  if (!filter) return;
  const allOption = filter.querySelector('option[value="all"]');
  if (allOption) allOption.selected = true;
  else if (filter.options.length > 1) filter.options[1].selected = true;
}

function shuffle(arr) {
  let a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function getSelectedChapters(filter) {
  if (!filter) return [];
  if (filter.multiple) {
    const selected = Array.from(filter.selectedOptions).map(o => o.value).filter(v => v !== 'all');
    return selected.length ? selected : [];
  }
  return filter.value && filter.value !== 'all' ? [filter.value] : [];
}

function syncExamSizeSelect(selectId, maxCount, presetValues, preferredDefault) {
  const select = document.getElementById(selectId);
  if (!select) return;
  if (!Number.isFinite(maxCount) || maxCount <= 0) {
    select.innerHTML = '<option value="0">0 QCM disponible</option>'; select.value = '0'; select.disabled = true; return;
  }
  const previous = parseInt(select.value, 10);
  const candidate = Number.isFinite(previous) && previous > 0 ? previous : preferredDefault;
  const values = Array.from(new Set((presetValues || []).filter(v => Number.isFinite(v) && v > 0 && v <= maxCount)));
  if (!values.includes(maxCount)) values.push(maxCount);
  values.sort((a, b) => a - b);
  select.disabled = false; select.innerHTML = '';
  values.forEach(v => { const option = document.createElement('option'); option.value = String(v); option.textContent = `${v} QCM`; select.appendChild(option); });
  const fallback = values.includes(preferredDefault) ? preferredDefault : values[values.length - 1];
  select.value = String(values.includes(candidate) ? candidate : fallback);
}

function refreshExamSizeFromFilters() {
  const filter = document.getElementById('chapter-filter');
  const prepared = prepareQuestionPool(BANK);
  const questionBank = prepared.questions;
  const selectedChapters = getSelectedQuickChapter().length ? getSelectedQuickChapter() : getSelectedChapters(filter);
  const pool = selectedChapters.length ? questionBank.filter(q => selectedChapters.includes(q.ch)) : questionBank;
  if (IS_ANAT_SUBJECT()) syncExamSizeSelect('exam-size', pool.length, [50], 50);
  else syncExamSizeSelect('exam-size', pool.length, [10, 15, 20, 25], 25);
  const questionCount = document.getElementById('question-count');
  const examSize = document.getElementById('exam-size');
  if (questionCount && examSize) questionCount.textContent = examSize.value;
}

function examSignature(questions) { return questions.map(q => `${q.ch}::${q.q}`).sort().join('||'); }

function questionKey(item) {
  const q = item || {};
  const chapter = normalizeQuestionText(q.ch).toLowerCase();
  const question = normalizeQuestionText(q.q).toLowerCase();
  return chapter || question ? `${chapter}::${question}` : '';
}

function loadRecentQuestionKeys(subjectName) {
  const key = RECENT_QUESTIONS_STORAGE_PREFIX + String(subjectName || SUBJECT_NAME || 'General');
  try {
    const raw = safeGetItem(key); if (!raw) return [];
    const parsed = JSON.parse(raw); return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch (e) { return []; }
}

function saveRecentQuestionKeys(subjectName, keys) {
  const key = RECENT_QUESTIONS_STORAGE_PREFIX + String(subjectName || SUBJECT_NAME || 'General');
  const unique = [], seen = new Set();
  (Array.isArray(keys) ? keys : []).forEach((k) => {
    const value = String(k || '').trim(); if (!value || seen.has(value)) return; seen.add(value); unique.push(value);
  });
  safeSetItem(key, JSON.stringify(unique.slice(0, 500)));
}

function pickSessionWithHistory(pool, totalCount, options) {
  const wanted = Math.min(totalCount, pool.length);
  if (wanted <= 0) return [];
  const config = options || {};
  const recent = loadRecentQuestionKeys(SUBJECT_NAME);
  const recentWindow = Math.max(wanted * 3, 60);
  const recentSet = new Set(recent.slice(0, recentWindow));
  let candidatePool = pool;
  if (pool.length > wanted && recentSet.size) {
    const fresh = pool.filter((q) => !recentSet.has(questionKey(q)));
    if (fresh.length >= wanted) candidatePool = fresh;
    else if (fresh.length > 0) { const older = shuffle(pool.filter((q) => recentSet.has(questionKey(q)))); candidatePool = fresh.concat(older.slice(0, wanted - fresh.length)); }
  }
  if (config.forceDifferent && lastDrawQuestionKeys.length && candidatePool.length > wanted) {
    const previousSet = new Set(lastDrawQuestionKeys);
    const fresh = candidatePool.filter((q) => !previousSet.has(questionKey(q)));
    if (fresh.length >= wanted) candidatePool = fresh;
    else if (fresh.length > 0) { const older = shuffle(candidatePool.filter((q) => previousSet.has(questionKey(q)))); candidatePool = fresh.concat(older.slice(0, wanted - fresh.length)); }
  }
  let draw = getVariedBalancedDraw(candidatePool, wanted);
  if (draw.length < wanted) {
    const used = new Set(draw.map(questionKey));
    const rest = shuffle(pool.filter((q) => !used.has(questionKey(q))));
    draw = draw.concat(rest).slice(0, wanted);
  }
  saveRecentQuestionKeys(SUBJECT_NAME, draw.map(questionKey).concat(recent));
  lastDrawQuestionKeys = draw.map(questionKey);
  return draw;
}

function getBalancedDraw(pool, totalCount) {
  const wanted = Math.min(totalCount, pool.length);
  if (wanted <= 0) return [];
  if (wanted >= pool.length) return shuffle(pool).slice(0, wanted);
  const byChapter = new Map();
  pool.forEach(q => { const chapter = q.ch || 'Sans chapitre'; if (!byChapter.has(chapter)) byChapter.set(chapter, []); byChapter.get(chapter).push(q); });
  const chapters = shuffle(Array.from(byChapter.keys())).map(ch => ({ chapter: ch, questions: shuffle(byChapter.get(ch)) }));
  const picked = [];
  while (picked.length < wanted) {
    let added = false;
    for (const bucket of chapters) { if (picked.length >= wanted) break; if (bucket.questions.length > 0) { picked.push(bucket.questions.pop()); added = true; } }
    if (!added) break;
  }
  return shuffle(picked).slice(0, wanted);
}

function getVariedBalancedDraw(pool, totalCount) {
  const wanted = Math.min(totalCount, pool.length);
  if (wanted <= 0) return [];
  for (let i = 0; i < 8; i++) {
    const draw = getBalancedDraw(pool, wanted); const sig = examSignature(draw);
    if (sig !== lastSessionSignature || pool.length <= wanted) { lastSessionSignature = sig; return draw; }
  }
  const fallback = getBalancedDraw(pool, wanted); lastSessionSignature = examSignature(fallback); return fallback;
}

function startFreshShuffleExam() { lastSessionSignature = ''; startExam({ forceDifferent: true }); }

function ensureShuffleLaunchButton() {
  const homeCard = document.querySelector('.home-card');
  const startBtn = homeCard ? homeCard.querySelector('.btn-start') : null;
  if (!homeCard || !startBtn) return;
  let actions = document.getElementById('launch-actions');
  if (!actions) {
    actions = document.createElement('div'); actions.id = 'launch-actions';
    actions.style.display = 'flex'; actions.style.justifyContent = 'center';
    actions.style.gap = '10px'; actions.style.flexWrap = 'wrap'; actions.style.marginTop = '8px';
    startBtn.parentNode.insertBefore(actions, startBtn); actions.appendChild(startBtn);
  }
  if (!document.getElementById('shuffle-launch-btn')) {
    const shuffleBtn = document.createElement('button');
    shuffleBtn.id = 'shuffle-launch-btn'; shuffleBtn.type = 'button'; shuffleBtn.className = 'btn-start';
    shuffleBtn.textContent = '🔀 Nouveau tirage'; shuffleBtn.style.background = 'linear-gradient(135deg,#1f6fb2,#3498db)';
    shuffleBtn.onclick = startFreshShuffleExam; actions.appendChild(shuffleBtn);
  }
}

function ensureFloatingClearButton() {
  if (document.getElementById('floating-clear-btn')) return;
  const style = document.createElement('style'); style.id = 'floating-clear-style';
  style.textContent = `#floating-clear-btn{position:fixed;right:16px;bottom:16px;z-index:1200;background:#16213e;border:2px solid #e74c3c;color:#fff;padding:10px 14px;border-radius:10px;cursor:pointer;font-weight:800;box-shadow:0 8px 24px rgba(0,0,0,.35);display:none;}#floating-clear-btn:hover{background:#1f2b4d}`;
  document.head.appendChild(style);
  const button = document.createElement('button');
  button.id = 'floating-clear-btn'; button.type = 'button'; button.textContent = 'Effacer la sélection';
  button.onclick = () => clearOpt(currentQ); document.body.appendChild(button);
}

// ============================================================
// TIMER — fonctions définies une seule fois, au niveau global
// ============================================================
function formatTime(s) {
  const m = Math.floor(s / 60);
  return `⏱ ${m}:${(s % 60).toString().padStart(2, '0')}`;
}

function attachTimerToHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  let timer = document.getElementById('timer');
  if (!timer) {
    timer = document.createElement('div'); timer.id = 'timer';
    timer.style.cssText = 'font-weight:800;font-size:1rem;color:#fff;padding:6px 12px;background:#0f2f52;border:1px solid #29507a;border-radius:8px;margin-left:auto';
    header.appendChild(timer);
  }
  timer.style.display = 'inline-block';
  timer.textContent = formatTime(remainingSeconds);
}

function startTimer() {
  stopTimer();
  timerInterval = setInterval(() => {
    remainingSeconds--;
    const timer = document.getElementById('timer');
    if (timer) timer.textContent = formatTime(remainingSeconds);
    if (remainingSeconds <= 0) { stopTimer(); submitExam(); }
  }, 1000);
}

function stopTimer() {
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
}
// ============================================================

function startExam(options) {
  ensureFloatingClearButton();
  const config = options || {};
  const prepared = prepareQuestionPool(BANK);
  const questionBank = prepared.questions;
  if (!questionBank.length) { alert('Aucune question disponible pour cette matière.'); return; }

  const filter = document.getElementById('chapter-filter');
  const quickSelected = getSelectedQuickChapter();
  const sandboxSelectedChapters = quickSelected.length ? quickSelected : getSelectedChapters(filter);
  const sandboxPool = sandboxSelectedChapters.length === 0 ? questionBank : questionBank.filter(q => sandboxSelectedChapters.includes(q.ch));

  let pool = sandboxPool;
  let requestedCount = parseInt(document.getElementById('exam-size')?.value || '25', 10);
  let timerMins = 0;

  if (activeModule === 'partiel') {
    const gradingConfig = getCurrentGradingConfig();
    correctPoints = gradingConfig.good; wrongPoints = gradingConfig.bad;
    const presetCount = parseInt(document.getElementById('partiel-size')?.value || '25', 10);
    const customCount = parseInt(document.getElementById('partiel-size-custom')?.value || '', 10);
    requestedCount = Number.isFinite(customCount) ? customCount : presetCount;
    requestedCount = Math.max(5, requestedCount || 25);
    pool = questionBank;
  } else {
    correctPoints = 0.25; wrongPoints = 0.083;
  }

  const timerValue = document.getElementById('global-timer')?.value || document.getElementById('partiel-timer')?.value;
  const timerParsed = parseInt(String(timerValue || '').trim(), 10);
  timerMins = Number.isFinite(timerParsed) && timerParsed > 0 ? timerParsed : 0;

  if (activeModule === 'chapitres') pool = sandboxPool;
  if (!Number.isFinite(requestedCount) || requestedCount < 1) requestedCount = 25;
  if (IS_ANAT_SUBJECT()) requestedCount = 50;
  requestedCount = Math.floor(requestedCount);

  if (pool.length === 0) { alert('Aucune question disponible pour les chapitres sélectionnés. Choisis d\'autres chapitres.'); return; }

  const selectedCount = Math.min(requestedCount, pool.length);
  currentSession = pickSessionWithHistory(pool, selectedCount, config);
  if (!currentSession.length) { alert('Impossible de générer un questionnaire. Réessaie avec d\'autres options.'); return; }
  if (pool.length < requestedCount) alert(`Les chapitres choisis contiennent seulement ${pool.length} questions. Le quiz utilisera toutes les questions disponibles.`);

  if (prepared.duplicateQuestionCount || prepared.duplicateOptionCount) {
    const details = [];
    if (prepared.duplicateQuestionCount) details.push(`${prepared.duplicateQuestionCount} question(s) en double ignorée(s)`);
    if (prepared.duplicateOptionCount) details.push(`${prepared.duplicateOptionCount} réponse(s) en double retirée(s)`);
    setMessageZone(details.join(' • '));
  } else if (config.forceDifferent) {
    setMessageZone('Nouveau tirage généré avec une préférence pour des questions différentes.');
  } else { setMessageZone(''); }

  const shuffledQC = shuffle([...Array(QC_BANK.length).keys()]);
  currentQC = shuffledQC.slice(0, 4).map(i => QC_BANK[i]);

  answers = new Array(currentSession.length).fill(null);
  shuffledOpts = []; shuffledCorrects = [];
  currentSession.forEach(q => {
    const correctText = q.opts[q.a]; const sh = shuffle(q.opts);
    shuffledOpts.push(sh); shuffledCorrects.push(sh.indexOf(correctText));
  });

  currentQ = 0; examFinished = false; startTime = Date.now();

  if (timerMins > 0) {
    remainingSeconds = timerMins * 60;
    attachTimerToHeader();
    startTimer();
  } else {
    remainingSeconds = 0;
    stopTimer();
    const timer = document.getElementById('timer');
    if (timer) timer.style.display = 'none';
  }

  document.getElementById('home').style.display = 'none';
  document.getElementById('header').style.display = 'flex';
  ensureHeaderControls();
  document.getElementById('progress-bar').style.display = 'block';
  document.getElementById('nav-pills').style.display = 'flex';
  document.getElementById('main').style.display = 'block';
  const floatingClearBtn = document.getElementById('floating-clear-btn');
  if (floatingClearBtn) floatingClearBtn.style.display = 'inline-flex';
  buildUI();
}

function buildUI() {
  document.getElementById('questions-zone').innerHTML = '';
  document.getElementById('nav-pills').innerHTML = '';
  currentSession.forEach((q, i) => {
    const p = document.createElement('button');
    p.className = 'pill' + (i === 0 ? ' current' : ''); p.textContent = i + 1; p.id = 'pill-' + i;
    p.onclick = () => goTo(i); document.getElementById('nav-pills').appendChild(p);
    const tc = q.type === 'fausse' ? 'tag-fausse' : q.type === 'vraie' ? 'tag-vraie' : 'tag-direct';
    const tt = q.type === 'fausse' ? '❌ LAQUELLE EST FAUSSE ?' : q.type === 'vraie' ? '✅ LAQUELLE EST VRAIE ?' : '❓ QUESTION DIRECTE';
    const card = document.createElement('div');
    card.className = 'qcard' + (i === 0 ? ' active' : ''); card.id = 'qcard-' + i;
    card.innerHTML = `
      <div class="chapitre-tag">${escapeHtml(q.ch)} — ${escapeHtml(q.label)}</div>
      <div class="qtag ${tc}">${tt}</div>
      <div class="qtext">Q${i + 1}. ${escapeHtml(q.q)}</div>
      <div class="opts" id="opts-${i}">
        ${shuffledOpts[i].map((o, oi) => `<button class="opt" id="opt-${i}-${oi}" onclick="selectOpt(${i},${oi})">${String.fromCharCode(65 + oi)}. ${escapeHtml(o)}</button>`).join('')}
      </div>
      <div class="qnav">
        <button class="btn btn-prev" onclick="goTo(${i - 1})" ${i === 0 ? 'disabled' : ''}>← Précédent</button>
        <button class="btn btn-skip" onclick="clearOpt(${i})">Effacer la sélection</button>
        <button class="btn btn-skip" onclick="goTo(${i < currentSession.length - 1 ? i + 1 : i})">Passer →</button>
        <button class="report-btn" onclick="openReportModal(${i})" style="background:transparent;border:1px solid #e74c3c;color:#e74c3c;padding:6px 12px;border-radius:6px;cursor:pointer;font-size:.78rem;font-weight:700;margin-left:auto">🚩 Signaler</button>
        ${i < currentSession.length - 1 ? `<button class="btn btn-next" onclick="goTo(${i + 1})">Suivant →</button>` : '<span></span>'}
      </div>`;
    document.getElementById('questions-zone').appendChild(card);
  });
  document.getElementById('submit-zone').style.display = 'block';
  updateProgress();
}

function selectOpt(qi, oi) {
  if (examFinished) return;
  answers[qi] = oi;
  document.querySelectorAll(`#opts-${qi} .opt`).forEach((b, i) => b.classList.toggle('selected', i === oi));
  document.getElementById('pill-' + qi).classList.add('answered');
  updateProgress();
}

function clearOpt(qi) {
  if (examFinished) return;
  if (qi < 0 || qi >= answers.length) return;
  answers[qi] = null;
  document.querySelectorAll(`#opts-${qi} .opt`).forEach((button) => button.classList.remove('selected'));
  document.getElementById('pill-' + qi).classList.remove('answered');
  updateProgress();
}

function goTo(idx) {
  if (idx < 0 || idx >= currentSession.length) return;
  document.getElementById('qcard-' + currentQ).classList.remove('active');
  document.getElementById('pill-' + currentQ).classList.remove('current');
  currentQ = idx;
  document.getElementById('qcard-' + idx).classList.add('active');
  document.getElementById('pill-' + idx).classList.add('current');
  window.scrollTo(0, 0);
}

function updateProgress() {
  const done = answers.filter(a => a !== null).length;
  const total = currentSession.length || 0;
  document.getElementById('answered-count').textContent = done;
  document.getElementById('submit-zone').querySelector('p').textContent = `Répondues : ${done}/${total} — Questions non répondues = 0 point`;
  document.getElementById('progress-fill').style.width = total ? (done / total * 100) + '%' : '0%';
}

function submitExam() {
  if (examFinished) return;
  examFinished = true;
  document.getElementById('main').style.display = 'none';
  document.getElementById('nav-pills').style.display = 'none';
  const floatingClearBtn = document.getElementById('floating-clear-btn');
  if (floatingClearBtn) floatingClearBtn.style.display = 'none';
  showResults();
}

function showResults() {
  let resultsEl = document.getElementById('results');
  if (!resultsEl) { resultsEl = document.createElement('div'); resultsEl.id = 'results'; document.body.appendChild(resultsEl); }
  resultsEl.style.display = 'block';
  try { stopTimer(); } catch (e) { console.warn(e); }
    let correct = 0, wrong = 0, skipped = 0;
    const elapsedMs = Date.now() - startTime;
    const timeUsed = Math.max(0, Math.floor(elapsedMs / 1000));
    const mu = Math.floor(timeUsed / 60), su = timeUsed % 60;
    let corrHTML = '';
    (Array.isArray(currentSession) ? currentSession : []).forEach((q, i) => {
      const item = q || {};
      const opts = Array.isArray(shuffledOpts[i]) ? shuffledOpts[i] : [];
      const ua = answers[i], ca = shuffledCorrects[i];
      let cls;
      if (ua === null || ua === undefined) { cls = 'skipped'; skipped++; }
      else if (ua === ca) { correct++; }
      else { cls = 'wrong'; wrong++; }
      const ut = ua !== null && ua !== undefined && ua >= 0 && ua < opts.length ? opts[ua] : '—';
      const ct = ca >= 0 && ca < opts.length ? opts[ca] : '—';
      corrHTML += `<div class="corr-item ${cls}">
        <div class="ch-badge">${escapeHtml(item.ch || 'Chapitre')}</div>
        <div class="corr-q">${escapeHtml(item.q || 'Question')}</div>
        <div class="corr-ans">Ta réponse : <span class="${ua === ca ? 'corr-ok' : 'corr-ko'}">${escapeHtml(ut)}</span></div>
        <div class="corr-ans">Bonne réponse : <span class="corr-ok">${escapeHtml(ct)}</span></div>
        <div class="corr-expl">💡 ${escapeHtml(item.e || 'Explication indisponible')}</div>
        <div style="margin-top:8px"><button onclick="openReportModal(${i})" style="background:transparent;border:1px solid #e74c3c;color:#e74c3c;padding:4px 10px;border-radius:4px;cursor:pointer;font-size:.7rem;font-weight:700">🚩 Signaler cette question</button></div>
      </div>`;
    });
    const sessionSize = Math.max(1, Array.isArray(currentSession) ? currentSession.length : 1);
    const raw = Math.max(0, (correct * correctPoints - wrong * wrongPoints));
    const rawScore = raw.toFixed(2);
    const pct = Math.round(correct / sessionSize * 100);
    const maxScoreValue = sessionSize * correctPoints;
    const maxScore = maxScoreValue.toFixed(2);
    const finalNoteValue = maxScoreValue > 0 ? (raw / maxScoreValue) * 20 : 0;
    const finalNote = finalNoteValue.toFixed(2);
    const emoji = finalNoteValue >= 7 ? '🏆' : finalNoteValue >= 5 ? '👍' : finalNoteValue >= 4 ? '📖' : '💪';
    const resultDate = buildResultTimestamp();
    try { recordLeaderboardResult({ date: resultDate, subject: SUBJECT_NAME, user: currentUser || 'Invité', score: finalNote, max: 20, pct }); } catch (e) { console.warn(e); }
    try { saveResultForCurrentUser({ date: resultDate, subject: SUBJECT_NAME, score: finalNote, max: 20, pct }); } catch (e) { console.warn(e); }
    const qcHTML = (Array.isArray(currentQC) ? currentQC : []).map((qc, i) => {
      const item = qc || {};
      return `<div class="qc-item"><div class="qc-q">Q${i + 1}. ${escapeHtml(item.q || 'Question courte')}</div><button class="show-r-btn" id="sbtn-${i}" onclick="toggleR(${i})">Voir la réponse</button><div class="qc-r" id="qcr-${i}">${escapeHtml(item.r || 'Réponse indisponible')}</div></div>`;
    }).join('');
    resultsEl.innerHTML = `
    <div class="score-card">
      <div style="font-size:2rem;margin-bottom:6px">${emoji}</div>
      <div class="score-num" style="color:${finalNoteValue >= 10 ? '#2ecc71' : finalNoteValue >= 8 ? '#f39c12' : '#e74c3c'}">${finalNote}<span style="font-size:1.4rem">/20</span></div>
      <div style="color:#aaa;font-size:.82rem;margin-top:4px">Note finale sur 20 • Score brut : ${rawScore}/${maxScore} • ${pct}% de bonnes réponses</div>
      <div class="score-detail">
        <div class="sc-box" style="color:#2ecc71">✅ ${correct} correctes</div>
        <div class="sc-box" style="color:#e74c3c">❌ ${wrong} incorrectes</div>
        <div class="sc-box">⏭ ${skipped} passées</div>
        <div class="sc-box">⏱ ${mu}min ${su.toString().padStart(2, '0')}s</div>
      </div>
    </div>
    <div id="qc-section"><h2>📝 QUESTIONS COURTES — Rédige d'abord, puis dévoile</h2>${qcHTML}</div>
    <div style="margin-top:14px">
      <h3 style="color:#e74c3c;margin-bottom:10px;font-size:.92rem">📋 CORRECTIONS DÉTAILLÉES</h3>
      ${corrHTML || '<div class="corr-item skipped">Aucune correction disponible.</div>'}
    </div>
    <div style="text-align:center;padding:20px">
      <div style="color:#aaa;font-size:.82rem;margin-bottom:10px">Banque : ${BANK.length} questions • ${QC_BANK.length} questions courtes • Barème : ${correctPoints} / −${wrongPoints}</div>
      <div style="color:#8fb3a8;font-size:.78rem;margin-bottom:10px">${currentUser ? `Résultat enregistré sur le compte: ${currentUser}` : 'Connecte-toi avec un compte local pour sauvegarder tes résultats.'}</div>
      <button class="restart-btn" onclick="newExam()">🔄 Nouveau partiel (tirage différent)</button>
    </div>`;
    resultsEl.style.display = 'block'; window.scrollTo(0, 0);
  // Sauvegarder les erreurs
;(function saveErrors() {
  try {
    var qcmErrors = JSON.parse(localStorage.getItem('qcm_erreurs') || '[]');
    (Array.isArray(currentSession) ? currentSession : []).forEach(function(q, i) {
      var ua = answers[i], ca = shuffledCorrects[i];
      if (ua !== ca) {
        var key = (q.ch||'') + '::' + (q.q||'').slice(0,80);
        var exists = qcmErrors.findIndex(function(e) { return e.key === key; });
        var opts = Array.isArray(shuffledOpts[i]) ? shuffledOpts[i] : [];
        var entry = {key:key, q:q.q, o:o, a:a, e:q.e||'', ch:q.ch, count:1};
        if (exists >= 0) qcmErrors[exists].count = (qcmErrors[exists].count||1) + 1;
        else qcmErrors.unshift(entry);
      }
    });
    localStorage.setItem('qcm_erreurs', JSON.stringify(qcmErrors.slice(0, 200)));
  } catch(e) {}
};

function toggleR(i) {
  const el = document.getElementById('qcr-' + i); const btn = document.getElementById('sbtn-' + i);
  const hidden = el.style.display === 'none' || el.style.display === '';
  el.style.display = hidden ? 'block' : 'none'; btn.textContent = hidden ? 'Masquer' : 'Voir la réponse';
}

function newExam() { goHome(); }

function goHome() {
  stopTimer(); examFinished = false;
  const floatingClearBtn = document.getElementById('floating-clear-btn');
  if (floatingClearBtn) floatingClearBtn.style.display = 'none';
  document.getElementById('results').style.display = 'none';
  document.getElementById('results').innerHTML = '';
  document.getElementById('header').style.display = 'none';
  document.getElementById('progress-bar').style.display = 'none';
  document.getElementById('nav-pills').style.display = 'none';
  document.getElementById('main').style.display = 'none';
  document.getElementById('home').style.display = 'block';
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { try { initSandboxPage(); } catch (error) { showFatalInitError(error); } });
} else {
  try { initSandboxPage(); } catch (error) { showFatalInitError(error); }
}

// ============================================================
// BULLE CHAT GLOBALE — notification + mini-panel réponse
// ============================================================
(function initChatBubble() {
  if (!window.QCM_REMOTE || typeof window.QCM_REMOTE.fetchChatMessages !== 'function') {
    setTimeout(initChatBubble, 2000);
    return;
  }

  // Styles
  const style = document.createElement('style');
  style.textContent = `
    #chat-bubble-btn {
      position:fixed;bottom:60px;right:16px;z-index:2000;
      background:linear-gradient(135deg,#27ae60,#229954);
      color:#fff;border:none;border-radius:50%;width:52px;height:52px;
      font-size:1.4rem;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.4);
      display:flex;align-items:center;justify-content:center;
      transition:transform .2s;
    }
    #chat-bubble-btn:hover{transform:scale(1.1)}
    #chat-bubble-badge {
      position:absolute;top:-4px;right:-4px;background:#e74c3c;color:#fff;
      border-radius:999px;padding:1px 6px;font-size:.68rem;font-weight:800;
      display:none;animation:chatPulse .8s infinite;
    }
    @keyframes chatPulse{0%,100%{opacity:1}50%{opacity:.5}}
    #chat-mini-panel {
      position:fixed;bottom:120px;right:16px;z-index:2000;
      width:300px;background:linear-gradient(180deg,#0f3460,#0d2847);
      border:1px solid #29507a;border-radius:12px;
      box-shadow:0 8px 32px rgba(0,0,0,.5);display:none;
      flex-direction:column;overflow:hidden;
    }
    #chat-mini-panel.open{display:flex}
    #chat-mini-header {
      padding:10px 14px;background:#1a4d7a;
      display:flex;justify-content:space-between;align-items:center;
    }
    #chat-mini-header span{color:#a8d8ff;font-weight:700;font-size:.88rem}
    #chat-mini-close {
      background:transparent;border:none;color:#fff;cursor:pointer;font-size:1rem;
    }
    #chat-mini-messages {
      max-height:180px;overflow-y:auto;padding:10px;
      display:flex;flex-direction:column;gap:6px;font-size:.78rem;
    }
    .chat-mini-msg {
      background:rgba(255,255,255,.06);border-radius:6px;padding:7px;
      border-left:2px solid #27ae60;
    }
    .chat-mini-msg.own{border-left-color:#3498db;background:rgba(52,152,219,.1)}
    .chat-mini-msg-user{font-weight:700;color:#a8d8ff;font-size:.72rem;margin-bottom:3px}
    .chat-mini-msg-text{color:#d4e4f7}
    #chat-mini-input-zone {
      padding:8px;border-top:1px solid #29507a;
      display:flex;gap:6px;
    }
    #chat-mini-input {
      flex:1;background:#0a1e38;border:1px solid #29507a;border-radius:6px;
      color:#fff;padding:6px 8px;font-size:.78rem;resize:none;
      font-family:inherit;min-height:32px;max-height:60px;
    }
    #chat-mini-send {
      background:#27ae60;color:#fff;border:none;border-radius:6px;
      padding:6px 10px;cursor:pointer;font-weight:700;font-size:.75rem;
    }
    #chat-mini-link {
      text-align:center;padding:6px;border-top:1px solid #29507a;
    }
    #chat-mini-link a {
      color:#6bb6ff;font-size:.74rem;text-decoration:none;
    }
  `;
  document.head.appendChild(style);

  // Bouton bulle
  const btn = document.createElement('button');
  btn.id = 'chat-bubble-btn';
  btn.innerHTML = '💬<span id="chat-bubble-badge"></span>';
  document.body.appendChild(btn);

  // Mini panel
  const panel = document.createElement('div');
  panel.id = 'chat-mini-panel';
  panel.innerHTML = `
    <div id="chat-mini-header">
      <span>💬 Chat</span>
      <button id="chat-mini-close" onclick="document.getElementById('chat-mini-panel').classList.remove('open')">✕</button>
    </div>
    <div id="chat-mini-messages"><div style="color:#888;text-align:center;padding:10px">⏳ Chargement...</div></div>
    <div id="chat-mini-input-zone">
      <textarea id="chat-mini-input" placeholder="Répondre..." maxlength="500"></textarea>
      <button id="chat-mini-send" onclick="sendMiniChatMessage()">→</button>
    </div>
    <div id="chat-mini-link"><a href="chat.html" target="_blank">Ouvrir le chat complet ↗</a></div>
  `;
  document.body.appendChild(panel);

  btn.onclick = () => {
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) {
      loadMiniChatMessages();
      document.getElementById('chat-bubble-badge').style.display = 'none';
    }
  };

  let lastMiniCount = 0;

  async function loadMiniChatMessages() {
    const container = document.getElementById('chat-mini-messages');
    if (!container) return;
    try {
      const messages = await window.QCM_REMOTE.fetchChatMessages('General', 20);
      if (!Array.isArray(messages)) return;
      const badge = document.getElementById('chat-bubble-badge');
      if (messages.length > lastMiniCount && lastMiniCount > 0) {
        const diff = messages.length - lastMiniCount;
        badge.textContent = '+' + diff;
        badge.style.display = 'inline-block';
      }
      lastMiniCount = messages.length;
      if (messages.length === 0) {
        container.innerHTML = '<div style="color:#888;text-align:center;padding:10px">Aucun message</div>';
        return;
      }
      const user = (typeof currentUser !== 'undefined' && currentUser) || localStorage.getItem('qcm_signed_user') || 'Invité';
      container.innerHTML = messages.slice(0, 15).map(msg => {
        const isOwn = msg.user === user;
        const time = msg.created_at ? new Date(msg.created_at).toLocaleTimeString('fr-FR', {hour:'2-digit',minute:'2-digit'}) : '';
        return `<div class="chat-mini-msg ${isOwn ? 'own' : ''}">
          <div class="chat-mini-msg-user">${isOwn ? '👤 Toi' : msg.user} <span style="color:#555;font-weight:400">${time}</span></div>
          <div class="chat-mini-msg-text">${String(msg.message || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div>
        </div>`;
      }).join('');
      container.scrollTop = container.scrollHeight;
    } catch (e) { console.warn('Mini chat error:', e); }
  }

  window.sendMiniChatMessage = async function() {
    const input = document.getElementById('chat-mini-input');
    const text = input.value.trim();
    if (!text) return;
    try {
      const user = (typeof currentUser !== 'undefined' && currentUser) || localStorage.getItem('qcm_signed_user') || 'Invité';
      await window.QCM_REMOTE.pushChatMessage({ user, subject: 'General', message: text });
      input.value = '';
      await loadMiniChatMessages();
    } catch (e) { alert('Erreur envoi: ' + e.message); }
  };

  // Entrée pour envoyer
  document.addEventListener('keydown', e => {
    const input = document.getElementById('chat-mini-input');
    if (document.activeElement === input && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      window.sendMiniChatMessage();
    }
  });
})();