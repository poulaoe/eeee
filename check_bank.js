// check_bank.js — à lancer avec : node check_bank.js
// Détecte : 1) questions dupliquées (même énoncé, options mélangées ou pas)
//           2) déséquilibre entre chapitres
// Usage : place ce fichier à la racine du repo, charge ta banque juste avant, puis lance-le.

const fs = require("fs");

// 1. Charge un ou plusieurs fichiers de banque ici (adapte les chemins)
global.window = {};
const files = [
  "./Biomec-bank.js",
  "./Patho-bank.js",
  "./ProcedII-bank.js",
  "./Proced-bank.js",
  "./ValoI-Bank.js",
  "./ValoII-Bank.js",
  "./anat-bank.js",
  "./douleur-bank.js",
];

let allQuestions = [];
for (const f of files) {
  if (!fs.existsSync(f)) continue;
  eval(fs.readFileSync(f, "utf8"));
}
// Récupère tout ce qui a été posé sur window.*_BANK
for (const key in global.window) {
  if (Array.isArray(global.window[key])) {
    allQuestions.push(...global.window[key].map((q) => ({ ...q, _bank: key })));
  }
}

console.log(`Total questions chargées : ${allQuestions.length}\n`);

// 2. Normalise le texte pour comparer (enlève accents, ponctuation, casse)
function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // enlève accents
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

// 3. Détection des doublons par énoncé normalisé
const seen = new Map();
const duplicates = [];
for (const q of allQuestions) {
  const key = normalize(q.q || q.question || "");
  if (seen.has(key)) {
    duplicates.push({ original: seen.get(key), duplicate: q });
  } else {
    seen.set(key, q);
  }
}

console.log(`=== DOUBLONS DÉTECTÉS : ${duplicates.length} ===`);
duplicates.forEach((d) => {
  console.log(
    `- "${d.duplicate.q}" (banque: ${d.duplicate._bank}, chapitre: ${d.duplicate.c || d.duplicate.ch})`,
  );
});

// 4. Répartition par chapitre
console.log(`\n=== RÉPARTITION PAR CHAPITRE ===`);
const counts = {};
for (const q of allQuestions) {
  const ch = q.c || q.ch || q.label || "?";
  counts[ch] = (counts[ch] || 0) + 1;
}
const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
const max = sorted[0][1];
sorted.forEach(([ch, n]) => {
  const bar = "#".repeat(Math.round((n / max) * 40));
  console.log(`${ch.padEnd(10)} ${String(n).padStart(4)}  ${bar}`);
});

const avg = allQuestions.length / sorted.length;
console.log(`\nMoyenne par chapitre : ${avg.toFixed(1)}`);
console.log(`Chapitres sous la moyenne (à renforcer) :`);
sorted
  .filter(([, n]) => n < avg * 0.6)
  .forEach(([ch, n]) => console.log(`  - ${ch} (${n} questions)`));
