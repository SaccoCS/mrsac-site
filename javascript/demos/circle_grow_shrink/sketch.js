let rad;
function setup() {
  createCanvas(150, 150);
  ellipseMode(RADIUS);
  rad = 20;
  
  
}

function draw() {
  background(0);
  stroke(222,0,99)
  noFill();
  strokeWeight(5)
  circle(width/2,height/2,rad);
  
  
  if( dist(width/2,height/2,mouseX,mouseY) < rad){
    rad = min(rad + 1.2,65);
  }
  else
    rad = max(10,rad-0.4);
  
  
  
}