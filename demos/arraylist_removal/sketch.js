function setup() {
  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  textFont('Consolas');
  noSmooth();
//   createCanvas(476, 145);
  scl = 0.7;
  createCanvas(476*scl, 145*scl);


  document.oncontextmenu = function() {
    return false;
  }

  lineSpeed = 1.2;
flashes = [];
  
  

  lineX = -90;
  b = createButton("Switch Direction ");
  b.mousePressed(() => {
    lineSpeed *= -1;
  });

  b.style('margin-top', '3px');
  init();

}

function init() {
  tiles = [];
  vals = [2, 3, 4, 4,5,6,6,7,7];
 // vals = [1, 2, 3, 4,5,6,7,8,9];
  // for (let i = 1; i <= 9; i++) {
  for (var v of vals) {
    let t;
    tiles.push(t = new Tile(v));
    t.loc = t.dest
  }

  gridLocs = [];
  setColors();
  //tiles = shuffle(tiles);
  for (let i = 0; i < tiles.length; i++) {
    let d;
    gridLocs.push(d = new p5.Vector(i * 48 + 24 + 22, 65, 20));
    tiles[i].loc = createVector(width / 2, height / 2);
    tiles[i].dest = d;

  }
}


let mini = 900;

function draw() {
  scale(scl);
  background(220);
  
  textSize(18*scl)
  text("Remove the Even Numbers "+(lineSpeed>=0?"(flawed":"(fixed")+" solution)",width/2/scl,20/scl);
  
  translate(0,10);
  moveTiles();
  moveLine();


  drawLine();
  drawGrid();
  drawTiles();


  // noLoop();
}

function setDestinations() {
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].dest = gridLocs[i];
  }


}


function moveLine() {
  lineX += lineSpeed;
  lineX2 = lineX + 48;
  //lineX2%=width

  for (let i = 0; i < tiles.length; i++) {
    let l = gridLocs[i];




    if (i < gridLocs.length  && abs(lineX - l.x) < abs(lineSpeed / 2)) {
      if (tiles[i].value % 2 == 0) {
        tiles.splice(i, 1);
        flashes[i] = {
          count: 25,
          color: '#f33',
          index: i
        }
      }
      else
      {
        flashes[i] = {
          count: 25,
          color: '#00aa00',
          index: i
      }
      }

      setDestinations()
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
  let y = 95+10;


  stroke(150);
  line(lineX, 25, lineX, y);
  // line(lineX2, 15, lineX2, y);

  noStroke();
  text('i'+(lineSpeed>=0?'++':'--'), lineX, y + 16)
  // textSize(22);
  // text('↔️', (lineX + 21) , y + 16)
  // textSize(18);
  // text('i+1', lineX2, y + 16)

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


    if (flashes[i]==undefined)
      fill(245);
    else if (flashes[i].count == 0) {
      fill(245);
      flashes[i] = undefined;

    } else if( flashes[i].index == i){
      fill(flashes[i].color);
      flashes[i].count--;
    }else
      fill(245);

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