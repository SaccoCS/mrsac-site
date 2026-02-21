function setup() {
  createCanvas(400, 400);
  noFill();
  strokeWeight(4);
  stroke(255);
}

function draw() {
  background(0);
  
  for(var w = 160; w>3; w -= 16)
  {    
    ellipse(mouseX, mouseY,w);
  }
}