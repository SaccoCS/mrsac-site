var countDown;
var size;

function setup() {
  createCanvas(200, 200);
  frameRate(10);
  textAlign(CENTER, CENTER)
  rectMode(CENTER);
  countDown = 20;
  size = 110;
}

function draw() {
  if (countDown > 0)
    background(0);
  else
    background(random(256), random(256), random(256));
  strokeWeight(3);
  textSize(60);

  rect(width / 2, height / 2, size, size,20);
  text(countDown, width / 2, height / 2);


  if (countDown > 0)
    countDown--;
}

function mousePressed() {
  countDown = 20;
}