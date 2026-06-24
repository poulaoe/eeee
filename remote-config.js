(function () {
  var SUPABASE_URL = 'https://ynvkxudmusfaivcrkjox.supabase.co';
  var DEFAULT_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inludmt4dWRtdXNmYWl2Y3Jram94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyNDE3MDYsImV4cCI6MjA5NzgxNzcwNn0._XgvmdHq6KeT1K2-xpvML7HIF8GimRegl14DhMsBp8E';
  var ANON_KEY_STORAGE = 'qcm_supabase_anon_key';
  var TABLE_STORAGE = 'qcm_supabase_table';
  var DEFAULT_TABLE = 'leaderboard';

  function readAnonKey() {
    try {
      return (localStorage.getItem(ANON_KEY_STORAGE) || DEFAULT_ANON_KEY).trim();
    } catch (e) {
      return DEFAULT_ANON_KEY;
    }
  }

  function writeAnonKey(value) {
    try {
      localStorage.setItem(ANON_KEY_STORAGE, String(value || '').trim());
      return true;
    } catch (e) {
      return false;
    }
  }

  function readTable() {
    try {
      return (localStorage.getItem(TABLE_STORAGE) || DEFAULT_TABLE).trim();
    } catch (e) {
      return DEFAULT_TABLE;
    }
  }

  function writeTable(value) {
    try {
      localStorage.setItem(TABLE_STORAGE, String(value || '').trim());
      return true;
    } catch (e) {
      return false;
    }
  }

  window.QCM_SUPABASE = {
    url: SUPABASE_URL,
    anonKey: readAnonKey(),
    table: readTable(),
    anonKeyStorage: ANON_KEY_STORAGE,
    tableStorage: TABLE_STORAGE,
    setAnonKey: function (value) {
      var next = String(value || '').trim();
      this.anonKey = next;
      return writeAnonKey(next);
    },
    setTable: function (value) {
      var next = String(value || '').trim() || DEFAULT_TABLE;
      this.table = next;
      return writeTable(next);
    }
  };
})();
