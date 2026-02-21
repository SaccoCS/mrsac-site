var xs = [];
var ys = [];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  noStroke();

  var al = 150;
  var rad = 50;
  for (var i=xs.length;i>0;i-=2) {
    fill(255,al-=3);
    
    if(rad>0)
    ellipse(xs[i-i%2], ys[i-i%2], rad-=1.4);
  }
}

function mouseMoved() {
  xs.push(mouseX);
  ys.push(mouseY);
}

function keyPressed() {
  if (key == 'r') {
    xs = [];
    ys = [];
  }
}