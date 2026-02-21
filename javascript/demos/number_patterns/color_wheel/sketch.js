function setup() {
  createCanvas(300, 300);
  background(0);
  angleMode(DEGREES);
  colorMode(HSB);
  angle = 0;
}

function draw() {

  if (angle < 360) {
    translate(width / 2, height / 2);
    
   // ellipse(0,0,10);
    rotate(angle);
    stroke(angle, 255, 255);
    strokeWeight(3);
    line(0, 0, 0, -150);
    angle += 1;
    
    fill(0);
    noStroke();
    ellipse(0,0,10);
  }
}

function mousePressed(){
  angle = 0;
  background(0);
}