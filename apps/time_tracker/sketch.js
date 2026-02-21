/**
 * p5.js Timer Tracker (Local-first + Cloud Sync)
 * ----------------------------------------------
 * Same functionality, but now scales to fill the window
 * while preserving the original 380x640 proportions.
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
// ================== VIRTUAL UI ===================
// =================================================

const BASE_W = 380;
const BASE_H = 640;

let uiScale = 1;
let uiOffsetX = 0;
let uiOffsetY = 0;

function updateUiTransform() {
  uiScale = min(windowWidth / BASE_W, windowHeight / BASE_H);
  uiOffsetX = (windowWidth - BASE_W * uiScale) / 2;
  uiOffsetY = (windowHeight - BASE_H * uiScale) / 2;
}

function toVirtual(px, py) {
  return {
    x: (px - uiOffsetX) / uiScale,
    y: (py - uiOffsetY) / uiScale,
  };
}

function beginUI() {
  push();
  translate(uiOffsetX, uiOffsetY);
  scale(uiScale);
}

function endUI() {
  pop();
}

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
  createCanvas(windowWidth, windowHeight);
  updateUiTransform();

  textAlign(CENTER, CENTER);

  // Ensure local state exists
  const state = loadState();

  // Create timer objects (virtual layout coords)
  maya = new Kid("Maya", BASE_W * 0.7, kidY);
  jace = new Kid("Jace", BASE_W * 0.3, kidY);

  // Restore focus
  setFocus(state.focus);

  // Build UI (virtual layout coords)
  buildButtons();

  // Pull cloud state (if newer)
  cloudPull().catch(console.log);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateUiTransform();
}

// =================================================
// ================== DRAW =========================
// =================================================

function draw() {
  background(255);

  beginUI();

  rectMode(CORNER);
  fill(255);
  stroke(0);
  rect(20, 30, BASE_W - 40, 560, 10);

  noStroke();
  fill(0);

  jace.paint();
  maya.paint();

  for (let b of buts) b.paint();

  endUI();
}

// =================================================
// ================= INPUT =========================
// =================================================

function mousePressed() {
  const vm = toVirtual(mouseX, mouseY);
  const vx = vm.x;
  const vy = vm.y;

  const jDist = dist(vx, vy, BASE_W * 0.3, kidY);
  const mDist = dist(vx, vy, BASE_W * 0.7, kidY);

  if (jDist < 100) setFocus("jace");
  if (mDist < 100) setFocus("maya");

  for (let b of buts) b.mousePress(vx, vy);
}

// (Optional but nice on phones)
function touchStarted() {
  mousePressed();
  return false; // prevents page scroll
}

// =================================================
// ================= UI BUILD ======================
// =================================================

function buildButtons() {
  buts = [];

  let y = 300;
  const bigWid = 180;
  const bH = 50;

  buts.push(new StartStop("start", BASE_W / 2, y, bigWid, bH, () => {
    focus.startStop();
  }));

  y += 60;
  buts.push(new Button("reset", BASE_W / 2, y, bigWid, bH, () => {
    focus.reset();
  }));

  y += 60;
  buts.push(new TimeButton(60, BASE_W / 2, y, bigWid, 45));

  y += 50;
  buts.push(new TimeButton(30, BASE_W / 2, y, bigWid, 45));

  y += 50;
  buts.push(new TimeButton(10, BASE_W / 2, y, bigWid, 45));
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
  const r = await fetch(`${CLOUD_BASE}/state/${APP_ID}/${TRACKER_ID}`, {
    method: "GET",
    headers: { "X-Tracker-Secret": TRACKER_SECRET },
  });

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

  const r = await fetch(`${CLOUD_BASE}/state/${APP_ID}/${TRACKER_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Tracker-Secret": TRACKER_SECRET,
    },
    body: JSON.stringify({
      state,
      updatedAt: state.updatedAt,
    }),
  });

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

  mousePress(mx, my) {
    const inside =
      mx > this.x - this.w / 2 &&
      mx < this.x + this.w / 2 &&
      my > this.y - this.h / 2 &&
      my < this.y + this.h / 2;

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

  mousePress(mx, my) {
    const inY = my > this.y - this.h / 2 && my < this.y + this.h / 2;
    if (!inY) return;

    if (mx > this.x && mx < this.x + this.w / 2) focus.addTime(this.sec);
    if (mx > this.x - this.w / 2 && mx < this.x) focus.addTime(-this.sec);
  }
}
