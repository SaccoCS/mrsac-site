function setup() {
  createCanvas(256, 200);
}

function draw() {
  background(220);
  noStroke();
  
  //draw top rectangle using mouseX
  fill(mouseX,0,0);
  rect(0,0,256,100);
  
  //draw bottom rectangle using a contained mouseX
  var cX = constrain(mouseX,100,200);
  fill(cX,0,0);
  rect(0,100,256,100);
  
  
  //draw each value over its rectangle
  strokeWeight(1);
  fill(255);
  textAlign(CENTER,CENTER);
  text(mouseX,128,50);
  text(cX,128,150);
  
  strokeWeight(3);
  stroke(255);
  line(mouseX,0,mouseX,100);
  line(cX,100,cX,200);
}