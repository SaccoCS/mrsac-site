var x, y;

function setup() {
  createCanvas(256, 256);
  rectMode(CORNER);
  background(255);


  x = width / 2;
  y = height / 2;
  noFill();
  ellipse(x, y, 200);

}

function draw() {
  if (dist(x, y, width / 2, height / 2) < 100) {
    var newX = x + random(-4, 4);
    var newY = y + random(-4, 4);
    fill(random(256), random(256), random(256));
    stroke(random(256), random(256), random(256));
    strokeWeight(1);
   // noStroke();
    line(x, y, newX, newY);
   // ellipse(x,y,1);
    x = newX;
    y = newY;


  }
}

function mousePressed(){
  background(255);
  stroke(0)


  x = width / 2;
  y = height / 2;
  noFill();
  ellipse(x, y, 200);
}