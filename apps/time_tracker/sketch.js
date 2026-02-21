/**
 * p5.js Timer Tracker (Local-first + Cloud Sync)
 * ----------------------------------------------
 * Architecture:
 * - LocalStorage is the primary store (instant + offline safe).
 * - Cloud backend stores a replicated copy via API Gateway + Lambda.
 * - Conflict handling: if server has newer data, adopt server.
 *
 * DynamoDB Key format:
 *   pk = app#<APP_ID>#id#<TRACKER_ID>
 *
 * Local state shape:
 * {
 *   focus: "jace" | "maya",
 *   kids: { Jace: intSeconds, Maya: intSeconds },
 *   updatedAt: epochMs
 * }
 */

// =================================================
// =============== CLOUD CONFIG ====================
// =================================================

const CLOUD_BASE = "https://yiij54gyq7.execute-api.us-west-2.amazonaws.com/prod";
const APP_ID = "timer";
const TRACKER_ID = "default";
const TRACKER_SECRET = "Kid_Secret";

// =================================================
// =============== LOCAL STORAGE ===================
// =================================================

const STORAGE_KEY = "timeTracker";

// =================================================
// ================== GLOBALS ======================
// =================================================

let maya, jace;
let buts = [];
let kidY = 150;
let focus = null;

// Used to debounce cloud writes
let syncTimer = null;

// =================================================
// ================== SETUP ========================
// =================================================

function setup() {
  createCanvas(380, 640);
  textAlign(CENTER, CENTER);

  // Ensure local state exists
  const state = loadState();

  // Create timer objects
  maya = new Kid("Maya", width * 0.7, kidY);
  jace = new Kid("Jace", width * 0.3, kidY);

  // Restore focus
  setFocus(state.focus);

  // Build UI
  buildButtons();

  // Pull cloud state (if newer)
  cloudPull().catch(console.log);
}

function draw() {
  background(255);

  rectMode(CORNER);
  fill(255);
  stroke(0);
  rect(20, 30, width - 40, 560, 10);

  noStroke();
  fill(0);

  jace.paint();
  maya.paint();

  for (let b of buts) b.paint();
}

function mousePressed() {
  const jDist = dist(mouseX, mouseY, width * 0.3, kidY);
  const mDist = dist(mouseX, mouseY, width * 0.7, kidY);

  if (jDist < 100) setFocus("jace");
  if (mDist < 100) setFocus("maya");

  for (let b of buts) b.mousePress();
}

// =================================================
// ================= UI BUILD ======================
// =================================================

function buildButtons() {
  let y = 300;
  const bigWid = 180;
  const bH = 50;

  buts.push(new StartStop("start", width / 2, y, bigWid, bH, () => {
    focus.startStop();
  }));

  y += 60;
  buts.push(new Button("reset", width / 2, y, bigWid, bH, () => {
    focus.reset();
  }));

  y += 60;
  buts.push(new TimeButton(60, width / 2, y, bigWid, 45));

  y += 50;
  buts.push(new TimeButton(30, width / 2, y, bigWid, 45));

  y += 50;
  buts.push(new TimeButton(10, width / 2, y, bigWid, 45));
}

// =================================================
// ================= FORMAT ========================
// =================================================

function timeFormat(totalSeconds) {
  totalSeconds = max(0, floor(totalSeconds));

  const h = floor(totalSeconds / 3600);
  const m = floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  if (h === 0) return m + ":" + nf(s, 2, 0);
  return h + ":" + nf(m, 2, 0) + ":" + nf(s, 2, 0);
}

// =================================================
// ================= LOCAL STATE ===================
// =================================================

function nowMs() {
  return Date.now();
}

function loadState() {
  let s = getItem(STORAGE_KEY);

  if (!s) {
    s = {
      focus: "jace",
      kids: { Jace: 0, Maya: 0 },
      updatedAt: 0,
    };
    storeItem(STORAGE_KEY, s);
  }

  if (!s.kids) s.kids = {};
  if (s.kids.Jace == null) s.kids.Jace = 0;
  if (s.kids.Maya == null) s.kids.Maya = 0;
  if (!s.focus) s.focus = "jace";
  if (s.updatedAt == null) s.updatedAt = 0;

  return s;
}

function saveState(s) {
  s.updatedAt = nowMs();
  storeItem(STORAGE_KEY, s);
  scheduleCloudPush();
}

function setFocus(which) {
  const s = loadState();
  s.focus = which;
  saveState(s);

  focus = which === "jace" ? jace : maya;
}

// =================================================
// ================= CLOUD SYNC ====================
// =================================================

function scheduleCloudPush(delay = 400) {
  if (syncTimer) clearTimeout(syncTimer);
  syncTimer = setTimeout(() => cloudPush().catch(console.log), delay);
}

// -------------------
// Pull from cloud
// -------------------

async function cloudPull() {
  const r = await fetch(
    `${CLOUD_BASE}/state/${APP_ID}/${TRACKER_ID}`,
    {
      method: "GET",
      headers: { "X-Tracker-Secret": TRACKER_SECRET },
    }
  );

  if (!r.ok) {
    console.log("cloudPull failed:", r.status);
    return;
  }

  const data = await r.json();
  if (!data.state) return;

  const local = loadState();

  // If different timestamps, adopt cloud
  if (data.updatedAt !== local.updatedAt) {
    storeItem(STORAGE_KEY, data.state);

    // Update running objects without reload
    const s = loadState();
    jace.timeSec = s.kids.Jace;
    maya.timeSec = s.kids.Maya;
    setFocus(s.focus);

    console.log("Cloud state adopted.");
  }
}

// -------------------
// Push to cloud
// -------------------

async function cloudPush() {
  const state = loadState();

  const r = await fetch(
    `${CLOUD_BASE}/state/${APP_ID}/${TRACKER_ID}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Tracker-Secret": TRACKER_SECRET,
      },
      body: JSON.stringify({
        state,
        updatedAt: state.updatedAt,
      }),
    }
  );

  if (r.status === 409) {
    // Server has newer state
    const data = await r.json();
    if (data.state) {
      storeItem(STORAGE_KEY, data.state);
      location.reload();
    }
    return;
  }

  if (!r.ok) {
    console.log("cloudPush failed:", r.status);
    return;
  }

  const data = await r.json();
  state.updatedAt = data.updatedAt;
  storeItem(STORAGE_KEY, state);
}

// =================================================
// ================= CLASSES =======================
// =================================================

class Kid {
  constructor(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;

    this.running = false;
    this.startMs = undefined;

    const s = loadState();
    this.timeSec = Number(s.kids[name] ?? 0);
  }

  paint() {
    textSize(focus === this ? 54 : 26);
    text(this.name + "\n" + timeFormat(this.fullTimeSec()), this.x, this.y);
  }

  fullTimeSec() {
    if (!this.running) return this.timeSec;
    const elapsed = (Date.now() - this.startMs) / 1000;
    return this.timeSec + elapsed;
  }

  persist() {
    const s = loadState();
    s.kids[this.name] = floor(this.timeSec);
    saveState(s);
  }

  addTime(delta) {
    this.timeSec = max(0, floor(this.timeSec + delta));
    this.persist();
  }

  startStop() {
    if (this.running) {
      this.timeSec = floor(this.fullTimeSec());
      this.running = false;
      this.startMs = undefined;
      this.persist();
    } else {
      this.startMs = Date.now();
      this.running = true;
    }
  }

  reset() {
    this.running = false;
    this.startMs = undefined;
    this.timeSec = 0;
    this.persist();
  }
}

class Button {
  constructor(text, x, y, w, h, onClick) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.onClick = onClick || (() => {});
  }

  paint() {
    fill(255);
    stroke(0);
    strokeWeight(3);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h, 4);

    fill(0);
    noStroke();
    textSize(24);
    text(this.text, this.x, this.y);
  }

  mousePress() {
    const inside =
      mouseX > this.x - this.w / 2 &&
      mouseX < this.x + this.w / 2 &&
      mouseY > this.y - this.h / 2 &&
      mouseY < this.y + this.h / 2;

    if (inside) this.onClick();
  }
}

class StartStop extends Button {
  paint() {
    this.text = focus && focus.running ? "stop" : "start";
    super.paint();
  }
}

class TimeButton {
  constructor(sec, x, y, w, h) {
    this.sec = sec;
    this.text = timeFormat(sec);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  paint() {
    fill(0);
    noStroke();

    textSize(24);
    text(this.text, this.x, this.y);

    textSize(48);
    text("-", this.x - this.w * 0.3, this.y);

    textSize(38);
    text("+", this.x + this.w * 0.3, this.y);
  }

  mousePress() {
    const inY = mouseY > this.y - this.h / 2 && mouseY < this.y + this.h / 2;
    if (!inY) return;

    if (mouseX > this.x && mouseX < this.x + this.w / 2)
      focus.addTime(this.sec);

    if (mouseX > this.x - this.w / 2 && mouseX < this.x)
      focus.addTime(-this.sec);
  }
}
