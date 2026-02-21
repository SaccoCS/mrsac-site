function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  noFill();
  ellipse(mouseX,mouseY,64);
  strokeWeight(3);
  
  if(dist(mouseX,mouseY,width/2,height/2) < 132)
  fill(255,0,0);
  ellipse(width/2,height/2,200);
  
  
  noFill();
  ellipse(mouseX,mouseY,64);
}