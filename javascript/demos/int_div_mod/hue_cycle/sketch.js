function setup() {
  createCanvas(100, 100);
  colorMode(HSB);
  frameRate(30);
}

function draw() {
  background(0);
  fill(2*frameCount%720/2,255,255);
  ellipse(50,50,100);
}