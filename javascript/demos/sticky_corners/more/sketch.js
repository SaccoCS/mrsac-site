function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(51);

  connectToMouse(0, 0);
  connectToMouse(400, 0);
  connectToMouse(0, 400);
  connectToMouse(400, 400);
  
  connectToMouse(200, 0);
  connectToMouse(200, 400);
  connectToMouse(0, 200);
  connectToMouse(400, 200);

  ellipse(constrain(mouseX,0,500), constrain(mouseY,0,500), 21, 21);
}

function connectToMouse(x, y) {
  strokeWeight(3);
  stroke(255);
  line(constrain(mouseX,0,500), constrain(mouseY,0,500), x, y);
}