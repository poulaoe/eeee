// Chat bubble — à inclure dans toutes les pages
(function initChatBubble() {
  if (!window.QCM_REMOTE || typeof window.QCM_REMOTE.fetchChatMessages !== 'function') {
    setTimeout(initChatBubble, 2000);
    return;
  }
  if (document.getElementById('chat-bubble-btn')) return;
  var style = document.createElement('style');
  style.textContent = '#chat-bubble-btn{position:fixed;bottom:60px;right:16px;z-index:2000;background:linear-gradient(135deg,#27ae60,#229954);color:#fff;border:none;border-radius:50%;width:52px;height:52px;font-size:1.4rem;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;}#chat-bubble-badge{position:absolute;top:-4px;right:-4px;background:#e74c3c;color:#fff;border-radius:999px;padding:1px 6px;font-size:.68rem;font-weight:800;display:none;}#chat-mini-panel{position:fixed;bottom:120px;right:16px;z-index:2000;width:300px;background:linear-gradient(180deg,#0f3460,#0d2847);border:1px solid #29507a;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,.5);display:none;flex-direction:column;overflow:hidden;}#chat-mini-panel.open{display:flex}#chat-mini-header{padding:10px 14px;background:#1a4d7a;display:flex;justify-content:space-between;align-items:center;}#chat-mini-header span{color:#a8d8ff;font-weight:700;font-size:.88rem}#chat-mini-close{background:transparent;border:none;color:#fff;cursor:pointer;font-size:1rem;}#chat-mini-messages{max-height:180px;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:6px;font-size:.78rem;}#chat-mini-input-zone{padding:8px;border-top:1px solid #29507a;display:flex;gap:6px;}#chat-mini-input{flex:1;background:#0a1e38;border:1px solid #29507a;border-radius:6px;color:#fff;padding:6px 8px;font-size:.78rem;resize:none;font-family:inherit;min-height:32px;max-height:60px;}#chat-mini-send{background:#27ae60;color:#fff;border:none;border-radius:6px;padding:6px 10px;cursor:pointer;font-weight:700;font-size:.75rem;}#chat-mini-link{text-align:center;padding:6px;border-top:1px solid #29507a;}#chat-mini-link a{color:#6bb6ff;font-size:.74rem;text-decoration:none;}';
  document.head.appendChild(style);
  var btn = document.createElement('button');
  btn.id = 'chat-bubble-btn';
  btn.innerHTML = '💬<span id="chat-bubble-badge"></span>';
  document.body.appendChild(btn);
  var panel = document.createElement('div');
  panel.id = 'chat-mini-panel';
  panel.innerHTML = '<div id="chat-mini-header"><span>💬 Chat</span><button id="chat-mini-close" onclick="document.getElementById(\'chat-mini-panel\').classList.remove(\'open\')">✕</button></div><div id="chat-mini-messages"><div style="color:#888;text-align:center;padding:10px">⏳ Chargement...</div></div><div id="chat-mini-input-zone"><textarea id="chat-mini-input" placeholder="Répondre..." maxlength="500"></textarea><button id="chat-mini-send" onclick="sendMiniChatMessage()">→</button></div><div id="chat-mini-link"><a href="chat.html" target="_blank">Chat complet ↗</a></div>';
  document.body.appendChild(panel);
  var lastCount = 0;
  btn.onclick = function() {
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) { loadMini(); document.getElementById('chat-bubble-badge').style.display='none'; }
  };
  async function loadMini() {
    var container = document.getElementById('chat-mini-messages');
    if (!container) return;
    try {
      var msgs = await window.QCM_REMOTE.fetchChatMessages('General', 20);
      if (!Array.isArray(msgs)) return;
      var badge = document.getElementById('chat-bubble-badge');
      if (msgs.length > lastCount && lastCount > 0) { badge.textContent='+' + (msgs.length-lastCount); badge.style.display='inline-block'; }
      lastCount = msgs.length;
      if (!msgs.length) { container.innerHTML='<div style="color:#888;text-align:center;padding:10px">Aucun message</div>'; return; }
      var user = localStorage.getItem('qcm_signed_user') || 'Invité';
      container.innerHTML = msgs.slice(0,15).map(function(m) {
        var own = m.user===user;
        var t = m.created_at ? new Date(m.created_at).toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}) : '';
        return '<div style="background:' + (own?'rgba(52,152,219,.1)':'rgba(255,255,255,.06)') + ';border-radius:6px;padding:7px;border-left:2px solid ' + (own?'#3498db':'#27ae60') + ';margin-bottom:4px"><div style="font-weight:700;color:#a8d8ff;font-size:.72rem;margin-bottom:3px">' + (own?'👤 Toi':m.user) + ' <span style="color:#555">' + t + '</span></div><div style="color:#d4e4f7">' + String(m.message||'').replace(/&/g,'&amp;').replace(/</g,'&lt;') + '</div></div>';
      }).join('');
      container.scrollTop = container.scrollHeight;
    } catch(e) {}
  }
  window.sendMiniChatMessage = async function() {
    var input = document.getElementById('chat-mini-input');
    var text = input.value.trim();
    if (!text) return;
    try {
      var user = localStorage.getItem('qcm_signed_user') || 'Invité';
      await window.QCM_REMOTE.pushChatMessage({user:user,subject:'General',message:text});
      input.value='';
      await loadMini();
    } catch(e) { alert('Erreur: '+e.message); }
  };
  document.addEventListener('keydown', function(e) {
    var input = document.getElementById('chat-mini-input');
    if (document.activeElement===input && e.key==='Enter' && !e.shiftKey) { e.preventDefault(); window.sendMiniChatMessage(); }
  });
  loadMini();
  setInterval(loadMini, 10000);
})();
