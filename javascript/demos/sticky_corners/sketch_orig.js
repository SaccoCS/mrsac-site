function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(51);
  
  strokeWeight(3);
  stroke(255);
  
  line(0,0,mouseX,mouseY);
  line(400,0,mouseX,mouseY);
  line(0,400,mouseX,mouseY);
  line(400,400,mouseX,mouseY);
  
  ellipse(mouseX,mouseY,21,21);
}