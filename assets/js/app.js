const STORAGE_KEY = "mutter_courage_brecht_maschine_v2";

const pdfs = {
  courage: "assets/docs/Mutter Courage und ihre Kinder.pdf",
  organon: "assets/docs/707359155-Kleines-Organon-fur-das-Theater-Bertolt-Brecht.pdf"
};

const modules = [
  {
    id: "plot",
    label: "1 Plot",
    kicker: "Modul 1",
    title: "Der Plot zieht dich hinein",
    lead: "Du sollst dich zuerst hineinziehen lassen. Danach wird untersucht, wie das passiert ist.",
    organon: "Ausgangspunkt: Das Theater soll Vorgänge vorführen, damit sie beurteilbar werden. Gefühl ist Material, nicht Endstation.",
    body: `
      <p>Dreißigjähriger Krieg. Eine Marketenderin zieht mit ihrem Wagen durch die Kriegslandschaft. Ihre Kinder sind Schutz, Arbeitskraft, Risiko und Verlust zugleich. Der Krieg ist nicht nur Hintergrund, sondern Lebensraum und Geschäftsmodell.</p>
      <p class="scene-link"><a class="text-link" href="${pdfs.courage}#page=1" target="_blank" rel="noopener">Szene 1 im PDF öffnen</a><span>Platzhalter: <code>#page=1</code> später exakt anpassen.</span></p>
      <div class="card-grid">
        ${figureCard("Mutter Courage", "Handelt, rechnet, schützt, verliert. Keine reine Mutterfigur, keine reine Täterfigur.")}
        ${figureCard("Eilif", "Wird dem Krieg zugeführt. Tapferkeit erscheint als Ware, Erziehung und Gefahr.")}
        ${figureCard("Schweizerkas", "Ehrlichkeit steht nicht außerhalb der Gewalt, sondern wird in ihr geprüft.")}
        ${figureCard("Kattrin", "Stummheit als Körperzeichen. Sie wird affektiv stark, aber nicht sentimental glatt.")}
        ${figureCard("Feldwebel", "Ordnungssprache des Krieges. Er macht Gewalt administrierbar.")}
        ${figureCard("Werber", "Er verkauft den Krieg als Chance und nimmt Menschen aus Familien heraus.")}
      </div>
      <div class="task-card">
        <h3>Leseauftrag</h3>
        <p>Lies die erste Szene bis zu dem Moment, in dem Eilif verschwindet.</p>
      </div>
      ${choices("affect_check", "Affekt-Check: Was ist deine erste Reaktion?", ["Ich habe Mitleid mit Mutter Courage.", "Ich finde sie berechnend.", "Ich finde sie widersprüchlich.", "Ich verstehe ihr Verhalten.", "Ich lehne ihr Verhalten ab.", "Ich weiss nicht, was ich denken soll."])}
      ${textarea("plot_reaction_reason", "Was hat der Text getan, damit du so reagierst? Achte auf Handlung, Sprache, Tempo, Figurenkonstellation.")}
    `
  },
  {
    id: "disturbance",
    label: "2 Störung",
    kicker: "Modul 2",
    title: "Störung des Mitgefühls",
    lead: "Der V-Effekt wird hier nicht erklärt, sondern als digitaler Eingriff ausprobiert.",
    organon: "Verfremdung heißt: Das Selbstverständliche verliert seine Selbstverständlichkeit. Man sieht nicht nur Leid, sondern die Ordnung, die Leid produziert.",
    body: `
      <div class="stop-card">Achtung: Du leidest gerade vielleicht mit Mutter Courage. Aber Brecht will nicht, dass du im Mitleid stehen bleibst.</div>
      ${choices("pity_target", "Womit genau leidest du?", ["Mit ihrer Armut?", "Mit ihrem Verlust?", "Mit ihrer Mutterrolle?", "Mit ihrer Geschäftstüchtigkeit?", "Mit der Situation, dass sie vom Krieg lebt?"])}
      ${textarea("pity_disturbed_where", "Wo wird dein Mitleid im Text gestört? Notiere eine konkrete Beobachtung.")}
      ${textarea("war_business_statement", "Welche Aussage über Krieg und Geschäft steckt in dieser Störung?")}
      <div class="two-column">
        ${textarea("sympathy_quote", "Textstelle, die Mutter Courage sympathisch wirken lässt")}
        ${textarea("disturbing_quote", "Textstelle, die diese Sympathie wieder stört")}
      </div>
      <button type="button" class="warning-button" data-action="interrupt" data-text="Markiere den Moment, in dem du gemerkt hast: Ich fühle gerade schneller, als ich denke.">Illusion unterbrechen</button>
    `
  },
  {
    id: "unstable",
    label: "3 Urteil",
    kicker: "Modul 3",
    title: "Mutter Courage als instabile Figur",
    lead: "Die Figur soll nicht moralisch festgenagelt werden. Sie soll schwanken, damit dein Urteil arbeiten muss.",
    organon: "Brecht interessiert die Handlung unter Bedingungen. Die Figur wird dadurch lesbar, aber nicht bequem eindeutig.",
    body: `
      <label class="question-block"><span>Bearbeitete Szene</span><select data-field="slider_scene">${["Szene 1", "Szene 2", "Szene 3", "Szene 4", "Szene 5", "Szene 6", "Szene 7", "Szene 8", "Szene 9", "Szene 10", "Szene 11", "Szene 12"].map(s => `<option>${s}</option>`).join("")}</select></label>
      <div class="slider-bank">
        ${slider("victim_profiteer", "Opfer des Krieges", "Profiteurin des Krieges")}
        ${slider("mother_business", "fürsorgliche Mutter", "geschäftlich verblendet")}
        ${slider("survival_blindness", "klug überlebend", "politisch blind")}
      </div>
      ${textarea("slider_reason", "Begründe deine aktuelle Einstellung der Regler mit einer konkreten Textstelle.")}
      <button type="button" class="primary-button" data-action="save-slider-snapshot">Reglerstand für diese Szene speichern</button>
      <div id="sliderTimeline" class="timeline" aria-live="polite"></div>
      ${textarea("unstable_reflection", "Warum ist Mutter Courage als Figur schwer eindeutig zu beurteilen? Was bewirkt diese Unsicherheit?")}
    `
  },
  {
    id: "songs",
    label: "4 Songs",
    kicker: "Modul 4",
    title: "Die Songs als Unterbrechungsmaschinen",
    lead: "Die Lieder sind keine Dekoration. Sie schalten die Szene um: vom Miterleben zum Prüfen.",
    organon: "Songs können Handlung anhalten, kommentieren, verallgemeinern und Figuren durchschaubar machen.",
    body: `
      <div class="song-grid">
        ${songStation("Lied der Mutter Courage", "Was verkauft dieses Lied: Erfahrung, Härte, Überleben oder Selbstbetrug?", "song_courage")}
        ${songStation("Lied von der großen Kapitulation", "Wo kippt Anpassung von Überleben in Einverständnis?", "song_capitulation")}
        ${songStation("Salomon-Song", "Welche Klugheit wird hier verdächtig gemacht?", "song_salomon")}
      </div>
      ${choices("song_effects", "Was macht ein Song mit der Szene?", ["Es verstärkt das Gefühl.", "Es unterbricht das Gefühl.", "Es kommentiert die Handlung.", "Es verallgemeinert den Einzelfall.", "Es macht eine Figur durchschaubar.", "Es zeigt eine gesellschaftliche Regel."])}
      ${textarea("song_attitude", "Welche Haltung erzeugt das Lied?")}
      ${textarea("song_stage_showing", "Was würdest du auf der Bühne während des Liedes zeigen?")}
      <div class="two-column">
        ${textarea("wrong_music", "Welche Musik wäre falsch, weil sie zu stark emotionalisiert?")}
        ${textarea("brecht_music", "Welche Musik würde brechtisch funktionieren?")}
      </div>
    `
  },
  {
    id: "aristotle",
    label: "5 Kontrast",
    kicker: "Modul 5",
    title: "Brecht gegen Aristoteles",
    lead: "Die Differenz wird als Kontrastmodus gebaut: Läuterung gegen Fortgang der Verhältnisse.",
    organon: "Post-aristotelisch heißt hier: nicht Reinigung durch Mitleid und Furcht, sondern Untersuchung von Handlungen und Zuständen.",
    body: `
      <div class="contrast-grid">
        <article class="projection-card">
          <h3>Karte A: Klassisches Drama</h3>
          <p>Die Figur erkennt ihre Schuld, bricht zusammen, bereut und verändert sich. Das Publikum erlebt eine innere Lösung.</p>
        </article>
        <article class="warning-card">
          <h3>Karte B: Brecht</h3>
          <p>Die Figur erkennt nichts Grundsätzliches. Die Handlung geht weiter. Die gesellschaftlichen Verhältnisse bleiben sichtbar.</p>
        </article>
      </div>
      ${textarea("catharsis_absent", "Wo bleibt Katharsis aus?")}
      ${textarea("identification_blocked", "Wo verhindert Brecht Identifikation?")}
      ${textarea("no_conversion", "Warum ist es wichtig, dass Mutter Courage nicht einfach geläutert wird?")}
      ${textarea("tragedy_loss", "Was wäre verloren, wenn die Szene als reine Tragödie erzählt würde?")}
    `
  },
  {
    id: "warbusiness",
    label: "6 Geschäft",
    kicker: "Modul 6",
    title: "Krieg als Geschäft",
    lead: "Die Analysewand macht sichtbar, dass das Stück nicht nur private Verluste zeigt, sondern eine Ökonomie.",
    organon: "Historisierendes Denken fragt: Welche Ordnung macht dieses Verhalten plausibel, profitabel, nötig oder blind?",
    body: `
      <div id="conceptWall" class="analysis-grid"></div>
      ${textarea("who_profits", "Wer verdient am Krieg?")}
      ${textarea("who_pays", "Wer bezahlt den Preis?")}
      ${textarea("survival_complicity", "Wann wird Überleben zur Mitschuld?")}
      ${textarea("not_outside_system", "Warum ist Mutter Courage nicht ausserhalb des Systems?")}
      ${textarea("pity_not_enough", "Warum reicht individuelles Mitleid nicht aus, um das Stück zu verstehen?")}
      <div class="warning-card">
        Gegenwartsanalogien sind erlaubt, aber keine platte Modernisierung. Der Vergleich muss auch seine Grenze zeigen.
      </div>
      ${textarea("present_analogy", "Formuliere eine vorsichtige Gegenwartsanalogie: Krieg als Geschäftsmodell heute, Krisenökonomie, Waffenindustrie, Konsum trotz globaler Krisen, moralischer Druck unter ökonomischer Abhängigkeit. Zeige auch, wo der Vergleich problematisch wird.")}
    `
  },
  {
    id: "kattrin",
    label: "7 Kattrin",
    kicker: "Modul 7",
    title: "Kattrin und das gefährliche Mitleid",
    lead: "Kattrin zieht Affekt an. Gerade deshalb muss die Inszenierung fragen, was dieser Affekt politisch kann und was er verdeckt.",
    organon: "Eine stumme Handlung kann mehr zeigen als eine erklärende Rede. Entscheidend ist, ob das Publikum nur gerührt oder wach gemacht wird.",
    body: `
      <div class="kattrin-zone">
        <div id="drumStage" class="drum-stage">TROMMEL?</div>
        <button type="button" class="primary-button" data-action="play-drum">Trommel-Signal testen</button>
      </div>
      ${textarea("kattrin_pity", "Warum wirkt Kattrin besonders stark auf das Mitgefühl?")}
      ${textarea("kattrin_silence", "Warum ist ihre Stummheit theatral wichtig?")}
      ${textarea("kattrin_protest", "Warum zeigt gerade eine stumme Figur den stärksten Protest?")}
      ${textarea("kattrin_not_hero", "Was unterscheidet Kattrins Handlung von einer klassischen Heldenszene?")}
      ${textarea("kattrin_blocked_consolation", "Wo verhindert Brecht, dass wir uns einfach beruhigt von ihr rühren lassen?")}
      ${choices("kattrin_design", "Wie soll Kattrins Trommeln digital inszeniert werden?", ["lauter werdender Rhythmus", "völlige Stille vor dem Trommeln", "Textprojektionen", "eingefrorene Bühne", "Kommentare aus dem Off", "keine Musik"])}
      ${textarea("kattrin_design_reason", "Begründe deine Entscheidung.")}
    `
  },
  {
    id: "build",
    label: "8 V-Effekt",
    kicker: "Modul 8",
    title: "Baue deinen eigenen V-Effekt",
    lead: "Jetzt wird aus Analyse Regie. Du inszenierst eine Szene so, dass das Publikum nicht vergisst zu denken.",
    organon: "Zeigen statt bloss erleben: Die Szene soll ihre eigenen Bedingungen sichtbar machen.",
    body: `
      <div class="form-grid two-column">
        ${input("ve_scene", "Welche Szene wählst du?")}
        ${input("ve_interruption", "Wo wird unterbrochen?")}
        ${input("ve_projection", "Welche Textstelle wird projiziert?")}
        ${input("ve_direct_address", "Welche Figur spricht direkt ans Publikum?")}
        ${input("ve_prop", "Welche Requisite wird überdeutlich gezeigt?")}
        ${input("ve_music", "Wo wird Musik eingesetzt?")}
        ${input("ve_no_music", "Wo darf gerade keine Musik sein?")}
        ${input("ve_pity", "Wo entsteht Mitleid?")}
        ${input("ve_pity_disturbed", "Wo wird dieses Mitleid gestört?")}
        ${input("ve_social_question", "Welche gesellschaftliche Frage soll sichtbar werden?")}
      </div>
      <button type="button" class="primary-button" data-action="generate-concept">Regiekonzept generieren</button>
      <pre id="generatedConcept" class="generated-concept"></pre>
    `
  }
];

const concepts = ["Krieg", "Geschäft", "Überleben", "Profit", "Moral", "Anpassung", "Mitschuld", "Verlust", "Ware", "Körper", "Kinder", "Markt"];

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
  const order = ["start", "reader", ...modules.map((m) => m.id), "machine", "teacher"];
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
    "REGIEKONZEPT: DIGITALER V-EFFEKT",
    "",
    `Szene: ${f.ve_scene || "[offen]"}`,
    `Unterbrechung: ${f.ve_interruption || "[offen]"}`,
    `Projektion: ${f.ve_projection || "[offen]"}`,
    `Direkte Publikumsadresse: ${f.ve_direct_address || "[offen]"}`,
    `Überdeutliche Requisite: ${f.ve_prop || "[offen]"}`,
    `Musik: ${f.ve_music || "[offen]"}`,
    `Keine Musik: ${f.ve_no_music || "[offen]"}`,
    `Mitleid entsteht: ${f.ve_pity || "[offen]"}`,
    `Mitleid wird gestört: ${f.ve_pity_disturbed || "[offen]"}`,
    `Gesellschaftliche Frage: ${f.ve_social_question || "[offen]"}`,
    "",
    "Prinzip: Die Szene soll nicht verschwinden lassen, dass sie gemacht ist. Das Publikum soll sehen, wodurch seine Haltung entsteht."
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
    ["Reglerstände", state.sliderHistory.length ? `${state.sliderHistory.length} gespeicherte Szenen` : "Noch kein Verlauf"],
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
    title: "Du sollst nicht weinen, du sollst denken",
    exportedAt: new Date().toISOString(),
    data: state
  };
  const content = type === "json" ? JSON.stringify(payload, null, 2) : toText(payload);
  const blob = new Blob([content], { type: type === "json" ? "application/json" : "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `brecht-maschine-export.${type}`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
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
    if (target.dataset.action === "complete-module") {
      state.completed[target.dataset.module] = true;
      saveState();
    }
    if (target.dataset.action === "save-slider-snapshot") saveSliderSnapshot();
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
}

renderModules();
renderNav();
renderConceptWall();
hydrate();
bindEvents();
showSection(state.active || "start");
