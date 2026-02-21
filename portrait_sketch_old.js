const COUNTDOWN = 0,
  FADE = 1,
  SHUFFLE = 2,
  PLAY = 3;
var gameState = COUNTDOWN;


function preload() {
  img = loadImage('images/Sacco.png');
//   img = loadImage('images/sacco_logo.png');
}

function setup() {
 can =  createCanvas(img.width, img.height);
  
  can.parent(select("#portrait"));
  can.hide();
 // select('#pic').hide();
  
  tileWidth = img.width / 4;
  tileHeight = img.height / 5;

  tiles = [];
  locs = [];
  dest = [];

  blankRow = 4;
  blankCol = 3;

  countdown = 800;

  shuffleCount = 50;

  lastMoveRow = -1;
  lastMoveCol = -1;

  tileSpeed = 0.5;

  //initialize tile graphics and matching locs/dests
  for (var r = 0; r < 5; r++) {
    for (var c = 0; c < 4; c++) {

      var x = c * tileWidth;
      var y = r * tileHeight;

      var g = createGraphics(tileWidth+1, tileHeight+1);
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
      countdown--;
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

        if (--shuffleCount < 0) {
          gameState = PLAY;
        }
      }

      break;
    case PLAY:
      break;

  }

  drawTiles();
  lerpTiles();
}

function drawTiles() {
  for (let i = 0; i < tiles.length; i++) {
    var l = locs[i];
    image(tiles[i], l.x, l.y);
  }
}

function lerpTiles() {
  for (let i = 0; i < tiles.length; i++) {
    locs[i].lerp(dest[i], tileSpeed);
    if (locs[i].dist(dest[i]) < 1) {
      locs[i] = dest[i].copy();
    }
  }
}

function randomMove() {
  var choices = [{
      r: blankRow - 1,
      c: blankCol
    },
    {
      r: blankRow + 1,
      c: blankCol
    },
    {
      r: blankRow,
      c: blankCol - 1
    },
    {
      r: blankRow,
      c: blankCol + 1
    }
  ];

  var rand = random(choices);

  if (rand.r < 0 || rand.r > 4 || rand.c < 0 || rand.c > 3) {
    return randomMove();

  }

  if (rand.r == lastMoveRow && rand.c == lastMoveCol)
    return randomMove();

  for (let i = 0; i < locs.length; i++) {
    var COL = round(locs[i].x / tileWidth);
    var ROW = round(locs[i].y / tileHeight);
    if (rand.r == ROW && rand.c == COL) {
      dest[i] = createVector(blankCol * tileWidth, blankRow * tileHeight);


      //  console.log("Moving from " + ROW + "," + COL + " to " + blankRow + "," + blankCol + "[" + lastMoveRow + "," + lastMoveCol + "]");
      lastMoveRow = blankRow;
      lastMoveCol = blankCol;
      blankRow = rand.r;
      blankCol = rand.c;



    }
  }
}

function stillMoving() {
  for (let i = 0; i < tiles.length; i++) {
    if (abs(locs[i].x - dest[i].x) > 0.3 || abs(locs[i].y - dest[i].y) > 0.3) {

      return true;

    }
  }
  return false;
}

function mousePressed() {
  
  if(gameState == COUNTDOWN && countdown > 0)
  {
    countdown = 1;
    return;
  }

  if (stillMoving() || gameState != PLAY)
    return;

  tileSpeed = .3;
  var clickedRow = floor(mouseY / tileHeight);
  var clickedCol = floor(mouseX / tileWidth);

  var d = dist(clickedRow, clickedCol, blankRow, blankCol);

  if (d == 1) {

    for (let i = 0; i < tiles.length; i++) {

      let tRow = locs[i].y / tileHeight;
      let tCol = locs[i].x / tileWidth;

      if (tRow == clickedRow && tCol == clickedCol) {
        dest[i] = createVector(blankCol * tileWidth, blankRow * tileHeight);
        blankRow = clickedRow;
        blankCol = clickedCol;
        break;
      }
    }
  }


}