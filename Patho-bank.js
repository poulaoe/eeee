window.Patho_BANK=[
// =============================================
// BANQUE COMPLÈTE — PATHOLOGIE NEUROLOGIQUE
// Format compact : {l, t, q, o, a, e}
// l = label chapitre
// t = type : "fausse" | "vraie" | "direct"
// q = question
// o = options [A,B,C,D]
// a = index bonne réponse (0-3)
// e = explication
// =============================================
// Mapping :
// { ch:item.l, label:item.l, type:item.t, q:item.q, opts:item.o, a:item.a, e:item.e }
// =============================================



// ===== CH.3 — COGNITIF =====
{l:"Ch.3",t:"fausse",q:"Laquelle des affirmations sur l'aphasie de Broca est FAUSSE ?",
o:["L'émission est non fluide et laborieuse","La compréhension orale est généralement préservée","La répétition est perturbée","L'émission est fluide et paraphasique"],
a:3,e:"Dans l'aphasie de Broca, l'émission est NON FLUIDE et laborieuse. L'émission fluide et paraphasique est caractéristique de WERNICKE. Broca = zone motrice du langage."},

{l:"Ch.3",t:"fausse",q:"Laquelle des affirmations sur l'aphasie de Wernicke est FAUSSE ?",
o:["L'émission est fluide mais paraphasique","La compréhension orale est préservée","La répétition est perturbée","Elle est dite 'sensitive primaire'"],
a:1,e:"Dans Wernicke, la COMPRÉHENSION est ALTÉRÉE. L'émission est fluide mais paraphasique. On l'appelle aphasie sensitive car la zone de Wernicke est sensorielle."},

{l:"Ch.3",t:"direct",q:"L'agnosie se définit comme :",
o:["L'incapacité à réaliser des gestes appris malgré l'intégrité motrice","L'incapacité à identifier des objets malgré des fonctions sensitives intactes","Un trouble du langage avec émission non fluide","Une perturbation de l'attention pour les stimuli controlatéraux"],
a:1,e:"Agnosie = incapacité à RECONNAÎTRE malgré des systèmes sensitifs INTACTS. Lésion des zones d'association sensorielles. À distinguer de l'apraxie et de l'aphasie."},

{l:"Ch.3",t:"fausse",q:"Laquelle des affirmations sur l'apraxie est FAUSSE ?",
o:["C'est l'incapacité à réaliser des gestes appris malgré des fonctions motrices intactes","Elle indique une lésion des zones d'association motrices","Elle est toujours bilatérale et symétrique quelle que soit la lésion","Elle se distingue de la paralysie par l'absence de déficit moteur"],
a:2,e:"L'apraxie peut être unilatérale ou bilatérale selon la lésion. Une lésion hémisphérique gauche donne souvent une apraxie bilatérale (l'hémisphère gauche coordonne les deux côtés pour les gestes appris)."},

{l:"Ch.3",t:"vraie",q:"Laquelle des affirmations sur le maintien de la conscience est VRAIE ?",
o:["Il dépend uniquement de l'intégrité du cortex pariétal","Il nécessite l'intégrité du SRAA ET des deux hémisphères","Il est assuré exclusivement par le lobe frontal gauche","Il ne peut être évalué que par IRM fonctionnelle"],
a:1,e:"La conscience nécessite 2 composantes : le NIVEAU DE VIGILANCE (SRAA, tronc cérébral) et le CONTENU (deux hémisphères). Une lésion du tronc peut abolir la vigilance même avec des hémisphères intacts."},

{l:"Ch.3",t:"fausse",q:"Concernant la négligence spatiale unilatérale, laquelle est FAUSSE ?",
o:["Elle survient généralement lors d'une lésion de l'hémisphère non dominant","Elle se traduit par un déficit d'attention pour les stimuli controlatéraux à la lésion","L'anosognosie est une variante où le patient ne reconnaît pas son déficit","Elle survient uniquement lors de lésions frontales gauches"],
a:3,e:"La négligence spatiale survient lors de lésions de l'HÉMISPHÈRE NON DOMINANT (droit). Le patient ignore toute réalité du côté CONTROLATÉRAL. L'anosognosie et l'asomatognosie en sont des variantes."},

{l:"Ch.3",t:"direct",q:"L'anosognosie se définit comme :",
o:["L'incapacité à reconnaître les objets malgré une vision intacte","Le fait que le patient ne reconnaît pas son propre déficit neurologique","L'incapacité à nommer les objets avec les autres composantes intactes","Une extinction visuelle bilatérale lors de stimulations simultanées"],
a:1,e:"Anosognosie = le patient NE RECONNAÎT PAS son propre déficit neurologique. Variante de la négligence. Lésion de l'hémisphère non dominant. À distinguer de l'asomatognosie."},

{l:"Ch.3",t:"vraie",q:"Concernant l'aphasie nominale, laquelle est VRAIE ?",
o:["Elle est caractérisée par une émission non fluide et une compréhension altérée","Elle se manifeste par une perte isolée de la capacité à nommer les objets","Elle touche la répétition de manière sélective avec compréhension préservée","Elle est due à une lésion du faisceau arqué"],
a:1,e:"Aphasie NOMINALE = perte de la capacité à NOMMER les objets. Toutes les autres composantes restent INTACTES. C'est la forme d'aphasie la plus légère et la plus spécifique."},

{l:"Ch.3",t:"fausse",q:"Dans le syndrome frontal, lequel de ces signes est FAUX ?",
o:["Troubles du comportement et de la personnalité","Réflexes primitifs de succion et de préhension","Incontinence sphinctérienne","Hyperkinésie et accélération du temps de réaction"],
a:3,e:"Le syndrome frontal se caractérise par une HYPOKINÉSIE (aboulie, apragmatisme) et NON une hyperkinésie. Signes classiques : troubles du comportement, réflexes primitifs, incontinence sphinctérienne, déficit attentionnel."},

{l:"Ch.3",t:"direct",q:"L'aphasie globale se caractérise par :",
o:["Une perte sélective de la répétition avec émission préservée","Une perte totale de l'expression ET de la compréhension du langage","Une émission fluide paraphasique avec compréhension altérée","Une perte isolée de la capacité à nommer les objets"],
a:1,e:"Aphasie GLOBALE = perte de l'EXPRESSION ET de la COMPRÉHENSION. C'est la forme la plus sévère. À distinguer de Broca (expression seule) et Wernicke (compréhension surtout)."},

{l:"Ch.3",t:"fausse",q:"Dans l'aphasie de conduction, laquelle est FAUSSE ?",
o:["L'émission est fluide et paraphasique","La compréhension orale est préservée","La répétition est impossible","L'émission est non fluide avec agrammatisme"],
a:3,e:"L'aphasie de CONDUCTION a une émission FLUIDE (paraphasique), compréhension PRÉSERVÉE, répétition IMPOSSIBLE. L'émission non fluide avec agrammatisme = aphasie de BROCA. La conduction = lésion du faisceau arqué."},

{l:"Ch.3",t:"direct",q:"L'apraxie constructive est principalement associée à des lésions de :",
o:["L'hémisphère gauche dans l'aire de Broca","Les régions occipito-pariétales droites","Le cervelet bilatéralement","Le tronc cérébral au niveau du mésencéphale"],
a:1,e:"L'apraxie constructive (incapacité à dessiner ou assembler) a une forte composante visuospatiale. Elle est liée aux lésions occipitales et pariétales postérieures, prédominant dans l'HÉMISPHÈRE DROIT."},

{l:"Ch.3",t:"fausse",q:"Concernant les syndromes corticaux topographiques, laquelle est FAUSSE ?",
o:["Ils résultent d'une atteinte étendue des zones corticales","Leur étiologie peut être vasculaire, tumorale ou traumatique","Le maintien de la conscience nécessite l'intégrité du SRAA et des deux hémisphères","Une lésion localisée d'un seul réseau entraîne toujours un syndrome diffus"],
a:3,e:"Une lésion LOCALISÉE d'un réseau = déficit FOCAL. Le syndrome DIFFUS nécessite une atteinte généralisée du cortex. Ces deux mécanismes sont distincts."},

// ===== CH.4 — TONUS & MOUVEMENT =====
{l:"Ch.4",t:"fausse",q:"Concernant le premier motoneurone, laquelle est FAUSSE ?",
o:["Il provoque une paralysie spasmodique","Le signe de Babinski est positif","Les réflexes myotatiques profonds sont exaltés","Il entraîne fasciculations et amyotrophie marquée"],
a:3,e:"Fasciculations + amyotrophie MARQUÉE = syndrome du 2e MN. Le 1er MN donne une amyotrophie légère par désuétude, sans fasciculations. 1er MN = hypertonus, hyperréflexie ; 2e MN = hypotonie, aréflexie."},

{l:"Ch.4",t:"vraie",q:"Laquelle des affirmations sur la spasticité est VRAIE ?",
o:["Elle est due à une lésion du 2e MN et donne le signe de la roue dentée","Elle est une hypertonie pyramidale vitesse-dépendante avec signe de la lame de canif","Elle touche principalement les muscles fléchisseurs des membres inférieurs","Elle est associée à une aréflexie et une paralysie flasque"],
a:1,e:"Spasticité = hypertonie PYRAMIDALE (1er MN), signe de la lame de canif, VITESSE-DÉPENDANTE. Plus intense dans les extenseurs au MI et les fléchisseurs au MS. La roue dentée = extrapyramidal."},

{l:"Ch.4",t:"direct",q:"La paraplégie se définit comme :",
o:["La paralysie d'un seul membre par atteinte d'un nerf périphérique","La paralysie d'un hémicorps par syndrome pyramidal","La paralysie des deux membres inférieurs par syndrome médullaire thoraco-lombaire","La paralysie des quatre membres par syndrome médullaire supra-cervical"],
a:2,e:"Paraplégie = 2 membres inférieurs = lésion THORACO-LOMBAIRE. Tétraplégie = 4 membres = lésion SUPRA-CERVICALE. Hémiplégie = hémicorps = syndrome pyramidal. Monoplégie = 1 membre."},

{l:"Ch.4",t:"fausse",q:"Concernant la syncynie dans le syndrome pyramidal, laquelle est FAUSSE ?",
o:["C'est une contraction involontaire lors d'un mouvement volontaire d'un autre groupe","Elle s'observe chez les patients hémiplégiques ou hémiparétiques","Elle témoigne d'une lésion du faisceau pyramidal","Elle est un signe du 2e motoneurone inférieur"],
a:3,e:"La syncynie est un signe du PREMIER motoneurone (syndrome pyramidal), observée chez les hémiplégiques. Le clonus est aussi un signe du 1er MN. Les fasciculations = 2e MN."},

{l:"Ch.4",t:"direct",q:"Le clonus se définit comme :",
o:["Une contraction musculaire volontaire inhibée par une douleur aiguë","Une série de contractions rapides et réflexes après étirement soudain — signe pyramidal","Une faiblesse musculaire focale due à une atteinte du 2e motoneurone","Une hyperextension involontaire du genou lors de la marche"],
a:1,e:"Clonus = série de CONTRACTIONS RAPIDES et RÉFLEXES après étirement SOUDAIN (ex : tendon d'Achille). Témoigne d'une lésion du FAISCEAU PYRAMIDAL (1er MN). Signe du syndrome pyramidal, comme Babinski."},

{l:"Ch.4",t:"fausse",q:"La SLA est une pathologie du :",
o:["2e motoneurone exclusivement avec paralysie flasque","1er motoneurone exclusivement avec spasticité","1er et 2e motoneurone simultanément","Système cérébelleux uniquement"],
a:2,e:"La SLA atteint le 1er ET LE 2e MOTONEURONE. Elle combine signes CENTRAUX (spasticité, Babinski) ET PÉRIPHÉRIQUES (fasciculations, amyotrophie marquée). Maladie de Charcot. SLP = 1er MN seul ; poliomyélite = 2e MN seul."},

{l:"Ch.4",t:"vraie",q:"L'athétose est classée parmi les troubles :",
o:["Hypokinétiques du système extrapyramidal comme Parkinson","Hyperkinétiques avec mouvements lents et sinueux des extrémités distales","Pyramidaux avec spasticité et hyperréflexie","Cérébelleux avec dysmétrie et ataxie"],
a:1,e:"ATHÉTOSE = trouble HYPERKINÉTIQUE extrapyramidal : mouvements LENTS, SINUEUX des extrémités DISTALES. Les hyperkinétiques incluent aussi : tremblements, dystonie, chorée, ballisme, myoclonies."},

{l:"Ch.4",t:"direct",q:"La différence clinique entre spasticité pyramidale et rigidité extrapyramidale est :",
o:["La spasticité est indépendante de la vitesse du mouvement passif","La spasticité est vitesse-dépendante, la rigidité est constante quelle que soit la vitesse","Les deux sont identiques et nécessitent le même traitement","La rigidité prédomine exclusivement dans les extenseurs des MI"],
a:1,e:"SPASTICITÉ (pyramidale) = VITESSE-DÉPENDANTE → lame de canif. RIGIDITÉ (extrapyramidale) = CONSTANTE quelle que soit la vitesse → roue dentée. Distinction clinique FONDAMENTALE."},

{l:"Ch.4",t:"direct",q:"Dans le syndrome de Brown-Séquard, la perte motrice est :",
o:["Controlatérale à la lésion car la voie corticospinale croise dans la moelle","Ipsilatérale à la lésion car la voie corticospinale croise dans le bulbe","Bilatérale et symétrique car les deux voies sont atteintes","Absente car la motricité est préservée dans toutes les hémisections"],
a:1,e:"Brown-Séquard : perte MOTRICE IPSILATÉRALE (faisceau corticospinal croise dans le BULBE, pas dans la moelle). Perte DOULEUR/TEMPÉRATURE CONTROLATÉRALE (faisceau spinothalamique croise dans la moelle). Proprioception perdue IPSILATÉRALE (cordons postérieurs ne croisent pas)."},

{l:"Ch.4",t:"vraie",q:"Concernant les aspects positifs de la spasticité en clinique, lequel est VRAI ?",
o:["Elle améliore toujours la coordination des mouvements fins","Elle peut aider à la stabilité debout/assise et prévenir l'atrophie musculaire","Elle supprime définitivement la douleur neuropathique","Elle remplace totalement la force musculaire perdue"],
a:1,e:"Aspects POSITIFS de la spasticité : stabilité debout/assise, prévention atrophie musculaire, amélioration retour veineux, aide à tousser. Aspects NÉGATIFS : réduit mobilité, limite AVD, contractures, douleur, escarres."},

// ===== CH.5 — DYSKINÉSIES =====
{l:"Ch.5",t:"direct",q:"Dans le système extrapyramidal, quel neurotransmetteur INHIBE le noyau strié ?",
o:["Acétylcholine","GABA","Dopamine","Glutamate"],
a:2,e:"Dopamine = INHIBE le noyau strié. Acétylcholine = ACTIVE l'intensification des mouvements corticaux. Déséquilibre DA/ACh → troubles extrapyramidaux. Dans Parkinson : ↓ DA → hyperactivité ACh relative."},

{l:"Ch.5",t:"fausse",q:"Concernant la maladie de Huntington, laquelle est FAUSSE ?",
o:["C'est une maladie génétique neurodégénérative à hérédité autosomique dominante","Elle se manifeste typiquement entre 35 et 44 ans","Elle entraîne des mouvements involontaires de type chorée","Elle est plus fréquente chez les personnes d'ascendance asiatique"],
a:3,e:"Huntington est plus fréquente chez les personnes d'ascendance EUROPÉENNE OCCIDENTALE. Hérédité AD avec phénomènes d'anticipation. Première maladie génétique des troubles hyperkinétiques neurologiques."},

{l:"Ch.5",t:"vraie",q:"Laquelle des affirmations sur la chorée est VRAIE ?",
o:["Elle est due à un excès d'inhibition du noyau strié par la dopamine","Elle est un trouble hypokinétique du système extrapyramidal","C'est un trouble hyperkinétique dû à une inhibition moindre de l'ACh ou un excès de DA","Elle se manifeste exclusivement par des mouvements rythmiques des extrémités"],
a:2,e:"Chorée = trouble HYPERKINÉTIQUE : mouvements anormaux rapides, involontaires, irréguliers. Dû à inhibition moindre ACh du strié OU excès DA. Exemples : Huntington, chorée de Sydenham."},

{l:"Ch.5",t:"direct",q:"Les dyskinésies tardives sont caractérisées par :",
o:["Des épisodes brefs de mouvements paroxystiques chorée-dystoniques","Des mouvements répétitifs stéréotypés liés à l'utilisation prolongée de neuroleptiques","Une rigidité extrapyramidale progressive dans les deux hémicorps","Un tremblement au repos disparaissant lors du mouvement"],
a:1,e:"Dyskinésies tardives = mouvements RÉPÉTITIFS stéréotypés (mâcher, tirer la langue, cligner des yeux) liés à l'utilisation prolongée de NEUROLEPTIQUES ou métoclopramide."},

{l:"Ch.5",t:"fausse",q:"Concernant la dystonie, laquelle est FAUSSE ?",
o:["Elle se manifeste par des contractions musculaires involontaires avec postures inhabituelles","Elle peut entraîner des extensions forcées ou des torsions autour d'une seule articulation","C'est un trouble hyperkinétique du système extrapyramidal","Elle entraîne un relâchement musculaire complet avec hypotonie sévère"],
a:3,e:"La dystonie produit des contractions INVOLONTAIRES (pas de relâchement) avec postures très inhabituelles. C'est un trouble HYPERKINÉTIQUE. Relâchement complet + hypotonie = hypotonie, pas dystonie."},

{l:"Ch.5",t:"direct",q:"Le ballisme se caractérise par :",
o:["Des mouvements fins, rythmiques et de faible amplitude au repos","Des mouvements brusques, amples et involontaires ressemblant à des jets de membres","Des contractions musculaires soutenues maintenant des postures anormales","Des secousses musculaires brèves, soudaines et involontaires"],
a:1,e:"Ballisme = mouvements BRUSQUES, AMPLES, involontaires. L'hémiballisme (unilatéral) est souvent causé par une lésion du noyau subthalamique. À distinguer des myoclonies et de la chorée."},

{l:"Ch.5",t:"vraie",q:"La myoclonie se distingue du tremblement car :",
o:["La myoclonie est une oscillation régulière et rythmique continue","La myoclonie est une contraction brusque, brève, involontaire et non rythmique","La myoclonie est toujours pathologique contrairement au tremblement","La myoclonie prédomine au repos et disparaît au mouvement"],
a:1,e:"Myoclonie = contraction BRUSQUE + BRÈVE involontaire. Peut être PHYSIOLOGIQUE (sursauts à l'endormissement) ou pathologique. TREMBLEMENT = oscillation RYTHMIQUE continue."},

{l:"Ch.5",t:"fausse",q:"Concernant le tremblement essentiel, laquelle est FAUSSE ?",
o:["C'est le tremblement le plus fréquent dans la population générale","Il est postural et cinétique, s'aggravant lors des tâches manuelles précises","Il disparaît au repos comme le tremblement parkinsonien","Il touche fréquemment les mains et parfois la tête ou la voix"],
a:2,e:"Tremblement ESSENTIEL = POSTURAL/CINÉTIQUE, aggravé lors des tâches. Il EST PRÉSENT au repos, contrairement au tremblement parkinsonien qui DISPARAÎT au repos. Distinction importante."},

{l:"Ch.5",t:"direct",q:"La maladie de Huntington est transmise de façon :",
o:["Autosomique récessive avec pénétrance variable","Autosomique dominante avec phénomènes d'anticipation","Récessive liée au chromosome X","Mitochondriale par la mère uniquement"],
a:1,e:"Huntington = hérédité AUTOSOMIQUE DOMINANTE avec phénomènes d'ANTICIPATION (la maladie s'aggrave et commence plus tôt à chaque génération, liée à l'expansion des répétitions CAG)."},

// ===== CH.6 — PARKINSON =====
{l:"Ch.6",t:"fausse",q:"Laquelle des affirmations sur la maladie de Parkinson est FAUSSE ?",
o:["C'est la 2e maladie neurodégénérative la plus fréquente après Alzheimer","Le tremblement au repos disparaît pendant le mouvement et le sommeil","Elle est plus fréquente chez les femmes que les hommes","Elle débute typiquement entre 50 et 60 ans"],
a:2,e:"Parkinson est plus fréquente chez les HOMMES. L'étiologie est une mort des cellules dopaminergiques de la substance noire avec dépôts d'alpha-synucléine (corps de Lewy). Cause primaire inconnue."},

{l:"Ch.6",t:"direct",q:"Le tremblement parkinsonien se distingue du tremblement cérébelleux car :",
o:["Le tremblement parkinsonien est d'intention et aggravé lors des mouvements fins","Le tremblement parkinsonien est au repos et disparaît au mouvement et au sommeil","Les deux sont identiques en fréquence et en topographie initiale","Le tremblement parkinsonien est toujours bilatéral et symétrique dès le début"],
a:1,e:"Tremblement parkinsonien = AU REPOS (disparaît au mouvement et au sommeil), asymétrique au début, distal. Tremblement cérébelleux = D'INTENTION (aggravé lors du mouvement précis, test doigt-nez)."},

{l:"Ch.6",t:"vraie",q:"Parmi les symptômes non moteurs de Parkinson, lequel est VRAI ?",
o:["Hyperolfaction et hypermotilité intestinale","Hypertension artérielle orthostatique systématique","Anosmie, constipation, troubles du sommeil et dépression","Hyperactivité intestinale et diarrhée chronique"],
a:2,e:"Symptômes non moteurs de Parkinson : ANOSMIE (perte de l'odorat souvent précoce), constipation, HYPOTENSION orthostatique, troubles du sommeil, dépression, troubles cognitifs tardifs."},

{l:"Ch.6",t:"vraie",q:"L'hypomimie dans la maladie de Parkinson correspond à :",
o:["Une paralysie faciale périphérique avec asymétrie du visage","Un visage inexpressif dit 'masque de poker' avec absence de clignement des yeux","Un spasme hémifacial involontaire unilatéral","Une rigidité des muscles masticateurs empêchant l'ouverture de la bouche"],
a:1,e:"Hypomimie = réduction des mouvements involontaires du visage → visage inexpressif + absence de clignement des yeux. Manifestation de la BRADYKINÉSIE parkinsonienne."},

{l:"Ch.6",t:"fausse",q:"Parmi les symptômes non moteurs de Parkinson, lequel est FAUX ?",
o:["L'anosmie est souvent un symptôme précoce","L'hypotension orthostatique fait partie de la dysautonomie parkinsonienne","La constipation est fréquente","L'hyperkinésie et l'hyperréflexie sont des symptômes non moteurs classiques"],
a:3,e:"Hyperkinésie et hyperréflexie sont des signes du 1er motoneurone (syndrome pyramidal), PAS de Parkinson. Symptômes non moteurs : anosmie, constipation, hypotension orthostatique, troubles du sommeil, dépression."},

{l:"Ch.6",t:"vraie",q:"L'anosmie dans la maladie de Parkinson est importante car :",
o:["Elle est toujours bilatérale et soudaine permettant un diagnostic précoce aisé","Elle peut précéder les symptômes moteurs de plusieurs années","Elle n'apparaît qu'aux stades avancés et sévères","Elle est causée par la rigidité des muscles olfactifs"],
a:1,e:"L'ANOSMIE est un symptôme PRÉ-MOTEUR de Parkinson, pouvant précéder les symptômes moteurs de PLUSIEURS ANNÉES (stades 1-2 de Braak). Avec la constipation et les troubles du sommeil REM, c'est un signe précoce important."},

{l:"Ch.6",t:"fausse",q:"Concernant les parkinsonismes atypiques, laquelle est FAUSSE ?",
o:["La paralysie supranucléaire progressive (PSP) est un parkinsonisme atypique","Les parkinsonismes atypiques répondent généralement mal au traitement dopaminergique","L'atrophie multisystématisée (AMS) est un autre parkinsonisme atypique","Tous les syndromes parkinsoniens répondent parfaitement et durablement à la dopamine"],
a:3,e:"Les parkinsonismes ATYPIQUES (PSP, AMS, dégénérescence corticobasale) répondent MAL à la dopamine. C'est un critère diagnostique IMPORTANT : une bonne réponse oriente vers la maladie de Parkinson idiopathique."},

{l:"Ch.6",t:"direct",q:"La dysautonomie parkinsonienne peut inclure :",
o:["Hypertension artérielle permanente et tachycardie de repos","Hypotension orthostatique et hypomotilité intestinale","Hypotension orthostatique et diarrhée chronique","Bradycardie permanente et hyperhydrose isolée"],
a:1,e:"Dysautonomie parkinsonienne : HYPOTENSION ORTHOSTATIQUE, CONSTIPATION (hypomotilité intestinale), sialorrhée, dysfonction sexuelle, troubles vésicaux. Ces symptômes non moteurs précèdent parfois les symptômes moteurs."},

// ===== CH.7 — LÉSION MÉDULLAIRE =====
{l:"Ch.7",t:"fausse",q:"Concernant le syndrome centromédullaire, laquelle est FAUSSE ?",
o:["C'est la lésion médullaire incomplète la plus fréquente","Il est classiquement provoqué par une hyperextension cervicale","Il affecte davantage les membres supérieurs que les membres inférieurs","Il entraîne une perte complète de toutes les fonctions sous le niveau lésé"],
a:3,e:"Le syndrome centromédullaire est INCOMPLET — meilleur pronostic des syndromes médullaires. La préservation sacrée est souvent conservée. Récupération possible, surtout chez le jeune."},

{l:"Ch.7",t:"vraie",q:"Dans le syndrome de Brown-Séquard, la perte de sensibilité à la douleur et à la température est :",
o:["Ipsilatérale car le faisceau spinothalamique ne croise pas","Controlatérale car le faisceau spinothalamique croise dans la moelle","Bilatérale et symétrique car les deux cordons postérieurs sont atteints","Absente car la sensibilité thermoalgésique est toujours préservée"],
a:1,e:"Brown-Séquard : faisceau SPINOTHALAMIQUE croise 2-3 étages au-dessus → perte douleur/température CONTROLATÉRALE. Cordons postérieurs NE CROISENT PAS → perte proprioception/vibrations IPSILATÉRALE."},

{l:"Ch.7",t:"fausse",q:"Concernant le syndrome médullaire postérieur, laquelle est FAUSSE ?",
o:["Il résulte d'une atteinte des cordons postérieurs","Il entraîne une perte de la proprioception et des vibrations","La motricité et la sensibilité à la douleur sont préservées","Il entraîne une perte motrice complète et une analgésie"],
a:3,e:"Syndrome médullaire POSTÉRIEUR = atteinte des CORDONS POSTÉRIEURS uniquement → perte PROPRIOCEPTION + VIBRATIONS. La MOTRICITÉ et la sensibilité THERMOALGÉSIQUE sont PRÉSERVÉES. Perte motrice + analgésie = syndrome ANTÉRIEUR."},

{l:"Ch.7",t:"direct",q:"La préservation sacrée dans une lésion médullaire incomplète signifie :",
o:["La motricité des membres supérieurs est préservée","La sensibilité et/ou la motricité des segments sacrés sont conservées","Les fonctions sphinctériennes sont entièrement préservées sans séquelles","La lésion est localisée uniquement au niveau sacré"],
a:1,e:"Préservation SACRÉE = conservation de la sensibilité thermo-algésique et/ou motricité des SEGMENTS SACRÉS (périanal, périnée). Critère d'INCOMPLÉTUDE selon la classification ASIA. Meilleur pronostic fonctionnel."},

{l:"Ch.7",t:"vraie",q:"Le syndrome de la queue de cheval se distingue du syndrome du cône médullaire car :",
o:["Il donne une paraplégie spastique avec hyperréflexie car c'est une lésion centrale","Il donne une paralysie flasque avec aréflexie car il atteint les racines périphériques","Il est toujours complet sans possibilité de récupération","Il préserve systématiquement les fonctions sphinctériennes"],
a:1,e:"Queue de cheval = atteinte des RACINES PÉRIPHÉRIQUES (L1-S5) → paralysie FLASQUE + ARÉFLEXIE + troubles sensitifs en selle + troubles sphinctériens. Meilleur potentiel de récupération que les lésions médullaires."},

{l:"Ch.7",t:"direct",q:"Le syndrome médullaire antérieur préserve sélectivement :",
o:["La motricité et la sensibilité à la douleur sous-lésionnelle","La proprioception, les vibrations et le toucher léger via les cordons postérieurs","Toutes les fonctions motrices et sensitives uniformément","Uniquement les fonctions sphinctériennes sacrées"],
a:1,e:"Syndrome médullaire ANTÉRIEUR : perte MOTRICE + perte DOULEUR/TEMPÉRATURE. Préserve les CORDONS POSTÉRIEURS → proprioception + vibration + toucher léger INTACTS. Type d'infarctus médullaire le plus courant."},

{l:"Ch.7",t:"fausse",q:"Concernant l'étiologie de la lésion médullaire, laquelle est FAUSSE ?",
o:["La hernie discale peut comprimer la moelle épinière","La sclérose en plaques peut causer une lésion médullaire","La carence en vitamine B12 peut entraîner une dégénérescence combinée subaiguë","Toutes les lésions médullaires sont d'origine traumatique"],
a:3,e:"Les lésions médullaires peuvent être EXTRINSÈQUES (compression : hernie discale, tumeur, abcès) ou INTRINSÈQUES (SEP, infarctus médullaire, myélite transverse, carence B12). Les causes traumatiques ne sont qu'une partie des étiologies."},

{l:"Ch.7",t:"fausse",q:"Le choc spinal immédiat après une lésion médullaire se caractérise par :",
o:["Une flaccidité et aréflexie transitoire même dans les lésions complètes","Une durée variable de quelques jours à semaines","Une spasticité et hyperréflexie immédiates dès les premières minutes","Sa durée ne préjuge pas du déficit définitif"],
a:2,e:"Choc spinal = FLACCIDITÉ + ARÉFLEXIE TRANSITOIRE (PAS de spasticité immédiate). Dure jours à semaines. Après le choc → apparition progressive de la spasticité. Ne pas conclure trop tôt sur le pronostic."},

// ===== T.8 — EXPLORATION NEUROLOGIQUE =====
{l:"T.8",t:"fausse",q:"Concernant les nerfs crâniens, laquelle est FAUSSE ?",
o:["NC VII (facial) : muscles mimiques et stapédien","NC VIII (acoustique) : audition et équilibre","NC V (trijumeau) : sensibilité face et motricité masticatrice","NC XI (accessoire spinal) : mouvements oculaires latéraux"],
a:3,e:"NC XI (accessoire spinal) = muscles TRAPÈZE et sterno-cléido-mastoïdien. Les mouvements oculaires LATÉRAUX = NC VI (abducens). Confusion fréquente NC VI/XI à l'examen."},

{l:"T.8",t:"direct",q:"L'ordre d'exploration des fonctions corticales supérieures commence par :",
o:["Langage, puis mémoire, puis praxies","Conscience, attention, comportement, orientation","Réflexes myotatiques, réflexes cutanés, puis coordination","Gnosie, praxies, fonctions frontales"],
a:1,e:"Ordre : 1-Conscience, 2-Attention, 3-Comportement, 4-Orientation ×3, 5-Mémoire, 6-Langage, 7-Praxies, 8-Gnosie, 9-Tests frontaux. On explore du plus global au plus spécifique."},

{l:"T.8",t:"fausse",q:"Concernant le réflexe cornéen, laquelle est FAUSSE ?",
o:["Il est provoqué par la stimulation de la cornée","Il provoque un clignement bilatéral des paupières","La réponse est uniquement ipsilatérale (côté stimulé)","Il sert à évaluer l'intégrité des NC V et VII"],
a:2,e:"Le réflexe cornéen provoque un clignement BILATÉRAL (réponse DIRECTE + CONSENSUELLE). C'est son caractère bilatéral qui permet de tester séparément la voie afférente (V) et efférente (VII)."},

{l:"T.8",t:"vraie",q:"Le nerf crânien XI (accessoire spinal) innerve :",
o:["Les muscles oculomoteurs","Le sterno-cléido-mastoïdien et la moitié supérieure du trapèze","Les muscles de la mimique faciale et le muscle stapédien","Les muscles de la déglutition et le voile du palais"],
a:1,e:"NC XI (accessoire spinal) = NERF MOTEUR PUR innervant le STERNO-CLÉIDO-MASTOÏDIEN (rotation de la tête) et la ½ supérieure du TRAPÈZE (élévation épaule). Évaluation : résistance à l'élévation des épaules."},

{l:"T.8",t:"direct",q:"Les tests doigt-nez et talon-genou évaluent :",
o:["La force musculaire des membres","La coordination et la dysmétrie cérébelleuse","La sensibilité tactile superficielle","Les réflexes myotatiques profonds"],
a:1,e:"Doigt-nez (MS) et talon-genou (MI) = évaluation de la COORDINATION et DYSMÉTRIE. Positifs = ATAXIE CÉRÉBELLEUSE. À différencier du Romberg (proprioception) et des réflexes (MN)."},

{l:"T.8",t:"vraie",q:"La paralysie faciale centrale se distingue de la paralysie périphérique car :",
o:["La paralysie centrale touche tout le visage y compris le front du même côté","La paralysie centrale épargne le front, la périphérique touche tout le visage homolatéral","Les deux ont la même présentation clinique et le même traitement","La paralysie centrale est toujours bilatérale"],
a:1,e:"Paralysie faciale CENTRALE : épargne le FRONT controlatéral (représentation BILATÉRALE corticale). Paralysie PÉRIPHÉRIQUE (Bell) : tout le visage HOMOLATÉRAL atteint incluant le FRONT. Distinction clinique FONDAMENTALE en urgence."},

{l:"T.8",t:"fausse",q:"Concernant les réflexes ostéo-tendineux (ROT), laquelle est FAUSSE ?",
o:["Les ROT sont exaltés en cas de lésion du 1er motoneurone","Les ROT sont abolis en cas de lésion du 2e motoneurone","Les ROT sont évalués avec un marteau réflexe en tenant le membre détendu","Les ROT abolis signent toujours une atteinte du 1er motoneurone"],
a:3,e:"ROT ABOLIS = atteinte du 2e MN (périphérique) ou de l'arc réflexe lui-même. ROT EXALTÉS = atteinte du 1er MN (central). Les ROT abolis SIGNENT le 2e MN, PAS le 1er MN."},

{l:"T.8",t:"vraie",q:"Le test de Romberg est positif quand :",
o:["Le patient perd l'équilibre yeux ouverts indépendamment de la fermeture des yeux","Le patient perd l'équilibre yeux FERMÉS mais pas yeux ouverts","Le patient ressent des vertiges sans déséquilibre réel","Le patient présente une ataxie identique yeux ouverts et fermés"],
a:1,e:"Romberg POSITIF = perte d'équilibre yeux FERMÉS mais PAS yeux ouverts. Le patient compense sa déficience proprioceptive par la VISION. Perte d'équilibre yeux OUVERTS = atteinte CÉRÉBELLEUSE."},

{l:"T.8",t:"fausse",q:"Concernant le réflexe crémastérique, laquelle est FAUSSE ?",
o:["Il est déclenché par la stimulation du tiers supérieur et antéro-médial de la cuisse","La réponse normale est l'élévation du testicule du côté de la stimulation","Il s'agit d'un réflexe superficiel ou muco-cutané","Il est pathologique quand il est présent et vigoureux"],
a:3,e:"Le réflexe crémastérique est PATHOLOGIQUE quand il est ABSENT ou anormal (pas quand il est présent). Sa présence est NORMALE. Son abolition peut signer une lésion pyramidale ou la racine L1-L2."},

// ===== CH.9 — TROUBLES SENSORIELS & SNP =====
{l:"Ch.9",t:"direct",q:"Les cordons postérieurs de la moelle épinière transmettent :",
o:["La douleur et la température via fibres C non myélinisées","La proprioception et les vibrations via fibres A myélinisées","Le toucher superficiel uniquement via fibres B","La sensibilité thermique croisée contralatérale"],
a:1,e:"Cordons postérieurs = PROPRIOCEPTION (batistésie) + VIBRATIONS (palesthésie) via fibres A MYÉLINISÉES. La douleur et la température = faisceau SPINOTHALAMIQUE antéro-latéral, croisé."},

{l:"Ch.9",t:"fausse",q:"Lors de l'exploration de la batistésie (proprioception), laquelle est FAUSSE ?",
o:["On montre d'abord comment procéder avec les yeux ouverts","On répète ensuite les yeux fermés dans un ordre aléatoire","L'exploration se fait de distal vers proximal","On doit appliquer une forte pression tactile pour faciliter la perception"],
a:3,e:"L'exploration de la batistésie doit ÉVITER d'apporter une sensation tactile supplémentaire. On mobilise l'articulation en tenant les bords latéraux pour ne pas induire de sensation tactile parasite."},

{l:"Ch.9",t:"fausse",q:"Concernant l'exploration de la palesthésie (vibrations), laquelle est FAUSSE ?",
o:["On utilise un diapason appliqué sur les reliefs osseux","On teste de distal vers proximal","Les vibrations empruntent les cordons postérieurs de la moelle","Les vibrations sont véhiculées par des fibres C non myélinisées"],
a:3,e:"Les VIBRATIONS sont véhiculées par des fibres de TYPE A MYÉLINISÉES via les CORDONS POSTÉRIEURS. Les fibres C non myélinisées véhiculent la DOULEUR et la TEMPÉRATURE (faisceau spinothalamique)."},

{l:"Ch.9",t:"direct",q:"Dans les neuropathies périphériques, les dysesthésies apparaissent initialement :",
o:["Au niveau proximal des membres de manière asymétrique","Au niveau distal des membres de manière symétrique en gant ou chaussette","Uniquement du côté droit par prédilection anatomique","Dans les zones rachidiennes avant les extrémités"],
a:1,e:"Neuropathies périphériques : dysesthésies DISTALES et SYMÉTRIQUES au début, s'étendant en CENTRIPÈTE → distribution en 'gant ou chaussette'. L'atteinte proprioceptive entraîne une ataxie sensorielle."},

{l:"Ch.9",t:"vraie",q:"L'ataxie sensorielle dans les neuropathies périphériques est causée par :",
o:["Une atteinte cérébelleuse directe","L'atteinte proprioceptive aggravée par la fermeture des yeux (Romberg positif)","Un déficit visuel associé à la neuropathie","Une atteinte des muscles paravertébraux"],
a:1,e:"Ataxie SENSORIELLE = instabilité de marche due à l'atteinte PROPRIOCEPTIVE. AGGRAVÉE par la fermeture des yeux (Romberg positif). À distinguer de l'ataxie cérébelleuse (pas améliorée par les yeux)."},

{l:"Ch.9",t:"direct",q:"Le syndrome de Horner se manifeste par la triade :",
o:["Ptôsis, hyperhydrose et mydriase unilatéraux","Ptôsis, myosis et énophtalmie unilatéraux par atteinte du système sympathique cervical","Diplopie, nystagmus et ataxie par atteinte du tronc cérébral","Ptôsis bilatéral et ophtalmoplégie par atteinte du NC III"],
a:1,e:"Syndrome de HORNER = PTÔSIS + MYOSIS + ÉNOPHTALMIE UNILATÉRAUX. Dû à une interruption du système SYMPATHIQUE CERVICAL. Causes : tumeur de Pancoast, dissection carotidienne, lésion médullaire cervicale."},

// ===== CH.10 — PATIENT ONCOLOGIQUE =====
{l:"Ch.10",t:"fausse",q:"Laquelle de ces distinctions est FAUSSE ?",
o:["Une tumeur peut être bénigne ou maligne","Le cancer est une croissance infiltrante de certaines tumeurs malignes","La néoplasie désigne une altération de la prolifération et de la survie cellulaires","Toute tumeur est nécessairement maligne"],
a:3,e:"Tumeur = phénomène macroscopique d'augmentation de taille, SANS préjuger de sa nature (bénigne ou maligne). Cancer = croissance infiltrante maligne. Néoplasie = terme le plus précis."},

{l:"Ch.10",t:"direct",q:"Le syndrome paranéoplasique se définit comme :",
o:["L'ensemble des métastases dans les organes à distance","Des manifestations dans des organes distants sans rapport avec des métastases","La récidive tumorale après traitement chirurgical complet","La toxicité systémique des traitements de chimiothérapie"],
a:1,e:"Syndrome paranéoplasique = manifestations à distance SANS RELATION avec les métastases (mécanisme immuno-médié ou sécrétoire). Types : neuromusculaires (Lambert-Eaton), endocriniens, hématologiques."},

{l:"Ch.10",t:"fausse",q:"Concernant le syndrome de Lambert-Eaton, laquelle est FAUSSE ?",
o:["C'est un syndrome paranéoplasique neuromusculaire","Il est dû à des anticorps contre les canaux calciques présynaptiques","La faiblesse s'améliore temporairement à l'effort contrairement à la myasthénie","Il est identique à la myasthénie grave dans ses mécanismes et son traitement"],
a:3,e:"Lambert-Eaton ≠ Myasthénie grave. Lambert-Eaton = anticorps anti-CANAUX CALCIQUES PRÉSYNAPTIQUES → faiblesse qui s'AMÉLIORE à l'effort. Myasthénie = anticorps anti-RÉCEPTEURS ACh POST-SYNAPTIQUES → faiblesse qui s'AGGRAVE à l'effort."},

{l:"Ch.10",t:"vraie",q:"Les voies de dissémination des métastases sont :",
o:["Uniquement hématogène (sang)","Hématogène (circulation sanguine), lymphatique (ganglions) et transcellulaire","Hématogène et lymphatique uniquement","Uniquement par contiguïté directe avec la tumeur primitive"],
a:1,e:"3 voies de métastases : HÉMATOGÈNE, LYMPHATIQUE, TRANSCELLULAIRE (plèvre, péritoine, péricarde). La localisation dépend du TROPISME des cellules tumorales."},

{l:"Ch.10",t:"fausse",q:"Parmi les facteurs exogènes cancérigènes, lequel N'est PAS classiquement cité ?",
o:["Amiante","Benzène","Arsenic","Lumière visible (400-700 nm)"],
a:3,e:"La lumière visible n'est pas cancérigène. Les UV (non visibles) le sont (mélanome). Facteurs chimiques classiques : amiante, benzène, arsenic, tabac, agents alkylants."},

// ===== CH.12 — GUILLAIN-BARRÉ =====
{l:"Ch.12",t:"direct",q:"La forme AIDP du SGB se caractérise par :",
o:["Atteinte axonale grave et peu fréquente en Europe","La forme la plus courante en Europe, avec atteinte démyélinisante","Triade ataxie, aréflexie et ophtalmoplégie","Atteinte axonale motrice et sensorielle combinée"],
a:1,e:"AIDP = + FRÉQUENTE en Europe, atteinte MYÉLINE. AMAN = axonale motrice. AMSAN = axonale motrice + sensorielle. Miller-Fisher = ataxie + aréflexie + ophtalmoplégie."},

{l:"Ch.12",t:"fausse",q:"Concernant la physiopathologie du SGB, laquelle est FAUSSE ?",
o:["C'est une réponse auto-immune dirigée contre la myéline ou l'axone","Le système immunitaire produit des anticorps qui attaquent les composants du nerf périphérique","La guérison dépend de la régénération des fibres nerveuses","C'est une maladie dégénérative progressive du motoneurone central"],
a:3,e:"Le SGB est une maladie AUTO-IMMUNE AIGUË du SNP (nerfs périphériques), pas du motoneurone central. Le pronostic dépend de la régénération des fibres. La SLA est la maladie dégénérative du motoneurone."},

{l:"Ch.12",t:"vraie",q:"La triade clinique orientant vers un SGB est :",
o:["Rigidité, tremblement au repos et bradykinésie","Faiblesse progressive ascendante, aréflexie généralisée et progression rapide","Spasticité, Babinski positif et hyperréflexie","Ataxie cérébelleuse, nystagmus et dysarthrie"],
a:1,e:"SGB = FAIBLESSE PROGRESSIVE ASCENDANTE + ARÉFLEXIE GÉNÉRALISÉE + PROGRESSION RAPIDE. Diagnostic essentiellement clinique."},

{l:"Ch.12",t:"direct",q:"La complication la plus grave du SGB nécessitant une surveillance en soins intensifs est :",
o:["La perte de sensibilité tactile aux membres inférieurs","La paralysie respiratoire par atteinte des muscles respiratoires","La constipation sévère par dysautonomie","La perte des réflexes ostéo-tendineux"],
a:1,e:"PARALYSIE RESPIRATOIRE = complication LA PLUS GRAVE du SGB. Surveillance de la CAPACITÉ VITALE est essentielle. L'atteinte autonome est aussi dangereuse. D'où la surveillance en réanimation."},

{l:"Ch.12",t:"fausse",q:"Parmi ces pathologies, laquelle N'est PAS un diagnostic différentiel classique du SGB ?",
o:["La myélite transverse","La sclérose en plaques","La myasthénie grave","La maladie de Parkinson"],
a:3,e:"Parkinson (troubles hypokinétiques extrapyramidaux) n'est PAS un DD du SGB. Les DD classiques sont : myélite transverse, SEP (poussée), myasthénie grave, botulisme."},

{l:"Ch.12",t:"vraie",q:"Dans le SGB, la paralysie respiratoire peut survenir car :",
o:["Le SGB touche exclusivement les muscles des membres et jamais le tronc","La faiblesse ascendante peut atteindre les muscles intercostaux et le diaphragme","C'est un effet secondaire systématique des immunoglobulines","Le SGB provoque une compression médullaire cervicale"],
a:1,e:"SGB : faiblesse ASCENDANTE peut atteindre les muscles INTERCOSTAUX et le DIAPHRAGME → insuffisance respiratoire aiguë, URGENCE VITALE. C'est la principale cause de décès dans le SGB."},

// ===== CH.13 — GÉRIATRIE =====
{l:"Ch.13",t:"fausse",q:"Laquelle des affirmations sur la sarcopénie est FAUSSE ?",
o:["C'est une perte progressive de masse et force musculaire liée à l'âge","Elle peut être prévenue et améliorée par l'exercice physique régulier","Elle survient uniquement après 80 ans et ne touche que les membres inférieurs","Elle contribue au syndrome de fragilité du patient gériatrique"],
a:2,e:"La sarcopénie commence dès 40-50 ans et touche TOUS les groupes musculaires. Elle est un axe d'intervention majeur du kiné en gériatrie via renforcement musculaire et exercice aérobie."},

{l:"Ch.13",t:"direct",q:"Le vieillissement du SNC se caractérise notamment par :",
o:["Une augmentation de la synthèse d'acétylcholine compensatrice","Une perte de 30 à 40% des neurones corticaux avec diminution de la synthèse d'ACh","Une hypertrophie compensatrice des neurones restants","Une augmentation de la plasticité synaptique après 65 ans"],
a:1,e:"Vieillissement SNC : perte de 30-40% des neurones corticaux + ↓ synthèse ACh. D'où prudence avec les anticholinergiques chez la personne âgée. Le sommeil se fragmente, les réflexes ralentissent."},

{l:"Ch.13",t:"fausse",q:"Concernant le délirium chez la personne âgée, laquelle est FAUSSE ?",
o:["C'est un trouble aigu de la conscience avec fluctuation","Il peut être déclenché par une infection, un médicament ou une déshydratation","Il est toujours d'installation progressive sur plusieurs semaines","Il doit être distingué de la démence qui est un trouble chronique"],
a:2,e:"Le délirium est un trouble AIGU (heures-jours) et FLUCTUANT. Il peut être causé par infection, médicaments, déshydratation, chirurgie... C'est souvent la première manifestation d'une pathologie aiguë."},

{l:"Ch.13",t:"vraie",q:"Le syndrome de fragilité chez la personne âgée se caractérise par :",
o:["Une démence obligatoire associée à une perte de mobilité","Une vulnérabilité accrue avec risque de décompensation pour des agressions minimes","Une hypertension artérielle chronique avec insuffisance cardiaque","Une perte de poids uniquement sans autres manifestations"],
a:1,e:"Fragilité = VULNÉRABILITÉ ACCRUE aux facteurs de stress. Même une agression MINIME peut entraîner une DÉCOMPENSATION grave. Lié à la perte de RÉSERVE FONCTIONNELLE. Le kiné joue un rôle clé dans la prévention."},

{l:"Ch.13",t:"fausse",q:"Concernant les chutes chez la personne âgée, laquelle est FAUSSE ?",
o:["Elles constituent la première cause de mortalité accidentelle chez la personne âgée","La peur de tomber peut entraîner une restriction des activités","Le kinésithérapeute peut intervenir pour améliorer l'équilibre et prévenir les chutes","Les chutes sont inévitables et aucune intervention préventive n'est efficace"],
a:3,e:"Les chutes sont ÉVITABLES. Les interventions kinésithérapeutiques (renforcement musculaire, équilibre, marche, évaluation environnementale) ont démontré une EFFICACITÉ dans la réduction des chutes chez la personne âgée."},

{l:"Ch.13",t:"direct",q:"Le délirium chez la personne âgée se distingue de la démence principalement par :",
o:["Son installation progressive sur plusieurs mois","Son installation aiguë, son caractère fluctuant et sa réversibilité potentielle","Sa prévalence uniquement après 90 ans","Son association exclusive avec la maladie d'Alzheimer"],
a:1,e:"DÉLIRIUM = AIGU (heures-jours), FLUCTUANT, souvent RÉVERSIBLE si cause traitée. DÉMENCE = CHRONIQUE, progressive, irréversible. Le délirium peut être la 1ère manifestation d'une pathologie aiguë intercurrente."},

{l:"Ch.13",t:"vraie",q:"La polypharmacie chez la personne âgée est définie comme :",
o:["La prise de 2 médicaments ou plus par jour","La prise d'au moins 5 médicaments simultanément avec risque accru d'interactions","La prescription de médicaments uniquement par voie orale","La résistance aux médicaments par accumulation hépatique"],
a:1,e:"Polypharmacie = prise d'AU MOINS 5 médicaments simultanément. Risques : interactions médicamenteuses, effets indésirables accumulés, chutes. Population à haut risque d'EIM graves."},

// ===== CH.14 — DÉMENCES =====
{l:"Ch.14",t:"vraie",q:"Laquelle des affirmations sur la DCL (détérioration cognitive légère) est VRAIE ?",
o:["Elle remplit tous les critères diagnostiques d'une démence avérée","Elle se définit par une perte de mémoire avec cognition générale et AVQ préservées","Elle évolue toujours et sans exception vers Alzheimer","Elle ne nécessite aucun suivi car réversible dans tous les cas"],
a:1,e:"DCL = perte mémoire + COGNITION NORMALE + AVQ NORMALES + PAS de démence. Évolution incertaine (règle des tiers : 1/3 évolue vers démence, 1/3 stable, 1/3 s'améliore). Nécessite un suivi."},

{l:"Ch.14",t:"fausse",q:"Concernant le diagnostic de démence, laquelle est FAUSSE ?",
o:["Le MMSE est un test cognitif global : un score <24/30 indique une détérioration cognitive","Le diagnostic est essentiellement clinique avec examen neurocognitif","Il faut inclure la famille dans l'entretien pour recouper les informations","Un MMSE normal exclut formellement tout diagnostic de démence"],
a:3,e:"Un MMSE NORMAL n'exclut pas la démence légère ou les démences non-amnésiques (frontales). Le MMSE est peu sensible pour les démences débutantes. On peut avoir une démence frontale avec MMSE normal."},

{l:"Ch.14",t:"direct",q:"La démence vasculaire se distingue d'Alzheimer principalement par :",
o:["Une évolution progressive et insidieuse sans événements déclenchants","Une évolution en marche d'escalier avec des phases stables entre événements vasculaires","Une atteinte exclusive de la mémoire épisodique","Une fréquence plus élevée chez les femmes de moins de 60 ans"],
a:1,e:"Démence VASCULAIRE = lésions vasculaires cérébrales → évolution en MARCHES D'ESCALIER avec phases stables. ALZHEIMER = évolution CONTINUE et PROGRESSIVE. La démence vasculaire est associée aux facteurs de risque cardiovasculaires."},

{l:"Ch.14",t:"fausse",q:"Concernant le bilan de démence, laquelle est FAUSSE ?",
o:["Le MMSE est un test cognitif global","Le test de l'horloge évalue les fonctions visuo-spatiales et exécutives","Il faut inclure la famille dans l'entretien pour recouper les informations","Un scanner ou une IRM est inutile car le diagnostic est purement clinique"],
a:3,e:"L'imagerie (CT ou IRM) est INDISPENSABLE pour EXCLURE d'autres causes : tumeur, hématome, hydrocéphalie, démence vasculaire. Le diagnostic de démence INCLUT l'imagerie pour éliminer les causes traitables."},

{l:"Ch.14",t:"vraie",q:"Le SPECT cérébral dans la maladie d'Alzheimer montre typiquement :",
o:["Un hypermétabolisme frontal bilatéral","Un hypométabolisme dans les régions temporale et pariétale","Un hypermétabolisme généralisé sans topographie particulière","Un hypométabolisme exclusivement des ganglions de la base"],
a:1,e:"Dans Alzheimer, le SPECT montre un HYPOMÉTABOLISME (hypoperfusion) dans les régions TEMPORALE et PARIÉTALE. Cela reflète la dégénérescence des zones d'association impliquées dans la mémoire et les fonctions cognitives."},

// ===== CH.15 — PHYSIO PÉDIATRIQUE =====
{l:"Ch.15",t:"fausse",q:"Concernant le développement neurologique de l'enfant, laquelle est FAUSSE ?",
o:["Le développement est séquentiel : céphalo-caudal et proximo-distal","Le système nerveux est plastique et peut se réorganiser aux stades précoces","Le développement moteur, sensoriel, cognitif et émotionnel sont interdépendants","Le développement neurologique est identique chez tous les enfants au même âge"],
a:3,e:"Le développement est INDIVIDUEL : chaque enfant a son propre rythme avec des fourchettes normales de variabilité. L'affirmer identique serait faux — c'est une caractéristique fondamentale du développement normal."},

{l:"Ch.15",t:"direct",q:"La migration neuronale se produit principalement entre :",
o:["La conception et la 8e semaine de gestation","La 12e et la 24e semaine de gestation","La 28e semaine de gestation et la naissance","Les 6 premiers mois de vie post-natale"],
a:1,e:"Migration neuronale = 12e-24e semaine de gestation. Les neurones migrent de la zone ventriculaire vers le cortex, guidés par cellules gliales radiales. Altérations → lysencéphalie, hétérotopies."},

{l:"Ch.15",t:"vraie",q:"La plasticité du système nerveux pédiatrique signifie que :",
o:["Le cerveau de l'enfant est plus fragile et ne peut pas compenser les lésions","Le système nerveux peut s'adapter, se réorganiser et compenser les lésions, surtout aux stades précoces","La plasticité disparaît définitivement après 3 ans","La plasticité est uniquement présente dans le cervelet"],
a:1,e:"Plasticité = capacité du SN à S'ADAPTER, SE RÉORGANISER et COMPENSER les lésions, particulièrement aux stades précoces. C'est le fondement de la rééducation précoce en neuropédiatrie."},

{l:"Ch.15",t:"direct",q:"Le réflexe de Moro chez le nourrisson est un réflexe :",
o:["Acquis après 6 mois de vie indiquant une bonne maturation corticale","Archaïque présent dès la naissance et normalement disparu avant 3-6 mois","Pathologique à tout âge indiquant une lésion du 1er motoneurone","Exclusivement présent chez le prématuré avant 32 semaines"],
a:1,e:"Réflexe de MORO = réflexe ARCHAÏQUE présent dès la naissance. Normalement DISPARU avant 3-6 mois. Sa PERSISTANCE après 6 mois = signe d'une atteinte neurologique (PCI, lésion cérébrale)."},

{l:"Ch.15",t:"fausse",q:"Concernant la myélinisation du système nerveux, laquelle est FAUSSE ?",
o:["Elle commence avant la naissance et se poursuit plusieurs années","Elle suit un ordre cranio-caudal et proximo-distal","Elle améliore la vitesse de conduction nerveuse","Elle est complète et définitive dès la naissance"],
a:3,e:"La myélinisation N'est PAS complète à la naissance. Elle débute in utero et continue PLUSIEURS ANNÉES. C'est pourquoi le Babinski est NORMAL chez le nourrisson (faisceau pyramidal pas encore entièrement myélinisé)."},

// ===== T.11 — SEP =====
{l:"T.11",t:"fausse",q:"Concernant l'épidémiologie de la SEP, laquelle est FAUSSE ?",
o:["Elle touche préférentiellement les jeunes adultes entre 20 et 30 ans","Le ratio femmes/hommes est d'environ 3:1","Elle est plus fréquente dans les pays à climat chaud proches de l'équateur","C'est la 2e cause d'invalidité neurologique chez les jeunes après les traumatismes"],
a:2,e:"SEP = plus fréquente dans les pays FROIDS, LOIN de l'équateur (gradient latitudinal). Carence en vitamine D et race blanche sont des facteurs. Plus fréquente en Europe du Nord."},

{l:"T.11",t:"direct",q:"La névrite optique rétrobulbaire dans la SEP se caractérise par :",
o:["Une perte visuelle bilatérale symétrique et indolore","Une perte visuelle unilatérale subaiguë avec douleur lors des mouvements oculaires","Une perte visuelle permanente et totale dès la première poussée","Une atteinte exclusivement du champ visuel périphérique"],
a:1,e:"Névrite optique SEP = perte visuelle UNILATÉRALE subaiguë + DOULEUR lors des mouvements oculaires + scotome central. Représente 36% des premières manifestations. Récupération partielle/totale en quelques semaines."},

{l:"T.11",t:"vraie",q:"L'activité de la SEP est définie par :",
o:["Uniquement par le score EDSS et la durée de la maladie","Par les poussées cliniques et l'activité observée à l'IRM","Par le nombre de plaques visibles uniquement à l'IRM T1","Par la vitesse de progression du handicap moteur"],
a:1,e:"Depuis 2015, l'activité SEP = POUSSÉES + activité IRM (lésions prenant le contraste au gadolinium). Facteur déterminant pour les décisions thérapeutiques."},

{l:"T.11",t:"fausse",q:"Concernant la physiopathologie de la SEP, laquelle est FAUSSE ?",
o:["C'est une maladie auto-immune démyélinisante du SNC","Les lymphocytes T attaquent la myéline","La démyélinisation ralentit ou bloque la conduction nerveuse","La SEP atteint exclusivement le système nerveux périphérique"],
a:3,e:"SEP = maladie AUTO-IMMUNE DÉMYÉLINISANTE du SYSTÈME NERVEUX CENTRAL uniquement. Le SNP N'est PAS atteint. Les nerfs périphériques = SGB, neuropathies périphériques."},

{l:"T.11",t:"direct",q:"La forme progressive primaire de la SEP se caractérise par :",
o:["Des poussées fréquentes avec récupération complète entre chaque épisode","Une progression continue du handicap dès le début sans poussées distinctes","Des poussées initiales suivies d'une progression secondaire","Une atteinte exclusive du nerf optique avec poussées répétées"],
a:1,e:"SEP PROGRESSIVE PRIMAIRE (PP) = PROGRESSION CONTINUE du handicap DÈS LE DÉBUT, sans poussées distinctes. Plus fréquente chez les personnes >40 ans avec atteinte médullaire. Différent de la forme RR et SP."},

// ===== T.16 — PCI I =====
{l:"T.16",t:"direct",q:"Les facteurs PÉRINATAUX de la PCI incluent :",
o:["Infections congénitales (toxoplasmose, CMV)","Méningite néonatale et traumatisme crânien postnatal","Hypoxie pendant l'accouchement, prématurité et traumatisme obstétrique","Malformations congénitales et troubles génétiques"],
a:2,e:"PÉRINATAUX = autour de la naissance : hypoxie per-partum, prématurité, traumatisme obstétrique. PRÉNATAUX = avant : infections congénitales, malformations. POSTNATAUX = après : méningite, traumatisme crânien, AVC néonatal."},

{l:"T.16",t:"vraie",q:"La forme ATAXIQUE de la PCI se caractérise par :",
o:["Des mouvements involontaires interférant avec les gestes volontaires (tonus fluctuant)","Un déséquilibre, une démarche instable, une dysmétrie et des tremblements lors de mouvements fins","Une spasticité bilatérale touchant surtout les membres inférieurs","Une paralysie flasque unilatérale avec amyotrophie"],
a:1,e:"PCI ataxique = lésion cérébelleuse : déséquilibre + démarche instable + DYSMÉTRIE + tremblements lors des mouvements fins. À distinguer de la forme dyskinétique (mouvements involontaires + tonus fluctuant)."},

{l:"T.16",t:"direct",q:"La forme DYSKINÉTIQUE de la PCI se caractérise par :",
o:["Une spasticité bilatérale avec hyperréflexie et Babinski positif","Des mouvements involontaires avec tonus fluctuant par atteinte des ganglions de la base","Une démarche ataxique et une dysmétrie par atteinte cérébelleuse","Une paralysie flasque par atteinte des voies périphériques"],
a:1,e:"PCI DYSKINÉTIQUE = atteinte des GANGLIONS DE LA BASE → mouvements INVOLONTAIRES + tonus FLUCTUANT. Différent de la forme SPASTIQUE (hypertonie constante) et ATAXIQUE (déséquilibre + dysmétrie)."},

{l:"T.16",t:"fausse",q:"Concernant la forme spastique de la PCI, laquelle est FAUSSE ?",
o:["Elle est la forme la plus fréquente de PCI","Elle est due à une lésion du système pyramidal (1er motoneurone)","Elle se manifeste par une hypertonie et une hyperréflexie","Elle est caractérisée par un tonus musculaire fluctuant"],
a:3,e:"Tonus FLUCTUANT + mouvements INVOLONTAIRES = forme DYSKINÉTIQUE (atteinte des ganglions de la base). La forme SPASTIQUE = hypertonie CONSTANTE + hyperréflexie + Babinski (lésion pyramidale). La spastique est la forme la plus fréquente."},

{l:"T.16",t:"direct",q:"La diplégie spastique dans la PCI touche préférentiellement :",
o:["Les membres supérieurs plus que les membres inférieurs","Les membres inférieurs principalement","Les quatre membres de façon égale","Uniquement les muscles faciaux et oculaires"],
a:1,e:"Diplégie spastique = PCI spastique touchant PRINCIPALEMENT les MEMBRES INFÉRIEURS. Fréquente chez le PRÉMATURÉ par LEUCOMALACIE PÉRIVENTRICULAIRE (les fibres corticospinales pour les MI passent au niveau périventriculaire)."},

// ===== CH.17 — PCI & PRÉMATURITÉ =====
{l:"Ch.17",t:"vraie",q:"Parmi les complications neurologiques du prématuré grave, laquelle est la plus courante ?",
o:["Les malformations cardiaques congénitales","Les hémorragies sévères et les lésions kystiques de la substance blanche","Les maladies auto-immunes du SNP","Les troubles métaboliques thyroïdiens néonataux"],
a:1,e:"Prématuré grave : hémorragies sévères + lésions kystiques substance blanche (leucomalacie périventriculaire) + crises convulsives + encéphalopathie hypoxique-ischémique. Ces 4 complications affectent développement moteur, sensoriel, cognitif."},

{l:"Ch.17",t:"fausse",q:"Concernant les complications neurologiques du prématuré, laquelle est FAUSSE ?",
o:["Les hémorragies intraventriculaires sont fréquentes chez le grand prématuré","La leucomalacie périventriculaire est une lésion kystique de la substance blanche","Les lésions neurologiques du prématuré ne peuvent jamais influencer le développement moteur","L'encéphalopathie hypoxique-ischémique peut survenir même sans prématurité"],
a:2,e:"Les lésions neurologiques du prématuré PEUVENT et AFFECTENT le développement moteur, sensoriel et cognitif. C'est précisément pourquoi la prise en charge kinésithérapique précoce est fondamentale."},

{l:"Ch.17",t:"direct",q:"La leucomalacie périventriculaire chez le prématuré correspond à :",
o:["Une hémorragie dans les ventricules cérébraux","Des lésions kystiques de la substance blanche périventriculaire par ischémie","Une malformation du corps calleux d'origine génétique","Une tumeur bénigne du plexus choroïde"],
a:1,e:"Leucomalacie périventriculaire = LÉSIONS KYSTIQUES de la SUBSTANCE BLANCHE périventriculaire. Mécanisme : ISCHÉMIE des zones périventriculaires (vascularisation immature chez le prématuré). Conséquences : diplégie spastique, troubles cognitifs."},

{l:"Ch.17",t:"fausse",q:"Concernant la prise en charge du prématuré, laquelle est FAUSSE ?",
o:["La kinésithérapie précoce est justifiée par la plasticité maximale du SN aux stades précoces","Les soins de développement visent à reproduire un environnement proche du milieu intra-utérin","La stimulation multisensorielle est toujours bénéfique quelle que soit l'intensité","La surveillance régulière des complications neurologiques est essentielle"],
a:2,e:"La stimulation multisensorielle EXCESSIVE ou mal adaptée peut être NUISIBLE chez le prématuré (sur-stimulation → stress, instabilité hémodynamique). Les soins de développement doivent être adaptés à la TOLÉRANCE de chaque enfant."},

// ===== T.18 — TSA / TDAH / HANDICAP / DYS =====
{l:"T.18",t:"fausse",q:"Laquelle des affirmations sur le TSA est FAUSSE ?",
o:["Les enfants TSA peuvent présenter une hyper ou hyposensibilité aux stimuli","L'hypotonie et les difficultés motrices fines et globales sont fréquentes","La marche sur la pointe des pieds est classiquement associée au TSA","Le TSA est principalement causé par un déficit en dopamine comme Parkinson"],
a:3,e:"Le TSA n'est PAS causé par un déficit dopaminergique. C'est un trouble NEURODÉVELOPPEMENTAL complexe multifactoriel (génétique + environnemental). Le lier au manque de dopamine est une confusion erronée."},

{l:"T.18",t:"direct",q:"Le TDAH est un trouble neurobiologique caractérisé par la triade :",
o:["Hypotonie, fasciculations et faiblesse musculaire progressive","Hyperactivité, impulsivité et difficultés d'attention","Dyslexie, dyscalculie et dysgraphie combinées","Spasticité, Babinski et hyperréflexie"],
a:1,e:"TDAH = trouble NEUROBIOLOGIQUE et NEURODÉVELOPPEMENTAL : HYPERACTIVITÉ + IMPULSIVITÉ + DIFFICULTÉS D'ATTENTION. Diagnostiqué généralement pendant l'enfance mais peut persister à l'âge adulte."},

{l:"T.18",t:"vraie",q:"La dyspraxie relève du kinésithérapeute car :",
o:["Elle n'implique que des difficultés scolaires sans composante motrice","Elle touche la coordination motrice, la motricité fine","Elle est diagnostiquée par un bilan orthophonique","Elle guérit  à l'adolescence sans prise en charge"],
a:1,e:"Dyspraxie = trouble de la COORDINATION MOTRICE + motricité fine + PLANIFICATION + ORGANISATION du geste. Trouble des compétences non verbales qui relève DIRECTEMENT du kiné pour la rééducation motrice."},

{l:"T.18",t:"fausse",q:"Concernant les troubles DYS, laquelle est FAUSSE ?",
o:["La dyslexie affecte principalement la lecture","La dyscalculie concerne les mathématiques","La dyspraxie touche la coordination motrice et la planification du geste","Les dys sont causés exclusivement par un manque de travail scolaire"],
a:3,e:"Les DYS NE SONT PAS causés par un manque de travail. Ce sont des troubles NEUROBIOLOGIQUES spécifiques affectant des enfants à INTELLIGENCE NORMALE. Dyslexie = lecture, Dyscalculie = maths, Dyspraxie = coordination motrice."},

{l:"T.18",t:"direct",q:"Le trouble du spectre autistique (TSA) implique des difficultés dans 2 domaines centraux :",
o:["Motricité grossière et coordination fine uniquement","Communication + interaction sociale ET comportements répétitifs + intérêts restreints","Lecture, écriture et mathématiques exclusivement","Mémoire à court terme et vitesse de traitement uniquement"],
a:1,e:"TSA = 2 domaines centraux (DSM-5) : 1. COMMUNICATION + INTERACTION SOCIALE 2. COMPORTEMENTS RÉPÉTITIFS + INTÉRÊTS RESTREINTS. S'y ajoutent souvent des PARTICULARITÉS SENSORIELLES et motrices."},

{l:"T.18",t:"fausse",q:"Concernant les manifestations motrices du TSA, laquelle est FAUSSE ?",
o:["La marche sur la pointe des pieds est liée à une hypersensibilité plantaire ou une raideur posturale","L'hypotonie est fréquente chez les enfants TSA","La raideur posturale peut être observée","L'hyperkinésie avec mouvements excessifs et rapides est le signe moteur principal du TSA"],
a:3,e:"Dans le TSA, les signes moteurs classiques sont : hypotonie, raideur posturale, marche sur la pointe des pieds, difficultés motrices fines et globales, balancement. L'hyperkinésie excessive n'est PAS le signe moteur PRINCIPAL du TSA."},

// ===== T.19 — NEUROMUSCULAIRE PÉDIATRIQUE =====
{l:"T.19",t:"fausse",q:"Laquelle des affirmations sur l'AME est FAUSSE ?",
o:["Elle est classée parmi les maladies neuromusculaires pédiatriques","Elle entraîne une faiblesse musculaire progressive par atteinte du 2e motoneurone","Elle peut toucher les muscles respiratoires","Elle affecte uniquement les muscles des membres supérieurs"],
a:3,e:"L'AME entraîne une faiblesse DIFFUSE : membres, tronc ET muscles RESPIRATOIRES. L'atteinte respiratoire est souvent la complication la plus grave. Elle n'est pas limitée aux membres supérieurs."},

{l:"T.19",t:"direct",q:"La myasthénie gravis auto-immune est causée par :",
o:["Une mutation génétique de la dystrophine entraînant la dégénérescence musculaire","Des anticorps anti-récepteurs d'acétylcholine à la jonction neuromusculaire","Un déficit en dopamine au niveau des ganglions de la base","Une démyélinisation des fibres nerveuses périphériques"],
a:1,e:"Myasthénie gravis auto-immune = anticorps ANTI-RÉCEPTEURS ACh à la JNM → blocage de la transmission neuromusculaire → faiblesse fluctuante. La forme congénitale est NON auto-immune."},

{l:"T.19",t:"vraie",q:"La myopathie de Duchenne est caractérisée par :",
o:["Une atteinte auto-immune de la jonction neuromusculaire","Une atteinte des neurones moteurs périphériques avec fasciculations","Une dystrophie musculaire progressive liée au chromosome X","Une polyneuropathie symétrique avec atteinte sensitive prédominante"],
a:2,e:"Duchenne = DYSTROPHIE MUSCULAIRE liée au chromosome X (gène de la DYSTROPHINE), touche quasi-exclusivement les GARÇONS. Faiblesse progressive proximale, pseudohypertrophie des mollets, atteinte cardiaque et respiratoire évolutive."},
];
const QC_BANK = [
  {q:"Décrivez les 3 signes moteurs cardinaux de la maladie de Parkinson et leurs mécanismes.",
   r:"1. TREMBLEMENT AU REPOS : involontaire, rythmique, disparaît au mouvement et au sommeil, asymétrique au début (distale, 'compter des pièces'), dû à l'absence de dopamine dans le striatum. 2. RIGIDITÉ EXTRAPIRAMDALE : signe de la roue dentée (résistance constante + saccades) ou du tuyau de plomb (résistance uniforme), persiste en flexion et extension passive. 3. BRADYKINÉSIE/HYPOKINÉSIE : lenteur des mouvements volontaires (écriture micrographique, petits pas) et réduction des mouvements involontaires (hypomimie = 'masque de poker', absence de clignement)."},
  {q:"Quels sont les 4 types du SGB et leurs caractéristiques principales ?",
   r:"1. AIDP : + fréquente en Europe, atteinte DÉMYÉLINISANTE. 2. AMAN : axonale MOTRICE pure, plus grave, moins fréquente. 3. AMSAN : axonale MOTRICE + SENSORIELLE. 4. MILLER-FISHER : rare — triade ATAXIE + ARÉFLEXIE + OPHTALMOPLÉGIE. Mécanisme commun : réponse auto-immune contre la myéline ou l'axone → faiblesse ascendante + aréflexie. Risque vital : paralysie respiratoire."},
  {q:"Expliquez la différence entre syndrome du 1er et du 2e motoneurone.",
   r:"1er MN (supérieur/central) : paralysie SPASMODIQUE, hypertonie (spasticité — signe de la lame de canif), réflexes myotatiques EXALTÉS, Babinski POSITIF, amyotrophie LÉGÈRE, PAS de fasciculations. 2e MN (inférieur/périphérique) : paralysie FLASQUE, hypotonie, réflexes SUPPRIMÉS (0/++++), Babinski absent (RCP aboli), amyotrophie MARQUÉE, fasciculations PRÉSENTES. Mnémotechnique : 1er MN = 'trop' (hypertonus, hyperréflexie) ; 2e MN = 'absent' (hypotonie, aréflexie)."},
  {q:"Citez les facteurs prénataux, périnataux et postnataux de la paralysie cérébrale infantile.",
   r:"PRÉNATAUX : infections congénitales (toxoplasmose, rubéole, cytomégalovirus), malformations congénitales, troubles génétiques. PÉRINATAUX : hypoxie pendant l'accouchement, prématurité, traumatisme obstétrique. POSTNATAUX : méningite, traumatisme crânien, accident vasculaire cérébral néonatal. Ces facteurs entraînent une lésion cérébrale non progressive touchant les zones motrices, pouvant provoquer les formes spastique, dyskinétique ou ataxique de PCI."},
{q:"Expliquez les différences cliniques entre le syndrome du 1er motoneurone et le syndrome du 2e motoneurone.",
r:"1er MN (central) : paralysie SPASMODIQUE + hypertonie (spasticité, lame de canif) + réflexes EXALTÉS + Babinski POSITIF + amyotrophie LÉGÈRE (désuétude) + PAS de fasciculations. 2e MN (périphérique) : paralysie FLASQUE + hypotonie + réflexes SUPPRIMÉS (aréflexie) + Babinski ABSENT + amyotrophie MARQUÉE + fasciculations PRÉSENTES. Mnémotechnique : 1er MN = 'trop' (hypertonus, hyperréflexie) ; 2e MN = 'absent' (hypotonie, aréflexie)."},

{q:"Décrivez le tableau clinique du syndrome de Brown-Séquard et expliquez son mécanisme.",
r:"Brown-Séquard = HÉMISECTION médullaire. IPSILATÉRAL à la lésion : perte MOTRICE (faisceau corticospinal = ne croise pas dans la moelle) + perte PROPRIOCEPTION et VIBRATIONS (cordons postérieurs = ne croisent pas). CONTROLATÉRAL à la lésion : perte DOULEUR et TEMPÉRATURE (faisceau spinothalamique = croise 2-3 étages au-dessus). Étiologie la plus fréquente = TRAUMATIQUE. Syndrome incomplet avec bon pronostic relatif."},

{q:"Citez les 5 types d'aphasie et leurs caractéristiques principales (émission, compréhension, répétition).",
r:"1. BROCA (motrice) : émission NON FLUIDE + compréhension PRÉSERVÉE + répétition PERTURBÉE. 2. WERNICKE (sensorielle) : émission FLUIDE paraphasique + compréhension ALTÉRÉE + répétition PERTURBÉE. 3. CONDUCTION : émission FLUIDE + compréhension PRÉSERVÉE + répétition IMPOSSIBLE (lésion faisceau arqué). 4. GLOBALE : perte totale EXPRESSION et COMPRÉHENSION. 5. NOMINALE : perte de la DÉNOMINATION uniquement, les autres composantes intactes. Aphasies transcorticales = équivalentes aux primaires mais avec RÉPÉTITION INTACTE."},

{q:"Expliquez les 4 syndromes médullaires incomplets et leurs tableaux cliniques respectifs.",
r:"1. CENTROMÉDULLAIRE : le plus fréquent, hyperextension cervicale → MS > MI atteints, préservation sacrée souvent présente. 2. ANTÉRIEUR : perte motricité + douleur/température, PRÉSERVATION proprioception/vibrations (cordons post intacts). 3. POSTÉRIEUR : perte proprioception/vibrations, motricité et douleur/temp PRÉSERVÉES. 4. BROWN-SÉQUARD (hémisection) : ipsilatéral = moteur + proprioception perdus ; controlatéral = douleur/température perdus. Classification ASIA (A-E) pour évaluer le degré d'incomplétude."},

];




// Mapping pour sandbox.js
window.Patho_BANK = window.Patho_BANK.map(function(item) {
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
window.BANK = window.Patho_BANK;
var QC_BANK = window._QC_BANK || [];

