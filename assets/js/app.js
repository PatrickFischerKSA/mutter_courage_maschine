const STORAGE_KEY = "mutter_courage_brecht_maschine_v8";
const sourceCorpus = window.COURAGE_TEXT || [];
const stopwords = new Set("der die das den dem des ein eine einer einem einen und oder aber doch nur auch zu in im am an auf mit von für als ist sind war waren wird werden es er sie wir ihr ich man nicht kein keine so da wo wie was wenn dann".split(" "));

const pdfs = {
  courage: "assets/docs/Mutter Courage und ihre Kinder.pdf",
  organon: "assets/docs/707359155-Kleines-Organon-fur-das-Theater-Bertolt-Brecht.pdf"
};

const modules = [
  {
    id: "plot",
    label: "1 Hook",
    kicker: "Level 1",
    title: "Hook-Test: zieht der alte Text noch?",
    lead: "Du prüfst nicht brav den Inhalt. Du testest, ob Brechts alte Szene im heutigen Aufmerksamkeitssystem noch zündet.",
    organon: "Brecht wollte nicht Einfühlung als Endstation, sondern ein Publikum, das Handlungen prüft. Heute muss zuerst die stumpfe Content-Wahrnehmung geknackt werden.",
    body: `
      <div class="game-alert">Prämisse: Der Text ist kein Heiligtum. Er ist ein alter Wirkungsapparat. Wenn er heute stumpf wirkt, wird er geöffnet.</div>
      <p>Dreißigjähriger Krieg. Marketenderin. Wagen. Kinder. Krieg als Geschäftsmodell. Das ist der alte Plot-Kern. Deine Frage: Welche Stelle erzeugt heute noch Sog, und welche Stelle braucht einen Hack?</p>
      <p class="scene-link"><a class="text-link" href="${pdfs.courage}#page=1" target="_blank" rel="noopener">Szene 1 im PDF öffnen</a><span>Platzhalter: <code>#page=1</code> später exakt anpassen.</span></p>
      <div class="avatar-grid">
        ${figureCard("Courage", "NPC oder Boss? Mutter, Händlerin, Überlebensalgorithmus.")}
        ${figureCard("Eilif", "Recruitable asset. Tapferkeit wird zur Ressource.")}
        ${figureCard("Schweizerkas", "Low corruption build. Im falschen System tödlich.")}
        ${figureCard("Kattrin", "Muted character, maximum signal.")}
        ${figureCard("Militär", "Interface der Gewalt: Formular, Befehl, Versprechen.")}
        ${figureCard("Wagen", "Inventar, Shop, Heimat, Falle.")}
      </div>
      <div class="hud-grid">
        ${meter("hook_old", "Original-Sog", "Wie stark zieht dich die Szene noch ohne Eingriff?")}
        ${meter("stale_risk", "Museumsrisiko", "Wie sehr droht der Text wie Pflichtlektüre zu riechen?")}
        ${meter("hack_need", "Renovierungsdruck", "Wie stark braucht die Szene einen heutigen Eingriff?")}
      </div>
      ${choices("affect_check", "Erste Reaktion als Spielstatus", ["Mitleid getriggert", "Misstrauen aktiv", "Figur wirkt zu historisch fern", "System wird sichtbar", "Ich will skippen", "Ich bin irritiert, aber wach"])}
      ${textarea("plot_reaction_reason", "Welche Stelle funktioniert noch, welche Stelle nicht mehr? Begründe als Wirkungsdiagnose, nicht als Inhaltsangabe.")}
    `
  },
  {
    id: "disturbance",
    label: "2 Hack",
    kicker: "Level 2",
    title: "Text-Hack-Labor: greif in die Textgestalt ein",
    lead: "Kopiere eine kurze Stelle aus dem PDF oder paraphrasiere sie. Dann beschädigst du sie produktiv: nicht als Gag, sondern damit Brechts intendierter Denkstoß heute wieder auftaucht.",
    organon: "Verfremden heißt nicht verzieren. Es heißt: die Szene so umstellen, dass das Normale wieder fremd und beurteilbar wird.",
    body: `
      ${hackLab()}
      <div class="two-column">
        ${textarea("sympathy_quote", "Originalstelle: Wo entsteht Nähe, Mitleid, Sog?")}
        ${textarea("disturbing_quote", "Hack-Stelle: Wie zerstörst du diese Nähe, ohne die Szene dümmer zu machen?")}
      </div>
      ${choices("hack_principle", "Welche Operation trifft Brecht heute am ehesten?", ["Algorithmus sichtbar machen", "Preis an jedes Gefühl hängen", "Heroischen Moment entwerten", "Live-Kommentar einblenden", "Sprache in Werbe-/Krisen-Sprech kippen", "Publikum als Mitverdienende markieren"])}
      ${textarea("war_business_statement", "Was sieht man nach deinem Eingriff, was der Originaltext allein heute vielleicht nicht mehr zuverlässig sichtbar macht?")}
      <button type="button" class="warning-button" data-action="interrupt" data-text="Du hast den Text angefasst. Jetzt prüfe: Ist das nur Style, oder produziert es Urteil?">Hack prüfen</button>
    `
  },
  {
    id: "unstable",
    label: "3 Build",
    kicker: "Level 3",
    title: "Courage-Build: Figur als System-Avatar",
    lead: "Du levelst Mutter Courage nicht zur Heldin oder Schurkin. Du kalibrierst, welcher gesellschaftliche Mechanismus durch sie spielbar wird.",
    organon: "Die Figur ist kein Innenleben-Container. Sie zeigt Verhalten unter Bedingungen.",
    body: `
      <label class="question-block"><span>Level / Szene</span><select data-field="slider_scene">${["Szene 1: Recruitment", "Szene 2: Ruhm als Ware", "Szene 3: Handel mit Leben", "Szene 4: Kapitulation", "Szene 5: Verwundete Körper", "Szene 6: Begräbnisökonomie", "Szene 7: Business läuft", "Szene 8: Frieden als Störung", "Szene 9: Hunger", "Szene 10: Durchzug", "Szene 11: Kattrin-Alarm", "Szene 12: Weiterziehen"].map(s => `<option>${s}</option>`).join("")}</select></label>
      <div class="slider-bank">
        ${slider("victim_profiteer", "Opfer des Krieges", "Profiteurin des Krieges")}
        ${slider("mother_business", "fürsorgliche Mutter", "geschäftlich verblendet")}
        ${slider("survival_blindness", "klug überlebend", "politisch blind")}
      </div>
      ${textarea("slider_reason", "Welche Textstelle oder welcher Hack begründet diesen Build?")}
      <button type="button" class="primary-button" data-action="save-slider-snapshot">Build-Snapshot speichern</button>
      <div id="sliderTimeline" class="timeline" aria-live="polite"></div>
      ${textarea("unstable_reflection", "Warum wäre eine eindeutige Moralwertung hier zu schwach für Gegenwartspublikum?")}
    `
  },
  {
    id: "songs",
    label: "4 Sample",
    kicker: "Level 4",
    title: "Song-Sampler: Lied als harter Cut",
    lead: "Die Songs werden zu Samples, Pop-ups, Audio-Fehlern, Kommentar-Loops. Kein Soundtrack für Gefühl, sondern ein Angriff auf falsche Beruhigung.",
    organon: "Der Song hält die Handlung an und macht aus Einzelfall eine Regel.",
    body: `
      <div class="song-grid">
        ${songStation("Courage-Sample", "Wird daraus Jingle, Warnsirene, Voice-Over oder Abspann eines Kriegs-Shops?", "song_courage")}
        ${songStation("Kapitulations-Loop", "Anpassung als Lifehack: Wo kippt Pragmatismus in Mitschuld?", "song_capitulation")}
        ${songStation("Salomon-Filter", "Welche Klugheit ist im falschen System nur verwertete Intelligenz?", "song_salomon")}
      </div>
      ${choices("song_effects", "Welche Sample-Funktion wählst du?", ["Skip-Button wird gesperrt", "Lied wird Werbespot", "Untertitel widersprechen dem Gesang", "Beat bricht genau beim Gefühl ab", "Publikum bekommt Preisliste", "Figur wird zur Statistik"])}
      ${textarea("song_attitude", "Welche Haltung erzeugt dein Sample?")}
      ${textarea("song_stage_showing", "Was würdest du digital während des Songs einblenden, überlagern oder löschen?")}
      <div class="two-column">
        ${textarea("wrong_music", "Welche Soundentscheidung wäre zu Netflix, zu glatt, zu rührselig?")}
        ${textarea("brecht_music", "Welche Soundentscheidung würde heute brechtisch funktionieren?")}
      </div>
    `
  },
  {
    id: "aristotle",
    label: "5 Anti-Quest",
    kicker: "Level 5",
    title: "Anti-Quest: keine Erlösung, kein Bossfight-Ende",
    lead: "Viele heutige Medien erzählen Schuld, Läuterung, Charakterentwicklung. Brecht verweigert genau diesen befriedigenden Questbogen.",
    organon: "Post-aristotelisch heißt hier: nicht Reinigung durch Mitleid und Furcht, sondern Untersuchung von Handlungen und Zuständen.",
    body: `
      <div class="contrast-grid">
        <article class="projection-card">
          <h3>Mainstream-Quest</h3>
          <p>Die Figur erkennt Schuld, bricht zusammen, bekommt Backstory, wird geläutert. Das Publikum darf emotional sauber nach Hause.</p>
        </article>
        <article class="warning-card">
          <h3>Brecht-Patch</h3>
          <p>Die Figur erkennt nichts Grundsätzliches. Das System läuft weiter. Die Zuschauer*innen bleiben mit der Frage sitzen, warum das so profitabel ist.</p>
        </article>
      </div>
      ${textarea("catharsis_absent", "Wo würdest du eine erwartete Erlösung hart abbrechen?")}
      ${textarea("identification_blocked", "Welche Identifikationsangebote würdest du löschen oder vergiften?")}
      ${textarea("no_conversion", "Warum darf Mutter Courage nicht einfach zur besseren Person werden?")}
      ${textarea("tragedy_loss", "Was wäre politisch verloren, wenn die Szene als reine Tragödie gestreamt würde?")}
    `
  },
  {
    id: "warbusiness",
    label: "6 Economy",
    kicker: "Level 6",
    title: "War Economy Overlay",
    lead: "Du legst ein Spiel-Interface über den Text: Inventar, Preise, Risiken, Kollateralschäden. Plötzlich wird sichtbar, dass Krieg nicht Kulisse ist, sondern Markt.",
    organon: "Historisierendes Denken fragt: Welche Ordnung macht dieses Verhalten plausibel, profitabel, nötig oder blind?",
    body: `
      <div class="game-alert">Regel: Jede Textstelle, die privat klingt, muss auf ihre Ökonomie getestet werden.</div>
      <div id="conceptWall" class="analysis-grid"></div>
      ${textarea("who_profits", "Wer bekommt XP, Geld, Schutz, Status oder Aufmerksamkeit aus dem Krieg?")}
      ${textarea("who_pays", "Wer bezahlt mit Körper, Kind, Stimme, Zukunft?")}
      ${textarea("survival_complicity", "Wann wird Überleben zur Mitwirkung am System?")}
      ${textarea("not_outside_system", "Warum ist Mutter Courage kein Opfer ausserhalb des Systems, sondern eine Spielerin darin?")}
      ${textarea("pity_not_enough", "Warum ist Mitleid als Interface zu klein für dieses System?")}
      <div class="warning-card">
        Gegenwartsanalogien sind Pflicht, aber platte Aktualisierung zählt als Fehlklick. Zeige auch, wo der Vergleich bricht.
      </div>
      ${textarea("present_analogy", "Formuliere eine Gegenwartsanalogie: Krieg als Geschäftsmodell heute, Krisenökonomie, Plattformlogik, Waffenindustrie, Katastrophen-Content, Konsum trotz globaler Krisen. Zeige die Grenze des Vergleichs.")}
    `
  },
  {
    id: "kattrin",
    label: "7 Alarm",
    kicker: "Level 7",
    title: "Kattrin-Alarm: stumme Figur, maximales Signal",
    lead: "Kattrin darf nicht zur rührenden Cutscene werden. Ihr Trommeln muss das System stören, nicht das Publikum trösten.",
    organon: "Eine stumme Handlung kann mehr zeigen als eine erklärende Rede. Entscheidend ist, ob das Publikum nur gerührt oder wach gemacht wird.",
    body: `
      <div class="kattrin-zone">
        <div id="drumStage" class="drum-stage">TROMMEL?</div>
        <button type="button" class="primary-button" data-action="play-drum">Trommel-Signal testen</button>
      </div>
      ${textarea("kattrin_pity", "Warum triggert Kattrin Mitleid schneller als Courage?")}
      ${textarea("kattrin_silence", "Wie wird Stummheit im digitalen Raum als Signal statt als Defizit inszeniert?")}
      ${textarea("kattrin_protest", "Warum ist ihr Alarm stärker als ein Monolog?")}
      ${textarea("kattrin_not_hero", "Wie verhinderst du, dass daraus eine klassische Heldinnen-Cutscene wird?")}
      ${textarea("kattrin_blocked_consolation", "Welche Beruhigung muss nach Kattrins Handlung zerstört werden?")}
      ${choices("kattrin_design", "Wähle den Alarm-Modus", ["lauter werdender Rhythmus", "völlige Stille vor dem Trommeln", "Textprojektionen", "eingefrorene Bühne", "Kommentare aus dem Off", "keine Musik", "Bild friert ein, Score läuft weiter", "Publikum bekommt Mitschuld-Popup"])}
      ${textarea("kattrin_design_reason", "Warum produziert dieser Modus Denken statt bloss Rührung?")}
    `
  },
  {
    id: "build",
    label: "8 Patch",
    kicker: "Level 8",
    title: "Final Patch: baue eine heutige Brecht-Szene",
    lead: "Du machst kein Update mit moderner Tapete. Du baust einen Wirkungsersatz: Was muss heute geschehen, damit Brechts Ziel wieder eintritt?",
    organon: "Zeigen statt bloss erleben: Die Szene soll ihre eigenen Bedingungen sichtbar machen.",
    body: `
      <div class="form-grid two-column">
        ${input("ve_scene", "Welche Originalszene hackst du?")}
        ${input("ve_interruption", "Wo wird der Flow brutal unterbrochen?")}
        ${input("ve_projection", "Welche Originalzeile wird als Overlay, Fehlermeldung oder Preisetikett projiziert?")}
        ${input("ve_direct_address", "Wer greift das Publikum direkt an?")}
        ${input("ve_prop", "Welches Ding wird zum überdeutlichen Interface?")}
        ${input("ve_music", "Wo wird Sound als Köder eingesetzt?")}
        ${input("ve_no_music", "Wo muss absolute Trockenheit herrschen?")}
        ${input("ve_pity", "Wo entsteht Mitleid?")}
        ${input("ve_pity_disturbed", "Wie sabotierst du dieses Mitleid?")}
        ${input("ve_social_question", "Welche gesellschaftliche Frage bleibt als Störung zurück?")}
      </div>
      <button type="button" class="primary-button" data-action="generate-concept">Patch-Manifest generieren</button>
      <pre id="generatedConcept" class="generated-concept"></pre>
    `
  }
];

const concepts = ["Krieg", "Geschäft", "Überleben", "Profit", "Moral", "Anpassung", "Mitschuld", "Verlust", "Ware", "Körper", "Kinder", "Markt", "Content", "Algorithmus", "Krise", "Aufmerksamkeit"];

let state = loadState();

function figureCard(title, text) {
  return `<article class="figure-card"><h3>${title}</h3><p>${text}</p></article>`;
}

function textarea(field, label) {
  return `<div class="question-block"><label for="${field}">${label}</label><textarea id="${field}" data-field="${field}"></textarea></div>`;
}

function input(field, label) {
  return `<label class="question-block" for="${field}">${label}<input id="${field}" type="text" data-field="${field}"></label>`;
}

function meter(field, label, hint) {
  return `
    <label class="meter-card" for="${field}">
      <span>${label}</span>
      <small>${hint}</small>
      <input id="${field}" type="range" min="0" max="100" value="50" data-slider="${field}">
      <output id="${field}_value">50</output>
    </label>
  `;
}

function hackLab() {
  return `
    <div class="hack-lab">
      <div class="hack-screen">
        <label for="hackInput">Textfragment / Rohmaterial</label>
        <textarea id="hackInput" data-field="hack_input" placeholder="Kurze Stelle aus dem PDF kopieren oder sinngemäß notieren. Dann Operation wählen."></textarea>
      </div>
      <div class="operation-deck" aria-label="Textoperationen">
        <button type="button" class="chip-button" data-hack="redact">Zensieren</button>
        <button type="button" class="chip-button" data-hack="price">Preise ankleben</button>
        <button type="button" class="chip-button" data-hack="feed">Feed-Sprache</button>
        <button type="button" class="chip-button" data-hack="chorus">Chor einbauen</button>
        <button type="button" class="chip-button" data-hack="glitch">Glitch</button>
        <button type="button" class="chip-button" data-hack="cold">Mitleid kaltstellen</button>
      </div>
      <div class="hack-screen output">
        <div class="screen-label">Renovierter Output</div>
        <pre id="hackOutput" class="hack-output">Noch kein Eingriff. Der Text wartet auf Beschädigung.</pre>
      </div>
      <div class="button-row">
        <button type="button" class="primary-button" data-action="save-hack">Diesen Hack speichern</button>
      </div>
      <div id="hackArchive" class="hack-archive" aria-live="polite"></div>
    </div>
  `;
}

function choices(field, legend, options) {
  return `
    <fieldset class="question-block">
      <legend>${legend}</legend>
      <div class="choice-grid">
        ${options.map((option, index) => `
          <label class="choice">
            <input type="checkbox" data-choice="${field}" value="${escapeHtml(option)}" id="${field}_${index}">
            <span>${option}</span>
          </label>
        `).join("")}
      </div>
    </fieldset>
  `;
}

function slider(field, left, right) {
  return `
    <div class="slider-row">
      <div class="slider-labels">
        <span>${left}</span>
        <output class="slider-value" id="${field}_value">50</output>
        <span>${right}</span>
      </div>
      <input type="range" min="0" max="100" value="50" data-slider="${field}" aria-label="${left} bis ${right}">
    </div>
  `;
}

function songStation(title, provocation, field) {
  return `
    <article class="song-card">
      <h3>${title}</h3>
      <p>${provocation}</p>
      <div class="projection-card">LIED ALS TAFEL / NICHT ALS SOUNDTRACK</div>
      ${textarea(field, "Notiere eine Zeile, einen Moment oder eine Wirkung, die du prüfen willst.")}
    </article>
  `;
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved || freshState();
  } catch {
    return freshState();
  }
}

function freshState() {
  return {
    startedAt: new Date().toISOString(),
    updatedAt: null,
    active: "start",
    fields: {},
    choices: {},
    sliders: {
      victim_profiteer: 50,
      mother_business: 50,
      survival_blindness: 50
    },
    sliderHistory: [],
    hacks: [],
    selectedSourceId: null,
    montage: [],
    previewText: "",
    completed: {},
    conceptNotes: {},
    generatedConcept: ""
  };
}

function saveState() {
  state.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  document.getElementById("savedStatus").textContent = `Gespeichert ${new Date().toLocaleTimeString("de-CH", { hour: "2-digit", minute: "2-digit" })}`;
  renderNav();
}

function renderNav() {
  const nav = document.getElementById("moduleNav");
  const entries = [
    { id: "start", label: "Start" },
    { id: "reader", label: "PDFs" },
    ...modules.map((module) => ({ id: module.id, label: module.label })),
    { id: "dramaturgy", label: "Tool" },
    { id: "machine", label: "9 Maschine" },
    { id: "teacher", label: "Lehrerbereich" }
  ];
  nav.innerHTML = entries.map((entry) => `
    <button type="button" class="nav-button ${state.active === entry.id ? "is-active" : ""} ${state.completed[entry.id] ? "is-done" : ""}" data-target="${entry.id}">
      ${entry.label}
    </button>
  `).join("");
}

function renderModules() {
  const mount = document.getElementById("moduleMount");
  mount.innerHTML = modules.map((module) => `
    <section id="${module.id}" class="machine-section" aria-labelledby="${module.id}Title">
      <div class="module-header">
        <div>
          <div class="section-kicker">${module.kicker}</div>
          <h2 id="${module.id}Title">${module.title}</h2>
          <p class="section-lead">${module.lead}</p>
        </div>
        <aside class="organon-note">${module.organon}</aside>
      </div>
      ${module.body}
      <div class="button-row">
        <button type="button" class="primary-button" data-action="complete-module" data-module="${module.id}">Modul als bearbeitet markieren</button>
        <button type="button" class="ghost-button" data-action="next-module" data-current="${module.id}">Weiter</button>
      </div>
    </section>
  `).join("");
}

function renderConceptWall() {
  const wall = document.getElementById("conceptWall");
  if (!wall) return;
  wall.innerHTML = concepts.map((concept) => `
    <article class="concept-card">
      <h3>${concept}</h3>
      <p>Ordne eine Textstelle, eine Beobachtung oder eine Szene zu.</p>
      <textarea data-concept="${concept}" aria-label="Textstelle zu ${concept}"></textarea>
    </article>
  `).join("");
}

function hydrate() {
  document.querySelectorAll("[data-field]").forEach((el) => {
    const field = el.dataset.field;
    if (state.fields[field] !== undefined) el.value = state.fields[field];
  });
  document.querySelectorAll("[data-choice]").forEach((el) => {
    const key = el.dataset.choice;
    el.checked = (state.choices[key] || []).includes(el.value);
  });
  document.querySelectorAll("[data-slider]").forEach((el) => {
    const key = el.dataset.slider;
    el.value = state.sliders[key] ?? 50;
    updateSliderOutput(key, el.value);
  });
  document.querySelectorAll("[data-concept]").forEach((el) => {
    el.value = state.conceptNotes[el.dataset.concept] || "";
  });
  const generated = document.getElementById("generatedConcept");
  if (generated) generated.textContent = state.generatedConcept || "Noch kein Regiekonzept generiert.";
  const hackOutput = document.getElementById("hackOutput");
  if (hackOutput) hackOutput.textContent = state.fields.hack_output || "Noch kein Eingriff. Der Text wartet auf Beschädigung.";
  const preview = document.getElementById("previewText");
  if (preview) preview.value = state.previewText || "";
  renderStyleReport();
  renderHackArchive();
  renderSourceReader();
  renderMontage();
  renderStylometry();
  renderSliderTimeline();
  renderSummary();
  renderTeacher();
}

function showSection(id) {
  document.querySelectorAll(".machine-section").forEach((section) => {
    section.classList.toggle("active-section", section.id === id);
  });
  state.active = id;
  saveState();
  renderSummary();
  if (id === "teacher") renderTeacher();
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function nextSection(current) {
  const order = ["start", "reader", ...modules.map((m) => m.id), "dramaturgy", "machine", "teacher"];
  const index = order.indexOf(current);
  showSection(order[Math.min(index + 1, order.length - 1)] || "start");
}

function updateSliderOutput(key, value) {
  const output = document.getElementById(`${key}_value`);
  if (output) output.textContent = value;
}

function saveSliderSnapshot() {
  const scene = state.fields.slider_scene || "Szene 1";
  state.sliderHistory.push({
    scene,
    at: new Date().toISOString(),
    values: { ...state.sliders },
    reason: state.fields.slider_reason || ""
  });
  state.completed.unstable = true;
  saveState();
  renderSliderTimeline();
}

function runHack(operation) {
  const input = (state.fields.hack_input || "").trim();
  const source = input || "Mutter Courage zieht den Wagen durch den Krieg und handelt weiter.";
  const hacked = transformText(source, operation);
  state.fields.hack_output = hacked;
  state.fields.last_hack_operation = operation;
  const output = document.getElementById("hackOutput");
  if (output) output.textContent = hacked;
  saveState();
}

function transformText(text, operation) {
  const words = text.split(/\s+/).filter(Boolean);
  const priceTags = ["[Preis: 3 Leben]", "[Rabatt bei Verlust]", "[Risiko ausgelagert]", "[Mitleid nicht erstattbar]"];
  if (operation === "redact") {
    return words.map((word, index) => index % 3 === 1 ? "████" : word).join(" ") + "\n\nSYSTEM: Was geschwärzt ist, arbeitet trotzdem weiter.";
  }
  if (operation === "price") {
    return words.map((word, index) => `${word}${index % 4 === 0 ? " " + priceTags[index % priceTags.length] : ""}`).join(" ");
  }
  if (operation === "feed") {
    return `LIVE-FEED // KRIEG LÄUFT\n${text}\n\nKommentarbereich: Wer profitiert? Wer nennt es nur Überleben? Wer scrollt weiter?`;
  }
  if (operation === "chorus") {
    return `${text}\n\nCHOR DER KUNDEN: Wir wollen nichts wissen, aber billig soll es sein.\nCHOR DER VERLIERER: Ihr nennt es Markt, wir nennen es Körper.`;
  }
  if (operation === "glitch") {
    return text.replace(/[aeiouäöü]/gi, (match) => `${match}/${match}`).replace(/\./g, " // FEHLER: Sinn zu glatt.");
  }
  if (operation === "cold") {
    return `KAMERA BLEIBT WEIT WEG.\n${text}\n\nKeine Musik. Kein Close-up. Nur Inventar: Ware, Kind, Wagen, Verlust.`;
  }
  return text;
}

function saveHack() {
  const output = state.fields.hack_output || "";
  if (!output.trim()) {
    runHack("cold");
  }
  state.hacks.push({
    at: new Date().toISOString(),
    operation: state.fields.last_hack_operation || "manual",
    input: state.fields.hack_input || "",
    output: state.fields.hack_output || ""
  });
  state.completed.disturbance = true;
  saveState();
  renderHackArchive();
}

function renderHackArchive() {
  const archive = document.getElementById("hackArchive");
  if (!archive) return;
  if (!state.hacks.length) {
    archive.innerHTML = `<p class="section-lead">Noch keine Textoperation gespeichert.</p>`;
    return;
  }
  archive.innerHTML = state.hacks.map((hack, index) => `
    <article class="hack-card">
      <strong>Hack ${index + 1}: ${escapeHtml(hack.operation)}</strong>
      <pre>${escapeHtml(hack.output)}</pre>
    </article>
  `).join("");
}

function getSelectedSource() {
  return sourceCorpus.find((item) => item.id === state.selectedSourceId) || sourceCorpus[4] || sourceCorpus[0] || null;
}

function renderSourceReader(query = "") {
  const results = document.getElementById("sourceResults");
  const preview = document.getElementById("sourcePreview");
  if (!results || !preview) return;
  const term = query.trim().toLowerCase();
  const matches = sourceCorpus
    .filter((item) => !term || item.text.toLowerCase().includes(term) || item.label.toLowerCase().includes(term))
    .slice(0, 18);
  results.innerHTML = matches.length ? matches.map((item) => `
    <button type="button" class="source-result ${state.selectedSourceId === item.id ? "is-active" : ""}" data-source-id="${item.id}">
      <strong>${escapeHtml(item.label)}</strong>
      <span>Fragment ${item.pageHint}</span>
      <small>${escapeHtml(item.text.slice(0, 220))}${item.text.length > 220 ? " ..." : ""}</small>
    </button>
  `).join("") : `<p class="section-lead">Keine Treffer. Suchbegriff ändern oder leer lassen.</p>`;
  const selected = getSelectedSource();
  preview.textContent = selected ? selected.text : "Kein Textkorpus geladen.";
}

function selectSource(id) {
  state.selectedSourceId = id;
  saveState();
  renderSourceReader(document.querySelector("[data-source-search]")?.value || "");
  renderStylometry();
}

function sourceToHack() {
  const selected = getSelectedSource();
  if (!selected) return;
  const fragment = selected.text.slice(0, 1200);
  state.fields.hack_input = fragment;
  const input = document.getElementById("hackInput");
  if (input) input.value = fragment;
  saveState();
  showSection("disturbance");
}

function addMontageBlock(block) {
  state.montage.push({
    id: `m${Date.now()}_${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
    ...block
  });
  state.completed.dramaturgy = true;
  saveState();
  renderMontage();
  renderSummary();
}

function sourceToMontage() {
  const selected = getSelectedSource();
  if (!selected) return;
  addMontageBlock({
    type: "Originalfragment",
    title: selected.label,
    source: `Mutter Courage PDF / Fragment ${selected.pageHint}`,
    text: selected.text
  });
}

function hackToMontage() {
  const text = state.fields.hack_output || "";
  if (!text.trim()) return;
  addMontageBlock({
    type: "Text-Hack",
    title: `Hack: ${state.fields.last_hack_operation || "manual"}`,
    source: state.fields.hack_input ? "Hack-Labor" : "Hack-Labor / ohne Original",
    text
  });
}

function sourceToPreview() {
  const selected = getSelectedSource();
  if (!selected) return;
  state.previewText = selected.text.slice(0, 2200);
  const preview = document.getElementById("previewText");
  if (preview) preview.value = state.previewText;
  saveState();
  renderStyleReport();
  renderStylometry();
}

function generatePreview() {
  const selected = getSelectedSource();
  const raw = [
    state.fields.block_text || "",
    state.fields.block_text ? "" : (selected ? selected.text.slice(0, 1200) : "")
  ].join("\n").trim() || "Mutter Courage zieht weiter. Der Krieg läuft. Das Geschäft spricht leise mit.";
  const decisionPatch = applyDecisionFrame(raw);
  const styled = applyStyleProfile(decisionPatch, state.fields.style_profile || "Brechtischer Duktus");
  state.previewText = styled;
  const preview = document.getElementById("previewText");
  if (preview) preview.value = styled;
  saveState();
  renderStyleReport();
  renderStylometry();
}

function applyDecisionFrame(text) {
  const target = state.fields.decision_target || "Mitleid sabotieren";
  const medium = state.fields.decision_medium || "Livestream";
  const audience = state.fields.decision_audience || "Es soll sich ertappt fühlen";
  const frames = {
    "Mitleid sabotieren": "Das Publikum darf sich nicht im warmen Gefühl einrichten. Jede Rührung bekommt ein Preisschild.",
    "Krieg als Geschäft sichtbar machen": "Der Vorgang wird als Handel gezeigt: Ware, Körper, Risiko, Gewinn, Verlust.",
    "Figur entpsychologisieren": "Nicht: Was fühlt diese Figur? Sondern: Welche Funktion erfüllt sie im System?",
    "Gegenwart einschneiden": "Ein heutiges Interface schneidet in die Szene und macht klar: Das ist nicht vorbei.",
    "Publikum anklagen": "Die Zuschauerposition wird selbst verdächtig. Zuschauen ist nicht unschuldig.",
    "Song als Störung bauen": "Der Text darf nicht fließen. Er muss singen, stoppen, widersprechen."
  };
  return [
    `[ENTSCHEIDUNG: ${target}] ${frames[target] || frames["Mitleid sabotieren"]}`,
    `[MEDIUM: ${medium}]`,
    `[PUBLIKUM: ${audience}]`,
    "",
    text
  ].join("\n");
}

function applyStyleProfile(text, profile) {
  const cleaned = text.replace(/\s+/g, " ").trim();
  const sentences = splitSentences(cleaned);
  if (profile === "Brechtischer Duktus") {
    return brechtify(sentences);
  }
  if (profile === "Nachrichten-Ticker") {
    return sentences.map((s, i) => `EILMELDUNG ${String(i + 1).padStart(2, "0")}: ${s}`).join("\n");
  }
  if (profile === "Social-Feed") {
    return sentences.map((s, i) => `${i % 2 ? "Kommentar" : "Post"}: ${s}\nReaktion: Mitleid reicht nicht. Teilen ersetzt kein Urteil.`).join("\n\n");
  }
  if (profile === "Game-Interface") {
    return sentences.map((s, i) => `QUEST-LOG ${i + 1}: ${s}\nSTATUS: Profit +1 / Verlust +1 / Erkenntnis ungesichert`).join("\n\n");
  }
  if (profile === "Behördenprotokoll") {
    return sentences.map((s, i) => `Punkt ${i + 1}: ${s}\nVermerk: Verantwortung wird an die Lage delegiert.`).join("\n");
  }
  if (profile === "Poetischer Störtext") {
    return sentences.map((s) => `${s}\nDarunter: Wagenräder. Darüber: Reklame. Dazwischen zählt jemand die Toten.`).join("\n\n");
  }
  if (profile === "Kaltes Regieprotokoll") {
    return sentences.map((s) => `Keine Musik. Kein Close-up. Text sichtbar: ${s}`).join("\n");
  }
  return text;
}

function splitSentences(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 12);
}

function brechtify(sentences) {
  return sentences.map((sentence, index) => {
    const prefix = index % 3 === 0 ? "Man zeige:" : index % 3 === 1 ? "Da sieht man:" : "Und es frage sich:";
    const colder = sentence
      .replace(/\bich\b/gi, "man")
      .replace(/\bwir\b/gi, "die Leute")
      .replace(/\bfühle\b/gi, "rechne")
      .replace(/\bLiebe\b/g, "Ware Liebe")
      .replace(/\bKrieg\b/g, "Krieg, dieses Geschäft,");
    return `${prefix} ${colder}`;
  }).join("\n");
}

function restylePreview() {
  const base = state.previewText || state.fields.block_text || "";
  if (!base.trim()) return generatePreview();
  state.previewText = applyStyleProfile(base, state.fields.style_profile || "Brechtischer Duktus");
  const preview = document.getElementById("previewText");
  if (preview) preview.value = state.previewText;
  saveState();
  renderStyleReport();
  renderStylometry();
}

function addPreviewBlock() {
  const text = state.previewText || document.getElementById("previewText")?.value || "";
  if (!text.trim()) return;
  addMontageBlock({
    type: state.fields.block_type || "Neuer Szenentext",
    title: state.fields.block_title || `Preview: ${state.fields.style_profile || "Stilprofil"}`,
    text,
    video: state.fields.block_video || "",
    source: `Preview-Generator / ${state.fields.style_profile || "ohne Stilprofil"}`
  });
}

function renderStyleReport() {
  const report = document.getElementById("styleReport");
  if (!report) return;
  const text = state.previewText || "";
  const metrics = styleMetrics(text);
  report.innerHTML = `
    <strong>Stilreport</strong>
    <span>Sätze: ${metrics.sentences}</span>
    <span>Ø Wörter/Satz: ${metrics.avgWords}</span>
    <span>Imperative/Zeige-Signale: ${metrics.showSignals}</span>
    <span>Ökonomie-Wörter: ${metrics.economyWords}</span>
  `;
}

function styleMetrics(text) {
  const sentences = splitSentences(text);
  const words = text.match(/\b[\p{L}\p{N}-]+\b/gu) || [];
  const showSignals = (text.match(/\b(zeige|sieht|frage|vermerk|status|meldung|keine musik|kein close-up)\b/gi) || []).length;
  const economyWords = (text.match(/\b(krieg|geschäft|preis|ware|profit|verlust|markt|geld|körper|verkauft)\b/gi) || []).length;
  return {
    sentences: sentences.length,
    avgWords: sentences.length ? Math.round(words.length / sentences.length) : 0,
    showSignals,
    economyWords
  };
}

function stylometryTextPair() {
  const selected = getSelectedSource();
  return {
    original: selected ? selected.text : "",
    preview: state.previewText || state.fields.block_text || ""
  };
}

function tokenize(text) {
  return (text.toLowerCase().match(/[\p{L}\p{N}äöüß-]+/gu) || [])
    .map((token) => token.replace(/^-+|-+$/g, ""))
    .filter(Boolean);
}

function normalizeLemma(token) {
  let t = token.toLowerCase();
  const map = {
    kriege: "krieg",
    kriegen: "krieg",
    krieges: "krieg",
    geschäfte: "geschäft",
    geschäften: "geschäft",
    geschäftes: "geschäft",
    kinder: "kind",
    kindern: "kind",
    leute: "leut",
    menschen: "mensch",
    verkauft: "verkaufen",
    verkaufen: "verkaufen",
    verkaufte: "verkaufen",
    verkauftes: "verkaufen"
  };
  if (map[t]) return map[t];
  t = t.replace(/(innen|ungen|heiten|keiten)$/u, "");
  t = t.replace(/(ern|en|er|es|e|s)$/u, "");
  return t || token.toLowerCase();
}

function analyzeStylometry(text) {
  const tokens = tokenize(text);
  const lemmas = tokens.map(normalizeLemma);
  const contentLemmas = lemmas.filter((lemma) => !stopwords.has(lemma) && lemma.length > 2);
  const sentences = splitSentences(text);
  const types = new Set(lemmas);
  return {
    tokens,
    lemmas,
    contentLemmas,
    sentences,
    tokenCount: tokens.length,
    typeCount: types.size,
    ttr: tokens.length ? Number((types.size / tokens.length).toFixed(3)) : 0,
    avgSentence: sentences.length ? Math.round(tokens.length / sentences.length) : 0,
    topLemmas: topCounts(contentLemmas, 8)
  };
}

function topCounts(items, limit = 10) {
  const counts = new Map();
  items.forEach((item) => counts.set(item, (counts.get(item) || 0) + 1));
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit);
}

function ngrams(tokens, size) {
  const grams = [];
  for (let i = 0; i <= tokens.length - size; i += 1) {
    grams.push(tokens.slice(i, i + size).join(" "));
  }
  return topCounts(grams, 8).filter(([, count]) => count > 1);
}

function kwic(text, probe) {
  const tokens = tokenize(text);
  const lemma = normalizeLemma(probe || "");
  const rows = [];
  tokens.forEach((token, index) => {
    if (normalizeLemma(token) !== lemma) return;
    rows.push({
      left: tokens.slice(Math.max(0, index - 6), index).join(" "),
      hit: token,
      right: tokens.slice(index + 1, index + 7).join(" ")
    });
  });
  return rows.slice(0, 8);
}

function collocates(text, probe) {
  const tokens = tokenize(text);
  const lemma = normalizeLemma(probe || "");
  const around = [];
  tokens.forEach((token, index) => {
    if (normalizeLemma(token) !== lemma) return;
    tokens.slice(Math.max(0, index - 5), index).concat(tokens.slice(index + 1, index + 6))
      .map(normalizeLemma)
      .filter((item) => item.length > 2 && !stopwords.has(item))
      .forEach((item) => around.push(item));
  });
  return topCounts(around, 8);
}

function compareAnalyses(original, preview) {
  return {
    tokenDelta: preview.tokenCount - original.tokenCount,
    sentenceDelta: preview.avgSentence - original.avgSentence,
    ttrDelta: Number((preview.ttr - original.ttr).toFixed(3)),
    sharedTop: original.topLemmas
      .map(([lemma]) => lemma)
      .filter((lemma) => preview.topLemmas.some(([other]) => other === lemma))
      .slice(0, 6)
  };
}

function renderStylometry() {
  const out = document.getElementById("stylometryOutput");
  if (!out) return;
  const { original, preview } = stylometryTextPair();
  const originalAnalysis = analyzeStylometry(original);
  const previewAnalysis = analyzeStylometry(preview);
  const comparison = compareAnalyses(originalAnalysis, previewAnalysis);
  const probe = state.fields.lemma_probe || "krieg";
  const size = Number(state.fields.ngram_size || 3);
  out.innerHTML = `
    <div class="stylometry-grid">
      ${stylometryCard("Originalfragment", originalAnalysis)}
      ${stylometryCard("Preview", previewAnalysis)}
      <article class="stylometry-card">
        <h4>Vergleich</h4>
        <p>Token-Differenz: <strong>${comparison.tokenDelta}</strong></p>
        <p>Satzlängen-Differenz: <strong>${comparison.sentenceDelta}</strong></p>
        <p>TTR-Differenz: <strong>${comparison.ttrDelta}</strong></p>
        <p>Geteilte Leit-Lemmata: ${comparison.sharedTop.map(escapeHtml).join(", ") || "keine"}</p>
      </article>
      <article class="stylometry-card">
        <h4>KWIC / Kollokation: ${escapeHtml(normalizeLemma(probe))}</h4>
        ${kwicTable(preview || original, probe)}
        <p class="mini-list">${collocates(preview || original, probe).map(([word, count]) => `${escapeHtml(word)} (${count})`).join(" / ") || "keine Kollokationen"}</p>
      </article>
      <article class="stylometry-card wide">
        <h4>Wiederkehrende ${size}-Gramme in der Preview</h4>
        <p class="mini-list">${ngrams(previewAnalysis.tokens, size).map(([gram, count]) => `${escapeHtml(gram)} (${count})`).join(" / ") || "keine Wiederholungen über Schwelle"}</p>
      </article>
    </div>
  `;
}

function stylometryCard(title, analysis) {
  return `
    <article class="stylometry-card">
      <h4>${title}</h4>
      <p>Tokens: <strong>${analysis.tokenCount}</strong></p>
      <p>Types: <strong>${analysis.typeCount}</strong></p>
      <p>Type-Token-Ratio: <strong>${analysis.ttr}</strong></p>
      <p>Ø Satzlänge: <strong>${analysis.avgSentence}</strong></p>
      <p class="mini-list">${analysis.topLemmas.map(([lemma, count]) => `${escapeHtml(lemma)} (${count})`).join(" / ") || "keine Daten"}</p>
    </article>
  `;
}

function kwicTable(text, probe) {
  const rows = kwic(text, probe);
  if (!rows.length) return `<p>Keine KWIC-Treffer.</p>`;
  return `
    <table class="kwic-table">
      <tbody>
        ${rows.map((row) => `
          <tr>
            <td>${escapeHtml(row.left)}</td>
            <th>${escapeHtml(row.hit)}</th>
            <td>${escapeHtml(row.right)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function addCustomBlock() {
  const title = state.fields.block_title || "Unbenannter Block";
  const type = state.fields.block_type || "Neuer Szenentext";
  const text = state.fields.block_text || "";
  const video = state.fields.block_video || "";
  if (!text.trim() && !video.trim()) return;
  addMontageBlock({ type, title, text, video, source: "Neues Material" });
  state.fields.block_title = "";
  state.fields.block_text = "";
  state.fields.block_video = "";
  ["blockTitle", "blockText", "blockVideo"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  saveState();
}

function renderMontage() {
  const list = document.getElementById("montageList");
  if (!list) return;
  if (!state.montage.length) {
    list.innerHTML = `<p class="section-lead">Noch keine Fassung montiert. Übernimm Originalfragmente, Hacks, neue Texte oder Videos.</p>`;
    return;
  }
  list.innerHTML = state.montage.map((block, index) => `
    <article class="montage-block">
      <div class="montage-head">
        <div>
          <strong>${index + 1}. ${escapeHtml(block.title || "Block")}</strong>
          <span>${escapeHtml(block.type || "Material")} / ${escapeHtml(block.source || "ohne Quelle")}</span>
        </div>
        <div class="button-row">
          <button type="button" class="tiny-button" data-action="move-block-up" data-block-id="${block.id}">Hoch</button>
          <button type="button" class="tiny-button" data-action="move-block-down" data-block-id="${block.id}">Runter</button>
          <button type="button" class="tiny-button" data-action="delete-block" data-block-id="${block.id}">Löschen</button>
        </div>
      </div>
      ${block.video ? `<p class="video-ref">VIDEO: ${escapeHtml(block.video)}</p>${videoEmbed(block.video)}` : ""}
      <pre>${escapeHtml(block.text || "")}</pre>
    </article>
  `).join("");
}

function videoEmbed(url) {
  const safeUrl = escapeHtml(url);
  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) {
    return `<video controls src="${safeUrl}"></video>`;
  }
  if (/youtube\.com|youtu\.be|vimeo\.com/i.test(url)) {
    return `<a class="text-link" href="${safeUrl}" target="_blank" rel="noopener">Video öffnen</a>`;
  }
  return "";
}

function moveBlock(id, direction) {
  const index = state.montage.findIndex((block) => block.id === id);
  const next = index + direction;
  if (index < 0 || next < 0 || next >= state.montage.length) return;
  const [block] = state.montage.splice(index, 1);
  state.montage.splice(next, 0, block);
  saveState();
  renderMontage();
}

function deleteBlock(id) {
  state.montage = state.montage.filter((block) => block.id !== id);
  saveState();
  renderMontage();
}

function exportRenovation(type) {
  const payload = {
    title: "Renovierte Courage-Fassung",
    exportedAt: new Date().toISOString(),
    blocks: state.montage
  };
  let content = "";
  let mime = "text/plain;charset=utf-8";
  let extension = type;
  if (type === "json") {
    content = JSON.stringify(payload, null, 2);
    mime = "application/json";
  } else if (type === "html") {
    content = renovationHtml(payload);
    mime = "text/html;charset=utf-8";
  } else {
    content = renovationText(payload);
  }
  downloadFile(`renovierte-courage-fassung.${extension}`, content, mime);
}

function renovationText(payload) {
  return [
    payload.title,
    `Export: ${payload.exportedAt}`,
    "",
    ...payload.blocks.map((block, index) => [
      `## ${index + 1}. ${block.title || "Block"} [${block.type || "Material"}]`,
      block.source ? `Quelle: ${block.source}` : "",
      block.video ? `Video: ${block.video}` : "",
      block.text || ""
    ].filter(Boolean).join("\n"))
  ].join("\n\n");
}

function renovationHtml(payload) {
  const blocks = payload.blocks.map((block, index) => `
    <section>
      <p class="meta">${index + 1} / ${escapeHtml(block.type || "Material")} / ${escapeHtml(block.source || "")}</p>
      <h2>${escapeHtml(block.title || "Block")}</h2>
      ${block.video ? `<p><a href="${escapeHtml(block.video)}">${escapeHtml(block.video)}</a></p>` : ""}
      <pre>${escapeHtml(block.text || "")}</pre>
    </section>
  `).join("\n");
  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(payload.title)}</title>
  <style>
    body{font-family:Arial,sans-serif;background:#090b12;color:#f4f0df;line-height:1.55;margin:0;padding:32px}
    section{border:2px solid #f4f0df;margin:0 0 18px;padding:18px;background:#111827}
    h1,h2{margin:0 0 12px;text-transform:uppercase}
    pre{white-space:pre-wrap;font-family:Arial,sans-serif}
    .meta{color:#57ff9a;font-weight:700}
    a{color:#39c7ff}
  </style>
</head>
<body>
  <h1>${escapeHtml(payload.title)}</h1>
  <p>Export: ${escapeHtml(payload.exportedAt)}</p>
  ${blocks}
</body>
</html>`;
}

function downloadFile(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function renderSliderTimeline() {
  const mount = document.getElementById("sliderTimeline");
  if (!mount) return;
  if (!state.sliderHistory.length) {
    mount.innerHTML = `<p class="section-lead">Noch kein Reglerverlauf gespeichert.</p>`;
    return;
  }
  mount.innerHTML = state.sliderHistory.map((entry) => `
    <article class="task-card">
      <h3>${entry.scene}</h3>
      ${Object.entries(entry.values).map(([key, value]) => `
        <div class="timeline-row">
          <span>${sliderName(key)}</span>
          <div class="bar"><span style="width:${value}%"></span></div>
        </div>
      `).join("")}
      <p>${entry.reason ? escapeHtml(entry.reason) : "Keine Begründung gespeichert."}</p>
    </article>
  `).join("");
}

function sliderName(key) {
  return {
    victim_profiteer: "Opfer/Profit",
    mother_business: "Mutter/Geschäft",
    survival_blindness: "Klug/Blind"
  }[key] || key;
}

function generateConcept() {
  const f = state.fields;
  const concept = [
    "PATCH-MANIFEST: COURAGE.EXE RENOVIERT",
    "",
    `Originalszene: ${f.ve_scene || "[offen]"}`,
    `Flow-Abbruch: ${f.ve_interruption || "[offen]"}`,
    `Overlay / Fehlermeldung / Preisetikett: ${f.ve_projection || "[offen]"}`,
    `Publikumsangriff: ${f.ve_direct_address || "[offen]"}`,
    `Interface-Ding: ${f.ve_prop || "[offen]"}`,
    `Sound als Köder: ${f.ve_music || "[offen]"}`,
    `Trockenheit / keine Musik: ${f.ve_no_music || "[offen]"}`,
    `Mitleid entsteht: ${f.ve_pity || "[offen]"}`,
    `Mitleid-Sabotage: ${f.ve_pity_disturbed || "[offen]"}`,
    `Reststörung: ${f.ve_social_question || "[offen]"}`,
    "",
    "Prinzip: Nicht Brecht aktualisieren, als wäre er altmodisch. Sondern die heutige Wahrnehmung angreifen, bis Brechts Frage wieder weh tut."
  ].join("\n");
  state.generatedConcept = concept;
  state.completed.build = true;
  saveState();
  document.getElementById("generatedConcept").textContent = concept;
}

function renderSummary() {
  const mount = document.getElementById("summaryMount");
  if (!mount) return;
  const cards = [
    ["Affektantworten", list(state.choices.affect_check)],
    ["Text-Hacks", state.hacks.length ? `${state.hacks.length} gespeicherte Eingriffe` : "Noch kein Hack"],
    ["Renovierte Fassung", state.montage.length ? `${state.montage.length} montierte Blöcke` : "Noch keine Montage"],
    ["Reglerstände", state.sliderHistory.length ? `${state.sliderHistory.length} gespeicherte Builds` : "Noch kein Verlauf"],
    ["Textstellen", [state.fields.sympathy_quote, state.fields.disturbing_quote].filter(Boolean).join("\n\n") || "Noch keine Textstellen"],
    ["Gegenwartsanalogie", state.fields.present_analogy || "Noch offen"],
    ["Regiekonzept", state.generatedConcept || "Noch nicht generiert"],
    ["Schlussreflexion", state.fields.final_critical_viewing || "Noch offen"]
  ];
  mount.innerHTML = cards.map(([title, value]) => `
    <article class="summary-card"><strong>${title}</strong><span>${escapeHtml(value)}</span></article>
  `).join("");
}

function list(items = []) {
  return items.length ? items.join("\n") : "Noch keine Auswahl";
}

function exportData(type) {
  const payload = {
    title: "Courage.exe renovieren",
    exportedAt: new Date().toISOString(),
    data: state
  };
  const content = type === "json" ? JSON.stringify(payload, null, 2) : toText(payload);
  downloadFile(`brecht-maschine-export.${type}`, content, type === "json" ? "application/json" : "text/plain;charset=utf-8");
}

function toText(payload) {
  const lines = [
    payload.title,
    `Export: ${payload.exportedAt}`,
    "",
    "AUSWAHLEN",
    JSON.stringify(payload.data.choices, null, 2),
    "",
    "FREITEXTE"
  ];
  Object.entries(payload.data.fields).forEach(([key, value]) => {
    lines.push(`\n[${key}]\n${value || ""}`);
  });
  lines.push("\nREGLERVERLAUF");
  payload.data.sliderHistory.forEach((entry) => {
    lines.push(`${entry.scene}: ${JSON.stringify(entry.values)}\n${entry.reason || ""}`);
  });
  lines.push("\nANALYSEWAND");
  Object.entries(payload.data.conceptNotes).forEach(([key, value]) => {
    lines.push(`${key}: ${value}`);
  });
  lines.push("\nREGIEKONZEPT");
  lines.push(payload.data.generatedConcept || "");
  lines.push("\nTEXT-HACKS");
  payload.data.hacks.forEach((hack, index) => {
    lines.push(`Hack ${index + 1} (${hack.operation})\n${hack.output}`);
  });
  lines.push("\nRENOVIERTE FASSUNG");
  lines.push(renovationText({ title: "Renovierte Courage-Fassung", exportedAt: payload.exportedAt, blocks: payload.data.montage || [] }));
  return lines.join("\n");
}

function renderTeacher() {
  const out = document.getElementById("teacherOutput");
  if (!out) return;
  out.textContent = JSON.stringify({
    storageKey: STORAGE_KEY,
    hint: "Nur Daten aus diesem Browser. Für Abgaben Export der Schüler*innen nutzen.",
    state
  }, null, 2);
}

function resetAll() {
  const ok = confirm("Alle lokal gespeicherten Antworten dieser Brecht-Maschine löschen?");
  if (!ok) return;
  localStorage.removeItem(STORAGE_KEY);
  state = freshState();
  renderNav();
  hydrate();
  showSection("start");
}

function playDrum() {
  const stage = document.getElementById("drumStage");
  if (stage) {
    stage.classList.add("is-beating");
    stage.textContent = "TROMMEL!";
    setTimeout(() => {
      stage.classList.remove("is-beating");
      stage.textContent = "STILLE.";
    }, 1600);
  }
  try {
    const ctx = new AudioContext();
    [0, 0.32, 0.64, 1.02].forEach((time, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = index === 3 ? 90 : 130;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime + time);
      gain.gain.exponentialRampToValueAtTime(0.5, ctx.currentTime + time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + time + 0.16);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + time);
      osc.stop(ctx.currentTime + time + 0.18);
    });
  } catch {
    // AudioContext may be blocked; visual signal remains.
  }
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function bindEvents() {
  document.addEventListener("input", (event) => {
    const target = event.target;
    if (target.matches("[data-field]")) {
      state.fields[target.dataset.field] = target.value;
      saveState();
    }
    if (target.matches("[data-slider]")) {
      state.sliders[target.dataset.slider] = Number(target.value);
      updateSliderOutput(target.dataset.slider, target.value);
      saveState();
    }
    if (target.matches("[data-concept]")) {
      state.conceptNotes[target.dataset.concept] = target.value;
      saveState();
    }
    if (target.matches("[data-preview-text]")) {
      state.previewText = target.value;
      saveState();
      renderStyleReport();
      renderStylometry();
    }
  });

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (target.matches("[data-choice]")) {
      const key = target.dataset.choice;
      const values = new Set(state.choices[key] || []);
      target.checked ? values.add(target.value) : values.delete(target.value);
      state.choices[key] = [...values];
      saveState();
    }
  });

  document.addEventListener("click", (event) => {
    const target = event.target.closest("button, a");
    if (!target) return;
    if (target.matches("[data-target]")) showSection(target.dataset.target);
    if (target.dataset.action === "open-reader") showSection("reader");
    if (target.dataset.action === "start-machine") showSection("plot");
    if (target.dataset.action === "next-module") nextSection(target.dataset.current);
    if (target.dataset.sourceId) selectSource(target.dataset.sourceId);
    if (target.dataset.action === "complete-module") {
      state.completed[target.dataset.module] = true;
      saveState();
    }
    if (target.dataset.action === "save-slider-snapshot") saveSliderSnapshot();
    if (target.dataset.action === "save-hack") saveHack();
    if (target.dataset.hack) runHack(target.dataset.hack);
    if (target.dataset.action === "source-to-hack") sourceToHack();
    if (target.dataset.action === "source-to-montage") sourceToMontage();
    if (target.dataset.action === "source-to-preview") sourceToPreview();
    if (target.dataset.action === "hack-to-montage") hackToMontage();
    if (target.dataset.action === "add-custom-block") addCustomBlock();
    if (target.dataset.action === "generate-preview") generatePreview();
    if (target.dataset.action === "restyle-preview") restylePreview();
    if (target.dataset.action === "add-preview-block") addPreviewBlock();
    if (target.dataset.action === "run-stylometry") renderStylometry();
    if (target.dataset.action === "move-block-up") moveBlock(target.dataset.blockId, -1);
    if (target.dataset.action === "move-block-down") moveBlock(target.dataset.blockId, 1);
    if (target.dataset.action === "delete-block") deleteBlock(target.dataset.blockId);
    if (target.dataset.action === "export-renovation-txt") exportRenovation("txt");
    if (target.dataset.action === "export-renovation-json") exportRenovation("json");
    if (target.dataset.action === "export-renovation-html") exportRenovation("html");
    if (target.dataset.action === "generate-concept") generateConcept();
    if (target.dataset.action === "export-json") exportData("json");
    if (target.dataset.action === "export-txt") exportData("txt");
    if (target.dataset.action === "refresh-teacher") renderTeacher();
    if (target.dataset.action === "reset-all") resetAll();
    if (target.dataset.action === "play-drum") playDrum();
    if (target.dataset.action === "interrupt") {
      const dialog = document.getElementById("interruptDialog");
      document.getElementById("interruptText").textContent = target.dataset.text || "Die Illusion wird unterbrochen.";
      if (dialog.showModal) dialog.showModal();
    }
  });

  document.addEventListener("input", (event) => {
    const target = event.target;
    if (target.matches("[data-source-search]")) {
      renderSourceReader(target.value);
    }
  });
}

renderModules();
renderNav();
renderConceptWall();
hydrate();
bindEvents();
showSection(state.active || "start");
