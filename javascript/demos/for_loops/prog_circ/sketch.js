function setup() {
  createCanvas(300, 300);
  angleMode(DEGREES);
  colorMode(HSB);
  noStroke();angle = 0
  frameRate(8);
  background(0);
}

function draw() {
  //

  //repeat this code for all angles described by the pattern: 0,30,60,90,...,330
  if(angle < 360) {

    resetMatrix();
    translate(150, 150);
    rotate(angle);

    fill(angle, 255, 255);
    ellipse(100, 0, 30);
    angle += 30

  }
}

function mousePressed(){
 background(0);
  angle=0;
}