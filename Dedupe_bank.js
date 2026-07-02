// dedupe_all.js — v2 : gere PLUSIEURS banques dans un meme fichier
// Commande : node dedupe_all.js
// Memo : un fichier peut contenir window.QCBANK ET window.QCU_BANK -> les 2 sont traites.

const fs = require("fs");

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

function normalize(str) {
  return (str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const seenGlobal = new Map();
let totalRemoved = 0;

for (const f of files) {
  if (!fs.existsSync(f)) {
    console.log(`(fichier absent, ignore) ${f}`);
    continue;
  }

  global.window = {};
  try {
    eval(fs.readFileSync(f, "utf8"));
  } catch (err) {
    console.log(`\n!!! ERREUR DE SYNTAXE dans ${f} — saute.`);
    console.log(`   Detail : ${err.message}\n`);
    continue;
  }

  // MEMO : on prend TOUS les tableaux du fichier, pas juste le dernier
  const banksInFile = [];
  for (const key in global.window) {
    if (Array.isArray(global.window[key])) {
      banksInFile.push({ bankName: key, questions: global.window[key] });
    }
  }

  if (banksInFile.length === 0) {
    console.log(`(aucune banque trouvee dans) ${f}`);
    continue;
  }

  console.log(
    `${f} : ${banksInFile.length} banque(s) trouvee(s) -> ${banksInFile.map((b) => b.bankName).join(", ")}`,
  );

  let fileOutput = "";
  for (const { bankName, questions } of banksInFile) {
    const clean = [];
    let removedHere = 0;

    for (const q of questions) {
      const key = normalize(q.q || q.question);
      if (seenGlobal.has(key)) {
        const original = seenGlobal.get(key);
        console.log(
          `  DOUBLON [${bankName}] : "${(q.q || q.question || "").slice(0, 70)}..."`,
        );
        console.log(
          `     -> deja garde dans ${original.file} / ${original.bankName}`,
        );
        removedHere++;
        totalRemoved++;
      } else {
        seenGlobal.set(key, { file: f, bankName, question: q });
        clean.push(q);
      }
    }

    console.log(
      `  ${bankName} : ${removedHere} doublon(s) retire(s), ${clean.length}/${questions.length} gardees`,
    );
    fileOutput += `window.${bankName} = ${JSON.stringify(clean, null, 2)};\n\n`;
  }

  const outPath = f.replace(/\.js$/, ".clean.js");
  fs.writeFileSync(outPath, fileOutput);
  console.log(`  -> ecrit dans ${outPath}\n`);
}

console.log(
  `\n=== TOTAL : ${totalRemoved} doublon(s) sur toutes les matieres ===`,
);
