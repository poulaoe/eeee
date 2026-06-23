// Configuration de synchronisation en ligne (Supabase REST)
// 1) Crée un projet Supabase
// 2) Crée la table publique: qcm_attempts(date text, subject text, user text, score text, max text, pct int)
// 3) Mets la policy RLS autorisant select/insert pour la clé anon (ou ajuste selon ton besoin)
// 4) Remplis les champs ci-dessous
window.QCM_REMOTE_CONFIG = {
  enabled: false,
  supabaseUrl: '',
  supabaseAnonKey: '',
  table: 'qcm_attempts',
  maxFetch: 500
};
