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

const ACCOUNTS_STORAGE_KEY = 'qcm_local_accounts_v1';
const LEADERBOARD_STORAGE_KEY = 'qcm_leaderboard_v1';

function safeCssEscape(value) {
  if (window.CSS && typeof window.CSS.escape === 'function') {
    return window.CSS.escape(value);
  }
  return String(value).replace(/(["'\\.#:\[\](),>+~*^$|=\s])/g, '\\$1');
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
    const raw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') return parsed;
  } catch (e) {
    console.warn('Impossible de charger les comptes locaux', e);
  }
  return {};
}

function saveAccounts(accounts) {
  localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
}

function loadLeaderboard() {
  try {
    const raw = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn('Impossible de charger le classement local', e);
  }
  return [];
}

function saveLeaderboard(entries) {
  localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(entries));
}

function recordLeaderboardResult(result) {
  const entries = loadLeaderboard();
  entries.unshift(result);
  saveLeaderboard(entries.slice(0, 100));
  if (window.QCM_REMOTE && typeof window.QCM_REMOTE.pushResult === 'function') {
    window.QCM_REMOTE.pushResult(result).catch(() => {});
  }
}

function getSignedUser() {
  const name = localStorage.getItem('qcm_signed_user') || '';
  return name.trim();
}

function setSignedUser(name) {
  if (!name) {
    localStorage.removeItem('qcm_signed_user');
    currentUser = null;
    return;
  }
  localStorage.setItem('qcm_signed_user', name);
  currentUser = name;
}

function normalizeUsername(value) {
  return (value || '').trim().toLowerCase().slice(0, 30);
}

function validatePin(pin) {
  return /^\d{4,8}$/.test(pin || '');
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
  `;
  document.head.appendChild(style);

  const sandboxOptions = document.getElementById('sandbox-options');
  const commonOptions = document.getElementById('common-options');
  if (sandboxOptions) {
    sandboxOptions.classList.add('options-shell');
    if (!sandboxOptions.querySelector('.option-heading')) {
      const heading = document.createElement('div');
      heading.className = 'option-heading';
      heading.textContent = 'Filtres de questions';
      sandboxOptions.prepend(heading);
    }
  }
  if (commonOptions) {
    commonOptions.classList.add('options-shell');
    if (!commonOptions.querySelector('.option-heading')) {
      const heading = document.createElement('div');
      heading.className = 'option-heading';
      heading.textContent = 'Paramètres de session';
      commonOptions.prepend(heading);
    }
    const chips = commonOptions.querySelectorAll('label');
    chips.forEach((label, idx) => {
      if (idx <= 2 && label.querySelector('input[type="checkbox"],input[type="number"],select')) {
        label.classList.add('option-chip');
      }
    });
  }
}

function ensureHeaderControls() {
  const header = document.getElementById('header');
  if (!header) return;
  let controls = document.getElementById('header-controls');
  if (!controls) {
    controls = document.createElement('div');
    controls.id = 'header-controls';
    controls.style.display = 'flex';
    controls.style.alignItems = 'center';
    controls.style.gap = '8px';
    header.appendChild(controls);
  }
  if (!document.getElementById('header-back-btn')) {
    const backBtn = document.createElement('button');
    backBtn.id = 'header-back-btn';
    backBtn.type = 'button';
    backBtn.className = 'home-btn';
    backBtn.textContent = 'Retour';
    backBtn.onclick = goBack;
    controls.appendChild(backBtn);
  }
  if (!document.getElementById('header-home-btn')) {
    const homeBtn = document.createElement('button');
    homeBtn.id = 'header-home-btn';
    homeBtn.type = 'button';
    homeBtn.className = 'home-btn';
    homeBtn.textContent = 'Menu';
    homeBtn.onclick = goHome;
    controls.appendChild(homeBtn);
  }
}

function injectAccountPanel() {
  if (document.getElementById('account-zone')) return;
  const homeCard = document.querySelector('.home-card');
  if (!homeCard) return;

  const statGrid = homeCard.querySelector('.stat-grid');
  const panel = document.createElement('div');
  panel.id = 'account-zone';
  panel.className = 'account-shell';
  panel.innerHTML = `
    <h3>Compte local</h3>
    <p>Crée un compte local pour sauvegarder ton historique de résultats sur cet appareil.</p>
    <div id="account-content"></div>
  `;

  if (statGrid && statGrid.nextSibling) {
    homeCard.insertBefore(panel, statGrid.nextSibling);
  } else {
    homeCard.appendChild(panel);
  }
}

function renderAccountPanel() {
  const content = document.getElementById('account-content');
  if (!content) return;

  const accounts = loadAccounts();
  const signed = getSignedUser();
  if (signed && accounts[signed]) {
    currentUser = signed;
  }

  if (!currentUser || !accounts[currentUser]) {
    content.innerHTML = `
      <div class="options-row">
        <label>Nom d'utilisateur
          <input id="account-username" type="text" placeholder="ex: sara" maxlength="30">
        </label>
        <label>Code PIN (4 à 8 chiffres)
          <input id="account-pin" type="password" placeholder="ex: 1234" maxlength="8">
        </label>
      </div>
      <div class="account-actions" style="margin-top:8px">
        <button class="account-btn" id="create-account-btn" type="button">Créer le compte</button>
        <button class="account-btn" id="login-account-btn" type="button">Se connecter</button>
      </div>
    `;

    const createBtn = document.getElementById('create-account-btn');
    const loginBtn = document.getElementById('login-account-btn');
    if (createBtn) createBtn.addEventListener('click', createLocalAccount);
    if (loginBtn) loginBtn.addEventListener('click', loginLocalAccount);
    return;
  }

  const history = accounts[currentUser].history || [];
  content.innerHTML = `
    <div class="account-badge">Connecté: ${currentUser}</div>
    <div class="account-actions">
      <button class="account-btn" id="logout-account-btn" type="button">Se déconnecter</button>
    </div>
    <div class="history-list" id="account-history">
      ${history.length ? history.map(item => `<div class="history-item">${item.date} • ${item.subject} • ${item.score}/${item.max} (${item.pct}%)</div>`).join('') : '<div class="history-item">Aucun résultat enregistré pour le moment.</div>'}
    </div>
  `;

  const logoutBtn = document.getElementById('logout-account-btn');
  if (logoutBtn) logoutBtn.addEventListener('click', logoutLocalAccount);
}

function createLocalAccount() {
  const usernameInput = document.getElementById('account-username');
  const pinInput = document.getElementById('account-pin');
  const username = normalizeUsername(usernameInput ? usernameInput.value : '');
  const pin = pinInput ? pinInput.value.trim() : '';

  if (!username) {
    alert('Choisis un nom d\'utilisateur.');
    return;
  }
  if (!validatePin(pin)) {
    alert('Le code PIN doit contenir 4 à 8 chiffres.');
    return;
  }

  const accounts = loadAccounts();
  if (accounts[username]) {
    alert('Ce compte existe déjà. Utilise "Se connecter".');
    return;
  }

  accounts[username] = { pin, history: [] };
  saveAccounts(accounts);
  setSignedUser(username);
  renderAccountPanel();
}

function loginLocalAccount() {
  const usernameInput = document.getElementById('account-username');
  const pinInput = document.getElementById('account-pin');
  const username = normalizeUsername(usernameInput ? usernameInput.value : '');
  const pin = pinInput ? pinInput.value.trim() : '';
  const accounts = loadAccounts();

  if (!accounts[username]) {
    alert('Compte introuvable.');
    return;
  }
  if (accounts[username].pin !== pin) {
    alert('PIN incorrect.');
    return;
  }

  setSignedUser(username);
  renderAccountPanel();
}

function logoutLocalAccount() {
  setSignedUser('');
  renderAccountPanel();
}

function saveResultForCurrentUser(result) {
  if (!currentUser) return;
  const accounts = loadAccounts();
  if (!accounts[currentUser]) return;

  const history = Array.isArray(accounts[currentUser].history) ? accounts[currentUser].history : [];
  history.unshift(result);
  accounts[currentUser].history = history.slice(0, 30);
  saveAccounts(accounts);
  renderAccountPanel();
}

function initSandboxPage() {
  SUBJECT_NAME = window.SUBJECT_NAME || SUBJECT_NAME;
  SUBJECT_DESC = window.SUBJECT_DESC || SUBJECT_DESC;
  BANK = window.BANK || BANK;
  QC_BANK = window.QC_BANK || QC_BANK;

  const homeTitle = document.getElementById('home-title');
  const homeDesc = document.getElementById('home-desc');
  const chapterCount = document.getElementById('sc1');
  const questionCount = document.getElementById('question-count');
  const messageZone = document.getElementById('message-zone');
  const examSize = document.getElementById('exam-size');

  if (!homeTitle || !homeDesc || !chapterCount || !questionCount || !messageZone || !examSize) {
    throw new Error('Structure HTML incomplète: un ou plusieurs éléments requis sont absents.');
  }

  const customHomeTitle = window.HOME_TITLE || '';
  homeTitle.textContent = customHomeTitle || `Bac à sable ${SUBJECT_NAME}`;
  homeDesc.innerHTML = `${SUBJECT_DESC}<br>Banque de <strong id="total-q-count">${BANK.length}</strong> questions disponibles.`;
  chapterCount.textContent = Array.from(new Set(BANK.map(q => q.ch))).length;
  questionCount.textContent = 25;
  const statGrid = document.querySelector('.stat-grid');
  if (statGrid && !document.getElementById('bank-total-count')) {
    const stat = document.createElement('div');
    stat.className = 'stat';
    stat.innerHTML = `<span id="bank-total-count">${BANK.length}</span>QCM dans la banque`;
    statGrid.appendChild(stat);
  }
  messageZone.textContent = BANK.length ? '' : 'Aucune question disponible pour cette matière. Ajoute des questions dans la variable BANK de ce fichier.';

  populateChapterOptions();
  styleOptionsPanel();
  injectAccountPanel();
  renderAccountPanel();
  renderChapterList();
  injectExamOptions();
  createSubjectTabs();
  refreshExamSizeFromFilters();
  examSize.addEventListener('change', function() {
    questionCount.textContent = this.value;
  });
  const chapterFilter = document.getElementById('chapter-filter');
  if (chapterFilter) chapterFilter.addEventListener('change', refreshExamSizeFromFilters);
  const gradingSelect = document.getElementById('grading-scheme');
  const gradingCustom = document.getElementById('custom-grading-fields');
  if (gradingSelect && gradingCustom) {
    gradingSelect.addEventListener('change', () => {
      gradingCustom.style.display = gradingSelect.value === 'custom' ? 'block' : 'none';
    });
    gradingCustom.style.display = gradingSelect.value === 'custom' ? 'block' : 'none';
  }
  defaultChapterFilter();
}

function populateChapterOptions() {
  const filter = document.getElementById('chapter-filter');
  filter.innerHTML = '';
  const defaultOption = document.createElement('option');
  defaultOption.value = 'all';
  defaultOption.textContent = 'Tous les chapitres';
  filter.appendChild(defaultOption);

  const chapters = Array.from(new Set(BANK.map(q => q.ch))).sort((a, b) => a.localeCompare(b, 'fr'));
  chapters.forEach(ch => {
    const option = document.createElement('option');
    option.value = ch;
    option.textContent = ch;
    filter.appendChild(option);
  });
}

function renderChapterList() {
  const container = document.createElement('div');
  container.id = 'chapters-panel';
  container.style.display = 'none';
  container.style.marginTop = '18px';
  const title = document.createElement('h3');
  title.textContent = 'Chapitres et aperçu des questions';
  title.style.color = '#e74c3c';
  title.style.fontSize = '1rem';
  title.style.marginBottom = '8px';
  container.appendChild(title);

  const chapters = Array.from(new Set(BANK.map(q => q.ch))).sort((a, b) => a.localeCompare(b, 'fr'));
  if (chapters.length === 0) {
    const p = document.createElement('div');
    p.style.color = '#aaa';
    p.style.fontSize = '.9rem';
    p.textContent = 'Pas de chapitres disponibles.';
    container.appendChild(p);
  }

  chapters.forEach(ch => {
    const header = document.createElement('button');
    header.className = 'pill';
    header.style.width = 'auto';
    header.style.padding = '6px 10px';
    header.style.marginRight = '8px';
    header.textContent = ch;
    header.onclick = () => {
      const list = container.querySelector(`[data-ch="${safeCssEscape(ch)}"]`);
      if (list) list.style.display = list.style.display === 'none' ? 'block' : 'none';
    };
    container.appendChild(header);

    const list = document.createElement('div');
    list.setAttribute('data-ch', ch);
    list.style.display = 'none';
    list.style.marginTop = '8px';
    list.style.marginBottom = '12px';
    const items = BANK.filter(q => q.ch === ch).slice(0, 6);
    items.forEach((q, i) => {
      const qi = document.createElement('div');
      qi.style.padding = '8px';
      qi.style.border = '1px solid #2d2d50';
      qi.style.borderRadius = '8px';
      qi.style.marginBottom = '6px';
      qi.style.background = 'rgba(0,0,0,0.02)';
      qi.innerHTML = `<strong>Q</strong> ${q.q.length>140?q.q.slice(0,140)+'…':q.q}`;
      list.appendChild(qi);
    });
    container.appendChild(list);
  });

  const homeCard = document.querySelector('.home-card');
  if (homeCard) homeCard.appendChild(container);
}

function injectExamOptions(){
  // Check if partiel-options already exists; if not, create a placeholder
  if (document.getElementById('partiel-options')) return;
  const homeCard = document.querySelector('.home-card');
  if (!homeCard) return;
  const wrapper = document.createElement('div');
  wrapper.id = 'partiel-options';
  wrapper.style.display = 'none';
  wrapper.style.marginTop = '12px';
  wrapper.innerHTML = `<div style="color:#aaa;font-size:.86rem;padding:12px;background:#0f3460;border-radius:8px;border-left:3px solid #c0392b">📋 Mode Partiel : Utilisez les options ci-dessus (minuterie, barème, chapitres) pour configurer votre examen.</div>`;
  homeCard.appendChild(wrapper);
}

function createSubjectTabs(){
  const homeCard = document.querySelector('.home-card');
  if (!homeCard) return;
  const tabs = document.createElement('div');
  tabs.style.display = 'flex';
  tabs.style.gap = '8px';
  tabs.style.marginBottom = '12px';

  const firstTabLabel = window.SANDBOX_TAB_LABEL || (SUBJECT_NAME === 'Pathologie' ? 'Pathologie' : 'Bac à sable');
  const names = [{id:'tab-sandbox',label:firstTabLabel},{id:'tab-partiel',label:'Partiel'},{id:'tab-chap',label:'Chapitres'}];
  names.forEach(n=>{
    const b = document.createElement('button');
    b.type = 'button';
    b.id = n.id;
    b.className = 'btn';
    b.textContent = n.label;
    b.style.background = 'transparent';
    b.style.border = '1px solid #2d2d50';
    b.style.color = '#ddd';
    b.style.padding = '8px 12px';
    b.style.borderRadius = '8px';
    b.addEventListener('click', ()=>switchTab(n.id));
    tabs.appendChild(b);
  });
  homeCard.insertBefore(tabs, homeCard.firstChild);
  // default
  switchTab('tab-sandbox');
}

function switchTab(id){
  const sandbox = document.getElementById('home');
  const sandboxOpts = document.getElementById('sandbox-options');
  const partiel = document.getElementById('partiel-options');
  const chap = document.getElementById('chapters-panel');
  const common = document.getElementById('common-options');
  
  if (sandbox) sandbox.style.display = 'block';
  if (sandboxOpts) sandboxOpts.style.display = 'block';
  if (partiel) partiel.style.display = id === 'tab-partiel' ? 'block' : 'none';
  if (chap) chap.style.display = id === 'tab-chap' ? 'block' : 'none';
  if (common) common.style.display = 'block';
  
  // highlight
  ['tab-sandbox','tab-partiel','tab-chap'].forEach(tid=>{
    const btn = document.getElementById(tid);
    if (btn) {
      btn.style.background = tid === id ? '#c0392b' : 'transparent';
      btn.style.color = tid === id ? '#fff' : '#ddd';
    }
  });
}

function defaultChapterFilter() {
  const filter = document.getElementById('chapter-filter');
  if (!filter) return;
  // For multi-select: select first chapter by default (or leave empty to mean "all")
  if (filter.options.length > 0) {
    // Try to select the "Tous les chapitres" option if it exists
    const allOption = filter.querySelector('option[value="all"]');
    if (allOption) {
      allOption.selected = true;
    } else if (filter.options.length > 1) {
      filter.options[1].selected = true; // select first real chapter
    }
  }
}

function shuffle(arr) {
  let a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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
    select.innerHTML = '<option value="0">0 QCM disponible</option>';
    select.value = '0';
    select.disabled = true;
    return;
  }

  const previous = parseInt(select.value, 10);
  const candidate = Number.isFinite(previous) && previous > 0 ? previous : preferredDefault;
  const values = Array.from(new Set((presetValues || []).filter(v => Number.isFinite(v) && v > 0 && v <= maxCount)));
  if (!values.includes(maxCount)) values.push(maxCount);
  values.sort((a, b) => a - b);

  select.disabled = false;
  select.innerHTML = '';
  values.forEach(v => {
    const option = document.createElement('option');
    option.value = String(v);
    option.textContent = `${v} QCM`;
    select.appendChild(option);
  });

  const fallback = values.includes(preferredDefault) ? preferredDefault : values[values.length - 1];
  const nextValue = values.includes(candidate) ? candidate : fallback;
  select.value = String(nextValue);
}

function refreshExamSizeFromFilters() {
  const filter = document.getElementById('chapter-filter');
  const selectedChapters = getSelectedChapters(filter);
  const pool = selectedChapters.length ? BANK.filter(q => selectedChapters.includes(q.ch)) : BANK;
  syncExamSizeSelect('exam-size', pool.length, [10, 15, 20, 25], 25);
  const questionCount = document.getElementById('question-count');
  const examSize = document.getElementById('exam-size');
  if (questionCount && examSize) questionCount.textContent = examSize.value;
}

function examSignature(questions) {
  return questions.map(q => `${q.ch}::${q.q}`).sort().join('||');
}

function getBalancedDraw(pool, totalCount) {
  const wanted = Math.min(totalCount, pool.length);
  if (wanted <= 0) return [];
  if (wanted >= pool.length) return shuffle(pool).slice(0, wanted);

  const byChapter = new Map();
  pool.forEach(q => {
    const chapter = q.ch || 'Sans chapitre';
    if (!byChapter.has(chapter)) byChapter.set(chapter, []);
    byChapter.get(chapter).push(q);
  });

  const chapters = shuffle(Array.from(byChapter.keys()));
  const base = Math.floor(wanted / chapters.length);
  const extra = wanted % chapters.length;
  const picked = [];

  chapters.forEach((chapter, idx) => {
    const chapterQs = shuffle(byChapter.get(chapter));
    const target = base + (idx < extra ? 1 : 0);
    picked.push(...chapterQs.slice(0, Math.min(target, chapterQs.length)));
  });

  if (picked.length < wanted) {
    const seen = new Set(picked.map(q => `${q.ch}::${q.q}`));
    const rest = shuffle(pool.filter(q => !seen.has(`${q.ch}::${q.q}`)));
    picked.push(...rest.slice(0, wanted - picked.length));
  }

  return shuffle(picked).slice(0, wanted);
}

function getVariedBalancedDraw(pool, totalCount) {
  const wanted = Math.min(totalCount, pool.length);
  if (wanted <= 0) return [];
  const tries = 8;
  for (let i = 0; i < tries; i++) {
    const draw = getBalancedDraw(pool, wanted);
    const sig = examSignature(draw);
    if (sig !== lastSessionSignature || pool.length <= wanted) {
      lastSessionSignature = sig;
      return draw;
    }
  }
  const fallback = getBalancedDraw(pool, wanted);
  lastSessionSignature = examSignature(fallback);
  return fallback;
}

function startExam() {
  if (!BANK.length) {
    alert('Aucune question disponible pour cette matière.');
    return;
  }
  // read options
  const grading = document.getElementById('grading-scheme') ? document.getElementById('grading-scheme').value : 'classic';
  if (grading === 'classic') {
    correctPoints = 0.25;
    wrongPoints = 0.083;
  } else if (grading === 'simple') {
    correctPoints = 1;
    wrongPoints = 0;
  } else {
    const customCorrect = parseFloat(document.getElementById('custom-correct')?.value);
    const customWrong = parseFloat(document.getElementById('custom-wrong')?.value);
    correctPoints = isNaN(customCorrect) ? 0.25 : customCorrect;
    wrongPoints = isNaN(customWrong) ? 0.083 : customWrong;
  }

  const timerEnabled = document.getElementById('enable-timer') ? document.getElementById('enable-timer').checked : false;
  const timerMins = document.getElementById('timer-minutes') ? parseInt(document.getElementById('timer-minutes').value,10) : 0;

  const size = parseInt(document.getElementById('exam-size').value, 10);
  
  // get selected chapters (multi-select)
  const filter = document.getElementById('chapter-filter');
  let selectedChapters = getSelectedChapters(filter);
  
  // build pool: if no chapters selected or 'all' selected, use all; otherwise use selected chapters
  const pool = selectedChapters.length === 0 ? BANK : BANK.filter(q => selectedChapters.includes(q.ch));
  
  if (pool.length === 0) {
    alert('Aucune question disponible pour les chapitres sélectionnés. Choisis d\'autres chapitres.');
    return;
  }

  const selectedCount = Math.min(size, pool.length);
  currentSession = getVariedBalancedDraw(pool, selectedCount);
  if (pool.length < size) {
    alert(`Les chapitres choisis contiennent seulement ${pool.length} questions. Le quiz utilisera toutes les questions disponibles.`);
  }

  const shuffledQC = shuffle([...Array(QC_BANK.length).keys()]);
  currentQC = shuffledQC.slice(0, 4).map(i => QC_BANK[i]);

  answers = new Array(currentSession.length).fill(null);
  shuffledOpts = [];
  shuffledCorrects = [];
  currentSession.forEach(q => {
    const correctText = q.opts[q.a];
    const sh = shuffle(q.opts);
    shuffledOpts.push(sh);
    shuffledCorrects.push(sh.indexOf(correctText));
  });

  currentQ = 0;
  examFinished = false;
  startTime = Date.now();
  // start timer if requested
  if (timerEnabled && timerMins > 0) {
    remainingSeconds = timerMins * 60;
    attachTimerToHeader();
    startTimer();
  }

  document.getElementById('home').style.display = 'none';
  document.getElementById('header').style.display = 'flex';
  ensureHeaderControls();
  document.getElementById('progress-bar').style.display = 'block';
  document.getElementById('nav-pills').style.display = 'flex';
  document.getElementById('main').style.display = 'block';

  buildUI();
}

function attachTimerToHeader(){
  const header = document.getElementById('header');
  if (!header) return;
  let t = document.getElementById('timer');
  if (!t) {
    t = document.createElement('div');
    t.id = 'timer';
    t.style.marginLeft = '12px';
    t.style.fontSize = '1.1rem';
    t.style.fontWeight = '800';
    t.style.background = 'rgba(0,0,0,.2)';
    t.style.padding = '6px 10px';
    t.style.borderRadius = '18px';
    header.appendChild(t);
  }
  t.style.display = 'inline-block';
  updateTimerDisplay();
}

function goBack() {
  if (examFinished) {
    goHome();
    return;
  }
  if (currentQ > 0) {
    goTo(currentQ - 1);
    return;
  }
  goHome();
}

function updateTimerDisplay(){
  const t = document.getElementById('timer');
  if (!t) return;
  const m = Math.floor(remainingSeconds / 60);
  const s = remainingSeconds % 60;
  t.textContent = `${m}:${String(s).padStart(2,'0')}`;
  if (remainingSeconds <= 30) t.classList.add('danger');
  else if (remainingSeconds <= 120) t.classList.add('warn');
}

function startTimer(){
  stopTimer();
  timerInterval = setInterval(()=>{
    remainingSeconds -= 1;
    updateTimerDisplay();
    if (remainingSeconds <= 0) {
      stopTimer();
      alert('Temps écoulé — le partiel est soumis automatiquement.');
      submitExam();
    }
  }, 1000);
}

function stopTimer(){
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
}

function buildUI() {
  document.getElementById('questions-zone').innerHTML = '';
  document.getElementById('nav-pills').innerHTML = '';
  currentSession.forEach((q, i) => {
    const p = document.createElement('button');
    p.className = 'pill' + (i === 0 ? ' current' : '');
    p.textContent = i + 1;
    p.id = 'pill-' + i;
    p.onclick = () => goTo(i);
    document.getElementById('nav-pills').appendChild(p);

    const tc = q.type === 'fausse' ? 'tag-fausse' : q.type === 'vraie' ? 'tag-vraie' : 'tag-direct';
    const tt = q.type === 'fausse' ? '❌ LAQUELLE EST FAUSSE ?' : q.type === 'vraie' ? '✅ LAQUELLE EST VRAIE ?' : '❓ QUESTION DIRECTE';
    const card = document.createElement('div');
    card.className = 'qcard' + (i === 0 ? ' active' : '');
    card.id = 'qcard-' + i;
    card.innerHTML = `
      <div class="chapitre-tag">${q.ch} — ${q.label}</div>
      <div class="qtag ${tc}">${tt}</div>
      <div class="qtext">Q${i + 1}. ${q.q}</div>
      <div class="opts" id="opts-${i}">
        ${shuffledOpts[i].map((o, oi) => `<button class="opt" id="opt-${i}-${oi}" onclick="selectOpt(${i},${oi})">${String.fromCharCode(65 + oi)}. ${o}</button>`).join('')}
      </div>
      <div class="qnav">
        <button class="btn btn-prev" onclick="goTo(${i - 1})" ${i === 0 ? 'disabled' : ''}>← Précédent</button>
        <button class="btn btn-skip" onclick="goTo(${i < currentSession.length - 1 ? i + 1 : i})">Passer →</button>
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
  showResults();
}

function showResults() {
  let correct = 0, wrong = 0, skipped = 0;
  const elapsedMs = Date.now() - startTime;
  const timeUsed = Math.max(0, Math.floor(elapsedMs / 1000));
  const mu = Math.floor(timeUsed / 60), su = timeUsed % 60;
  let corrHTML = '';

  currentSession.forEach((q, i) => {
    const ua = answers[i], ca = shuffledCorrects[i];
    let cls;
    if (ua === null) { cls = 'skipped'; skipped++; }
    else if (ua === ca) { correct++; }
    else { cls = 'wrong'; wrong++; }
    const ut = ua !== null ? shuffledOpts[i][ua] : '—';
    const ct = shuffledOpts[i][ca];
    corrHTML += `<div class="corr-item ${cls}">
      <div class="ch-badge">${q.ch}</div>
      <div class="corr-q">${q.q}</div>
      <div class="corr-ans">Ta réponse : <span class="${ua === ca ? 'corr-ok' : 'corr-ko'}">${ut}</span></div>
      <div class="corr-ans">Bonne réponse : <span class="corr-ok">${ct}</span></div>
      <div class="corr-expl">💡 ${q.e}</div>
    </div>`;
  });

  const raw = Math.max(0, (correct * correctPoints - wrong * wrongPoints));
  const score = raw.toFixed(2);
  const pct = Math.round(currentSession.length ? correct / currentSession.length * 100 : 0);
  const maxScore = (currentSession.length * correctPoints).toFixed(2);
  const wrongLabel = wrongPoints >= 0 ? `+${wrongPoints}` : wrongPoints;
  const emoji = score >= 5.5 ? '🏆' : score >= 4 ? '👍' : score >= 3 ? '📖' : '💪';
  const dateLabel = new Date().toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' });

  recordLeaderboardResult({
    date: dateLabel,
    subject: SUBJECT_NAME,
    user: currentUser || 'Invité',
    score,
    max: maxScore,
    pct
  });

  saveResultForCurrentUser({
    date: dateLabel,
    subject: SUBJECT_NAME,
    score,
    max: maxScore,
    pct
  });

  const qcHTML = currentQC.map((qc, i) => `
    <div class="qc-item">
      <div class="qc-q">Q${i + 1}. ${qc.q}</div>
      <button class="show-r-btn" id="sbtn-${i}" onclick="toggleR(${i})">Voir la réponse</button>
      <div class="qc-r" id="qcr-${i}">${qc.r}</div>
    </div>`).join('');

  document.getElementById('results').innerHTML = `
    <div class="score-card">
      <div style="font-size:2rem;margin-bottom:6px">${emoji}</div>
      <div class="score-num" style="color:${score >= 4.5 ? '#2ecc71' : score >= 3 ? '#f39c12' : '#e74c3c'}">${score}<span style="font-size:1.4rem">/${maxScore}</span></div>
      <div style="color:#aaa;font-size:.82rem;margin-top:4px">Score sur ${currentSession.length} QCM (${correctPoints} / −${wrongPoints}) — ${pct}% de bonnes réponses</div>
      <div class="score-detail">
        <div class="sc-box" style="color:#2ecc71">✅ ${correct} correctes</div>
        <div class="sc-box" style="color:#e74c3c">❌ ${wrong} incorrectes</div>
        <div class="sc-box">⏭ ${skipped} passées</div>
        <div class="sc-box">⏱ ${mu}min ${su.toString().padStart(2, '0')}s</div>
      </div>
    </div>
    <div id="qc-section">
      <h2>📝 QUESTIONS COURTES — Rédige d'abord, puis dévoile</h2>
      ${qcHTML}
    </div>
    <div style="margin-top:14px">
      <h3 style="color:#e74c3c;margin-bottom:10px;font-size:.92rem">📋 CORRECTIONS DÉTAILLÉES</h3>
      ${corrHTML}
    </div>
    <div style="text-align:center;padding:20px">
      <div style="color:#aaa;font-size:.82rem;margin-bottom:10px">Banque : ${BANK.length} questions • ${QC_BANK.length} questions courtes • Barème : ${correctPoints} / −${wrongPoints}</div>
      <div style="color:#8fb3a8;font-size:.78rem;margin-bottom:10px">${currentUser ? `Résultat enregistré sur le compte: ${currentUser}` : 'Connecte-toi avec un compte local pour sauvegarder tes résultats.'}</div>
      <button class="restart-btn" onclick="newExam()">🔄 Nouveau partiel (tirage différent)</button>
    </div>`;
  document.getElementById('results').style.display = 'block';
  window.scrollTo(0, 0);
}

function toggleR(i) {
  const el = document.getElementById('qcr-' + i);
  const btn = document.getElementById('sbtn-' + i);
  const hidden = el.style.display === 'none' || el.style.display === '';
  el.style.display = hidden ? 'block' : 'none';
  btn.textContent = hidden ? 'Masquer' : 'Voir la réponse';
}

function newExam() {
  goHome();
}

function goHome() {
  stopTimer();
  examFinished = false;
  document.getElementById('results').style.display = 'none';
  document.getElementById('results').innerHTML = '';
  document.getElementById('header').style.display = 'none';
  document.getElementById('progress-bar').style.display = 'none';
  document.getElementById('nav-pills').style.display = 'none';
  document.getElementById('main').style.display = 'none';
  document.getElementById('home').style.display = 'block';
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    try {
      initSandboxPage();
    } catch (error) {
      showFatalInitError(error);
    }
  });
} else {
  try {
    initSandboxPage();
  } catch (error) {
    showFatalInitError(error);
  }
}
