let minX, minY, maxX, maxY, turnAngle = 90;

function setup() {
  d = createDiv();
  textBox = createInput();
  textBox.style('margin', '10px 0px 10px 0px');
  textBox.style('width', '632px');
  textBox.style('display','block');
  textBox.input(boxChange)
  can = createCanvas(640, 640);
  d.child(textBox);
  createP();
  d.child(can);

  pathStr = "";
  
  initPoints();
}

function boxChange() {
  pathStr = textBox.value();
  initPoints();
}

function draw() {
  loc = createVector(0, 0);
  dir = p5.Vector.fromAngle(0)
  background(0);
  stroke(255);
  strokeWeight(3);

  drawPoints();
}

function drawPoints(){
  points.forEach((p, i) => {
    if (i == 0) return;
    
    let dx = maxX - minX;
    let dy = maxY - minY;

    let dist = max(dx,dy);
    let margin = 50;
    
    let xOff = (dist-dx)/2;
    let yOff = (dist-dy)/2;

    
    let x1 = map(p.x, -xOff+minX, -xOff+minX + dist, margin, height - margin);
    let y1 = map(p.y, -yOff+minY, -yOff+minY + dist, margin, height - margin);
    let x2 = map(points[i - 1].x, -xOff+minX, -xOff+minX + dist, margin, height - margin);
    let y2 = map(points[i - 1].y, -yOff+minY, -yOff+minY + dist, margin, height - margin);

    line(x1, y1, x2, y2);
  })
}


function initPoints() {
  loc = createVector(0, 0);
  dir = p5.Vector.fromAngle(0);
  let colon = pathStr.indexOf(":");
  turnAngle = colon == -1 ? 90 : int(pathStr.substring(0, colon));
  step = 10;
  points = [loc];

  pathStr.substring(colon + 1).split("").forEach(c => {
    if (c == "F")
      move();
    if (c == "+")
      turnLeft();
    if (c == "-")
      turnRight();
  });

  minX = points[0].x;
  minY = points[0].y;
  maxX = points[0].x;
  maxY = points[0].y;

  points.forEach(p => {
    minX = min(minX, p.x);
    minY = min(minY, p.y);
    maxX = max(maxX, p.x);
    maxY = max(maxY, p.y);
  });

}

function move() {
  let newLoc = p5.Vector.add(loc, dir.copy().mult(step));
  loc = newLoc;
  points.push(loc);
}



function turnLeft() {
  turn(-radians(turnAngle));
}

function turnRight() {
  turn(radians(turnAngle));
}

function turn(angle) {
  dir = p5.Vector.fromAngle(dir.heading() + angle)
}