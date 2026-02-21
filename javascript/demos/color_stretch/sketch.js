function setup() {
  createCanvas(500, 500);
}

function draw() {
  var x = map(mouseX,0,width,0,255);
  var y = map(mouseY,0,height,0,255);
  background(x,y,0);
  
  noFill();
  stroke(255);
  rect(0,0,256,256);
}