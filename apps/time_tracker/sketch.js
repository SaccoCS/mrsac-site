/**
 * p5.js Timer Tracker (Local-first + Cloud Sync)
 * ----------------------------------------------
 * Scales to fill the window while preserving the original 380x640 proportions.
 *
 * Sync model (race-safe + focus-safe):
 * - LocalStorage is primary for instant/offline use.
 * - Cloud is a replicated store via API Gateway + Lambda.
 * - We prevent race conditions by allowing only ONE push in-flight at a time.
 * - We NEVER overwrite local state with an old snapshot after a push finishes.
 *
 * IMPORTANT CHANGE:
 * - `updatedAt` is treated as SERVER-owned only (from Lambda responses).
 * - Local edits set `dirty=true` (and `localChangedAt`) instead of bumping `updatedAt`.
 * - `cloudPull()` will NOT overwrite local edits while `dirty=true`.
 *
 * Local state stored under STORAGE_KEY:
 * {
 *   focus: "jace" | "maya",
 *   kids: { Jace: intSeconds, Maya: intSeconds },
 *
 *   updatedAt: number,        // SERVER timestamp (ms). Do not set locally.
 *   dirty: boolean,           // true if local has changes not confirmed by server
 *   localChangedAt: number    // local clock, for detecting mid-flight changes
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

// Debounce timer for cloud writes
let syncTimer = null;

// Race-condition protection for cloudPush()
let pushInFlight = false; // true while PUT is in progress
let pushPending = false;  // true if another save happened during PUT

// =================================================
// ================== SETUP ========================
// =================================================

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  updateUiTransform();

  textAlign(CENTER, CENTER);

  // Ensure local state exists
  const state = loadState();

  // Create timer objects (virtual layout coords)
  maya = new Kid("Maya", BASE_W * 0.7, kidY);
  jace = new Kid("Jace", BASE_W * 0.3, kidY);

  // Restore focus (this marks dirty; that's fine for first run)
  setFocus(state.focus);

  // Build UI (virtual layout coords)
  buildButtons();

  // Pull once on startup
  cloudPull().catch(console.log);

  // Pull again whenever you come back to the tab/page
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) cloudPull().catch(console.log);
  });

  // Also pull when the window regains focus (covers some browsers)
  window.addEventListener("focus", () => {
    cloudPull().catch(console.log);
  });
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
  
    strokeWeight(3);
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

      // SERVER timestamp only (do not set locally)
      updatedAt: 0,

      // Local edit tracking
      dirty: false,
      localChangedAt: 0,
    };
    storeItem(STORAGE_KEY, s);
  }

  if (!s.kids) s.kids = {};
  if (s.kids.Jace == null) s.kids.Jace = 0;
  if (s.kids.Maya == null) s.kids.Maya = 0;
  if (!s.focus) s.focus = "jace";
  if (s.updatedAt == null) s.updatedAt = 0;
  if (s.dirty == null) s.dirty = false;
  if (s.localChangedAt == null) s.localChangedAt = 0;

  return s;
}

function saveState(s) {
  // Mark local changes as unsynced.
  // DO NOT change s.updatedAt here — updatedAt is server-owned.
  s.dirty = true;
  s.localChangedAt = nowMs();

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

/**
 * Apply server state into localStorage and update in-memory objects WITHOUT reload.
 * This clears dirty because server is the source of truth we just adopted.
 */
function applyStateToApp(serverState) {
  serverState.dirty = false;
  serverState.localChangedAt = 0;

  storeItem(STORAGE_KEY, serverState);

  const s = loadState();

  // Update in-memory timer values
  jace.timeSec = Number(s.kids.Jace ?? 0);
  maya.timeSec = Number(s.kids.Maya ?? 0);

  // Optional policy: stop running timers when adopting server state
  jace.running = false; jace.startMs = undefined;
  maya.running = false; maya.startMs = undefined;

  // Set focus without calling saveState()
  focus = (s.focus === "jace") ? jace : maya;
}

// -------------------
// Pull from cloud
// -------------------

async function cloudPull() {
  // Avoid pull/push fights
  if (pushInFlight) return;

  const local = loadState();

  // If we have local unsynced edits, do not overwrite them on pull.
  if (local.dirty) return;

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

  const serverUpdatedAt = Number(data.updatedAt ?? 0);
  const localServerUpdatedAt = Number(local.updatedAt ?? 0);

  // Adopt server only if it differs from what we last synced
  if (serverUpdatedAt !== localServerUpdatedAt) {
    applyStateToApp(data.state);
    console.log("Cloud state adopted.");
  }
}

// -------------------
// Push to cloud (race-safe)
// -------------------

async function cloudPush() {
  // Only allow one in-flight push at a time.
  if (pushInFlight) {
    pushPending = true;
    return;
  }

  pushInFlight = true;

  // Snapshot at request start
  const snapshot = loadState();

  // This is the LAST KNOWN SERVER updatedAt (not local clock)
  const baseServerUpdatedAt = Number(snapshot.updatedAt ?? 0);

  try {
    const r = await fetch(`${CLOUD_BASE}/state/${APP_ID}/${TRACKER_ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Tracker-Secret": TRACKER_SECRET,
      },
      body: JSON.stringify({
        state: snapshot,
        updatedAt: baseServerUpdatedAt,
      }),
    });

    // Conflict: server has newer
    if (r.status === 409) {
      const data = await r.json();
      const current = loadState();

      // If we aren't dirty, it's safe to adopt server.
      // If we ARE dirty, keep local changes and push again.
      if (!current.dirty && data.state) {
        applyStateToApp(data.state);
        console.log("Conflict: adopted newer server state.");
      } else {
        console.log("Conflict: keeping local (dirty). Will re-push.");
      }
      return;
    }

    if (!r.ok) {
      console.log("cloudPush failed:", r.status);
      return;
    }

    const data = await r.json();

    // Apply server updatedAt to CURRENT local state only if nothing changed mid-flight
    const current = loadState();
    if (current.localChangedAt === snapshot.localChangedAt) {
      current.updatedAt = Number(data.updatedAt ?? current.updatedAt);
      current.dirty = false;
      current.localChangedAt = 0;
      storeItem(STORAGE_KEY, current);
    } else {
      // Local changed while request was in-flight; do not overwrite.
      // We'll push again right after this finishes.
    }
  } catch (e) {
    console.log("cloudPush error:", e);
  } finally {
    pushInFlight = false;

    // If another change occurred while pushing, push again immediately
    if (pushPending) {
      pushPending = false;
      cloudPush().catch(console.log);
      return;
    }

    // If still dirty, schedule another push
    if (loadState().dirty) {
      scheduleCloudPush(0);
    }
  }
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
