// Banque Anatomie convertie pour le moteur sandbox.js
// Format source: { c, l, q, o, a, e }

window.VALO_BANK=[






window.VALO_BANK = window.VALO_BANK.map(function(item) {
  return {
    ch: item.l,
    label: item.l,
    type: 'direct',
    q: item.q,
    opts: item.o,
    a: item.a,
    e: item.e
  };
});
window.BANK = window.VALO_BANK
