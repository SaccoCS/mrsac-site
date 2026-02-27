/** 
 * p5.js Timer Tracker (Selective Cloud Sync)
 * ------------------------------------------
 * - No focus on page load.
 * - Pull from server on load.
 * - Push when STOP is pressed.
 * - Push when +/- buttons modify time.
 * - If returning after 10+ minutes, pull from server.
 */

const CLOUD_BASE = "https://yiij54gyq7.execute-api.us-west-2.amazonaws.com/prod";
const APP_ID = "timer";
const TRACKER_ID = "default";
const TRACKER_SECRET = "Kid_Secret";

const STORAGE_KEY = "timeTracker";

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

let maya, jace;
let buts = [];
let kidY = 150;
let focus = null;

let pushInFlight = false;
let pushPending = false;

let hiddenAtMs = null;
const RETURN_PULL_THRESHOLD_MS = 10 * 60 * 1000;

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  updateUiTransform();
  textAlign(CENTER, CENTER);

  const state = loadState();

  maya = new Kid("Maya", BASE_W * 0.7, kidY);
  jace = new Kid("Jace", BASE_W * 0.3, kidY);

  // No auto-focus on load
  focus = jace;

  buildButtons();

  cloudPull({ force: true }).catch(console.log);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      hiddenAtMs = Date.now();
    } else {
      const awayMs = hiddenAtMs ? (Date.now() - hiddenAtMs) : 0;
      hiddenAtMs = null;
      if (awayMs >= RETURN_PULL_THRESHOLD_MS) {
        cloudPull({ force: false }).catch(console.log);
      }
    }
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateUiTransform();
}

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

function buildButtons() {
  buts = [];

  let y = 300;
  const bigWid = 180;
  const bH = 50;

  buts.push(new StartStop("start", BASE_W / 2, y, bigWid, bH, () => {
    if (focus) focus.startStop();
  }));

  y += 60;
  buts.push(new Button("reset", BASE_W / 2, y, bigWid, bH, () => {
    if (focus) focus.reset();
  }));

  y += 60;
  buts.push(new TimeButton(60, BASE_W / 2, y, bigWid, 45));
  y += 50;
  buts.push(new TimeButton(30, BASE_W / 2, y, bigWid, 45));
  y += 50;
  buts.push(new TimeButton(10, BASE_W / 2, y, bigWid, 45));
}

function timeFormat(totalSeconds) {
  totalSeconds = max(0, floor(totalSeconds));
  const h = floor(totalSeconds / 3600);
  const m = floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  if (h === 0) return m + ":" + nf(s, 2, 0);
  return h + ":" + nf(m, 2, 0) + ":" + nf(s, 2, 0);
}

function loadState() {
  let s = getItem(STORAGE_KEY);

  if (!s) {
    s = {
      focus: null,
      kids: { Jace: 0, Maya: 0 },
      updatedAt: 0,
    };
    storeItem(STORAGE_KEY, s);
  }

  if (!s.kids) s.kids = {};
  if (s.kids.Jace == null) s.kids.Jace = 0;
  if (s.kids.Maya == null) s.kids.Maya = 0;
  if (s.updatedAt == null) s.updatedAt = 0;

  return s;
}

function saveState(s) {
  storeItem(STORAGE_KEY, s);
}

function setFocus(which) {
  const s = loadState();
  s.focus = which;
  saveState(s);
  focus = which === "jace" ? jace : maya;
}

function syncKidsFromLocal() {
  const s = loadState();
  jace.timeSec = Number(s.kids.Jace ?? 0);
  maya.timeSec = Number(s.kids.Maya ?? 0);
}

async function cloudPull({ force }) {
  if (pushInFlight) return;

  const r = await fetch(`${CLOUD_BASE}/state/${APP_ID}/${TRACKER_ID}`, {
    method: "GET",
    headers: { "X-Tracker-Secret": TRACKER_SECRET },
  });

  if (!r.ok) return;

  const data = await r.json();
  if (!data.state) return;

  const serverUpdatedAt = Number(data.updatedAt ?? 0);
  const local = loadState();
  const localUpdatedAt = Number(local.updatedAt ?? 0);

  const shouldAdopt = force ? true : (serverUpdatedAt > localUpdatedAt);
  if (!shouldAdopt) return;

  const next = {
    focus: local.focus,
    kids: data.state.kids ?? { Jace: 0, Maya: 0 },
    updatedAt: serverUpdatedAt,
  };

  storeItem(STORAGE_KEY, next);
  syncKidsFromLocal();
}

async function cloudPush() {
  if (pushInFlight) {
    pushPending = true;
    return;
  }

  pushInFlight = true;

  const snapshot = loadState();

  try {
    const r = await fetch(`${CLOUD_BASE}/state/${APP_ID}/${TRACKER_ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Tracker-Secret": TRACKER_SECRET,
      },
      body: JSON.stringify({
        state: { kids: snapshot.kids },
        updatedAt: Number(snapshot.updatedAt ?? 0),
      }),
    });

    if (!r.ok) return;

    const data = await r.json();
    const s = loadState();
    s.updatedAt = Number(data.updatedAt ?? s.updatedAt);
    storeItem(STORAGE_KEY, s);
  } finally {
    pushInFlight = false;

    if (pushPending) {
      pushPending = false;
      cloudPush().catch(console.log);
    }
  }
}

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

  persistTimesOnly() {
    const s = loadState();
    s.kids[this.name] = floor(this.timeSec);
    saveState(s);
  }

  addTime(delta) {
    this.timeSec = max(0, floor(this.timeSec + delta));
    this.persistTimesOnly();
    cloudPush().catch(console.log);
  }

  startStop() {
    if (this.running) {
      this.timeSec = floor(this.fullTimeSec());
      this.running = false;
      this.startMs = undefined;
      this.persistTimesOnly();
      cloudPush().catch(console.log);
    } else {
      this.startMs = Date.now();
      this.running = true;
    }
  }

  reset() {
    this.running = false;
    this.startMs = undefined;
    this.timeSec = 0;
    this.persistTimesOnly();
      cloudPush().catch(console.log);
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
    if (!focus) {
      this.text = "select child";
    } else {
      this.text = focus.running ? "stop" : "start";
    }
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
    if (!focus) return;

    const inY = my > this.y - this.h / 2 && my < this.y + this.h / 2;
    if (!inY) return;

    if (mx > this.x && mx < this.x + this.w / 2) focus.addTime(this.sec);
    if (mx > this.x - this.w / 2 && mx < this.x) focus.addTime(-this.sec);
  }
}