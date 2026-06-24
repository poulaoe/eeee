// Banque Biomec (placeholder)
// Ajoute tes questions dans MAIN_Q / EXTRA_Q / EXTRA_Q2 en format source:
// { c:"1", l:"Chap. 1", q:"Question", o:["A","B","C","D"], a:0, e:"Explication" }

var MAIN_Q = [];
var EXTRA_Q = [];
var EXTRA_Q2 = [];

var ALL_Q = MAIN_Q.concat(EXTRA_Q).concat(EXTRA_Q2);

window.BIOMEC_BANK = ALL_Q.map(function(item) {
  return {
    ch: item.l,
    label: 'QCM biomec',
    type: 'direct',
    q: item.q,
    opts: item.o,
    a: item.a,
    e: item.e
  };
});
