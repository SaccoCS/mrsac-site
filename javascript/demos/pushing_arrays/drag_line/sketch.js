var xs = [];
var ys = [];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  strokeWeight(3);
  for (var i = 0; i < xs.length; i++) {
    line(xs[i], ys[i], xs[i + 1], ys[i + 1]);
  }
}

function mousePressed() {
  xs = [];
  ys = [];
}

function mouseReleased() {

}

function mouseDragged() {
  xs.push(mouseX);
  ys.push(mouseY);
}