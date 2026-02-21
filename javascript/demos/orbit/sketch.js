function setup() {
  createCanvas(400, 400);
}

function draw() {
  strokeWeight(3);
  angleMode(DEGREES);
  background(0);
  stroke(255);
  
  translate(width/2,height/2);
  
  rotate(frameCount);
  ellipse(0,0,80);
  ellipse(150,0,30);  //off center
}
 
