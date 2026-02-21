function setup() {
  createCanvas(400, 400);
  background(0);
  noFill();
}

function draw() {
  
}

function mousePressed(){
 
  
  for(var i =0; i<255; i++) {
    
    stroke(255,255-i);
    ellipse(mouseX,mouseY,i*.5);
  }
}