(function () {
  function getConfig() {
    const cfg = window.QCM_REMOTE_CONFIG || {};
    return {
      enabled: !!cfg.enabled,
      supabaseUrl: String(cfg.supabaseUrl || '').trim().replace(/\/$/, ''),
      supabaseAnonKey: String(cfg.supabaseAnonKey || '').trim(),
      table: String(cfg.table || 'qcm_attempts').trim(),
      maxFetch: Number.isFinite(cfg.maxFetch) ? cfg.maxFetch : 500
    };
  }

  function isConfigured() {
    const cfg = getConfig();
    return cfg.enabled && !!cfg.supabaseUrl && !!cfg.supabaseAnonKey;
  }

  function normalizeEntry(entry) {
    return {
      date: String(entry?.date || new Date().toISOString()),
      subject: String(entry?.subject || 'Inconnu'),
      user: String(entry?.user || 'Invite'),
      score: String(entry?.score || '0'),
      max: String(entry?.max || '0'),
      pct: Number.isFinite(Number(entry?.pct)) ? Number(entry.pct) : 0
    };
  }

  async function pushResult(entry) {
    if (!isConfigured()) return false;
    const cfg = getConfig();
    const url = cfg.supabaseUrl + '/rest/v1/' + encodeURIComponent(cfg.table);
    const payload = normalizeEntry(entry);

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          apikey: cfg.supabaseAnonKey,
          Authorization: 'Bearer ' + cfg.supabaseAnonKey,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal'
        },
        body: JSON.stringify(payload)
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  }

  async function fetchResults() {
    if (!isConfigured()) return [];
    const cfg = getConfig();
    const select = 'date,subject,user,score,max,pct';
    const url = cfg.supabaseUrl + '/rest/v1/' + encodeURIComponent(cfg.table)
      + '?select=' + encodeURIComponent(select)
      + '&order=' + encodeURIComponent('date.desc')
      + '&limit=' + encodeURIComponent(String(cfg.maxFetch));

    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          apikey: cfg.supabaseAnonKey,
          Authorization: 'Bearer ' + cfg.supabaseAnonKey
        }
      });
      if (!res.ok) return [];
      const data = await res.json();
      if (!Array.isArray(data)) return [];
      return data.map(normalizeEntry);
    } catch (e) {
      return [];
    }
  }

  window.QCM_REMOTE = {
    isConfigured,
    pushResult,
    fetchResults
  };
})();
