function setup() {
  createCanvas(400, 400);
  xs = []
  ys = [];
}

function draw() {
  background(220);

  beginShape();
  for (var i = 0; i < xs.length; i++) {
    vertex(xs[i], ys[i]);
  }

  endShape(CLOSE);
}

function mousePressed() {
  xs.push(mouseX);
  ys.push(mouseY);
}

function keyPressed() {
  if (key == 'r') {
    xs = []
    ys = []
  }
}