function setup() {
  createCanvas(256, 256);
}

function draw() {
  background(255);
  noStroke();
  
  
  fill(0,0,0);  
  rect(0,0,128,128);
  
  fill(mouseX,0,0);
  rect(0,128,128,128);  
  
  fill(0,0,mouseY);
  rect(128,0,128,128);
  
  fill(mouseX,0,mouseY);
  rect(128,128,128,128);
  
  
}