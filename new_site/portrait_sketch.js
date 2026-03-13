const COUNTDOWN = 0,
  FADE = 1,
  SHUFFLE = 2,
  PLAY = 3;
let gameState = COUNTDOWN;

let img;
let can;
let tileWidth;
let tileHeight;
let tiles = [];
let locs = [];
let dest = [];
let blankRow = 4;
let blankCol = 3;
let countdown = 120;
let shuffleCount = 50;
let lastMoveRow = -1;
let lastMoveCol = -1;
let tileSpeed = 0.5;

function preload() {
  img = loadImage('../images/sacco_logo.png');
}

function setup() {
  can = createCanvas(img.width, img.height);
  can.parent(select('#portrait'));
  can.hide();

  tileWidth = img.width / 4;
  tileHeight = img.height / 5;

  tiles = [];
  locs = [];
  dest = [];

  blankRow = 4;
  blankCol = 3;
  shuffleCount = 50;
  lastMoveRow = -1;
  lastMoveCol = -1;
  tileSpeed = 0.5;

  for (let r = 0; r < 5; r += 1) {
    for (let c = 0; c < 4; c += 1) {
      const x = c * tileWidth;
      const y = r * tileHeight;
      const g = createGraphics(tileWidth + 1, tileHeight + 1);
      noSmooth();
      g.image(img, -x, -y);

      tiles.push(g);
      locs.push(createVector(x, y));
      dest.push(createVector(x, y));
    }
  }
}

function draw() {
  background(255);

  switch (gameState) {
    case COUNTDOWN:
      countdown -= 1;
      if (countdown <= 0) {
        countdown = 0;
        gameState = FADE;
      }
      break;

    case FADE:
      tiles.splice(tiles.length - 1, 1);
      locs.splice(locs.length - 1, 1);
      dest.splice(dest.length - 1, 1);
      gameState = SHUFFLE;
      break;

    case SHUFFLE:
      select('#pic').hide();
      can.show();
      if (!stillMoving()) {
        randomMove();
        if (--shuffleCount < 0) gameState = PLAY;
      }
      break;

    case PLAY:
      break;
  }

  drawTiles();
  lerpTiles();
}

function drawTiles() {
  for (let i = 0; i < tiles.length; i += 1) {
    const l = locs[i];
    image(tiles[i], l.x, l.y);
  }
}

function lerpTiles() {
  for (let i = 0; i < tiles.length; i += 1) {
    locs[i].lerp(dest[i], tileSpeed);
    if (locs[i].dist(dest[i]) < 1) {
      locs[i] = dest[i].copy();
    }
  }
}

function randomMove() {
  const choices = [
    { r: blankRow - 1, c: blankCol },
    { r: blankRow + 1, c: blankCol },
    { r: blankRow, c: blankCol - 1 },
    { r: blankRow, c: blankCol + 1 },
  ];

  const rand = random(choices);

  if (rand.r < 0 || rand.r > 4 || rand.c < 0 || rand.c > 3) {
    return randomMove();
  }

  if (rand.r === lastMoveRow && rand.c === lastMoveCol) {
    return randomMove();
  }

  for (let i = 0; i < locs.length; i += 1) {
    const col = round(locs[i].x / tileWidth);
    const row = round(locs[i].y / tileHeight);
    if (rand.r === row && rand.c === col) {
      dest[i] = createVector(blankCol * tileWidth, blankRow * tileHeight);
      lastMoveRow = blankRow;
      lastMoveCol = blankCol;
      blankRow = rand.r;
      blankCol = rand.c;
    }
  }
}

function stillMoving() {
  for (let i = 0; i < tiles.length; i += 1) {
    if (abs(locs[i].x - dest[i].x) > 0.3 || abs(locs[i].y - dest[i].y) > 0.3) {
      return true;
    }
  }
  return false;
}

function mousePressed() {
  if (gameState === COUNTDOWN && countdown > 0) {
    countdown = 1;
    return;
  }

  if (stillMoving() || gameState !== PLAY) return;

  tileSpeed = 0.3;
  const clickedRow = floor(mouseY / tileHeight);
  const clickedCol = floor(mouseX / tileWidth);
  const d = dist(clickedRow, clickedCol, blankRow, blankCol);

  if (d === 1) {
    for (let i = 0; i < tiles.length; i += 1) {
      const tRow = locs[i].y / tileHeight;
      const tCol = locs[i].x / tileWidth;

      if (tRow === clickedRow && tCol === clickedCol) {
        dest[i] = createVector(blankCol * tileWidth, blankRow * tileHeight);
        blankRow = clickedRow;
        blankCol = clickedCol;
        break;
      }
    }
  }
}
