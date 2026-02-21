var speed = []
var xs = [];
var ys = [];
var sizes = [];

function setup() {
  createCanvas(400, 300);
  textAlign(CENTER, CENTER);

  addDroplet()
}

function draw() {
  background(0);
  if (frameCount % 50 == 0 && xs.length < 100)
    addDroplet()
  drawRain();

  moveRain();

  fill(255);
  text("Drop Count: " + xs.length, width / 2, 20)
}

function addDroplet() {
  xs.push(random(width));
  ys.push(random(-200, -50));
  speed.push(2 + random(2));
  sizes.push(random()+.5);
}

function removeDroplet(i) {
  xs.splice(i, 1);
  ys.splice(i, 1);
  speed.splice(i, 1);
  sizes.splice(i, 1);
}

function drawCatcher() {

}

function moveRain() {
  for (var i = xs.length - 1; i >= 0; i--) {
    ys[i] = ys[i] + speed[i];
    if (ys[i] > height) {
     removeDroplet(i);

      addDroplet()
    }
  }
}

function drawRain() {
  for (var i = xs.length - 1; i >= 0; i--) {
    push()
    drop(xs[i], ys[i]);    
    pop()
  }
}

function drop(x, y) {
  fill(255);
  noStroke();
  var size = 1;
  for (var Y = y; Y < y + 15; Y += 2) {
    ellipse(x, Y, size);
    size += 1.4;
  }
}