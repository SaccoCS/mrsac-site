function setup() {
  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  textFont('Consolas');
  noSmooth();
  createCanvas(476, 125);


  document.oncontextmenu = function() {
    return false;
  }

  lineSpeed = 1.2;


  lineX = -90;
  b = createButton("Switch Direction ");
  b.mousePressed(() => {
    lineSpeed *=-1;
  });

  b.style('margin-top', '3px');
  init();

}

function init() {

  tiles = [];
  for (let i = 0; i < 7; i++) {
    let t;
    tiles.push(t = new Tile(char(65 + i)));
    t.loc = t.dest
  }

  gridLocs = [];
  setColors();
  //tiles = shuffle(tiles);
  for (let i = 0; i < tiles.length; i++) {
    let d;
    gridLocs.push(d = new p5.Vector(i * 48 + 24 + 70, 55, 20));
    tiles[i].loc = createVector(width / 2, height / 2);
    tiles[i].dest = d;

  }
}


let mini = 900;

function draw() {
  background(220);
  moveTiles();
  moveLine();


  drawLine();
  drawGrid();
  drawTiles();

  // noLoop();
}

function setDestinations() {
  for (let i = 0; i < gridLocs.length; i++) {
    tiles[i].dest = gridLocs[i];
  }


}


function moveLine() {
  lineX += lineSpeed;
  lineX2 = lineX + 48;
  //lineX2%=width

  for (let i = 0; i < gridLocs.length; i++) {
    let l = gridLocs[i];




    if (i < gridLocs.length - 1 && abs(lineX - l.x) < abs(lineSpeed / 2)) {

      //  tiles[i+1] = tiles[i];
      let tmp = new Tile(tiles[i].value);
      tmp.loc = tiles[i].loc;
      tmp.dest = gridLocs[i + 1];
      tmp.color = tiles[i].color;
      tmp.onArrival = () => {

        tiles[i + 1].value = tmp.value;
        tiles.pop();


      }

      tiles.push(tmp);
      // setDestinations()   
    }

    if (lineX < -100) {
      init();
      lineX = width + 50

    }
    if (lineX > width + 100) {
      init();
      lineX = -100
    }
  }
}

function drawTiles() {
  for (let t of tiles) {
    t.paint();
  }
}

function drawLine() {
  textSize(18);
  let y = 95;
  stroke(150);
  line(lineX, 15, lineX, y);
  line(lineX2, 15, lineX2, y);

  noStroke();
  text('i', lineX, y + 16)
  textSize(16);
  text('→', (lineX + lineX2) / 2 - 3, y + 16)
  textSize(18);
  text('i+1', lineX2, y + 16)

}

function setColors() {
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].color = color('hsb(' + int(i / tiles.length * 360) + ',70%,90%)');
    tiles[i].color = color(200);
  }
}

function moveTiles() {
  for (let t of tiles) {
    t.move();
  }
}



function keyPressed() {





}



function mousePressed() {



}




function drawGrid() {

  strokeWeight(2);
  stroke(150);
  for (let i = 0; i < gridLocs.length; i++) {
    if (i != focus)
      fill(245);
    else
      fill(200);
    let loc = gridLocs[i];
    rect(loc.x, loc.y, 48, 48);

  }

}

function mouseDragged() {

}

function mouseReleased() {



}






function inOrder() {

  for (let i = 0; i < tiles.length - 1; i++) {

    if (tiles[i].value > tiles[i + 1].value)
      return false;
  }
  return true;
}