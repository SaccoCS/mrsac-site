var countDown;
var size;

function setup() {
  createCanvas(180,180);
    frameRate(10);
    textAlign(CENTER, CENTER)
    rectMode(CENTER);
    strokeWeight(3);
    textSize(60);
  countDown = 0;
}

function draw() {
  if (countDown > 0)
    background(0);
  else
    background(random(256), random(256), random(256));
  


   fill(255);
   rect(90, 90, 100, 100,20);
    
    fill(0);
    text(countDown, 90, 92);

    if (countDown > 0)
      countDown--;
}

function mousePressed() {
  countDown = 20;
}