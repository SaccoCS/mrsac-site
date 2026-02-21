var a, b, drag, withButton, withoutButton, practice, cycle, enable, endMesage;

function setup() {
  instructions = createP("Instructions:<br>Right-Click to send values to be compared.<br>Left-Click to Drag into place.<br>Try to place squares in ascending order.");
  instructions.style('font-family','Consolas');
  instructions.style('font-size','12px');
  instructions.style('margin','2px');
  textFont('Consolas');
  createCanvas(400, 250);
  cycle = 0;
  
  document.oncontextmenu = function() {
    return false;
  }

  withButton = createButton("Practice Again");
  withButton.style('display', 'inline-block');
  withButton.style('margin-top','2px');
  withButton.mousePressed(() => {

    init(true);
  });

  let tmpP = createP();
  tmpP.style('margin:2px');

  withoutButton = createButton("Without Numbers");
  withoutButton.style('display', 'inline-block');
  withoutButton.style('clear', 'left');
  withoutButton.mousePressed(() => {

    init(false);
  });


  withButton.hide();
  withoutButton.hide();

  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  init(true);

}

function init(nums) {
  enable = true
  ;
  practice = nums
  tiles = [];
  for (let i = 0; i < 6; i++) {
    let t;
    tiles.push(t = new Tile(i));
    toss(t);
    t.loc = t.dest;
    t.showVal = nums;
  }

  gridLocs = [];

  locked = [];
  for (let i = 0; i < tiles.length; i++) {
    let d;
    gridLocs.push(d = new p5.Vector(i * 48 + 80, height - 40));

    locked.push(undefined);
  }

  compareLoc = new p5.Vector(width / 2, height - 120);
  topList = [];
  botList = [];

  tiles = shuffle(tiles);

  setColors();

  endMessage = nums ? "Cheater!" : "Good Work!";


}

function draw() {
  background(255);

  moveTiles();

  drawGrid();
  drawCompare();
  drawTiles();
  drawText();

  if (!enable)
    drawMessage();

}

function drawMessage() {
  fill(0, 120);
  rect(width / 2, height / 2, width, height);


  fill(255);
  rect(width / 2, height / 2 - 2, width*.6,height*.6);
  fill(0);
  text(endMessage, width / 2, height / 2);
}

function drawTiles() {
  for (let t of tiles) {

    t.paint();
  }
}

function setColors() {
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].color = color('hsb(' + int(i / tiles.length * 360) + ',70%,100%)');

  }
}

function moveTiles() {
  for (let t of tiles) {

    t.move();
  }
}

function drawText() {
  textAlign(LEFT, CENTER);
  fill(0);
  textAlign(CENTER, CENTER);
}

function drawCompare() {
  noFill();
  rect(compareLoc.x, compareLoc.y, 60, 60);
  fill(0);
  textSize(12);
  text('compare', compareLoc.x, compareLoc.y - 40);

}

function mousePressed() {

  if (!enable)
    return;

  if (mouseButton == RIGHT) {
    let mouse = new p5.Vector(mouseX, mouseY);
    var click;
    for (let t of tiles) {
      if (t.contains(mouseX, mouseY))
        click = t;
    }

    if (click) {

      tileClick(click);
    }
  }
  if (mouseButton == LEFT) {

    //  console.log(a, b);
    for (let t of tiles) {
      if (t.contains(mouseX, mouseY)) {
        drag = t;

        if (drag == a)
          a = undefined;

        if (drag == b) {
          b = undefined;
        }
      }
    }

    if (drag) {
      free(drag);
    }


  }
}

function tileClick(t) {




  if (!a) {
    a = t;
    free(t);
    t.dest = compareLoc;
    // topList.filter((n)=>{ return n != a})
    // botList.filter((n)=>{ return n != a})

  } else if (!b) {

    if (a == t)
      return;
    b = t;
    free(t);
    t.dest = compareLoc;
    // topList.slice(topList.indexOf(b));
    // botList.filter((n)=>{ return n != b})
    b.onArrival = () => {
      compare();

    }
  } else if (!a.isMoving() && !b.isMoving()) {

    a = undefined;
    b = undefined;
    tileClick(t);
  }

}


function free(t) {

  t.dest = undefined;
 
  let ind = tiles.indexOf(t);
  tiles.splice(ind, 1);
  tiles.push(t);

  if ((ind = topList.indexOf(t)) >= 0)
    topList.splice(ind, 1);

  if ((ind = botList.indexOf(t)) >= 0)
    botList.splice(ind, 1);

  if ((ind = locked.indexOf(t)) >= 0)
    locked[ind] = undefined;
  
  
  
}


function compare() {

  var low, high;
  if (a.value < b.value) {
    low = a;
    high = b;

  } else {

    low = b;
    high = a;
  }

  let shift = new p5.Vector(-64, 0);

  low.dest = p5.Vector.add(compareLoc, shift);
  high.dest = p5.Vector.sub(compareLoc, shift);


  shift = createVector(10, 0);
  for (let t of topList) {
    if (t != a && t != b)
      t.dest = p5.Vector.add(t.loc, shift);
  }
  for (let t of botList) {
    if (t != a && t != b)
      t.dest = p5.Vector.sub(t.loc, shift);
  }
  topList.push(high);
  botList.push(low)

  a = undefined;
  b = undefined;




}

function drawGrid() {

  for (let loc of gridLocs) {
    fill(245);
    rect(loc.x, loc.y, 48, 48);

  }

}

function mouseDragged() {
  if (drag)
    drag.loc = createVector(mouseX, mouseY);
}

function mouseReleased() {

  if (drag != undefined) {
    for (let i = 0; i < gridLocs.length; i++) {
      let loc = gridLocs[i]
      if (loc.dist(drag.loc) < 24) {
        drag.dest = loc;

        if (locked[i] != undefined) {
          toss(locked[i]);

        }
        locked[i] = drag;

        if (inOrder()) {
          gameOverMan();

          break;
        }
      }
    }

    
     if (drag.loc.dist(compareLoc) < 24) {
      
       if( a == undefined){
        a = drag; 
         a.dest = compareLoc;
       }
       else if( b == undefined){
        b = drag; 
         b.dest = compareLoc
          b.onArrival = () => {
      compare();

    }
       }
      
       
       
     }
    

    drag = undefined;

  }


}

function gameOverMan() {

  withButton.show();
  withoutButton.show();
  for (let ti of tiles) {
    ti.showVal = true;
  }
  enable = false;
}





function inOrder() {

  for (let i = 0; i < locked.length - 1; i++) {
    if (locked[i] == undefined || locked[i + 1] == undefined)
      return false;
    if (locked[i].value > locked[i + 1].value)
      return false;
  }
  return true;
}


function toss(t) {

  let loc = createVector(width * 0.25 + random(width * 0.5), 50 + random(-10, 10));

  for (let tile of tiles) {

    if (loc.dist(tile.loc) < 20) {
      toss(t);
      return;

    }
  }

  t.dest = loc;

}