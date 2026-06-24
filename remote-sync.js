(function () {
  var DEFAULT_TABLE = 'leaderboard';

  function getConfig() {
    var cfg = window.QCM_SUPABASE || {};
    var url = String(cfg.url || '').replace(/\/$/, '');
    var key = String(cfg.anonKey || '').trim();
    var table = String(cfg.table || DEFAULT_TABLE).trim() || DEFAULT_TABLE;
    return { url: url, key: key, table: table };
  }

  function hasRemote() {
    var cfg = getConfig();
    return !!(cfg.url && cfg.key);
  }

  function toNumber(value, fallback) {
    var n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }

  function toIsoDate(value) {
    if (!value) return new Date().toISOString();
    var d = new Date(value);
    if (Number.isNaN(d.getTime())) return new Date().toISOString();
    return d.toISOString();
  }

  function normalizeEntry(item) {
    var raw = item || {};
    return {
      date: toIsoDate(raw.date),
      subject: String(raw.subject || 'Inconnu').slice(0, 120),
      user: String(raw.user || 'Invite').slice(0, 120),
      score: toNumber(raw.score, 0),
      max: toNumber(raw.max, 0),
      pct: toNumber(raw.pct, 0)
    };
  }

  function request(path, init) {
    var cfg = getConfig();
    if (!cfg.url || !cfg.key) {
      return Promise.resolve({ ok: false, reason: 'missing-config' });
    }

    var headers = Object.assign(
      {
        apikey: cfg.key,
        Authorization: 'Bearer ' + cfg.key
      },
      (init && init.headers) || {}
    );

    return fetch(cfg.url + path, Object.assign({}, init || {}, { headers: headers }));
  }

  function parseErrorResponse(response) {
    if (!response) return Promise.resolve({ status: 0, message: 'Aucune reponse reseau' });
    return response
      .json()
      .then(function (payload) {
        var message = payload && (payload.message || payload.error || payload.hint)
          ? String(payload.message || payload.error || payload.hint)
          : ('HTTP ' + response.status);
        return { status: response.status, message: message };
      })
      .catch(function () {
        return { status: response.status, message: 'HTTP ' + response.status };
      });
  }

  function normalizeChatSubject(value) {
    var subject = String(value || 'General').trim().toLowerCase();
    if (subject === 'patho' || subject === 'pathologie') return 'Pathologie';
    if (subject === 'anat' || subject === 'anatomie') return 'Anat';
    if (subject === 'proced' || subject === 'procedures' || subject === 'procédures') return 'Proced';
    if (subject === 'douleur') return 'Douleur';
    if (subject === 'general' || subject === 'général') return 'General';
    return String(value || 'General').slice(0, 120);
  }

  function pushResult(entry) {
    if (!hasRemote()) return Promise.resolve({ ok: false, reason: 'missing-config' });

    var cfg = getConfig();
    var payload = normalizeEntry(entry);

    return request('/rest/v1/' + encodeURIComponent(cfg.table), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        return { ok: !!(response && response.ok), status: response ? response.status : 0 };
      })
      .catch(function () {
        return { ok: false, reason: 'network-error' };
      });
  }

  function fetchResults(options) {
    if (!hasRemote()) return Promise.resolve([]);

    var cfg = getConfig();
    var limit = toNumber(options && options.limit, 300);
    if (!Number.isFinite(limit) || limit < 1) limit = 300;
    if (limit > 1000) limit = 1000;

    var query = '/rest/v1/' + encodeURIComponent(cfg.table)
      + '?select=date,subject,user,score,max,pct'
      + '&order=date.desc'
      + '&limit=' + limit;

    return request(query, { method: 'GET' })
      .then(function (response) {
        if (!response || !response.ok) return [];
        return response.json().catch(function () { return []; });
      })
      .then(function (rows) {
        if (!Array.isArray(rows)) return [];
        
        // Filtre pour garder seulement les données des 7 derniers jours
        var now = new Date();
        var sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        
        return rows.filter(function(row) {
          var rowDate = new Date(row.date);
          return rowDate >= sevenDaysAgo;
        }).map(normalizeEntry);
      })
      .catch(function () {
        return [];
      });
  }

  function pushFeedback(report) {
    if (!hasRemote()) return Promise.resolve({ ok: false, reason: 'missing-config' });

    var cfg = getConfig();
    var payload = {
      date: toIsoDate(report.date),
      subject: String(report.subject || 'Inconnu').slice(0, 120),
      user: String(report.user || 'Invité').slice(0, 120),
      type: String(report.type || 'report').slice(0, 50),
      chapter: String(report.chapter || '').slice(0, 120),
      question: String(report.question || '').slice(0, 500),
      description: String(report.description || '').slice(0, 2000),
      message: String(report.message || '').slice(0, 2000)
    };

    return request('/rest/v1/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        return { ok: !!(response && response.ok), status: response ? response.status : 0 };
      })
      .catch(function () {
        return { ok: false, reason: 'network-error' };
      });
  }

  function fetchFeedback() {
    if (!hasRemote()) return Promise.resolve([]);

    return request('/rest/v1/feedback?order=date.desc&limit=500', {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    })
      .then(function (response) {
        if (!response || !response.ok) {
          return parseErrorResponse(response).then(function (err) {
            throw new Error('fetchFeedback failed (' + err.status + '): ' + err.message);
          });
        }
        if (!response.json) return [];
        return response.json();
      })
      .then(function (data) {
        return Array.isArray(data) ? data : [];
      })
      .catch(function (error) {
        throw error;
      });
  }

  function pushChatMessage(message) {
    if (!hasRemote()) return Promise.resolve({ ok: false, reason: 'missing-config' });

    var payload = {
      user: String(message.user || 'Invité').slice(0, 120),
      subject: normalizeChatSubject(message.subject),
      message: String(message.message || '').slice(0, 2000)
    };

    return request('/rest/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        if (!response || !response.ok) {
          return parseErrorResponse(response).then(function (err) {
            throw new Error('pushChatMessage failed (' + err.status + '): ' + err.message);
          });
        }
        return { ok: true, status: response.status };
      })
      .catch(function (error) {
        throw error;
      });
  }

  function fetchChatMessages(subject, limit) {
    if (!hasRemote()) return Promise.resolve([]);

    var subj = encodeURIComponent(normalizeChatSubject(subject));
    var lim = Math.min(Number(limit) || 100, 500);

    return request('/rest/v1/chat?subject=eq.' + subj + '&order=created_at.desc&limit=' + lim, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    })
      .then(function (response) {
        if (!response || !response.ok) {
          return parseErrorResponse(response).then(function (err) {
            throw new Error('fetchChatMessages failed (' + err.status + '): ' + err.message);
          });
        }
        if (!response.json) return [];
        return response.json();
      })
      .then(function (data) {
        return Array.isArray(data) ? data.reverse() : [];
      })
      .catch(function (error) {
        throw error;
      });
  }

  window.QCM_REMOTE = {
    isConfigured: hasRemote,
    pushResult: pushResult,
    fetchResults: fetchResults,
    normalizeEntry: normalizeEntry,
    pushFeedback: pushFeedback,
    fetchFeedback: fetchFeedback,
    pushChatMessage: pushChatMessage,
    fetchChatMessages: fetchChatMessages
  };
})();
